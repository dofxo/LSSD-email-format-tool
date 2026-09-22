import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, Copy, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import { AppHeader } from "@/components/AppHeader";
import { DivisionSwitcher } from "@/components/DivisionSwitcher";
import { FormatFields } from "@/components/FormatFields";
import { FormatPicker } from "@/components/FormatPicker";
import { FormatPreview } from "@/components/FormatPreview";
import { UnlockDialog } from "@/components/UnlockDialog";
import { DeputyDetails } from "@/components/deputyDetails/DeputyDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelFooter, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { useCopy } from "@/hooks/useCopy";
import { useFormatData } from "@/hooks/useFormatData";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { getDivision } from "@/lib/divisions";
import { formatFieldsFor, formatsForDivision, formatLabelFor, isFilled } from "@/lib/formats";
import { listIssues, profileIssues } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { getFormat } from "@/formats";
import type { DeputyData, FormatData, divisionsType } from "@/types";

const SUPERVISORY_PASSWORD = import.meta.env.VITE_SUPERVISORY_PASSWORD as string | undefined;

const emptyDetails: DeputyData = {
	name: "",
	signature: "",
	dRank: "",
	divisionRanks: { RED: "", TSD: "", ATD: "", General: "", Supervisory: "", FTB: "", SEB: "" },
};

/** Restores the saved profile, tolerating older shapes stored in localStorage. */
const loadDetails = (): DeputyData => {
	try {
		const saved = localStorage.getItem("deputyDetails");
		if (!saved) return emptyDetails;
		const parsed = JSON.parse(saved) as Partial<DeputyData>;
		return {
			...emptyDetails,
			...parsed,
			divisionRanks: { ...emptyDetails.divisionRanks, ...(parsed.divisionRanks ?? {}) },
		};
	} catch {
		return emptyDetails;
	}
};

const loadUnlocked = () => {
	try {
		return localStorage.getItem("supervisoryUnlocked") === "true";
	} catch {
		return false;
	}
};

