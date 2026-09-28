import { useState } from "react";
import { Copy, Plus, Save, Trash2, Wand2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { copyText } from "@/hooks/useCopy";
import {
	isValidTokenName,
	normaliseInput,
	suggestTokenName,
	FIELD_TYPES,
	TYPE_LABELS,
	type CatalogueInput,
	type FieldType,
} from "@/lib/inputDefinitions";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface NewInputFormProps {
	/** Marks tokens that already exist in the catalogue. */
	existingNames: Set<string>;
	/** The field type this form was opened for. */
	initialType?: FieldType;
	/**
	 * The field being edited, when this form was opened on an existing one. Its
	 * token name is fixed — every body and format already asks for the field by
	 * that name — but its type, wording and choices can change.
	 */
	initial?: CatalogueInput;
	/**
	 * Called with the normalised input when the form validates. A name already in
	 * the catalogue is handed back unchanged, so the caller reuses that field
	 * instead of creating a duplicate.
	 */
	onCreate: (input: CatalogueInput) => void;
	/** Called with the rewritten definition when editing an existing field. */
	onSave?: (input: CatalogueInput) => void;
	onCancel: () => void;
}

/**
 * The create-new-input form: token name, type and wording, plus the extras a
 * type needs (dropdown options, checklist items). Validation mirrors the plugin
 * sanitiser, so whatever passes here survives a save.
 *
 * Opened on an existing field it edits that field instead: same boxes, prefilled
 * from the field it is changing, with the token name locked.
 */
export function NewInputForm({ existingNames, initialType, initial, onCreate, onSave, onCancel }: NewInputFormProps) {
	const editing = Boolean(initial);
	const [name, setName] = useState(initial?.name ?? "");
	const [type, setType] = useState<FieldType>(initial?.type ?? initialType ?? "text");
	const [label, setLabel] = useState(initial?.label ?? "");
	const [hint, setHint] = useState(initial?.hint ?? "");
	const [options, setOptions] = useState<{ value: string; label: string }[]>(
		initial?.options?.map((option) => ({ ...option })) ?? [],
	);
	const [items, setItems] = useState<string[]>(initial?.items ? [...initial.items] : []);

	const trimmed = name.trim();
	const nameValid = isValidTokenName(trimmed);
	// An edit keeps its own name, so it is not a clash with itself.
	const taken = !editing && existingNames.has(trimmed);
	// What the label suggests as a token name, offered when the box is still empty.
	const suggestion = suggestTokenName(label);
	// The field this name already belongs to, so a clash can point at it rather
	// than silently adding a second field with the same name — and so it can say
	// whether the type matches too, which is the difference between "that is
	// already the field you want" and "that token is taken by something else".
	const existing = taken ? catalogueInputFor(trimmed) : undefined;
	const sameType = Boolean(existing) && existing?.type === type;
	const valid = editing ? label.trim().length > 0 : nameValid && !taken && label.trim().length > 0;

	const submit = () => {
		if (!valid) return;
		// Everything the form does not show (a date's style, a list's placeholder)
		// is carried through from the field being edited rather than dropped.
		const input = normaliseInput(
			editing && initial ? { ...initial, type, label, hint, options, items } : { name: trimmed, type, label, hint, options, items },
		);
		if (!input) return;
		if (editing) onSave?.(input);
		else onCreate(input);
	};

	return (
		<div className="flex flex-col gap-2.5 border-t border-subtle px-3 pb-3 pt-3">
			<span className="text-[11.5px] font-medium text-ink">
				{editing ? (
					<>
						Editing <code className="font-mono">{`{{${name}}}`}</code>
					</>
				) : (
					"New field"
				)}
			</span>

			<div className="grid grid-cols-[1fr_auto] gap-2">
				<Field
					label="Name"
					htmlFor="new-input-name"
					hint={
						editing ? (
							<>
								Wording and type can change; the token name stays, because bodies already
								ask for the field by it. Rename it from a format's field row instead.
							</>
						) : (
							<>
								The <code className="font-mono">{'{{token}}'}</code> the body uses to fill this in — type it
								here, and change it any time before you create the field.
							</>
						)
					}
				>
					<Input
						id="new-input-name"
						value={name}
						disabled={editing}
						onChange={(event) => setName(event.target.value)}
						placeholder="e.g. fts4Notes"
						className="font-mono text-[12.5px]"
					/>
					{trimmed && !nameValid ? (
						<span className="text-[11.5px] text-danger">Letters, numbers and dots only.</span>
					) : null}
					{trimmed && nameValid && taken ? (
						<span className="text-[11.5px] text-warning">
							{existing
								? sameType
									? `Same name and type as the ${TYPE_LABELS[existing.type]} “${existing.label}” already in the catalogue — use that field instead of a second one.`
									: `Already the ${TYPE_LABELS[existing.type]} “${existing.label}”. A token can only be one type, so use that field or rename this one.`
								: "Already a field here."}
						</span>
					) : null}

				</Field>

				<Field label="Type" htmlFor="new-input-type">
					<select
						id="new-input-type"
						value={type}
						onChange={(event) => setType(event.target.value as FieldType)}
						className={cn(controlFieldClass, "h-11 px-3.5")}
					>
						{FIELD_TYPES.map((option) => (
							<option key={option} value={option}>
								{TYPE_LABELS[option]}
							</option>
						))}
					</select>
				</Field>
			</div>

			{!editing && !trimmed && suggestion ? (
				<button
					type="button"
					onClick={() => setName(suggestion)}
					title="Use this token name, or type your own in the box above"
					className="flex cursor-pointer items-center gap-1.5 self-start rounded-full border border-subtle bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
				>
					<Wand2 className="size-3" />
					{`Use {{${suggestion}}}`}
				</button>
			) : null}

			{!editing && trimmed && nameValid && !taken ? (
				<div className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-faint">
					<span>In the body:</span>
					<button
						type="button"
						title={`Copy {{${trimmed}}}`}
						aria-label={`Copy the token {{${trimmed}}}`}
						onClick={() => {
							void copyText(`{{${trimmed}}}`);
							toast.info(`Copied {{${trimmed}}}`);
						}}
						className="flex cursor-pointer items-center gap-1.5 rounded-full border border-subtle bg-surface px-2 py-0.5 font-mono text-[11px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
					>
						<Copy className="size-3" />
						{`{{${trimmed}}}`}
					</button>
					<span>— change the name above to change it.</span>
				</div>
			) : null}

			<Field
				label="Label"
				htmlFor="new-input-label"
				wide
				hint="The question shown above the input. Press Enter for a second line when the question needs one."
			>
				<Textarea
					id="new-input-label"
					value={label}
					rows={2}
					className="min-h-[62px] text-[13px]"
					onChange={(event) => setLabel(event.target.value)}
					placeholder="e.g. Note about the session"
				/>
			</Field>

			<Field label="Hint" htmlFor="new-input-hint" hint="Optional helper text under the input.">
				<Input
					id="new-input-hint"
					value={hint}
					onChange={(event) => setHint(event.target.value)}
					placeholder="Optional"
				/>
			</Field>

			{type === "select" ? (
				<div className="flex flex-col gap-1.5">
					<span className="text-[11.5px] font-medium text-ink-muted">Dropdown options</span>
					{options.map((option, index) => (
						<div key={index} className="flex items-center gap-2">
							<Input
								value={option.value}
								placeholder="value"
								aria-label={`Option ${index + 1} value`}
								onChange={(event) =>
									setOptions(options.map((item, i) => (i === index ? { ...item, value: event.target.value } : item)))
								}
								className="font-mono text-[12.5px]"
							/>
							<Input
								value={option.label}
								placeholder="Shown to users"
								aria-label={`Option ${index + 1} label`}
								onChange={(event) =>
									setOptions(options.map((item, i) => (i === index ? { ...item, label: event.target.value } : item)))
								}
							/>
							<Button
								size="icon-sm"
								variant="ghost"
								title="Remove option"
								aria-label={`Remove option ${index + 1}`}
								onClick={() => setOptions(options.filter((_, i) => i !== index))}
							>
								<Trash2 />
							</Button>
						</div>
					))}
					<Button
						size="sm"
						variant="secondary"
						className="self-start"
						onClick={() => setOptions([...options, { value: "", label: "" }])}
					>
						<Plus />
						Add option
					</Button>
				</div>
			) : null}

			{type === "check" ? (
				<div className="flex flex-col gap-1.5">
					<span className="text-[11.5px] font-medium text-ink-muted">Checklist items</span>
					{items.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<Input
								value={item}
								placeholder={`Item ${index + 1}`}
								aria-label={`Checklist item ${index + 1}`}
								onChange={(event) =>
									setItems(items.map((value, i) => (i === index ? event.target.value : value)))
								}
							/>
							<Button
								size="icon-sm"
								variant="ghost"
								title="Remove item"
								aria-label={`Remove item ${index + 1}`}
								onClick={() => setItems(items.filter((_, i) => i !== index))}
							>
								<Trash2 />
							</Button>
						</div>
					))}
					<Button size="sm" variant="secondary" className="self-start" onClick={() => setItems([...items, ""])}>
						<Plus />
						Add item
					</Button>
				</div>
			) : null}

			<div className="flex items-center gap-2">
				<Button size="sm" variant="primary" disabled={!valid} onClick={submit}>
					{editing ? <Save /> : <Plus />}
					{editing ? "Save field" : "Create field"}
				</Button>
				{taken && existing ? (
					<Button size="sm" variant="secondary" onClick={() => onCreate({ name: trimmed, ...existing })}>
						Use that field
					</Button>
				) : null}
				<Button size="sm" variant="ghost" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
}
