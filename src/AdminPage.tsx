import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Lock, Moon, Plus, Save, Sun } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import { BodyVariables } from "@/components/admin/BodyVariables";
import { FormatEditor } from "@/components/admin/FormatEditor";
import { PasswordGate } from "@/components/admin/PasswordGate";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Panel, PanelBody, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { getFormat } from "@/formats";
import { adminFormatStore } from "@/formats/admin";
import type { AdminFormatDraft, AdminFormatFields, AdminFormatStore } from "@/formats/adminTypes";
import { formatCategories } from "@/formats/formatCategories";
import { useTheme } from "@/hooks/useTheme";
import { applyStoreInputs, fetchAdminFormats, overrideKey, saveAdminFormats } from "@/lib/adminFormats";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { insertTokenAtCaret } from "@/lib/bodyInsert";
import { divisions } from "@/lib/divisions";
import { formatFieldsFor, labelsByDivision } from "@/lib/formats";
import { renderTitleTemplate, titleTemplates } from "@/lib/formatTitles";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import {
	normaliseInput,
	TYPE_LABELS,
	type CatalogueInput,
	type FieldType,
} from "@/lib/inputDefinitions";
import type { DeputyData, FormatData, FormatFieldPick, divisionsType } from "@/types";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
// Persisted in localStorage (like the supervisory unlock on the main page), so
// the password only has to be entered once per device.
const GATE_KEY = "adminUnlocked";

/** An empty profile, so the built-in output shows its own placeholders. */
const EMPTY_DEPUTY: DeputyData = {
	name: "",
	badgeNumber: "",
	signature: "",
	dRank: "",
	divisionRanks: { RED: "", TSD: "", ATD: "", General: "", Supervisory: "", FTB: "", SEB: "" },
};

const loadUnlocked = () => {
	try {
		return localStorage.getItem(GATE_KEY) === "true";
	} catch {
		return false;
	}
};

const cloneStore = (store: AdminFormatStore): AdminFormatStore => ({
	overrides: { ...store.overrides },
	custom: store.custom.map((entry) => ({ ...entry })),
	inputs: [...(store.inputs ?? [])],
});

/**
 * Folds one card's on-screen values into the store the save writes: into the
 * format itself when it was created here, into its override when it is built in,
 * with the same "an empty topic title keeps the built-in one" rule the card-level
 * saves use.
 */
const withDraft = (
	current: AdminFormatStore,
	division: divisionsType,
	formatId: string,
	fields: AdminFormatFields,
): AdminFormatStore => {
	if (current.custom.some((entry) => entry.division === division && entry.id === formatId)) {
		return {
			...current,
			custom: current.custom.map((entry) =>
				entry.division === division && entry.id === formatId ? { ...entry, ...fields } : entry,
			),
		};
	}
	const { topicTitle, ...rest } = fields;
	return {
		...current,
		overrides: {
			...current.overrides,
			[overrideKey(division, formatId)]: topicTitle.trim() ? { ...rest, topicTitle } : rest,
		},
	};
};

/**
 * A readable preview of a format's built-in topic title, with the blanks left by
 * its unfilled fields (so no placeholder syntax ever reaches the /admin UI).
 */
const builtInTitlePreview = (division: divisionsType, formatId: string): string =>
	renderTitleTemplate(titleTemplates[division]?.[formatId] ?? "", {
		formatData: {},
		deputyData: EMPTY_DEPUTY,
		division,
	});

