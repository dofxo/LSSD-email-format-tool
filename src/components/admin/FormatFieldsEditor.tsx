import { useState } from "react";
import { ArrowDown, ArrowUp, Check, Pencil, Trash2, TriangleAlert, X } from "lucide-react";
import { copyText } from "@/hooks/useCopy";
import { toast } from "react-toastify";

import { FieldPicker } from "@/components/admin/FieldPicker";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { catalogueInputFor, isCatalogueField } from "@/data/inputCatalogue";
import { isValidTokenName, TYPE_LABELS } from "@/lib/inputDefinitions";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import type { CatalogueInput } from "@/lib/inputDefinitions";
import type { FormatFieldPick } from "@/types";

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
	/** Takes a field's `{{token}}` back out of the body (token-driven rows only). */
	onRemoveFromBody?: (name: string) => void;
	/**
	 * Renames a `{{token}}` in the body being edited (token-driven rows only).
	 * The caller rewrites the body and makes sure a field answers to the new
	 * name, so the token never points at nothing.
	 */
	onRenameField?: (from: string, to: string) => void;
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
 * the fields, so this edits their wording and their token names: a row's pencil
 * retypes the `{{token}}` itself, in every place the body uses it.
 */
export function FormatFieldsEditor({ tokenDriven, body, picks, onChange, onCreate, onDelete, deleteGuard, onRemoveFromBody, onRenameField }: FormatFieldsEditorProps) {
	const tokens = tokenDriven ? [...new Set(bodyTokens(body))] : [];
	// The token currently being retyped, and what has been typed into it.
	const [renaming, setRenaming] = useState<{ from: string; value: string } | null>(null);
	const unknown = tokenDriven
		? tokens.filter((token) => !PROFILE_TOKENS.has(token) && !isCatalogueField(token))
		: [];

	// The rows to show: the body's tokens, or the picked fields, in order.
	const names = tokenDriven ? tokens.filter((token) => isCatalogueField(token)) : picks.map((pick) => pick.name);
	const pickByName = new Map(picks.map((pick) => [pick.name, pick]));

	const setWording = (name: string, patch: Pick<FormatFieldPick, "label" | "hint">) =>
		onChange(withWording(picks, name, patch));

	const addField = (name: string) => {
		if (!name || names.includes(name)) return;
		onChange([...picks, { name }]);
	};

	// Two rows rendering the same type and wording are impossible to tell apart,
	// so each one says when it has a twin.
	const rowKeys = names.map((name) => {
		const definition = catalogueInputFor(name)!;
		const wording = pickByName.get(name)?.label?.trim() || definition.label;
		return `${definition.type}:${wording.trim().toLowerCase()}`;
	});

	const removeField = (name: string) => onChange(picks.filter((pick) => pick.name !== name));

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
		const index = picks.findIndex((pick) => pick.name === name);
		const target = index + direction;
		if (index === -1 || target < 0 || target >= picks.length) return;
		const next = [...picks];
		[next[index], next[target]] = [next[target], next[index]];
		onChange(next);
	};

	return (
		<div className="flex flex-col gap-2.5 rounded-2xl border border-subtle bg-surface-2/40 p-3.5">
			<div className="flex flex-col gap-1">
				<span className="text-[12.5px] font-medium text-ink">Fields</span>
				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					{tokenDriven ? (
						<>
							This format has its own body, so its fields are the ones that body asks for — {names.length}{" "}
							of them. Add one from the body editor above, rename its <code className="font-mono">{'{{token}}'}</code>{" "}
							with the pencil, or take it back out with the trash. Edit a label or hint to word a
							field differently for this format.
						</>
					) : (
						<>
							The fields this format's form asks for, in order. Each one is a field type with its own
							wording — pick a type below, and edit the label or hint to word it for this format alone.
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
					return (							<div key={name} className="rounded-xl border border-subtle bg-surface/60 p-2.5">
								<div className="flex items-center gap-2">
									<span className="shrink-0 rounded-full border border-subtle bg-surface-2 px-2 py-0.5 text-[11px] text-ink-muted">
										{TYPE_LABELS[definition.type]}
									</span>
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
								{rowKeys.filter((key) => key === rowKeys[position]).length > 1 ? (
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
								{tokenDriven && onRemoveFromBody ? (
									<Button
										size="icon-sm"
										variant="ghost"
										title="Remove this field from the body"
										aria-label={`Remove ${name} from the body`}
										onClick={() => onRemoveFromBody(name)}
									>
										<Trash2 />
									</Button>
								) : null}
								{!tokenDriven ? (
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
										<Button
											size="icon-sm"
											variant="ghost"
											title="Remove this field"
											aria-label={`Remove ${name}`}
											onClick={() => removeField(name)}
										>
											<Trash2 />
										</Button>
									</div>
								) : null}
							</div>

							<div className="mt-2.5 grid gap-2.5">
								<Field label="Label" htmlFor={`pick-label-${name}`} hint="The question shown above the input.">
									<Input
										id={`pick-label-${name}`}
										value={pick?.label ?? ""}
										placeholder={definition.label}
										onChange={(event) => setWording(name, { label: event.target.value, hint: pick?.hint })}
									/>
								</Field>
								<Field label="Hint" htmlFor={`pick-hint-${name}`} hint="Optional helper text under the input.">
									<Input
										id={`pick-hint-${name}`}
										value={pick?.hint ?? ""}
										placeholder={definition.hint ?? "No hint"}
										onChange={(event) => setWording(name, { label: pick?.label, hint: event.target.value })}
									/>
								</Field>
							</div>
						</div>
					);
				})}
			</div>

			{tokenDriven ? null : (
				<FieldPicker used={names} onPick={addField} onCreate={onCreate} onDelete={onDelete} deleteGuard={deleteGuard} />
			)}
		</div>
	);
}
