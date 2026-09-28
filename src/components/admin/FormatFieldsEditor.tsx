import { useState } from "react";
import { ArrowDown, ArrowUp, Check, CornerDownLeft, Pencil, Plus, Trash2, TriangleAlert, X } from "lucide-react";
import { copyText } from "@/hooks/useCopy";
import { toast } from "react-toastify";

import { FieldPicker } from "@/components/admin/FieldPicker";
import { Button } from "@/components/ui/button";
import { Field, Input, LabelContent, Textarea } from "@/components/ui/input";
import { catalogueInputFor, isCatalogueField } from "@/data/inputCatalogue";
import { bodyHasRunFor } from "@/lib/checkboxLines";
import {
	FIELD_TYPES,
	GROUP_FIELD_TYPES,
	GROUP_TYPE_LABELS,
	isValidTokenName,
	TYPE_LABELS,
	type FieldType,
} from "@/lib/inputDefinitions";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import { orderTokensByFields } from "@/lib/formats";
import { labelHasImage } from "@/lib/labelText";
import type { CatalogueInput } from "@/lib/inputDefinitions";
import type { FormatFieldPick, GroupFieldType, GroupSubField } from "@/types";

const PROFILE_TOKENS = new Set(profileTokens.map((token) => token.token));

interface FormatFieldsEditorProps {
	/** True when the format prints its own body, so its fields come from its tokens. */
	tokenDriven: boolean;
	/** The body being edited, scanned for tokens when `tokenDriven`. */
	body: string;
	/** The format's fields, in form order: a catalogue name plus optional wording. */
	picks: FormatFieldPick[];
	onChange: (picks: FormatFieldPick[]) => void;
	/** Creates a brand-new catalogue field, available to every format. */
	onCreate: (input: CatalogueInput) => void;
	/** Deletes an admin-created field from the catalogue; row-level guards decide which rows show it. */
	onDelete?: (input: CatalogueInput) => void;
	/** Which fields are deletable, with the reason shown on hover when not. */
	deleteGuard?: (name: string) => { ok: boolean; reason?: string };
	/**
	 * Takes a field off this format — its `{{token}}` comes out of the body and
	 * the field leaves the list (token-driven rows only).
	 */
	onRemoveFromBody?: (name: string) => void;
	/** Puts a kept field's `{{token}}` back into the body at the caret. */
	onPutInBody?: (name: string) => void;
	/**
	 * Renames a `{{token}}` in the body being edited (token-driven rows only).
	 * The caller rewrites the body and makes sure a field answers to the new
	 * name, so the token never points at nothing.
	 */
	onRenameField?: (from: string, to: string) => void;
	/**
	 * Changes a field's type. The type belongs to the shared catalogue rather than
	 * to this format, so the caller rewrites the field itself and every format
	 * asking for it changes with it.
	 */
	onChangeType?: (name: string, type: FieldType) => void;
	/**
	 * Rewrites a checkbox field's choices. They belong to the shared catalogue,
	 * like the type, so every format asking for the field ticks the same list —
	 * and it is the body's own `[cb]` lines the choices name.
	 */
	onChangeItems?: (name: string, items: string[]) => void;
	/**
	 * Rewrites the answers a repeating group asks for, in form order. They belong
	 * to the shared catalogue like the type, so every format using the group asks
	 * the same questions.
	 */
	onChangeSubFields?: (name: string, subFields: GroupSubField[]) => void;
	/**
	 * Rewrites the block a repeating group prints, once per entry: one entry
	 * written with the answers' `{{tokens}}`.
	 */
	onChangeTemplate?: (name: string, template: string) => void;
	/** Which fields may have their own definition changed; the rest keep a plain badge. */
	fieldGuard?: (name: string) => { ok: boolean; reason?: string };
	/** Opens an admin-created field for editing (the picker's pencil uses it). */
	onEditField?: (input: CatalogueInput) => void;
}

/** Replaces (or adds) the wording override for one catalogue field. */
const withWording = (
	picks: FormatFieldPick[],
	name: string,
	patch: Pick<FormatFieldPick, "label" | "hint">,
): FormatFieldPick[] => {
	const exists = picks.some((pick) => pick.name === name);
	const body = exists
		? picks.map((pick) => (pick.name === name ? { ...pick, ...patch } : pick))
		: [...picks, { name, ...patch }];
	// Keep the entry lean: an empty override means "use the catalogue wording".
	return body.map((pick) => ({
		name: pick.name,
		label: pick.label?.trim() ? pick.label : undefined,
		hint: pick.hint?.trim() ? pick.hint : undefined,
	}));
};

