import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { ChargesPicker } from "@/components/ChargesPicker";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Field, Input, Label, Textarea } from "@/components/ui/input";
import { letterFor } from "@/lib/formatTemplates";
import type { FormatInputField, GroupSubField } from "@/types";

/** One entry of a group, as it is held while being filled in. */
export type GroupEntry = Record<string, unknown>;

interface GroupFieldProps {
	field: FormatInputField;
	/** The entries added so far. */
	value: unknown;
	onChange: (entries: GroupEntry[]) => void;
	/** The field's wording, drawn with the question number and any picture. */
	label: React.ReactNode;
}

/**
 * The noun one entry of the group is called, worked out from its wording: the
 * last word that reads as a plural names the thing being added, so "Vehicles
 * Involved" gives "vehicle" and "Confiscated Evidence Exhibits" gives "exhibit".
 */
const entryNoun = (label: string): string => {
	const words = label.trim().split(/\s+/).filter(Boolean);
	const plural = [...words].reverse().find((word) => /s$/i.test(word) && !/ss$/i.test(word));
	const word = plural ?? words[words.length - 1] ?? "";
	const singular = /ies$/i.test(word)
		? word.replace(/ies$/i, "y")
		: /(?:s|x|z|ch|sh)es$/i.test(word)
			? word.replace(/es$/i, "")
			: word.replace(/s$/i, "");
	return (singular || word).toLowerCase();
};

