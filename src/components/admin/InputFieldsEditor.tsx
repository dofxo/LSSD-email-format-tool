import { useState } from "react";
import {
	ArrowDown,
	ArrowUp,
	ChevronDown,
	Plus,
	RotateCcw,
	Trash2,
	TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import type { FormatOption } from "@/lib/formats";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { FormatInputField, divisionsType } from "@/types";

const FIELD_TYPES: FormatInputField["type"][] = [
	"text",
	"number",
	"date",
	"time",
	"select",
	"textarea",
	"check",
	"list",
];

const DATE_STYLES: NonNullable<FormatInputField["dateStyle"]>[] = ["full", "short", "shortYear"];

const TYPE_LABELS: Record<FormatInputField["type"], string> = {
	text: "Single line text",
	number: "Number",
	date: "Date picker",
	time: "Time picker",
	select: "Dropdown",
	textarea: "Paragraph",
	check: "Checklist",
	list: "Repeating list",
};

const newField = (): FormatInputField => ({
	name: "newField",
	label: "New field",
	type: "text",
	formats: [],
});

interface InputFieldsEditorProps {
	division: divisionsType;
	/** The division's current fields (from /admin when saved, else built-in). */
	fields: FormatInputField[];
	/** Every format the division exposes, for the per-field format pickers. */
	formatOptions: FormatOption[];
	/** Whether these fields have been replaced at /admin. */
	customised: boolean;
	/** When set, the editor is locked to one format and hides its own picker. */
	lockedFormat?: string;
	onChange: (fields: FormatInputField[]) => void;
	onReset: () => void;
}

/** Manages one division's input fields: what each format asks the user to fill in. */
export function InputFieldsEditor({
	division,
	fields,
	formatOptions,
	customised,
	lockedFormat,
	onChange,
	onReset,
}: InputFieldsEditorProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [confirmingReset, setConfirmingReset] = useState(false);
	/** "" shows every field; a format id narrows the list to what it asks for. */
	const [formatFilter, setFormatFilter] = useState("");
	const activeFilter = lockedFormat ?? formatFilter;

	const validIds = new Set(formatOptions.map((option) => option.id));

	// Two fields may share a name (SEB does, for its different date inputs) as
	// long as no single format asks for both, since that would render twice.
	const duplicateIndices = new Set<number>();
	const indicesByName = new Map<string, number[]>();
	fields.forEach((field, index) => {
		indicesByName.set(field.name, [...(indicesByName.get(field.name) ?? []), index]);
	});
	for (const indices of indicesByName.values()) {
		for (let a = 0; a < indices.length; a += 1) {
			for (let b = a + 1; b < indices.length; b += 1) {
				const first = fields[indices[a]].formats;
				const second = fields[indices[b]].formats;
				if (first.some((id) => second.includes(id))) {
					duplicateIndices.add(indices[a]);
					duplicateIndices.add(indices[b]);
				}
			}
		}
	}

	// Whatever the filter, edits address the field by its original index so the
	// full list stays in one place.
	const visible = fields
		.map((field, index) => ({ field, index }))
		.filter(({ field }) => !activeFilter || field.formats.includes(activeFilter));
	const activeFormat = formatOptions.find((option) => option.id === activeFilter) ?? null;

	const updateField = (index: number, patch: Partial<FormatInputField>) => {
		onChange(fields.map((field, fieldIndex) => (fieldIndex === index ? { ...field, ...patch } : field)));
	};

	const removeField = (index: number) => {
		onChange(fields.filter((_, fieldIndex) => fieldIndex !== index));
		setOpenIndex(null);
	};

	/** Swaps with the next field in view, which may sit further down the full list. */
	const moveField = (index: number, direction: -1 | 1) => {
		const position = visible.findIndex((entry) => entry.index === index);
		const target = visible[position + direction];
		if (!target) return;
		const next = [...fields];
		[next[index], next[target.index]] = [next[target.index], next[index]];
		onChange(next);
		setOpenIndex(target.index);
	};

	const addField = () => {
		const field = activeFilter ? { ...newField(), formats: [activeFilter] } : newField();
		onChange([...fields, field]);
		setOpenIndex(fields.length);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap items-center gap-2">
				<span className="rounded-md border border-subtle bg-surface px-2 py-0.5 font-mono text-[11.5px] text-ink-muted">
					{activeFilter ? `${visible.length} of ${fields.length}` : fields.length} field
					{fields.length === 1 ? "" : "s"}
				</span>
				{customised ? (
					<span className="rounded-full border border-accent/25 bg-accent/12 px-2 py-0.5 text-[11.5px] font-medium text-accent">
						Replaced at /admin
					</span>
				) : (
					<span className="text-[12px] text-ink-faint">Using the built-in fields</span>
				)}

				<div className="ml-auto flex items-center gap-2">
					{confirmingReset ? (
						<>
							<span className="text-[12px] text-ink-muted">Reset to the built-in fields?</span>
							<Button
								size="sm"
								variant="danger"
								onClick={() => {
									setConfirmingReset(false);
									onReset();
								}}
							>
								Reset
							</Button>
							<Button size="sm" variant="ghost" onClick={() => setConfirmingReset(false)}>
								Cancel
							</Button>
						</>
					) : customised ? (
						<Button
							size="icon-sm"
							variant="ghost"
							title="Reset this division to its built-in fields"
							aria-label="Reset input fields"
							onClick={() => setConfirmingReset(true)}
						>
							<RotateCcw />
						</Button>
					) : null}
					<Button size="sm" variant="secondary" onClick={addField}>
						<Plus />
						{activeFormat ? `Add to ${activeFormat.id}` : "Add field"}
					</Button>
				</div>
			</div>

			{lockedFormat ? null : (
				<label className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-muted">
					<span className="font-medium">Control inputs for format</span>
					<select
						value={formatFilter}
						onChange={(event) => {
							setFormatFilter(event.target.value);
							setOpenIndex(null);
						}}
						aria-label="Filter input fields by format"
						className={cn(controlFieldClass, "h-9 max-w-[22rem] px-3")}
					>
						<option value="">All formats</option>
						{formatOptions.map((option) => (
							<option key={option.id} value={option.id}>
								{option.id} · {option.label}
							</option>
						))}
					</select>
				</label>
			)}

			{activeFormat ? (
				<p className="text-[12px] leading-relaxed text-ink-faint">
					Showing only the fields <span className="text-ink">{activeFormat.label}</span> asks for. A field can
					still belong to other formats — open it to change its format ticks.
				</p>
			) : null}

			{visible.length === 0 ? (
				<p className="rounded-2xl border border-dashed border-strong/70 bg-surface-2/50 px-4 py-6 text-center text-[12.5px] text-ink-muted">
					{activeFormat
						? `This format asks for no input fields yet. Add one to start collecting values for it.`
						: "No input fields yet. Add one to start asking users for values in this division."}
				</p>
			) : null}

			<div className="flex flex-col gap-2">
				{visible.map(({ field, index }, position) => {
					const open = openIndex === index;
					const unknownIds = field.formats.filter((id) => !validIds.has(id));
					const duplicateName = duplicateIndices.has(index);
					const problemCount = unknownIds.length + (duplicateName ? 1 : 0);

					return (
						<div
							key={index}
							className="rounded-2xl border border-subtle bg-surface-2/40"
						>
							<div className="flex items-center gap-2 p-2">
								<button
									type="button"
									onClick={() => setOpenIndex(open ? null : index)}
									aria-expanded={open}
									className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 hover:bg-surface-3"
								>
									<ChevronDown
										className={cn("size-4 shrink-0 text-ink-faint transition-transform duration-200", open && "rotate-180")}
									/>
									<span className="shrink-0 rounded-md border border-subtle bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
										{field.name || "—"}
									</span>
									<span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-muted">{field.label}</span>
									{problemCount > 0 ? (
										<TriangleAlert className="size-3.5 shrink-0 text-warning" aria-label="Needs attention" />
									) : null}
									<span className="hidden shrink-0 items-center gap-1.5 md:flex">
										<span className="rounded-full border border-subtle bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-faint">
											{TYPE_LABELS[field.type]}
										</span>
										<span className="whitespace-nowrap rounded-full border border-subtle bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-faint">
											{field.formats.length} format{field.formats.length === 1 ? "" : "s"}
										</span>
									</span>
								</button>

								<Button
									size="icon-sm"
									variant="ghost"
									title="Move up"
									aria-label={`Move ${field.name} up`}
									disabled={position === 0}
									onClick={() => moveField(index, -1)}
								>
									<ArrowUp />
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									title="Move down"
									aria-label={`Move ${field.name} down`}
									disabled={position === visible.length - 1}
									onClick={() => moveField(index, 1)}
								>
									<ArrowDown />
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									title="Delete this field"
									aria-label={`Delete ${field.name}`}
									onClick={() => removeField(index)}
								>
									<Trash2 />
								</Button>
							</div>

							{open ? (
								<div className="flex flex-col gap-4 border-t border-subtle p-4">
									{problemCount > 0 ? (
										<div className="flex flex-col gap-1 rounded-xl border border-warning/35 bg-warning/10 px-3 py-2 text-[12px] text-warning">
											{duplicateName ? (
												<span>
													Another field named <code className="font-mono">{field.name}</code> is asked for by the same
													format, so it would show up twice. Give one of them a different name.
												</span>
											) : null}
											{unknownIds.length ? (
												<span>
													Points at unknown format id{unknownIds.length === 1 ? "" : "s"}{" "}
													<code className="font-mono">{unknownIds.join(", ")}</code> — it will never show up.
												</span>
											) : null}
										</div>
									) : null}

									<div className="grid gap-4 sm:grid-cols-2">
										<Field label="Field name (token)" htmlFor={`in-name-${division}-${index}`}>
											<Input
												id={`in-name-${division}-${index}`}
												value={field.name}
												onChange={(event) => updateField(index, { name: event.target.value.trim() })}
												placeholder="applicantName"
												className="font-mono text-[13px]"
											/>
										</Field>

										<Field label="Type" htmlFor={`in-type-${division}-${index}`}>
											<select
												id={`in-type-${division}-${index}`}
												value={field.type}
												onChange={(event) =>
													updateField(index, { type: event.target.value as FormatInputField["type"] })
												}
												className={cn(controlFieldClass, "h-11 px-3.5")}
											>
												{FIELD_TYPES.map((type) => (
													<option key={type} value={type}>
														{TYPE_LABELS[type]}
													</option>
												))}
											</select>
										</Field>
									</div>

									<Field
										label="Label"
										htmlFor={`in-label-${division}-${index}`}
										hint="The question shown above the input."
										wide
									>
										<Textarea
											id={`in-label-${division}-${index}`}
											value={field.label}
											onChange={(event) => updateField(index, { label: event.target.value })}
											className="min-h-[72px]"
										/>
									</Field>

									<Field
										label="Hint"
										htmlFor={`in-hint-${division}-${index}`}
										hint="Optional helper text under the input."
										wide
									>
										<Textarea
											id={`in-hint-${division}-${index}`}
											value={field.hint ?? ""}
											onChange={(event) =>
												updateField(index, { hint: event.target.value.trim() ? event.target.value : undefined })
											}
											className="min-h-[60px]"
										/>
									</Field>

									{field.type === "date" ? (
										<Field label="Date style" htmlFor={`in-datestyle-${division}-${index}`}>
											<select
												id={`in-datestyle-${division}-${index}`}
												value={field.dateStyle ?? "full"}
												onChange={(event) =>
													updateField(index, {
														dateStyle: event.target.value as NonNullable<FormatInputField["dateStyle"]>,
													})
												}
												className={cn(controlFieldClass, "h-11 px-3.5")}
											>
												{DATE_STYLES.map((style) => (
													<option key={style} value={style}>
														{style === "full" ? "Month DD, YYYY" : style === "short" ? "DD/MMM/YYYY" : "DD/MMM/YY"}
													</option>
												))}
											</select>
										</Field>
									) : null}

									{field.type === "list" ? (
										<Field
											label="Add-input placeholder"
											htmlFor={`in-placeholder-${division}-${index}`}
										>
											<Input
												id={`in-placeholder-${division}-${index}`}
												value={field.itemPlaceholder ?? ""}
												onChange={(event) =>
													updateField(index, {
														itemPlaceholder: event.target.value.trim() ? event.target.value : undefined,
													})
												}
												placeholder="Type an item, then press Enter"
											/>
										</Field>
									) : null}

									{field.type === "select" ? (
										<OptionsEditor
											options={field.options ?? []}
											onChange={(options) => updateField(index, { options })}
										/>
									) : null}

									{field.type === "check" ? (
										<ItemsEditor
											items={field.items ?? []}
											onChange={(items) => updateField(index, { items })}
										/>
									) : null}

									<FormatsPicker
										field={field}
										formatOptions={formatOptions}
										onChange={(formats) => updateField(index, { formats })}
									/>
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
}

/** Dropdown choices: each row is a stored value plus the label shown to users. */
function OptionsEditor({
	options,
	onChange,
}: {
	options: { value: string; label: string }[];
	onChange: (options: { value: string; label: string }[]) => void;
}) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-[12.5px] font-medium text-ink-muted">Dropdown options</span>
			{options.map((option, index) => (
				<div key={index} className="flex items-center gap-2">
					<Input
						value={option.value}
						placeholder="value"
						aria-label={`Option ${index + 1} value`}
						onChange={(event) =>
							onChange(options.map((item, i) => (i === index ? { ...item, value: event.target.value } : item)))
						}
						className="font-mono text-[13px]"
					/>
					<Input
						value={option.label}
						placeholder="Shown to users"
						aria-label={`Option ${index + 1} label`}
						onChange={(event) =>
							onChange(options.map((item, i) => (i === index ? { ...item, label: event.target.value } : item)))
						}
					/>
					<Button
						size="icon-sm"
						variant="ghost"
						title="Remove option"
						aria-label={`Remove option ${index + 1}`}
						onClick={() => onChange(options.filter((_, i) => i !== index))}
					>
						<Trash2 />
					</Button>
				</div>
			))}
			<Button
				size="sm"
				variant="secondary"
				className="self-start"
				onClick={() => onChange([...options, { value: "", label: "" }])}
			>
				<Plus />
				Add option
			</Button>
		</div>
	);
}

/** Checklist items: each row is one tickable box, in display order. */
function ItemsEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-[12.5px] font-medium text-ink-muted">Checklist items</span>
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2">
					<Input
						value={item}
						placeholder={`Item ${index + 1}`}
						aria-label={`Checklist item ${index + 1}`}
						onChange={(event) =>
							onChange(items.map((value, i) => (i === index ? event.target.value : value)))
						}
					/>
					<Button
						size="icon-sm"
						variant="ghost"
						title="Remove item"
						aria-label={`Remove item ${index + 1}`}
						onClick={() => onChange(items.filter((_, i) => i !== index))}
					>
						<Trash2 />
					</Button>
				</div>
			))}
			<Button size="sm" variant="secondary" className="self-start" onClick={() => onChange([...items, ""])}>
				<Plus />
				Add item
			</Button>
		</div>
	);
}

/** Which formats ask for this field. */
function FormatsPicker({
	field,
	formatOptions,
	onChange,
}: {
	field: FormatInputField;
	formatOptions: FormatOption[];
	onChange: (formats: string[]) => void;
}) {
	const toggle = (id: string) => {
		onChange(field.formats.includes(id) ? field.formats.filter((value) => value !== id) : [...field.formats, id]);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-[12.5px] font-medium text-ink-muted">Show this field for formats</span>
				<div className="ml-auto flex items-center gap-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => onChange(formatOptions.map((option) => option.id))}
					>
						All
					</Button>
					<Button size="sm" variant="ghost" onClick={() => onChange([])}>
						None
					</Button>
				</div>
			</div>

			<div className="thin-scroll grid max-h-48 gap-1.5 overflow-y-auto rounded-xl border border-subtle bg-surface p-3 sm:grid-cols-2">
				{formatOptions.map((option) => {
					const checked = field.formats.includes(option.id);
					return (
						<label
							key={option.id}
							className={cn(
								"flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] text-ink transition-colors duration-150 hover:bg-surface-2",
								checked && "bg-accent-soft",
							)}
						>
							<input
								type="checkbox"
								checked={checked}
								onChange={() => toggle(option.id)}
								className="size-3.5 accent-[var(--brand-solid)]"
							/>
							<span className="shrink-0 font-mono text-[11px] text-ink-faint">{option.id}</span>
							<span className="min-w-0 flex-1 truncate">{option.label}</span>
						</label>
					);
				})}
			</div>
		</div>
	);
}