/**
 * The fields a single format asks for.
 *
 * It is written in terms of field types and wording, never variable names: each
 * row leads with the type it renders as (Date picker, Single line text, …) and
 * the label and hint are the only things edited here. Adding a field goes
 * through the type-first picker, so a token name is only ever typed once, when
 * a brand-new field is created.
 *
 * A format with a body of its own needs no choice at all — its `{{tokens}}` are
 * the fields, so this edits their wording, their token names and the order the
 * form asks for them in: a row's pencil retypes the `{{token}}` itself, in every
 * place the body uses it, and the arrows order it without touching the body.
 */export function FormatFieldsEditor({ tokenDriven, body, picks, onChange, onCreate, onDelete, deleteGuard,
onRemoveFromBody, onPutInBody, onRenameField, onChangeType, onChangeItems, onChangeSubFields,
onChangeTemplate, fieldGuard, onEditField }: FormatFieldsEditorProps) {
	const tokens = tokenDriven ? [...new Set(bodyTokens(body))] : [];
	// The token currently being retyped, and what has been typed into it.
	const [renaming, setRenaming] = useState<{ from: string; value: string } | null>(null);
	/**
	 * The checkbox lines being edited, by field name. A line that has just been
	 * added holds nothing yet, and a choice with no wording has nothing to print
	 * (nor to tick), so it could never reach the catalogue — it would be dropped on
	 * the way in and the line would vanish as it was added. So the lines on screen
	 * are held here, and only the ones with wording in them are written through.
	 */
	const [itemDrafts, setItemDrafts] = useState<Record<string, string[]>>({});
	const unknown = tokenDriven
		? tokens.filter((token) => !PROFILE_TOKENS.has(token) && !isCatalogueField(token))
		: [];

	// The rows to show: the body's tokens, or the picked fields, in the order the
	// format asks for them — the same order the form uses, so a move made here is
	// still there after a reload.
	//
	// A body-driven format also lists the fields it keeps while the body is not
	// printing them — their `{{token}}` was deleted, or is not written back yet.
	// Both sorts of row go through the same list, so the format's own order is
	// what shows and a field moved above the body's fields stays there; trimming
	// the text is never what quietly removes a field, only the trash is.
	const rows = tokenDriven
		? [
				...new Set([
					...tokens.filter((token) => isCatalogueField(token)),
					...picks.filter((pick) => isCatalogueField(pick.name)).map((pick) => pick.name),
				]),
			]
		: [];
	const names = tokenDriven ? orderTokensByFields(rows, picks) : picks.map((pick) => pick.name);
	const pickByName = new Map(picks.map((pick) => [pick.name, pick]));

	/**
	 * Every row as a field entry, in the order shown. Wording and reordering write
	 * back through this list rather than through `picks`, so a format whose body
	 * names its own fields — which has no stored order until one is given — moves
	 * exactly like a format carrying a picked list. Entries for tokens the body no
	 * longer prints stay on when they carry wording, so re-adding one restores it.
	 */
	const ordered: FormatFieldPick[] = [
		...names.map((name) => pickByName.get(name) ?? { name }),
		...picks.filter((pick) => !names.includes(pick.name) && (pick.label?.trim() || pick.hint?.trim())),
	];

	/**
	 * Writes a wording edit back, dropping it again when all it does is repeat the
	 * catalogue's own wording. The boxes show the wording in force rather than
	 * ghosting it as a placeholder, so this is what keeps "leave it alone" from
	 * turning into a per-format copy of the default.
	 */
	const setWording = (name: string, patch: Pick<FormatFieldPick, "label" | "hint">) => {
		const definition = catalogueInputFor(name);
		const repeatsDefault = (value: string | undefined, fallback: string | undefined) =>
			(value ?? "").trim() === (fallback ?? "").trim();
		onChange(
			withWording(ordered, name, {
				label: repeatsDefault(patch.label, definition?.label) ? undefined : patch.label,
				hint: repeatsDefault(patch.hint, definition?.hint) ? undefined : patch.hint,
			}),
		);
	};

	const addField = (name: string) => {
		if (!name || names.includes(name)) return;
		onChange([...ordered, { name }]);
	};

	// Two rows rendering the same type and wording are impossible to tell apart,
	// so each one says when it has a twin.
	const rowKeys = names.map((name) => {
		const definition = catalogueInputFor(name)!;
		const wording = pickByName.get(name)?.label?.trim() || definition.label;
		return `${definition.type}:${wording.trim().toLowerCase()}`;
	});

	const removeField = (name: string) => onChange(ordered.filter((pick) => pick.name !== name));

	/** The name a pending rename would commit to, or null when it cannot. */
	const renameTarget = (pending: { from: string; value: string }): string | null => {
		const next = pending.value.trim();
		if (!next || next === pending.from || !isValidTokenName(next)) return null;
		if (tokens.includes(next)) return null;
		return next;
	};

	const commitRename = () => {
		if (!renaming) return;
		const next = renameTarget(renaming);
		if (!next) return;
		onRenameField?.(renaming.from, next);
		setRenaming(null);
	};

	const move = (name: string, direction: -1 | 1) => {
		const index = ordered.findIndex((pick) => pick.name === name);
		const target = index + direction;
		if (index === -1 || target < 0 || target >= ordered.length) return;
		const next = [...ordered];
		[next[index], next[target]] = [next[target], next[index]];
		onChange(next);
	};

	/**
	 * Rewrites a checkbox field's lines: what is on screen is kept as typed, and
	 * the choices the catalogue is given are the ones with wording in them.
	 */
	const setChoices = (name: string, next: string[]) => {
		setItemDrafts((prev) => ({ ...prev, [name]: next }));
		onChangeItems?.(
			name,
			next.map((item) => item.trim()).filter(Boolean),
		);
	};

	return (
		<div className="flex flex-col gap-2.5 rounded-2xl border border-subtle bg-surface-2/40 p-3.5">
			<div className="flex flex-col gap-1">
				<span className="text-[12.5px] font-medium text-ink">Fields</span>				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					{tokenDriven ? (						<>This format has its own body, so its fields are the ones that body asks for — {names.length}{" "}
							of them. Add one from the body editor above, rename its <code className="font-mono">{'{{token}}'}</code>{" "}											with the pencil, or take it off the format with the trash. A field the body stops
											printing stays on this list until you remove it, so nothing has to be re-made after an
											edit — put its token back with one click. Move a field with the arrows to
											say which one the form asks for first — the body above is left alone. Edit a label or
											hint to word a field differently for this format. A field's type is shared, so its
											badge is a menu — changing it changes that field everywhere it is asked for.</>
					) : (
						<>
							The fields this format's form asks for, in order. Each one is a field type with its own
							wording — pick a type below, and edit the label or hint to word it for this format alone.
							A field's type is shared, so its badge is a menu — changing it changes that field
							everywhere it is asked for.
						</>
					)}
				</p>
			</div>

			{unknown.length ? (
				<div className="flex items-start gap-2 rounded-xl border border-warning/35 bg-warning/10 px-3 py-2 text-[11.5px] leading-relaxed text-warning">
					<TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
					<span>
						The body asks for {unknown.length} field{unknown.length === 1 ? "" : "s"} nothing can fill —
						nothing in the catalogue answers {unknown.map((token) => `{{${token}}}`).join(", ")}, so{" "}
						{unknown.length === 1 ? "it" : "they"} will render blank.
					</span>
				</div>
			) : null}

			{names.length === 0 ? (
				<p className="rounded-xl border border-dashed border-strong/70 bg-surface-2/50 px-4 py-5 text-center text-[12px] text-ink-muted">
					{tokenDriven
						? "No fields yet — add a {{token}} to the body and it will show up here."
						: "This format asks for nothing. Add a field below, or leave it as a copy-only format."}
				</p>
			) : null}

			<div className="flex flex-col gap-2">
				{names.map((name, position) => {
					const definition = catalogueInputFor(name)!;
					const pick = pickByName.get(name);
					const typeVerdict = fieldGuard ? fieldGuard(name) : { ok: false };
					// A field the body no longer prints: kept by the format, doing nothing
					// in the output until its token is put back.
					const printed = !tokenDriven || tokens.includes(name);
					// The wording in force here, which the label box edits in place and the
					// picture below it is drawn from.
					const label = pick?.label ?? definition.label;
					// A checkbox can print without a token: its choices name a block of the
					// body's own `[cb]` lines, and its ticks flip those lines in place.
					const storedChoices = definition.items ?? [];
					// What is on screen: the lines being edited, or the stored ones until the
					// first edit of this field.
					const choices = itemDrafts[name] ?? storedChoices;
					// The body is matched against the stored choices, since those are what the
					// renderer prints — a line still being typed is not a choice yet.
					const bindsRun =
						definition.type === "checkbox" && storedChoices.length > 0
							? bodyHasRunFor(body, storedChoices)
							: false;
					return (							<div key={name} className="rounded-xl border border-subtle bg-surface/60 p-2.5">
								<div className="flex items-center gap-2">
									{onChangeType && typeVerdict.ok ? (
										<select
											value={definition.type}
											aria-label={`Type of ${name}`}
											title={`How ${name} renders, everywhere it is used — changing it here changes it for every format`}
											onChange={(event) => onChangeType(name, event.target.value as FieldType)}
											className="shrink-0 cursor-pointer rounded-full border border-subtle bg-surface-2 py-0.5 pl-2 pr-1 text-[11px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
										>
											{FIELD_TYPES.map((option) => (
												<option key={option} value={option}>
													{TYPE_LABELS[option]}
												</option>
											))}
										</select>
									) : (
										<span
											title={
												fieldGuard && typeVerdict.reason
													? typeVerdict.reason
													: TYPE_LABELS[definition.type]
											}
											className="shrink-0 rounded-full border border-subtle bg-surface-2 px-2 py-0.5 text-[11px] text-ink-muted"
										>
											{TYPE_LABELS[definition.type]}
										</span>
									)}
									{renaming?.from === name ? (
										<>
											<Input
												autoFocus
												value={renaming.value}
												aria-label={`Rename the {{${name}}} token`}
												onChange={(event) => setRenaming({ from: name, value: event.target.value })}
												onKeyDown={(event) => {
													if (event.key === "Enter") {
														event.preventDefault();
														commitRename();
													}
													if (event.key === "Escape") setRenaming(null);
												}}
												className="h-7 w-40 font-mono text-[11.5px]"
											/>
											<Button
												size="icon-sm"
												variant="ghost"
												title={`Rename to {{${renaming.value.trim()}}}`}
												aria-label={`Rename ${name} to ${renaming.value.trim() || "…"}`}
												disabled={!renameTarget(renaming)}
												onClick={commitRename}
											>
												<Check />
											</Button>
											<Button
												size="icon-sm"
												variant="ghost"
												title="Cancel"
												aria-label={`Stop renaming ${name}`}
												onClick={() => setRenaming(null)}
											>
												<X />
											</Button>
										</>
									) : (
										<>
											<button
												type="button"
												title={`The body fills this in as {{${name}}} — click to copy`}
												aria-label={`Copy token ${name}`}
												onClick={() => {
													void copyText(`{{${name}}}`);
													toast.info(`Copied {{${name}}} — paste it anywhere in the body`);
												}}
												className="shrink-0 cursor-pointer rounded-full border border-subtle bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
											>
												{`{{${name}}}`}
											</button>
											{onRenameField ? (
												<Button
													size="icon-sm"
													variant="ghost"
													title={`Rename the {{${name}}} token — every place the body uses it follows`}
													aria-label={`Rename the ${name} token`}
													onClick={() => setRenaming({ from: name, value: name })}
												>
													<Pencil />
												</Button>
											) : null}
										</>
									)}
								{!printed && bindsRun ? (
									<span
										className="flex min-w-0 flex-1 items-center gap-1 text-[11px] text-success"
										title="This field ticks the body's own [cb] lines, so it needs no token"
									>
										<Check className="size-3.5 shrink-0" />
										<span className="truncate">Ticks the checkbox lines in the body</span>
									</span>
								) : !printed ? (
									<span
										className="flex min-w-0 flex-1 items-center gap-1.5 text-[11px] text-warning"
										title={`The body does not print {{${name}}} any more, so what is typed in here stays out of the output. The field is kept on this format — put its token back to use it again.`}
									>
										<TriangleAlert className="size-3.5 shrink-0" />
										<span className="truncate">Not printed by the body</span>
										{onPutInBody ? (
											<button
												type="button"
												onClick={() => onPutInBody(name)}
												title={`Insert {{${name}}} into the body at the caret`}
												aria-label={`Put ${name} in the body`}
												className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-warning/35 bg-warning/10 px-1.5 py-0.5 transition-colors duration-150 hover:bg-warning/20"
											>
												<CornerDownLeft className="size-3 shrink-0" />
												Put in the body
											</button>
										) : null}
									</span>
								) : rowKeys.filter((key) => key === rowKeys[position]).length > 1 ? (
									<span
										className="flex min-w-0 flex-1 items-center gap-1 text-[11px] text-warning"
										title="Another field in this format has the same type and label"
									>
										<TriangleAlert className="size-3.5 shrink-0" />
										<span className="truncate">Same type and label as another field</span>
									</span>
								) : (
									<span className="min-w-0 flex-1" />
								)}
								<div className="ml-auto flex shrink-0 items-center gap-0.5">
									<Button
										size="icon-sm"
										variant="ghost"
										title="Move up"
										aria-label={`Move ${name} up`}
										disabled={position === 0}
										onClick={() => move(name, -1)}
									>
										<ArrowUp />
									</Button>
									<Button
										size="icon-sm"
										variant="ghost"
										title="Move down"
										aria-label={`Move ${name} down`}
										disabled={position === names.length - 1}
										onClick={() => move(name, 1)}
									>
										<ArrowDown />
									</Button>
									{tokenDriven ? (
										onRemoveFromBody ? (
											<Button
												size="icon-sm"
												variant="ghost"
												title={`Remove this field — takes {{${name}}} out of the body with it`}
												aria-label={`Remove ${name} from the format`}
												onClick={() => onRemoveFromBody(name)}
											>
												<Trash2 />
											</Button>
										) : null
									) : (
										<Button
											size="icon-sm"
											variant="ghost"
											title="Remove this field"
											aria-label={`Remove ${name}`}
											onClick={() => removeField(name)}
										>
											<Trash2 />
										</Button>
									)}
								</div>
							</div>

							<div className="mt-2.5 grid gap-2.5">
								<Field
									label="Label"
									htmlFor={`pick-label-${name}`}
									wide
									hint="The question shown above the input. Press Enter for a second line when the question needs one, or write {img=https://…} in it to show that picture with the question."
								>
									<Textarea
										id={`pick-label-${name}`}
										// The wording this format actually shows, so it can be edited in
										// place; the catalogue's own text stands in until it is changed.
										value={label}
										rows={2}
										className="min-h-[62px] text-[13px]"
										onChange={(event) => setWording(name, { label: event.target.value, hint: pick?.hint })}
									/>
									{labelHasImage(label) ? (
										<div className="flex flex-col gap-1">
											<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
												Picture
											</span>
											<div className="rounded-xl border border-subtle bg-surface/60 px-3 py-2 text-[13px]">
												<LabelContent text={label} />
											</div>
										</div>
									) : null}
								</Field>
								<Field label="Hint" htmlFor={`pick-hint-${name}`} hint="Optional helper text under the input.">
									<Input
										id={`pick-hint-${name}`}
										value={pick?.hint ?? definition.hint ?? ""}
										placeholder="No hint"
										onChange={(event) => setWording(name, { label: pick?.label, hint: event.target.value })}
									/>
								</Field>

								{definition.type === "checkbox" && onChangeItems && typeVerdict.ok ? (
									<Field
										label="Checkboxes"
										htmlFor={`pick-items-${name}`}
										wide
										hint={
											<>
												One line per box. Where <code className="font-mono">{`{{${name}}}`}</code> is in the body these lines print
												there, a ticked one as [cbc]; with no token in the body, the body's own [cb]
												lines the choices name are ticked in place instead.
											</>
										}
									>
										<div className="flex flex-col gap-1.5">
											{choices.map((item, index) => (
												<div key={index} className="flex items-center gap-2">
													<Input
														id={index === 0 ? `pick-items-${name}` : undefined}
														// A line just added takes the caret, so it can be typed into
														// without a click.
														autoFocus={item === "" && index === choices.length - 1}
														value={item}
														placeholder={`Line ${index + 1} — e.g. Minor`}
														aria-label={`${name} line ${index + 1}`}
														onChange={(event) =>
															setChoices(
																name,
																choices.map((entry, at) => (at === index ? event.target.value : entry)),
															)
														}
													/>
													<Button
														size="icon-sm"
														variant="ghost"
														title="Remove this line"
														aria-label={`Remove ${name} line ${index + 1}`}
														onClick={() => setChoices(name, choices.filter((_, at) => at !== index))}
													>
														<Trash2 />
													</Button>
												</div>
											))}
											<Button
												size="sm"
												variant="secondary"
												className="self-start"
												onClick={() => setChoices(name, [...choices, ""])}
											>
												<Plus />
												Add line
											</Button>
											{storedChoices.length > 0 && !bindsRun ? (
												<span className="flex items-start gap-1.5 text-[11px] leading-relaxed text-warning">
													<TriangleAlert className="mt-px size-3.5 shrink-0" />
													<span>
														No run of [cb] lines in the body matches these yet — copy them in the same
														order the body lists them, or put the token in first.
													</span>
												</span>
											) : null}
										</div>
									</Field>
								) : null}

								{definition.type === "group" && onChangeSubFields && onChangeTemplate && typeVerdict.ok ? (
									<GroupEditor
										name={name}
										template={definition.template ?? ""}
										subFields={definition.subFields ?? []}
										onChangeTemplate={(next) => onChangeTemplate(name, next)}
										onChangeSubFields={(next) => onChangeSubFields(name, next)}
									/>
								) : null}

								{definition.type === "charges" ? (
									<p className="text-[11.5px] leading-relaxed text-ink-faint">
										Charges are picked out of the state penal code and print as one{" "}
										<code className="font-mono">[*]VC01 - Speeding 1st Degree</code> line per charge, wherever{" "}
										<code className="font-mono">{`{{${name}}}`}</code> sits in the body.
									</p>
								) : null}

								{definition.type === "image" ? (
									<p className="text-[11.5px] leading-relaxed text-ink-faint">
										The answer is a link, printed as the picture it points at: put{" "}
										<code className="font-mono">{`{{${name}}}`}</code> where the image should show and
										the field adds the <code className="font-mono">[img]</code> tags itself. A blank answer
										leaves that line out of the report.
									</p>
								) : null}

								{definition.type === "images" ? (
									<p className="text-[11.5px] leading-relaxed text-ink-faint">
										Any number of links, each printed as its own <code className="font-mono">[img]</code>{" "}
										line where <code className="font-mono">{`{{${name}}}`}</code> sits — put the token on
										a line of its own for a stack of pictures. Links left blank print nothing.
									</p>
								) : null}
							</div>
						</div>
					);
				})}
			</div>

			{tokenDriven ? null : (
				<FieldPicker
					used={names}
					onPick={addField}
					onCreate={onCreate}
					onDelete={onDelete}
					deleteGuard={deleteGuard}
					onEdit={onEditField}
					editGuard={fieldGuard}
				/>
			)}
		</div>
	);
}