const App = () => {
	const { theme, toggleTheme } = useTheme();
	const isMobile = useMediaQuery("(max-width: 639px)");
	const { copy, isCopied } = useCopy();
	const formatCopied = isCopied("format");

	const [division, setDivision] = useState<divisionsType>("RED");
	const [formatId, setFormatId] = useState("");
	const [resetKey, setResetKey] = useState(0);

	// Every format keeps its own inputs, saved under one localStorage key as an
	// array of objects (one per division/format) so nothing is lost on restart.
	const { formatData, setFormatData, clearFormat } = useFormatData(
		formatId ? `${division}/${formatId}` : "",
	);
	const [details, setDetails] = useState<DeputyData>(loadDetails);

	const [pickerOpen, setPickerOpen] = useState(false);
	const [unlocked, setUnlocked] = useState(loadUnlocked);
	const [pendingDivision, setPendingDivision] = useState<divisionsType | null>(null);
	const [unlockOpen, setUnlockOpen] = useState(false);

	const divisionMeta = getDivision(division);
	const formatOptions = useMemo(() => formatsForDivision(division), [division]);
	const fields = useMemo(() => formatFieldsFor(division, formatId), [division, formatId]);
	const generatedText = useMemo(
		() => (formatId ? getFormat({ formatData, deputyData: details, formatId, division }).format : ""),
		[formatData, details, formatId, division]
	);

	const filledCount = useMemo(
		() => fields.filter((field) => isFilled(formatData[field.name as keyof FormatData])).length,
		[fields, formatData]
	);
	const completion = fields.length === 0 ? 100 : Math.round((filledCount / fields.length) * 100);
	const profileGaps = profileIssues(details, division);

	useEffect(() => {
		try {
			localStorage.setItem("deputyDetails", JSON.stringify(details));
		} catch {
			/* storage may be full or unavailable, so the app keeps working in memory */
		}
	}, [details]);

	const handleDivisionChange = (next: divisionsType) => {
		if (getDivision(next).restricted && !unlocked) {
			setPendingDivision(next);
			setUnlockOpen(true);
			return;
		}
		if (next === division) return;
		setDivision(next);
		setFormatId("");
	};

	const handleSelectFormat = (next: string) => {
		setFormatId(next);
	};

	const handleUnlock = (password: string) => {
		if (!SUPERVISORY_PASSWORD || password !== SUPERVISORY_PASSWORD) return false;

		setUnlocked(true);
		try {
			localStorage.setItem("supervisoryUnlocked", "true");
		} catch {
			/* not fatal: the session stays unlocked */
		}

		if (pendingDivision) {
			setDivision(pendingDivision);
			setPendingDivision(null);
			setFormatId("");
		}

		toast.success("Supervisory formats unlocked");
		return true;
	};

	const handleLock = () => {
		setUnlocked(false);
		try {
			localStorage.removeItem("supervisoryUnlocked");
		} catch {
			/* ignore */
		}
		if (division === "Supervisory") {
			setDivision("RED");
			setFormatId("");
		}
		toast.info("Supervisory formats locked");
	};

	const handleCopyFormat = useCallback(async () => {
		if (!formatId) return;
		const copied = await copy(generatedText, "format");
		if (copied) toast.success(`${formatLabelFor(division, formatId)} copied to clipboard`);
		else toast.error("Clipboard unavailable. Copy the body from the preview panel instead.");
	}, [copy, division, formatId, generatedText]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const modifier = event.metaKey || event.ctrlKey;
			if (!modifier) return;

			if (event.key.toLowerCase() === "k") {
				event.preventDefault();
				setPickerOpen((open) => !open);
			}

			if (event.key === "Enter" && formatId) {
				event.preventDefault();
				void handleCopyFormat();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [formatId, handleCopyFormat]);

	return (
		<div className={cn("flex min-h-dvh flex-col", divisionMeta.accent)}>
			<AppHeader
				theme={theme}
				onToggleTheme={toggleTheme}
				unlocked={unlocked}
				onLock={handleLock}
			/>

			<main className="mx-auto flex w-full max-w-[1680px] flex-1 flex-col gap-6 px-4 pt-6 pb-14 sm:px-6 lg:px-8 2xl:px-12">
				<div className="flex flex-col gap-3">
					<DivisionSwitcher value={division} onChange={handleDivisionChange} locked={!unlocked} />
					<p className="text-[12.5px] text-ink-muted">
						<span className="font-medium text-ink">{divisionMeta.name}</span>
						<span className="mx-1.5 text-ink-faint/40">·</span>
						{divisionMeta.blurb}
					</p>
				</div>

				<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,1fr)] xl:gap-7">
					<div className="flex min-w-0 flex-col gap-6">
						<Panel>
							<PanelHeader>
								<PanelHeading
									step={1}
									title="Choose a response format"
									description="Search the formats available to your division."
								>
									<Badge tone="neutral">
										{formatOptions.length} {formatOptions.length === 1 ? "format" : "formats"}
									</Badge>
									{division === "Supervisory" && unlocked ? (
										<Badge tone="success">
											<ShieldCheck />
											Unlocked
										</Badge>
									) : null}
								</PanelHeading>
							</PanelHeader>

							<PanelBody>
								<FormatPicker
									division={division}
									formatId={formatId}
									onSelect={handleSelectFormat}
									open={pickerOpen}
									onOpenChange={setPickerOpen}
									options={formatOptions}
									fieldCount={fields.length}
								/>
							</PanelBody>
						</Panel>

						<Panel style={{ animationDelay: "60ms" }}>
							<PanelHeader>
								<PanelHeading
									step={2}
									title="Fill in the details"
									description={
										formatId
											? formatLabelFor(division, formatId)
											: "Fields appear here once a format is selected."
									}
								/>
							</PanelHeader>

							<PanelBody>
								<FormatFields
									formatId={formatId}
									fields={fields}
									formatData={formatData}
									setFormatData={setFormatData}
									resetKey={resetKey}
								/>
							</PanelBody>

							<PanelFooter className="sticky bottom-0 z-10 flex-col items-stretch gap-3 rounded-b-panel bg-surface/92 backdrop-blur-md sm:flex-row sm:items-center">
								<div className="min-w-0 flex-1">
									{formatId ? (
										<>
											<div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px]">
												<span className="font-medium text-ink">
													{fields.length === 0
														? "Ready to copy"
														: `${filledCount} of ${fields.length} filled`}
												</span>
												{profileGaps.length > 0 ? (
													<span
														className="flex items-center gap-1.5 text-warning"
														title={`Missing ${listIssues(profileGaps)}`}
													>
														<AlertTriangle className="size-3.5" />
														Profile incomplete
													</span>
												) : (
													<span className="flex items-center gap-1.5 text-success">
														<Check className="size-3.5" />
														Profile ready
													</span>
												)}
											</div>
											<Progress
												value={completion}
												tone={completion === 100 ? "success" : "accent"}
												className="mt-2 max-w-[260px]"
											/>
										</>
									) : (
										<p className="flex items-center gap-2 text-[12.5px] text-ink-muted">
											<FileText className="size-4 shrink-0 text-ink-faint" />
											Select a format to unlock the copy button.
										</p>
									)}
								</div>

								<div className="flex items-center gap-2">
									{formatId ? (
										<Button
											key="reset"
											variant="secondary"
											size="icon"												onClick={() => {
													clearFormat();
													setResetKey((value) => value + 1);
												}}
												title="Clear the fields for this format"
											aria-label="Clear the fields for this format"
										>
											<RotateCcw />
										</Button>
									) : null}

									{formatId ? (
										<Button
											key="copy"
											variant="primary"
											size="lg"
											onClick={() => void handleCopyFormat()}
											className="flex-1 sm:min-w-[170px] sm:flex-none"
										>
											{formatCopied ? <Check /> : <Copy />}
											{formatCopied ? "Copied" : "Copy format"}
										</Button>
									) : null}
								</div>
							</PanelFooter>
						</Panel>
					</div>

					<aside className="flex min-w-0 flex-col gap-6">
						<FormatPreview
							text={generatedText}
							formatLabel={formatId ? formatLabelFor(division, formatId) : ""}
						/>
						<DeputyDetails details={details} setDetails={setDetails} division={division} />
					</aside>
				</div>

				<footer className="mt-auto border-t border-subtle pt-5 text-[12px] text-ink-muted">
					<p>
						Developed by{" "}
						<a
							href="https://github.com/dofxo"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-ink-muted underline decoration-subtle underline-offset-2 transition-colors duration-150 hover:text-accent"
						>
							dofxo
						</a>
					</p>
				</footer>
			</main>

			<ToastContainer
				position={isMobile ? "top-center" : "bottom-right"}
				autoClose={2600}
				newestOnTop
				closeOnClick
				draggable
				pauseOnHover
				hideProgressBar={false}
			/>

			<UnlockDialog
				open={unlockOpen}
				configured={Boolean(SUPERVISORY_PASSWORD)}
				onUnlock={handleUnlock}
				onOpenChange={(open) => {
					setUnlockOpen(open);
					if (!open) setPendingDivision(null);
				}}
			/>
		</div>
	);
};

export default App;