/** The inputs a format asks for before /admin gives it any: its built-in defaults. */
const defaultPicks = (division: divisionsType, formatId: string): FormatFieldPick[] =>
	formatFieldsFor(division, formatId).map((field) => ({ name: field.name }));

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
	const [newTopicTitle, setNewTopicTitle] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newGovLink, setNewGovLink] = useState("");
	const [newBody, setNewBody] = useState("");
	const newBodyRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		let active = true;			void fetchAdminFormats().then((next) => {
				if (!active) return;
				applyStoreInputs(next);
				setStore(cloneStore(next));
			});
		return () => {
			active = false;
		};
	}, []);

	/**
	 * Marks the store as changed. The version bump remounts the format cards so
	 * they re-read the store; a card persisting its own draft (create/delete of a
	 * field from its pickers) skips it — its local state already matches what was
	 * just saved, and remounting would throw away the open picker mid-use.
	 */
	const markDirty = useCallback((opts?: { skipRemount?: boolean }) => {
		if (!opts?.skipRemount) setVersion((value) => value + 1);
		setDirty(true);
	}, []);

	/**
	 * Every saved format that mentions a field: in its picks, or asked for by its
	 * body's `{{tokens}}`. The delete guard in the pickers is built on this.
	 */
	const usedNamesFor = (current: AdminFormatStore): Map<string, string[]> => {
		const used = new Map<string, string[]>();
		const note = (name: string, format: string) => {
			const list = used.get(name) ?? [];
			if (!list.includes(format)) list.push(format);
			used.set(name, list);
		};
		const profile = new Set(profileTokens.map((token) => token.token));
		for (const override of Object.values(current.overrides)) {
			for (const pick of override.fields ?? []) note(pick.name, override.title || "a format");
			for (const token of bodyTokens(override.body ?? "")) {
				if (!profile.has(token)) note(token, override.title || "a format");
			}
		}
		for (const custom of current.custom) {
			for (const pick of custom.fields ?? []) note(pick.name, custom.title || "a format");
			for (const token of bodyTokens(custom.body)) {
				if (!profile.has(token)) note(token, custom.title || "a format");
			}
		}
		return used;
	};

	// Both derived once per store change, for the guards below.
	const usedNames = useMemo(() => usedNamesFor(store), [store]);
	const deletableNames = useMemo(
		() => new Set((store.inputs ?? []).map((entry) => entry.name)),
		[store],
	);

	/**
	 * The open cards' readers, keyed "DIVISION/formatId". A card registers one
	 * reader and unregisters when it unmounts, so a collapsed division drops out.
	 */
	/** A card's first edit is what makes the page's Save formats button live. */
	const noteDirty = useCallback(() => setDirty(true), []);

	const drafts = useRef(new Map<string, () => AdminFormatDraft | null>());
	const registerDraft = useCallback((key: string, read: () => AdminFormatDraft | null) => {
		drafts.current.set(key, read);
		return () => {
			if (drafts.current.get(key) === read) drafts.current.delete(key);
		};
	}, []);

	const toggleDivision = (division: divisionsType) =>
		setOpenDivisions((prev) => ({ ...prev, [division]: !prev[division] }));

	const unlock = (password: string) => {
		if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return false;
		setUnlocked(true);
		try {
			localStorage.setItem(GATE_KEY, "true");
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
			localStorage.removeItem(GATE_KEY);
		} catch {
			/* ignore */
		}
	};

	const saveOverride = (
		division: divisionsType,
		formatId: string,
		fields: AdminFormatFields,
		opts?: { skipRemount?: boolean },
	) => {
		// An empty title means "keep the built-in one", so it is left out of the
		// override entirely rather than written as an empty string.
		const { topicTitle, ...rest } = fields;
		setStore((prev) => ({
			...prev,
			overrides: {
				...prev.overrides,
				[overrideKey(division, formatId)]: topicTitle.trim() ? { ...rest, topicTitle } : rest,
			},
		}));
		markDirty(opts);
	};

	const resetOverride = (division: divisionsType, formatId: string) => {
		setStore((prev) => {
			const overrides = { ...prev.overrides };
			delete overrides[overrideKey(division, formatId)];
			return { ...prev, overrides };
		});
		markDirty();
	};

	const saveCustom = (
		division: divisionsType,
		formatId: string,
		fields: AdminFormatFields,
		opts?: { skipRemount?: boolean },
	) => {
		setStore((prev) => ({
			...prev,
			custom: prev.custom.map((entry) =>
				entry.division === division && entry.id === formatId ? { ...entry, ...fields } : entry,
			),
		}));
		markDirty(opts);
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

	/**
	 * Adds a brand-new field to the shared catalogue. Deliberately does not bump
	 * the remount version, so a format being edited keeps its unsaved state; the
	 * pickers re-render from the live catalogue instead.
	 *
	 * A name that already exists is never duplicated: when a clash is confirmed
	 * the picker hands back the existing definition, and this just uses it.
	 */
	const createInput = (input: CatalogueInput) => {
		if (catalogueInputFor(input.name)) {
			toast.info(`A field named {{${input.name}}} already exists — using that one.`);
			return;
		}
		// The live catalogue has to know about the new field *before* React
		// re-renders, or the pickers render a token with no definition. The
		// registry is therefore updated here, not inside the state updater — a
		// side effect there would also run twice under StrictMode.
		const next: AdminFormatStore = { ...store, inputs: [...(store.inputs ?? []), input] };
		applyStoreInputs(next);
		setStore(next);
		setDirty(true);
		toast.success(`Field {{${input.name}}} created — press Save formats to keep it.`);
	};

	/**
	 * Keeps a token that was renamed in a format's body answering to a field. An
	 * existing field is used as it stands; a genuinely new name is added to the
	 * catalogue carrying the wording of the field it replaced, so a body never
	 * goes on asking for something nothing can fill.
	 */
	const renameInput = (from: string, to: string) => {
		if (catalogueInputFor(to)) return;
		const source = catalogueInputFor(from);
		const replacement = normaliseInput(source ? { ...source, name: to } : { name: to, type: "text", label: to });
		if (!replacement) {
			toast.error(`“${to}” is not a usable field name.`);
			return;
		}
		createInput(replacement);
	};

	/**
	 * Removes an admin-created field from the catalogue. Built-in fields are not
	 * deletable — the pickers simply don't offer it — so anything reaching here is
	 * in the store's `inputs`. A field still used by a saved format is refused:
	 * deleting it would leave that format asking for something nobody can fill.
	 */
	const deleteInput = (input: CatalogueInput) => {
		const usedBy = usedNames.get(input.name);
		if (usedBy?.length) {
			toast.error(
				`{{${input.name}}} is still used by ${usedBy.join(", ")} — remove it from there first.`,
			);
			return;
		}
		const next: AdminFormatStore = {
			...store,
			inputs: (store.inputs ?? []).filter((entry) => entry.name !== input.name),
		};
		applyStoreInputs(next);
		setStore(next);
		setDirty(true);
		toast.success(`Field {{${input.name}}} deleted — press Save formats to keep that.`);
	};

	/**
	 * Rewrites an admin-created field's own definition, keeping its token name.
	 * The catalogue owns a field's type, so the change reaches every format that
	 * asks for the field at once; built-ins are not touched this way, since their
	 * definitions live in the source tree.
	 */
	const updateInput = (input: CatalogueInput) => {
		const index = (store.inputs ?? []).findIndex((entry) => entry.name === input.name);
		if (index === -1) {
			toast.error(`{{${input.name}}} ships with the tool — its definition cannot be changed here.`);
			return;
		}
		const normalised = normaliseInput(input);
		if (!normalised) {
			toast.error("Those settings do not make a usable field.");
			return;
		}
		const next: AdminFormatStore = {
			...store,
			inputs: (store.inputs ?? []).map((entry, i) => (i === index ? normalised : entry)),
		};
		applyStoreInputs(next);
		setStore(next);
		setDirty(true);
		toast.success(
			`{{${normalised.name}}} is now a ${TYPE_LABELS[normalised.type]} — press Save formats to keep it.`,
		);
	};

	/** Switches one field's type, leaving the rest of its definition alone. */
	const updateInputType = (name: string, type: FieldType) => {
		const entry = (store.inputs ?? []).find((input) => input.name === name);
		if (!entry) {
			toast.error(`{{${name}}} ships with the tool — its type cannot be changed.`);
			return;
		}
		updateInput({ ...entry, type });
		if (type === "select" && !entry.options?.length) {
			toast.info("A dropdown needs options — add them with the field's edit pencil.");
		}
		if (type === "check" && !entry.items?.length) {
			toast.info("A checklist needs items — add them with the field's edit pencil.");
		}
	};

	/**
	 * Whether a field can be deleted from the catalogue right now. Only fields
	 * created at /admin can be — built-ins are part of the source tree. A saved
	 * format still asking for the field blocks deletion; unsaved local usage is
	 * checked by the format cards themselves, which know their draft state.
	 *
	 * Worked out once per store: the pickers ask this for every row they draw, and
	 * each answer used to re-read every format and every body in the store.
	 */
	const deleteGuardFor = useCallback(
		(name: string): { ok: boolean; reason?: string } => {
			if (!catalogueInputFor(name)) return { ok: false };
			if (!deletableNames.has(name)) {
				return { ok: false, reason: "Built-in field — it ships with the tool and cannot be deleted." };
			}
			const usedBy = usedNames.get(name);
			if (usedBy?.length) {
				return { ok: false, reason: `Still used by ${usedBy.join(", ")} — remove it from there first.` };
			}
			return { ok: true };
		},
		[deletableNames, usedNames],
	);

	/**
	 * Which fields can have their own definition edited. Built-ins ship theirs, so
	 * only fields created at /admin offer it.
	 */
	const editGuardFor = useCallback(
		(name: string): { ok: boolean; reason?: string } =>
			deletableNames.has(name)
				? { ok: true }
				: {
						ok: false,
						reason: "Built-in field — its type ships with the tool. Word it differently per format instead.",
					},
		[deletableNames],
	);

	/** The new-format picker's guard, which also sees the draft body's tokens. */
	const newFormatGuard = (name: string): { ok: boolean; reason?: string } => {
		const base = deleteGuardFor(name);
		if (!base.ok) return base;
		if (newBody.includes(`{{${name}}}`)) {
			return { ok: false, reason: "The new format's draft body still uses it." };
		}
		return { ok: true };
	};

	/** Inserts a token into the new-format body at the caret. */
	const insertNewBodyToken = (token: string) =>
		setNewBody((previous) => insertTokenAtCaret(newBodyRef.current, token, previous));

	const handleAddFormat = () => {
		addCustom(newDivision, {
			title: newTitle.trim() || "New format",
			topicTitle: newTopicTitle.trim(),
			body: newBody,
			govLink: newGovLink.trim(),
			category: newCategory.trim(),
			// A format with a body takes its fields from that body's tokens; this list
			// is where their wording and their order go once either is edited.
			fields: [],
		});
		setNewTitle("");
		setNewTopicTitle("");
		setNewCategory("");
		setNewGovLink("");
		setNewBody("");
		toast.success("Format added. Press Save formats to write it to the file.");
	};

	/**
	 * Writes the page, not the store: every mounted card hands over its on-screen
	 * values here, so a card needs no save button of its own and a keystroke typed
	 * a moment before this click is still included.
	 */
	const handleSave = async () => {
		const next = Array.from(drafts.current.values()).reduce((current, read) => {
			const draft = read();
			return draft ? withDraft(current, draft.division, draft.formatId, draft.fields) : current;
		}, store);
		setSaving(true);
		const result = await saveAdminFormats(next);
		setSaving(false);
		if (result.ok) {
			// The store catches up with what was written, which also clears the
			// cards' unsaved markers.
			setStore(next);
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
						const picks = override?.fields ?? defaultPicks(division.id, id);
						return {
							id,
							custom: false,
							picks,
							fields: {
								title: override?.title ?? label,
								// Only the /admin override is edited here; empty keeps the built-in.
								topicTitle: override?.topicTitle ?? "",
								body: override?.body ?? "",
								govLink: override?.govLink ?? "",
								category: override?.category ?? formatCategories[division.id]?.[id] ?? "",
								fields: picks,
							},
							defaultTopicTitle: builtInTitlePreview(division.id, id),
						};
					}),
					...store.custom
						.filter((entry) => entry.division === division.id)
						.map((entry) => {
							const picks = entry.fields ?? [];
							return {
								id: entry.id,
								custom: true,
								picks,
								fields: {
									title: entry.title,
									topicTitle: entry.topicTitle ?? "",
									body: entry.body,
									govLink: entry.govLink,
									category: entry.category ?? "",
									fields: picks,
								},
								defaultTopicTitle: "",
							};
						}),
				];

				return { division, formats };
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

								<Field
									label="Government website title"
									htmlFor="new-format-topic-title"
									hint="The post title used on the government website. Anything in curly braces is a reminder to the person filling the format in to replace that part, e.g. “Promotion notice {deputy name}”."
								>
									<Input
										id="new-format-topic-title"
										value={newTopicTitle}
										onChange={(event) => setNewTopicTitle(event.target.value)}
										placeholder="e.g. Promotion notice {deputy name}"
									/>
								</Field>

								<Field label="Category" htmlFor="new-format-category">
									<Input
										id="new-format-category"
										value={newCategory}
										onChange={(event) => setNewCategory(event.target.value)}
										placeholder="Heading it is grouped under in the picker"
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
									hint="The body this format posts to the government website. Wrap any part in double braces to fill it from a field."
									wide
								>
									<Textarea
										id="new-format-body"
										ref={newBodyRef}
										value={newBody}
										onChange={(event) => setNewBody(event.target.value)}
										placeholder="[divbox=white]…[/divbox]"
										className="min-h-[160px] font-mono text-[12.5px]"
									/>
								</Field>

								<BodyVariables
									body={newBody}
									onInsert={insertNewBodyToken}
									onCreate={createInput}
									onDelete={deleteInput}
									deleteGuard={newFormatGuard}
									onEditField={updateInput}
									fieldGuard={editGuardFor}
								/>

								<div>
									<Button variant="primary" size="sm" onClick={handleAddFormat}>
										<Plus />
										Add format
									</Button>
								</div>
							</PanelBody>
						</Panel>

						{groups.map(({ division, formats }) => {
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
										renderBody={(formatData: FormatData, deputyData: DeputyData) =>
											getFormat({
												formatData,
												deputyData,
												formatId: format.id,
												division: division.id,
											}).format
										}
										defaultDeputy={EMPTY_DEPUTY}
										initialPicks={format.picks}
									onCreate={createInput}
									onDeleteField={deleteInput}
									onRenameField={renameInput}
									registerDraft={registerDraft}
									onDirty={noteDirty}
									onUpdateField={updateInput}
									onUpdateFieldType={updateInputType}
									deleteGuard={deleteGuardFor}
									fieldGuard={editGuardFor}
										defaultTopicTitle={format.defaultTopicTitle}
										onSave={(fields, opts) =>
											format.custom
												? saveCustom(division.id, format.id, fields, opts)
												: saveOverride(division.id, format.id, fields, opts)
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
