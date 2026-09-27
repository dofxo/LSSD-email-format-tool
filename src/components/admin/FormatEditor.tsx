import { useMemo, useRef, useState } from "react";
import { ChevronDown, RotateCcw, Save, Trash2 } from "lucide-react";

import { BodyVariables } from "@/components/admin/BodyVariables";
import { FormatFieldsEditor } from "@/components/admin/FormatFieldsEditor";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { autoTokenizeBody } from "@/lib/autoTokenize";
import { insertTokenAtCaret } from "@/lib/bodyInsert";
import { formatsForDivision } from "@/lib/formats";
import { cn } from "@/lib/utils";
import type { AdminFormatFields } from "@/formats/adminTypes";
import type { CatalogueInput } from "@/lib/inputDefinitions";
import type { DeputyData, FormatData, FormatFieldPick, FormatInputField, divisionsType } from "@/types";

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
	onSave: (fields: AdminFormatFields) => void;
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
	const dirty =
		title !== fields.title ||
		topicTitle.trim() !== fields.topicTitle.trim() ||
		category !== fields.category ||
		govLink !== fields.govLink ||
		bodyEdited ||
		picksChanged;
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
					</span>
					<span
						title={title || formatId}
						className={cn(
							"min-w-0 truncate text-[13px]",
							title.trim() ? "font-medium text-ink" : "font-normal text-ink-faint",
						)}
					>
						{title.trim() || "Untitled format"}
					</span>
				</button>

				<div className="ml-auto flex shrink-0 items-center gap-2">
					{dirty ? (
						<Button
							size="sm"
							variant="primary"								onClick={() =>
									onSave({
										title,
										topicTitle,
										body: bodyEdited ? body : fields.body,
										govLink,
										category,
										// A body-driven format only needs to keep its wording overrides.
										fields: ownBody ? picks.filter((pick) => pick.label || pick.hint) : picks,
									})
								}
							aria-label={`Save ${title || formatId}`}
						>
							<Save />
							Save
						</Button>
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
								<Textarea
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
									onInsert={insertToken}
									onCreate={onCreate}
									onAutoTokenize={
										body === generated && generated.trim() ? matchOutputToInputs : undefined
									}
								/>
							</div>
						) : null}
					</div>						<FormatFieldsEditor
							tokenDriven={ownBody}
							body={body}
							picks={picks}
							onChange={setPicks}
							onCreate={onCreate}
						/>
				</div>
			) : null}
		</div>
	);
}
