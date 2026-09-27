import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { catalogueInputFor } from "@/data/inputCatalogue";
import {
	isValidTokenName,
	normaliseInput,
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
	 * Called with the normalised input when the form validates. A name already in
	 * the catalogue is handed back unchanged, so the caller reuses that field
	 * instead of creating a duplicate.
	 */
	onCreate: (input: CatalogueInput) => void;
	onCancel: () => void;
}

/**
 * The create-new-input form: token name, type and wording, plus the extras a
 * type needs (dropdown options, checklist items). Validation mirrors the plugin
 * sanitiser, so whatever passes here survives a save.
 */
export function NewInputForm({ existingNames, initialType, onCreate, onCancel }: NewInputFormProps) {
	const [name, setName] = useState("");
	const [type, setType] = useState<FieldType>(initialType ?? "text");
	const [label, setLabel] = useState("");
	const [hint, setHint] = useState("");
	const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
	const [items, setItems] = useState<string[]>([]);

	const trimmed = name.trim();
	const nameValid = isValidTokenName(trimmed);
	const taken = existingNames.has(trimmed);
	// The field this name already belongs to, so a clash can point at it rather
	// than silently adding a second field with the same name.
	const existing = taken ? catalogueInputFor(trimmed) : undefined;
	const valid = nameValid && !taken && label.trim().length > 0;

	const submit = () => {
		if (!valid) return;
		const input = normaliseInput({ name: trimmed, type, label, hint, options, items });
		if (!input) return;
		onCreate(input);
	};

	return (
		<div className="flex flex-col gap-2.5 border-t border-subtle px-3 pb-3 pt-3">
			<span className="text-[11.5px] font-medium text-ink">New field</span>

			<div className="grid grid-cols-[1fr_auto] gap-2">
				<Field
					label="Name"
					htmlFor="new-input-name"
					hint="Typed once: this is how the body refers to the field."
				>
					<Input
						id="new-input-name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder="e.g. fts4Notes"
						className="font-mono text-[12.5px]"
					/>
					{trimmed && !nameValid ? (
						<span className="text-[11.5px] text-danger">Letters, numbers and dots only.</span>
					) : null}
					{trimmed && nameValid && taken ? (
						<span className="text-[11.5px] text-warning">
							Already a field here
							{existing ? ` — the ${TYPE_LABELS[existing.type]} “${existing.label}”` : ""}.
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

			<Field label="Label" htmlFor="new-input-label" hint="The question shown above the input.">
				<Input
					id="new-input-label"
					value={label}
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
					<Plus />
					Create field
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
