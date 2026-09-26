import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, Lock, Moon, Plus, Save, Sun } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import { FormatEditor } from "@/components/admin/FormatEditor";
import { PasswordGate } from "@/components/admin/PasswordGate";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Panel, PanelBody, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { getFormat } from "@/formats";
import { adminFormatStore } from "@/formats/admin";
import type { AdminFormatFields, AdminFormatStore } from "@/formats/adminTypes";
import { useTheme } from "@/hooks/useTheme";
import { fetchAdminFormats, overrideKey, saveAdminFormats } from "@/lib/adminFormats";
import { divisions } from "@/lib/divisions";
import { labelsByDivision } from "@/lib/formats";
import { templateTokenHints } from "@/lib/formatTemplates";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { DeputyData, divisionsType } from "@/types";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
const GATE_KEY = "adminUnlocked";

/** An empty profile, so the built-in output shows its own placeholders. */
const EMPTY_DEPUTY: DeputyData = {
	name: "",
	signature: "",
	dRank: "",
	divisionRanks: { RED: "", TSD: "", ATD: "", General: "", Supervisory: "", FTB: "", SEB: "" },
};

const loadUnlocked = () => {
	try {
		return sessionStorage.getItem(GATE_KEY) === "true";
	} catch {
		return false;
	}
};

const cloneStore = (store: AdminFormatStore): AdminFormatStore => ({
	overrides: { ...store.overrides },
	custom: store.custom.map((entry) => ({ ...entry })),
});

/** Next free numeric id in a division, so added formats never clash. */
const nextCustomId = (division: divisionsType, store: AdminFormatStore): string => {
	const used = new Set<string>([
		...Object.keys(labelsByDivision[division]),
		...store.custom.filter((entry) => entry.division === division).map((entry) => entry.id),
	]);
	let id = 1;
	while (used.has(String(id))) id += 1;
	return String(id);
};