/** A sub-field's answers added one at a time, each removable. */
function ListSubInput({
	id,
	sub,
	value,
	onChange,
}: {
	id: string;
	sub: GroupSubField;
	value: unknown;
	onChange: (items: string[]) => void;
}) {
	const [draft, setDraft] = useState("");
	const items = Array.isArray(value) ? value.map(String) : [];

	const add = () => {
		const item = draft.trim();
		if (!item) return;
		onChange([...items, item]);
		setDraft("");
	};

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex gap-2">
				<Input
					id={id}
					value={draft}
					placeholder={sub.placeholder ?? "Type an item, then press Enter"}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							add();
						}
					}}
				/>
				<Button variant="secondary" size="md" onClick={add} disabled={!draft.trim()} className="shrink-0">
					<Plus />
					Add
				</Button>
			</div>
			{items.length ? (
				<ul className="flex flex-wrap gap-1.5">
					{items.map((item, index) => (
						<li
							key={`${item}-${index}`}
							className="flex items-center gap-1.5 rounded-xl border border-subtle bg-surface-2 py-1 pr-1.5 pl-2.5 text-[12px] text-ink"
						>
							<span className="max-w-[20rem] truncate">{item}</span>
							<button
								type="button"
								onClick={() => onChange(items.filter((_, at) => at !== index))}
								aria-label={`Remove ${item}`}
								title={`Remove ${item}`}
								className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-ink-faint transition-colors duration-150 hover:bg-danger-soft hover:text-danger"
							>
								<Trash2 className="size-3" />
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

/** One answer inside a group entry, rendered as whatever its sub-field asks for. */
function SubInput({
	id,
	sub,
	value,
	onChange,
}: {
	id: string;
	sub: GroupSubField;
	value: unknown;
	onChange: (value: unknown) => void;
}) {
	const text = typeof value === "string" ? value : "";

	if (sub.type === "textarea") {
		return <Textarea id={id} value={text} onChange={(event) => onChange(event.target.value)} />;
	}

	if (sub.type === "select") {
		return (
			<Combobox
				id={id}
				value={text}
				onChange={(next) => onChange(next)}
				options={sub.options ?? []}
				placeholder="Select…"
				ariaLabel={sub.label}
				searchThreshold={9}
			/>
		);
	}

	if (sub.type === "list") {
		return (
			<ListSubInput
				id={id}
				sub={sub}
				value={value}
				onChange={(items) => onChange(items)}
			/>
		);
	}

	if (sub.type === "charges") {
		return (
			<ChargesPicker
				id={id}
				value={Array.isArray(value) ? value.map(String) : []}
				onChange={(codes) => onChange(codes)}
				ariaLabel={sub.label}
				emptyHint="No charges picked — the body prints nothing for them."
			/>
		);
	}

	return <Input id={id} value={text} onChange={(event) => onChange(event.target.value)} />;
}

/**
 * A repeating group: a report's block that is filled in once per person, vehicle
 * or item. Every entry asks the same questions and prints through the same entry
 * template, so adding a suspect adds the whole block to the body — nothing has to
 * be re-typed in the body itself.
 *
 * Entries are numbered or lettered exactly as the template prints them: a
 * template using `{{letter}}` labels them A, B, C, one using `{{index}}` labels
 * them 1, 2, 3.
 */
export function GroupField({ field, value, onChange, label }: GroupFieldProps) {
	const entries: GroupEntry[] = Array.isArray(value)
		? (value.filter((entry) => !!entry && typeof entry === "object") as GroupEntry[])
		: [];
	const subFields = field.subFields ?? [];
	const lettered = (field.template ?? "").includes("{{letter}}");
	const noun = entryNoun(field.label);
	const entryName = (index: number) => `${noun} ${lettered ? letterFor(index) : index + 1}`;

	const patch = (index: number, name: string, next: unknown) =>
		onChange(entries.map((entry, at) => (at === index ? { ...entry, [name]: next } : entry)));

	const move = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= entries.length) return;
		const next = [...entries];
		[next[index], next[target]] = [next[target], next[index]];
		onChange(next);
	};

	return (
		<Field
			label={label}
			hint={field.hint}
			wide
			meta={entries.length ? `${entries.length} added` : undefined}
		>
			<div className="flex flex-col gap-2">
				{entries.map((entry, index) => (
					<div
						key={index}
						className="animate-fade rounded-2xl border border-subtle bg-surface-2/60 p-3"
					>
						<header className="mb-2.5 flex items-center gap-2">
							<span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-subtle bg-surface font-mono text-[11px] text-ink-muted">
								{lettered ? letterFor(index) : index + 1}
							</span>
							<span className="text-[12.5px] font-medium text-ink capitalize">{entryName(index)}</span>
							<div className="ml-auto flex shrink-0 items-center gap-0.5">
								<Button
									size="icon-sm"
									variant="ghost"
									title="Move up"
									aria-label={`Move ${entryName(index)} up`}
									disabled={index === 0}
									onClick={() => move(index, -1)}
								>
									<ArrowUp />
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									title="Move down"
									aria-label={`Move ${entryName(index)} down`}
									disabled={index === entries.length - 1}
									onClick={() => move(index, 1)}
								>
									<ArrowDown />
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									title={`Remove ${entryName(index)} — its block comes out of the body with it`}
									aria-label={`Remove ${entryName(index)}`}
									onClick={() => onChange(entries.filter((_, at) => at !== index))}
								>
									<Trash2 />
								</Button>
							</div>
						</header>

						<div className="grid gap-2.5">
							{subFields.map((sub) => {
								const id = `${field.name}-${index}-${sub.name}`;
								return (
									<div key={sub.name} className="flex flex-col gap-1">
										<Label htmlFor={id} className="text-[11.5px]">
											{sub.label || sub.name}
										</Label>
										<SubInput
											id={id}
											sub={sub}
											value={(entry as Record<string, unknown>)[sub.name]}
											onChange={(next) => patch(index, sub.name, next)}
										/>
									</div>
								);
							})}
						</div>
					</div>
				))}

				<Button variant="secondary" size="sm" className="self-start" onClick={() => onChange([...entries, {}])}>
					<Plus />
					Add {noun}
				</Button>

				{!entries.length ? (
					<p className="text-[11.5px] text-ink-faint">
						Nothing added yet — the body prints nothing where this block goes.
					</p>
				) : null}
			</div>
		</Field>
	);
}
