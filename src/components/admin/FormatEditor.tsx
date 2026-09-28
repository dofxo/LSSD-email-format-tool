import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, RotateCcw, Tag, Trash2 } from "lucide-react";

import { BodyVariables } from "@/components/admin/BodyVariables";
import { FormatFieldsEditor } from "@/components/admin/FormatFieldsEditor";
import { TokenTextarea } from "@/components/admin/TokenTextarea";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { autoTokenizeBody } from "@/lib/autoTokenize";
import { insertTokenAtCaret, removeTokenFromBody, renameTokenInBody } from "@/lib/bodyInsert";
import { formatsForDivision } from "@/lib/formats";
import { bodyTokens } from "@/lib/formatTemplates";
import { cn } from "@/lib/utils";
import type { AdminFormatDraft, AdminFormatFields } from "@/formats/adminTypes";
import type { CatalogueInput, FieldType } from "@/lib/inputDefinitions";
import type {
	DeputyData,
	FormatData,
	FormatFieldPick,
	FormatInputField,
	GroupSubField,
	divisionsType,
} from "@/types";

/** Turns a pick into the field a form renders, using the catalogue for everything but wording. */
const resolvePick = (pick: FormatFieldPick): FormatInputField | null => {
	const definition = catalogueInputFor(pick.name);
	if (!definition) return null;
	const { label, ...rest } = definition;
	return {
		name: pick.name,
		label: pick.label?.trim() || label,
		hint: pick.hint?.trim() || definition.hint,
		formats: [],
		...rest,
	};
};

interface FormatEditorProps {
	division: divisionsType;
	formatId: string;
	/** Added formats can be deleted; built-in ones can be reset to default. */
	custom: boolean;
	fields: AdminFormatFields;
	/** Readable preview of the title this format uses when none is set here. */
	defaultTopicTitle?: string;
	/** Builds the format's own output for any set of values. */
	renderBody: (formatData: FormatData, deputyData: DeputyData) => string;
	/** The blank profile the format's output is rendered with in this editor. */
	defaultDeputy: DeputyData;
	/** The inputs this format asks for: catalogue names plus any wording overrides. */
	initialPicks: FormatFieldPick[];
	/** Creates a brand-new catalogue input, available to every format. */
	onCreate: (input: CatalogueInput) => void;
	/** Deletes an admin-created catalogue field; row-level guards decide which rows show the affordance. */
	onDeleteField?: (input: CatalogueInput) => void;
	/** Which fields are deletable, with the reason shown on hover when not. */
	deleteGuard?: (name: string) => { ok: boolean; reason?: string };
	/**
	 * Offers this card's on-screen values to the page, which folds them into the
	 * store when the one Save formats button writes the file. Returning the
	 * unregister function lets a collapsed card drop out again.
	 */
	registerDraft?: (
		key: string,
		read: () => AdminFormatDraft | null,
	) => () => void;
	/**
	 * Called once when this card starts holding edits, so the page's Save formats
	 * button lights up — it is the only way to save now, and a card has no button
	 * of its own to announce itself with.
	 */
	onDirty?: () => void;
	/** Makes sure a body token renamed here answers to a field. */
	onRenameField?: (from: string, to: string) => void;
	/** Rewrites an admin-created field's own definition (type, wording, choices). */
	onUpdateField?: (input: CatalogueInput) => void;
	/** Switches one field's type, everywhere it is used. */
	onUpdateFieldType?: (name: string, type: FieldType) => void;
	/** Rewrites a checkbox field's choices, everywhere it is used. */
	onUpdateFieldItems?: (name: string, items: string[]) => void;
	/** Rewrites a repeating group's answers, everywhere it is used. */
	onUpdateFieldSubFields?: (name: string, subFields: GroupSubField[]) => void;
	/** Rewrites the block a repeating group prints, once per entry. */
	onUpdateFieldTemplate?: (name: string, template: string) => void;
	/** Which fields may have their definition changed; built-ins keep a plain badge. */
	fieldGuard?: (name: string) => { ok: boolean; reason?: string };
	onSave: (fields: AdminFormatFields, opts?: { skipRemount?: boolean }) => void;
	onReset: () => void;
	onDelete: () => void;
}