/** Format management page: unlock with the .env password, then edit or add formats. */
const AdminPage = () => {
	const { theme, toggleTheme } = useTheme();
	const configured = Boolean(ADMIN_PASSWORD);

	const [unlocked, setUnlocked] = useState(loadUnlocked);
	const [gateOpen, setGateOpen] = useState(!unlocked);
	const [store, setStore] = useState<AdminFormatStore>(() => cloneStore(adminFormatStore));
	const [version, setVersion] = useState(0);
	const [dirty, setDirty] = useState(false);
	const [saving, setSaving] = useState(false);
	const [openDivisions, setOpenDivisions] = useState<Record<string, boolean>>({});

	const [newDivision, setNewDivision] = useState<divisionsType>("RED");
	const [newTitle, setNewTitle] = useState("");
	const [newGovLink, setNewGovLink] = useState("");
	const [newBody, setNewBody] = useState("");

	useEffect(() => {
		let active = true;
		void fetchAdminFormats().then((next) => {
			if (active) setStore(cloneStore(next));
		});
		return () => {
			active = false;
		};
	}, []);

	const markDirty = useCallback(() => {
		setVersion((value) => value + 1);
		setDirty(true);
	}, []);

	const toggleDivision = (division: divisionsType) =>
		setOpenDivisions((prev) => ({ ...prev, [division]: !prev[division] }));

	const unlock = (password: string) => {
		if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return false;
		setUnlocked(true);
		try {
			sessionStorage.setItem(GATE_KEY, "true");
		} catch {
			/* not fatal: the page stays unlocked for this view */
		}
		toast.success("Admin unlocked");
		return true;
	};

	const lock = () => {
		setUnlocked(false);
		setGateOpen(true);
		try {
			sessionStorage.removeItem(GATE_KEY);
		} catch {
			/* ignore */
		}
	};

	const saveOverride = (division: divisionsType, formatId: string, fields: AdminFormatFields) => {
		setStore((prev) => ({
			...prev,
			overrides: { ...prev.overrides, [overrideKey(division, formatId)]: { ...fields } },
		}));
		markDirty();
	};

	const resetOverride = (division: divisionsType, formatId: string) => {
		setStore((prev) => {
			const overrides = { ...prev.overrides };
			delete overrides[overrideKey(division, formatId)];
			return { ...prev, overrides };
		});
		markDirty();
	};

	const saveCustom = (division: divisionsType, formatId: string, fields: AdminFormatFields) => {
		setStore((prev) => ({
			...prev,
			custom: prev.custom.map((entry) =>
				entry.division === division && entry.id === formatId ? { ...entry, ...fields } : entry,
			),
		}));
		markDirty();
	};

	const deleteCustom = (division: divisionsType, formatId: string) => {
		setStore((prev) => ({
			...prev,
			custom: prev.custom.filter((entry) => !(entry.division === division && entry.id === formatId)),
		}));
		markDirty();
	};

	const addCustom = (division: divisionsType, fields: AdminFormatFields) => {
		setStore((prev) => ({
			...prev,
			custom: [...prev.custom, { id: nextCustomId(division, prev), division, ...fields }],
		}));
		markDirty();
	};

	const handleAddFormat = () => {
		addCustom(newDivision, {
			title: newTitle.trim() || "New format",
			body: newBody,
			govLink: newGovLink.trim(),
		});
		setNewTitle("");
		setNewGovLink("");
		setNewBody("");
		toast.success("Format added. Press Save formats to write it to the file.");
	};

	const handleSave = async () => {
		setSaving(true);
		const result = await saveAdminFormats(store);
		setSaving(false);
		if (result.ok) {
			setDirty(false);
			toast.success("Saved to src/formats/admin.ts");
		} else {
			toast.error(result.error ?? "Could not save the formats.");
		}
	};

	const groups = useMemo(
		() =>
			divisions.map((division) => {
				const formats = [
					...Object.entries(labelsByDivision[division.id]).map(([id, label]) => {
						const override = store.overrides[overrideKey(division.id, id)];
						return {
							id,
							custom: false,
							hasOverride: Boolean(override),
							fields: {
								title: override?.title ?? label,
								body: override?.body ?? "",
								govLink: override?.govLink ?? "",
							},
						};
					}),
					...store.custom
						.filter((entry) => entry.division === division.id)
						.map((entry) => ({
							id: entry.id,
							custom: true,
							hasOverride: true,
							fields: { title: entry.title, body: entry.body, govLink: entry.govLink },
						})),
				];

				return {
					division,
					formats,
					editedCount: formats.filter((format) => format.custom || format.hasOverride).length,
				};
			}),
		[store],
	);

	return (
		<div className="accent-violet flex min-h-dvh flex-col">
			<header className="sticky top-0 z-40 border-b border-subtle bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
				<div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-6 lg:px-8">
					<a href="/" className="flex min-w-0 items-center gap-3">
						<span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-subtle bg-surface shadow-xs">
							<img src="/images/logo.webp" alt="" className="size-7 object-contain" />
						</span>
						<span className="min-w-0">
							<span className="block truncate text-[15px] leading-tight font-semibold text-ink">
								Format admin
							</span>
							<span className="hidden truncate text-[11.5px] text-ink-muted sm:block">
								LSSD Paperwork Tool
							</span>
						</span>
					</a>

					<div className="ml-auto flex items-center gap-1.5">
						<Button
							variant={dirty ? "primary" : "secondary"}
							size="sm"
							disabled={saving || !dirty}
							onClick={() => void handleSave()}
							title="Write the changes to src/formats/admin.ts"
							aria-label="Save formats"
						>
							<Save />
							<span className="hidden sm:inline">{saving ? "Saving…" : "Save formats"}</span>
						</Button>
						<Button
							variant="secondary"
							size="icon-sm"
							onClick={toggleTheme}
							title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
							aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
						>
							{theme === "dark" ? <Sun /> : <Moon />}
						</Button>
						{unlocked ? (
							<Button variant="ghost" size="icon-sm" onClick={lock} title="Lock admin" aria-label="Lock admin">
								<Lock />
							</Button>
						) : null}
					</div>
				</div>
			</header>

			<main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				{!unlocked ? (
					<Panel>
						<PanelBody className="flex flex-col items-center gap-3 py-16 text-center">
							<span className="flex size-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
								<Lock className="size-5" />
							</span>
							<div className="space-y-1">
								<h2 className="text-[15px] font-semibold text-ink">Format admin is locked</h2>
								<p className="max-w-sm text-[12.5px] text-ink-muted">
									Enter the admin password to add and edit formats.
								</p>
							</div>
							<Button variant="primary" size="sm" onClick={() => setGateOpen(true)}>
								Enter password
							</Button>
						</PanelBody>
					</Panel>
				) : (
					<>
						{!import.meta.env.DEV ? (
							<Panel>
								<PanelBody className="text-[12.5px] text-warning">
									You are viewing a production build. Formats can be reviewed here, but saving to the file needs
									the dev server (<code className="font-mono">npm run dev</code>).
								</PanelBody>
							</Panel>
						) : null}

						<Panel>
							<PanelHeader>
								<PanelHeading
									step="?"
									title="Token reference"
									description="Drop these into a body and the app fills them in when the report is generated."
								/>
							</PanelHeader>
							<PanelBody>
								<div className="flex flex-wrap gap-2">
									{templateTokenHints.map((hint) => (
										<span
											key={hint.token}
											title={hint.description}
											className="rounded-md border border-subtle bg-surface-2 px-2 py-1 font-mono text-[11.5px] text-ink-muted"
										>
											{`{{${hint.token}}}`}
										</span>
									))}
								</div>
							</PanelBody>
						</Panel>

						{groups.map(({ division, formats, editedCount }) => {
							const Icon = division.icon;
							const open = Boolean(openDivisions[division.id]);

							return (
								<Panel key={division.id} className="overflow-hidden">
									<h2>
										<button
											type="button"
											onClick={() => toggleDivision(division.id)}
											aria-expanded={open}
											aria-controls={`division-${division.id}`}
											className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors duration-150 hover:bg-surface-2 sm:px-6"
										>
											<span className="flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-accent/12 text-accent ring-1 ring-inset ring-accent/20">
												<Icon className="size-4" />
											</span>
											<span className="min-w-0 flex-1">
												<span className="block truncate text-[15px] leading-6 font-semibold text-ink">
													{division.name}
												</span>
												<span className="block truncate text-[12.5px] text-ink-muted">{division.blurb}</span>
											</span>
											{editedCount > 0 ? (
												<span className="shrink-0 rounded-full border border-accent/25 bg-accent/12 px-2 py-0.5 text-[11.5px] font-medium text-accent">
													{editedCount} edited
												</span>
											) : null}
											<span className="shrink-0 rounded-full border border-subtle bg-surface-2 px-2 py-0.5 text-[11.5px] text-ink-muted">
												{formats.length}
											</span>
											<ChevronDown
												className={cn(
													"size-4 shrink-0 text-ink-faint transition-transform duration-200",
													open && "rotate-180",
												)}
											/>
										</button>
									</h2>

									{open ? (
										<div id={`division-${division.id}`}>
											<PanelBody className="flex flex-col gap-3 border-t border-subtle">
												{formats.map((format) => (									<FormatEditor
										key={`${division.id}/${format.id}:${version}`}
										division={division.id}
										formatId={format.id}
										custom={format.custom}
										fields={format.fields}
										getDefaultBody={() =>
											getFormat({
												formatData: {},
												deputyData: EMPTY_DEPUTY,
												formatId: format.id,
												division: division.id,
											}).format
										}
										onSave={(fields) =>
											format.custom
												? saveCustom(division.id, format.id, fields)
												: saveOverride(division.id, format.id, fields)
											}
										onReset={() => resetOverride(division.id, format.id)}
										onDelete={() => deleteCustom(division.id, format.id)}
									/>
												))}
											</PanelBody>
										</div>
									) : null}
								</Panel>
							);
						})}

						<Panel>
							<PanelHeader>
								<PanelHeading
									icon={Plus}
									title="Add a format"
									description="Creates a new format for the chosen division, saved to the same file."
								/>
							</PanelHeader>
							<PanelBody className="flex flex-col gap-4">
								<Field label="Division" htmlFor="new-format-division">
									<select
										id="new-format-division"
										value={newDivision}
										onChange={(event) => setNewDivision(event.target.value as divisionsType)}
										className={cn(controlFieldClass, "h-11 px-3.5")}
									>
										{divisions.map((division) => (
											<option key={division.id} value={division.id}>
												{division.name}
											</option>
										))}
									</select>
								</Field>

								<Field label="Title" htmlFor="new-format-title">
									<Input
										id="new-format-title"
										value={newTitle}
										onChange={(event) => setNewTitle(event.target.value)}
										placeholder="Shown in the format picker"
									/>
								</Field>

								<Field label="Government website link" htmlFor="new-format-gov">
									<Input
										id="new-format-gov"
										value={newGovLink}
										onChange={(event) => setNewGovLink(event.target.value)}
										placeholder="https://gov.eclipse-rp.net/viewforum.php?f=..."
									/>
								</Field>

								<Field
									label="Body (phpBBcode)"
									htmlFor="new-format-body"
									hint="Use {{tokens}} to pull in form values."
									wide
								>
									<Textarea
										id="new-format-body"
										value={newBody}
										onChange={(event) => setNewBody(event.target.value)}
										placeholder="[divbox=white]…[/divbox]"
										className="min-h-[160px] font-mono text-[12.5px]"
									/>
								</Field>

								<div>
									<Button variant="primary" size="sm" onClick={handleAddFormat}>
										<Plus />
										Add format
									</Button>
								</div>
							</PanelBody>
						</Panel>
					</>
				)}
			</main>

			<PasswordGate
				open={gateOpen}
				onOpenChange={setGateOpen}
				title="Format admin"
				description="Enter the admin password to add and edit the department's response formats."
				configured={configured}
				onSubmit={unlock}
			/>

			<ToastContainer
				position="bottom-right"
				autoClose={2600}
				newestOnTop
				closeOnClick
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default AdminPage;
