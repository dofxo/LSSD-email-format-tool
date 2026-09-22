import { useEffect, useState } from "react";
import { AlertTriangle, Check, ChevronDown, ClipboardCopy, ImageOff, ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Field, Input } from "@/components/ui/input";
import { Panel, PanelBody, PanelFooter, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { deputyRanks } from "@/data/deputyRanks";
import { useCopy } from "@/hooks/useCopy";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { divisionRankOptionsFor, listIssues, profileIssues, signatureBlockLines } from "@/lib/profile";
import { cn } from "@/lib/utils";
import type { DeputyData, divisionsType } from "@/types";

interface DeputyDetailsProps {
	details: DeputyData;
	setDetails: React.Dispatch<React.SetStateAction<DeputyData>>;
	division: divisionsType;
}

export function DeputyDetails({ details, setDetails, division }: DeputyDetailsProps) {
	const { copy, isCopied } = useCopy();
	const copied = isCopied("signature");
	const isWide = useMediaQuery("(min-width: 1024px)");
	const [imageState, setImageState] = useState<"empty" | "loading" | "ready" | "error">("empty");
	// On narrow screens the profile folds away once it is already filled in, so the
	// form stays close to the top of the page. A manual toggle always wins.
	const [wasCompleteOnLoad] = useState(() => profileIssues(details, division).length === 0);
	const [manualOpen, setManualOpen] = useState<boolean | null>(null);
	const expanded = isWide || (manualOpen ?? !wasCompleteOnLoad);

	const signature = details.signature.trim();
	const divisionRankOptions = divisionRankOptionsFor(division);
	const needsDivisionRank = divisionRankOptions.length > 0;

	useEffect(() => {
		setImageState(signature ? "loading" : "empty");
	}, [signature]);

	const signatureLines = signatureBlockLines(details, division);
	const missing = profileIssues(details, division);
	const isComplete = missing.length === 0;
	const summary = [details.dRank, details.name].filter(Boolean).join(" ");

	return (
		<Panel style={{ animationDelay: "160ms" }}>
			<PanelHeader>
				<PanelHeading
					icon={UserRound}
					title="Your deputy profile"
					description={
						isWide
							? "Saved on this device and reused in every format."
							: (summary || "Add your name, rank and signature once.")
					}
				>
					{isComplete ? (
						<Badge tone="success">
							<Check />
							Complete
						</Badge>
					) : (
						<Badge tone="warning">
							<AlertTriangle />
							{missing.length} missing
						</Badge>
					)}

					{!isWide ? (
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => setManualOpen(!expanded)}
							aria-expanded={expanded}
							aria-label={expanded ? "Hide profile details" : "Show profile details"}
						>
							<ChevronDown
								className={cn("transition-transform duration-200", expanded && "rotate-180")}
							/>
						</Button>
					) : null}
				</PanelHeading>
			</PanelHeader>

			{expanded ? (
			<PanelBody className="flex flex-col gap-5">
				<div className="flex min-w-0 flex-col gap-5">
					<Field label="Deputy full name" htmlFor="deputy-name" wide>
						<Input
							id="deputy-name"
							name="name"
							value={details.name}
							placeholder="e.g. Bobby Kirk"
							autoComplete="name"
							onChange={(event) => setDetails((prev) => ({ ...prev, name: event.target.value }))}
						/>
					</Field>

					<Field label="Deputy rank" htmlFor="deputy-rank" wide>
						<Combobox
							id="deputy-rank"
							value={details.dRank}
							onChange={(value) => setDetails((prev) => ({ ...prev, dRank: value }))}
							options={deputyRanks}
							placeholder="Select rank…"
							searchPlaceholder="Search ranks…"
							emptyMessage="No ranks match."
							ariaLabel="Deputy rank"
						/>
					</Field>

					{needsDivisionRank ? (
						<Field label={`${division} rank`} htmlFor="deputy-division-rank" wide>
							<Combobox
								id="deputy-division-rank"
								value={details.divisionRanks[division]}
								onChange={(value) =>
									setDetails((prev) => ({
										...prev,
										divisionRanks: { ...prev.divisionRanks, [division]: value },
									}))
								}
								options={divisionRankOptions}
								placeholder={`Select ${division} rank…`}
								searchPlaceholder="Search ranks…"
								emptyMessage="No ranks match."
								ariaLabel={`${division} rank`}
							/>
						</Field>
					) : null}

					<Field
						label="Signature image link"
						htmlFor="deputy-signature"
						hint="Direct image link, for example https://i.ibb.co/xxxx/name.png"
						wide
					>
						<Input
							id="deputy-signature"
							name="signature"
							value={details.signature}
							placeholder="https://…"
							spellCheck={false}
							onChange={(event) => setDetails((prev) => ({ ...prev, signature: event.target.value }))}
						/>
					</Field>
				</div>

				<div className="overflow-hidden rounded-2xl border border-subtle bg-surface-2 p-3">
					<p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
						Signature preview
					</p>

					{imageState === "empty" ? (
						<p className="py-7 text-center text-[12.5px] text-ink-faint">
							Paste a direct image link above to preview your signature.
						</p>
					) : imageState === "error" ? (
						<div className="flex items-start gap-2.5 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2.5 text-[12.5px] text-warning">
							<ImageOff className="mt-px size-4 shrink-0" />
							<span>
								This link could not be loaded. Use the direct image address (ending in .png or .jpg),
								not the image viewer page.
							</span>
						</div>
					) : (
						<div className="flex min-h-[76px] items-center justify-center">
							{imageState === "loading" ? (
								<span className="skeleton h-16 w-44 rounded-lg" />
							) : null}
							<img
								src={details.signature}
								alt="Deputy signature"
								onLoad={() => setImageState("ready")}
								onError={() => setImageState("error")}
								className={cn("max-h-24 w-auto", imageState === "ready" ? "block" : "hidden")}
							/>
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2.5">
					<p className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
						Signature block
					</p>
					<pre
						tabIndex={0}
						aria-label="Signature block, ready to copy"
						className="thin-scroll overflow-x-auto rounded-2xl border border-subtle bg-surface-2 p-3.5 font-mono text-[11.5px] leading-[1.7] whitespace-pre-wrap break-all text-ink-muted"
					>
						{signatureLines.length > 0 ? signatureLines.join("\n") : "[img][/img]"}
					</pre>
					<Button
						variant="secondary"
						size="sm"
						className="self-start"
						disabled={!signature}
						onClick={() => copy(signatureLines.join("\n"), "signature")}
					>
						{copied ? <Check className="text-success" /> : <ClipboardCopy />}
						{copied ? "Signature copied" : "Copy signature block"}
					</Button>
				</div>
			</PanelBody>
			) : null}

			{expanded ? (
			<PanelFooter>
				{isComplete ? (
					<p className="flex items-center gap-2 text-[12.5px] font-medium text-success">
						<ShieldCheck className="size-4" />
						Profile complete. Your details are added to every format.
					</p>
				) : (
					<p className="flex items-start gap-2 text-[12.5px] text-warning">
						<AlertTriangle className="mt-px size-4 shrink-0" />
						<span>
							Still missing <span className="font-medium">{listIssues(missing)}</span>. Formats will show
							blanks until these are filled in.
						</span>
					</p>
				)}
			</PanelFooter>
			) : null}
		</Panel>
	);
}

export default DeputyDetails;