/** One editable format, folded by default: id, title and category on the row,
 *  the editor fields only when expanded. */
export function FormatEditor({
	division,
	formatId,
	custom,
	fields,
	defaultTopicTitle = "",
	renderBody,
	defaultDeputy,
	initialPicks,
	onCreate,
	onDeleteField,
	deleteGuard,
	registerDraft,
	onDirty,
	onRenameField,
	onUpdateField,
	onUpdateFieldType,
	onUpdateFieldItems,
	onUpdateFieldSubFields,
	onUpdateFieldTemplate,
	fieldGuard,
	onSave,
	onReset,
	onDelete,
}: FormatEditorProps) {
	const [title, setTitle] = useState(fields.title);
	const [topicTitle, setTopicTitle] = useState(fields.topicTitle);
	const [category, setCategory] = useState(fields.category);
	const [govLink, setGovLink] = useState(fields.govLink);
	const [body, setBody] = useState(fields.body);
	const [picks, setPicks] = useState<FormatFieldPick[]>(initialPicks);
	const bodyRef = useRef<HTMLTextAreaElement | null>(null);
	const [bodyOpen, setBodyOpen] = useState(fields.body.trim().length > 0);
	const [bodyEdited, setBodyEdited] = useState(false);
	const [confirming, setConfirming] = useState(false);
	// Cards start folded; a brand-new custom format starts open so it can be filled in.
	const [open, setOpen] = useState(() => custom && fields.body.trim().length === 0);

	const hasOverride = fields.body.trim().length > 0;
	// A format with a body of its own takes its inputs from that body's tokens; the
	// rest still run a built-in generator, so their inputs are picked explicitly.
	const ownBody = hasOverride;
	const picksChanged = JSON.stringify(picks) !== JSON.stringify(initialPicks);
	const bodyChanged = body !== fields.body;
	const dirty =
		title !== fields.title ||
		topicTitle.trim() !== fields.topicTitle.trim() ||
		category !== fields.category ||
		govLink !== fields.govLink ||
		bodyChanged ||
		picksChanged;

	/**
	 * What this card would hand the save. Held in a ref so the registration below
	 * happens once rather than on every keystroke, and undefined while the card
	 * matches the store — an untouched card asks for nothing, so opening a
	 * division never turns its formats into overrides.
	 */
	const draftRef = useRef<AdminFormatDraft | null>(null);
	draftRef.current = dirty
		? {
				division,
				formatId,
				fields: {
					title,
					topicTitle,
					body: bodyEdited ? body : fields.body,
					govLink,
					category,
					// Every field is kept, wording or not: the list is what orders a
					// body-driven format's form.
					fields: picks,
				},
			}
		: null;
	useEffect(() => {
		if (!registerDraft) return;
		return registerDraft(`${division}/${formatId}`, () => draftRef.current);
	}, [registerDraft, division, formatId]);

	useEffect(() => {
		if (dirty) onDirty?.();
	}, [dirty, onDirty]);
	const fieldId = `${division}-${formatId}`;

	// Headings already used in this division, so categories stay consistent.
	const categoryOptions = [
		...new Set(
			formatsForDivision(division)
				.map((option) => option.category?.trim())
				.filter((value): value is string => Boolean(value)),
		),
	];

	// What this format prints right now, with every value blank. It is what the
	// body editor loads, and what the automatic matching works against.
	const generated = useMemo(() => {
		try {
			return renderBody({}, defaultDeputy);
		} catch {
			return "";
		}
	}, [renderBody, defaultDeputy]);

	// The chips the body editor offers: the fields this format asks for, in the
	// order it asks for them, plus anything its body prints that the field list
	// has not caught up with. Nothing from the rest of the catalogue is here —
	// the picker is what reaches those.
	const fieldChips = useMemo(() => {
		const listed = picks.map((pick) => ({ name: pick.name, label: pick.label }));
		const printed = bodyTokens(body)
			.filter((token) => !picks.some((pick) => pick.name === token))
			.map((token) => ({ name: token }));
		return [...listed, ...printed];
	}, [picks, body]);

	const toggleBody = () => {
		// First open of an untouched built-in format loads what it generates
		// today, so it can be edited in place without retyping it.
		if (!bodyOpen && !hasOverride && !bodyEdited) setBody(generated);
		setBodyOpen((value) => !value);
	};

	// Drops {{token}} in at the caret, replacing whatever is selected. Selecting a
	// literal value in a loaded body and clicking its input is how a generated
	// body becomes a template.
	const insertToken = (token: string) => {
		setBody((previous) => insertTokenAtCaret(bodyRef.current, token, previous));
		setBodyEdited(true);
	};

	// Takes a field off this format: its {{token}} comes back out of the body and
	// the field leaves the list, so the row disappears and the spot reverts to
	// plain text. Both halves are written here rather than read back from state,
	// so the save carries exactly this edit even though React has not re-rendered
	// yet.
	const removeTokenAndPersist = (token: string) => {
		const nextBody = removeTokenFromBody(bodyRef.current?.value ?? body, token);
		const nextPicks = picksRef.current.filter((pick) => pick.name !== token);
		setBody(nextBody);
		setBodyEdited(true);
		setPicks(nextPicks);
		onSave(
			{
				title,
				topicTitle,
				body: nextBody,
				govLink,
				category,
				fields: nextPicks,
			},
			{ skipRemount: true },
		);
	};

	// Puts a field the body no longer prints back into it, at the caret — the one
	// step between a field kept by this format and a field its output shows. The
	// body editor is opened with it, so the token lands somewhere visible.
	const restoreTokenAndPersist = (name: string) => {
		const nextBody = insertTokenAtCaret(bodyRef.current, name, bodyValueRef.current);
		setBody(nextBody);
		setBodyEdited(true);
		setBodyOpen(true);
		onSave(
			{
				title,
				topicTitle,
				body: nextBody,
				govLink,
				category,
				fields: picksRef.current,
			},
			{ skipRemount: true },
		);
	};

	// The body as it is right now, so a persist below never re-saves what the
	// state was before the very edit it is meant to keep.
	const bodyValueRef = useRef(body);
	useEffect(() => {
		bodyValueRef.current = body;
	});

	// The picks as they are right now, so the create-and-persist below can read
	// them without depending on a stale closure.
	const picksRef = useRef(picks);
	useEffect(() => {
		picksRef.current = picks;
	});
	// A field created from one of this card's pickers is wired up locally a
	// moment later — the token lands in the body, or the pick in the list — while
	// the create toast points at the page-wide "Save formats" rather than this
	// card's own button. Persisting the wiring here keeps that save from keeping
	// the field but silently dropping the token that connects it.
	const createAndPersist = (input: CatalogueInput) => {
		onCreate(input);
		// Creating a field adds it to this format, and to nothing else: its
		// `{{token}}` is not typed into the body, so writing the question is not
		// disturbed and a text edit can never be what removes a field. A format
		// with a body of its own lists the new field as kept-but-not-printed, ready
		// to be placed; a format that picks its fields lists it like any other.
		const nextPicks = picksRef.current.some((pick) => pick.name === input.name)
			? picksRef.current
			: [...picksRef.current, { name: input.name }];
		if (nextPicks !== picksRef.current) setPicks(nextPicks);
		setTimeout(() => {
			onSave(
				{
					title,
					topicTitle,
					body: bodyValueRef.current,
					govLink,
					category,
					fields: nextPicks,
				},
				// No remount: the card's local state already matches what was saved,
				// and remounting would throw away the open picker mid-use.
				{ skipRemount: true },
			);
		}, 0);
	};

	// Deletion needs no local wiring — a field comes off the catalogue itself —
	// so these pass straight through to the pickers.
	const deleteAndPersist = (input: CatalogueInput) => {
		onDeleteField?.(input);
		setTimeout(() => {
			onSave(
				{
					title,
					topicTitle,
					body: bodyValueRef.current,
					govLink,
					category,
					fields: picksRef.current,
				},
				{ skipRemount: true },
			);
		}, 0);
	};

	/**
	 * Renames a `{{token}}` in this format's body. The body is what names a
	 * field, so rewriting it is the whole edit; the page is told about the new
	 * name first, so something answers to it before anything re-renders.
	 */
	const renameTokenAndPersist = (from: string, to: string) => {
		const nextBody = renameTokenInBody(bodyValueRef.current, from, to);
		setBody(nextBody);
		setBodyEdited(true);
		onRenameField?.(from, to);
		onSave(
			{
				title,
				topicTitle,
				body: nextBody,
				govLink,
				category,
				fields: picksRef.current,
			},
			{ skipRemount: true },
		);
	};

	// Rewrites the output this format already prints so each value it copies
	// verbatim becomes that input's variable. Refuses anything it cannot prove.
	const matchOutputToInputs = () => {
		const localFields = picks
			.map(resolvePick)
			.filter((field): field is FormatInputField => field !== null);
		const result = autoTokenizeBody({
			base: generated,
			fields: localFields,
			render: renderBody,
			deputy: defaultDeputy,
			division,
		});
		if (result.tokenized.length) {
			setBody(result.body);
			setBodyEdited(true);
		}
		return { tokenized: result.tokenized, skipped: result.skipped, refused: Boolean(result.refused) };
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-subtle bg-surface-2/40">
			<header className="flex flex-wrap items-center gap-2 px-4 py-3">
				<button
					type="button"
					onClick={() => setOpen((value) => !value)}
					aria-expanded={open}
					aria-controls={`${fieldId}-editor`}
					className="group flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-lg text-left"
				>
					<span
						className={cn(
							"flex size-5 shrink-0 items-center justify-center rounded-md border border-subtle bg-surface-2 transition-colors group-hover:border-accent/30 group-hover:text-accent",
							open ? "text-ink-muted" : "text-ink-faint",
						)}
					>
						<ChevronDown
							className={cn("size-3 transition-transform duration-200", !open && "-rotate-90")}
						/>
					</span>
					<span className="shrink-0 rounded-md border border-subtle bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
						{formatId}
					</span>						<span
							title={title || formatId}
							className={cn(
								"min-w-0 truncate text-[13px]",
								title.trim() ? "font-medium text-ink" : "font-normal text-ink-faint",
							)}
						>
							{title.trim() || "Untitled format"}
						</span>
						{/* The heading this format is filed under, so a collapsed row still says
						    where the format lives in the picker. */}
						{category.trim() ? (
							<span
								title={`Filed under “${category.trim()}” in the format picker`}
								className="flex shrink-0 items-center gap-1 rounded-full border border-subtle bg-surface-2 px-2 py-0.5 text-[11px] text-ink-muted"
							>
								<Tag className="size-3 shrink-0 text-ink-faint" />
								<span className="max-w-[9rem] truncate">{category.trim()}</span>
							</span>
						) : null}
					</button>				<div className="ml-auto flex shrink-0 items-center gap-2">
					{dirty ? (
						// No save button here on purpose: the page's one Save formats button
						// writes every card's live values, so this only says the card is
						// holding edits that have not reached the file yet.
						<span
							title="These edits go in with Save formats, at the top of the page"
							className="shrink-0 rounded-full border border-warning/35 bg-warning/10 px-2 py-0.5 text-[11px] text-warning"
						>
							Unsaved
						</span>
					) : null}

					{confirming ? (
						<>
							<span className="text-[12px] text-ink-muted">
								{custom ? "Delete this format?" : "Reset to the built-in version?"}
							</span>
							<Button
								size="sm"
								variant="danger"
								onClick={() => {
									setConfirming(false);
									if (custom) onDelete();
									else onReset();
								}}
							>
								{custom ? "Delete" : "Reset"}
							</Button>
							<Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
								Cancel
							</Button>
						</>
					) : (
						<Button
							size="icon-sm"
							variant="ghost"
							title={custom ? "Delete this format" : "Reset to the built-in format"}
							aria-label={custom ? `Delete ${title || formatId}` : `Reset ${title || formatId}`}
							onClick={() => setConfirming(true)}
						>
							{custom ? <Trash2 /> : <RotateCcw />}
						</Button>
					)}
				</div>
			</header>

			{open ? (
				<div
					id={`${fieldId}-editor`}
					className="flex flex-col gap-4 border-t border-subtle bg-surface-2/20 px-4 py-4"
				>
					<Field label="Title" htmlFor={`title-${fieldId}`}>
						<Input
							id={`title-${fieldId}`}
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							placeholder="Shown in the format picker"
						/>
					</Field>

					<Field
						label="Government website title"
						htmlFor={`topic-title-${fieldId}`}
						wide
						hint={
							<>
								The post title used on the government website. Anything you put in curly braces is a
								reminder to the person filling the format in to replace that part — for example
								“Promotion notice {'{deputy name}'}”.
								{defaultTopicTitle
									? ` Left empty, this format keeps its built-in title: “${defaultTopicTitle}”.`
									: " Left empty, this format asks for no title."}
							</>
						}
					>
						<Input
							id={`topic-title-${fieldId}`}
							value={topicTitle}
							onChange={(event) => setTopicTitle(event.target.value)}
							placeholder={
								defaultTopicTitle
									? "Leave empty to keep the built-in title"
									: "e.g. Promotion notice {deputy name}"
							}
						/>
					</Field>

					<Field
						label="Category"
						htmlFor={`category-${fieldId}`}
						hint="Heading this format is grouped under in the picker. Clear it to use the division default."
					>
						<Input
							id={`category-${fieldId}`}
							list={`categories-format-${fieldId}`}
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							placeholder="e.g. Applications"
						/>
						<datalist id={`categories-format-${fieldId}`}>
							{categoryOptions.map((option) => (
								<option key={option} value={option} />
							))}
						</datalist>
					</Field>

					<Field label="Government website link" htmlFor={`gov-${fieldId}`}>
						<Input
							id={`gov-${fieldId}`}
							value={govLink}
							onChange={(event) => setGovLink(event.target.value)}
							placeholder="https://gov.eclipse-rp.net/viewforum.php?f=..."
						/>
					</Field>

					<div>
						<button
							type="button"
							onClick={toggleBody}
							aria-expanded={bodyOpen}
							aria-controls={`body-${fieldId}`}
							className="flex items-center gap-2 text-[12.5px] font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
						>
							<ChevronDown
								className={cn("size-4 transition-transform duration-200", bodyOpen && "rotate-180")}
							/>
							{bodyOpen ? "Hide body" : "Show body"}
						</button>

						{bodyOpen ? (
							<div className="mt-2 flex flex-col gap-2">
								<TokenTextarea
									id={`body-${fieldId}`}
									ref={bodyRef}
									value={body}
									onChange={(event) => {
										setBody(event.target.value);
										setBodyEdited(true);
									}}
									placeholder="[divbox=white]…[/divbox]"
									className="min-h-[220px] font-mono text-[12.5px]"
								/>

								<p className="text-[12px] leading-relaxed text-ink-faint">
									{hasOverride || bodyEdited ? (
										<>Saving replaces what this format normally generates.</>
									) : (
										<>
											This is the format's current output. Editing it freezes this text as the
											body, or reset to go back to the generated version.
										</>
									)}
								</p>

								<p className="text-[11.5px] text-ink-faint">{body.length} characters</p>

								<BodyVariables
									body={body}
									fields={fieldChips}
									onInsert={insertToken}
									onCreate={createAndPersist}
									onDelete={deleteAndPersist}
									deleteGuard={deleteGuard}
									onEditField={onUpdateField}
									fieldGuard={fieldGuard}
									onAutoTokenize={
										body === generated && generated.trim() ? matchOutputToInputs : undefined
									}
								/>
							</div>
						) : null}
					</div>								<FormatFieldsEditor
									tokenDriven={ownBody}
									body={body}
									picks={picks}
									onChange={setPicks}
									onCreate={createAndPersist}
									onDelete={deleteAndPersist}
									deleteGuard={deleteGuard}
									onRemoveFromBody={removeTokenAndPersist}
									onPutInBody={restoreTokenAndPersist}
									onRenameField={renameTokenAndPersist}									onChangeType={onUpdateFieldType}
									onChangeItems={onUpdateFieldItems}
									onChangeSubFields={onUpdateFieldSubFields}
									onChangeTemplate={onUpdateFieldTemplate}
									fieldGuard={fieldGuard}
								onEditField={onUpdateField}
							/>
				</div>
			) : null}
		</div>
	);
}