/** The tokens a group's answers may not use, since an entry's own position is printed under them. */
const RESERVED_SUB_TOKENS = new Set(["index", "letter"]);

/** A token name box: what is typed is kept as typed, and only a usable name is committed. */
function SubTokenInput({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (name: string) => void;
}) {
	const [typed, setTyped] = useState(value);

	return (
		<Input
			value={typed}
			aria-label={label}
			placeholder="token"
			title="The token this answer prints as in the entry template"
			className="w-36 shrink-0 font-mono text-[11.5px]"
			onChange={(event) => {
				const next = event.target.value;
				setTyped(next);
				if (isValidTokenName(next) && !RESERVED_SUB_TOKENS.has(next)) onChange(next);
			}}
			onBlur={() => {
				if (!isValidTokenName(typed) || RESERVED_SUB_TOKENS.has(typed)) setTyped(value);
			}}
		/>
	);
}

/**
 * The editor of one repeating group: the answers each entry asks for, and the
 * block one entry prints.
 *
 * The two belong together — an answer is only of any use once the entry template
 * prints its `{{token}}`, and a template can only fill tokens that some answer
 * provides — so they are edited side by side rather than a token name being
 * typed blind.
 */
function GroupEditor({
	name,
	template,
	subFields,
	onChangeTemplate,
	onChangeSubFields,
}: {
	name: string;
	template: string;
	subFields: GroupSubField[];
	onChangeTemplate: (template: string) => void;
	onChangeSubFields: (subFields: GroupSubField[]) => void;
}) {
	const patch = (index: number, change: Partial<GroupSubField>) =>
		onChangeSubFields(subFields.map((sub, at) => (at === index ? { ...sub, ...change } : sub)));

	const tokenList = subFields.length
		? subFields.map((sub) => `{{${sub.name}}}`).join(", ")
		: "{{…}}";

	return (
		<>
			<Field
				label="Entry template"
				htmlFor={`pick-template-${name}`}
				wide
				hint={
					<>
						The block one entry prints, repeated for every entry added: {tokenList}, plus{" "}
						<code className="font-mono">{"{{index}}"}</code> (1, 2, …) and{" "}
						<code className="font-mono">{"{{letter}}"}</code> (A, B, …) for the entry's own place. A line
						whose only answer is left blank drops out of the output.
					</>
				}
			>
				<Textarea
					id={`pick-template-${name}`}
					value={template}
					rows={10}
					className="min-h-[200px] font-mono text-[12px]"
					onChange={(event) => onChangeTemplate(event.target.value)}
				/>
			</Field>

			<Field
				label="Answers"
				wide
				hint="What each entry of this group asks for, in form order. An answer's token is what the entry template fills."
			>
				<div className="flex flex-col gap-1.5">
					{subFields.map((sub, index) => (
						<div
							key={index}
							className="flex flex-col gap-1.5 rounded-xl border border-subtle bg-surface/60 p-2"
						>
							<div className="flex items-center gap-2">
								<Input
									value={sub.label}
									aria-label={`Answer ${index + 1} wording`}
									placeholder={`Question — e.g. ${index === 0 ? "Full name" : "Charges"}`}
									title="The question shown above this answer"
									onChange={(event) => patch(index, { label: event.target.value })}
								/>
								<SubTokenInput
									label={`Token for answer ${index + 1}`}
									value={sub.name}
									onChange={(next) => patch(index, { name: next })}
								/>
								<select
									value={sub.type}
									aria-label={`Kind of answer ${index + 1}`}
									title="What this answer asks for"
									onChange={(event) =>
										patch(index, { type: event.target.value as GroupFieldType })
									}
									className="shrink-0 cursor-pointer rounded-full border border-subtle bg-surface-2 py-0.5 pr-1 pl-2 text-[11px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
								>
									{GROUP_FIELD_TYPES.map((type) => (
										<option key={type} value={type}>
											{GROUP_TYPE_LABELS[type]}
										</option>
									))}
								</select>
								<Button
									size="icon-sm"
									variant="ghost"
									title="Remove this answer"
									aria-label={`Remove answer ${index + 1}`}
									onClick={() => onChangeSubFields(subFields.filter((_, at) => at !== index))}
								>
									<Trash2 />
								</Button>
							</div>

							{sub.type === "select" ? (
								<Textarea
									value={(sub.options ?? []).map((option) => option.value).join("\n")}
									aria-label={`Choices of answer ${index + 1}`}
									placeholder="One dropdown choice per line"
									rows={3}
									className="min-h-[72px] text-[12.5px]"
									onChange={(event) =>
										patch(index, {
											options: event.target.value
												.split("\n")
												.map((line) => line.trim())
												.filter(Boolean)
												.map((value) => ({ value, label: value })),
										})
									}
								/>
							) : null}
						</div>
					))}

					<Button
						size="sm"
						variant="secondary"
						className="self-start"
						onClick={() =>
							onChangeSubFields([
								...subFields,
								{ name: `answer${subFields.length + 1}`, label: "", type: "text" },
							])
						}
					>
						<Plus />
						Add answer
					</Button>

					{!subFields.length ? (
						<span className="flex items-start gap-1.5 text-[11px] leading-relaxed text-warning">
							<TriangleAlert className="mt-px size-3.5 shrink-0" />
							<span>No answers yet — nothing can be filled in for one entry.</span>
						</span>
					) : null}
				</div>
			</Field>
		</>
	);
}
