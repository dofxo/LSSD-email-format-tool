import { useMemo, useState } from "react";
import { Check, Sparkles, TriangleAlert } from "lucide-react";

import { FieldPicker } from "@/components/admin/FieldPicker";
import { Button } from "@/components/ui/button";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import type { CatalogueInput } from "@/lib/inputDefinitions";
import { plainLabel } from "@/lib/labelText";
import { cn } from "@/lib/utils";

interface BodyVariablesProps {
	/** The body being edited, scanned for `{{tokens}}`. */
	body: string;
	/**
	 * The fields this format has, in the order its form asks for them. The chips
	 * offered are these alone — the picker below is how every other field is
	 * reached — and a label here is the wording this format shows for it.
	 */
	fields?: { name: string; label?: string }[];
	/** Drops `{{token}}` in at the caret, replacing whatever is selected. */
	onInsert: (token: string) => void;
	/** Creates a brand-new catalogue field and inserts its token. */
	onCreate: (input: CatalogueInput) => void;
	/** Deletes an admin-created field from the catalogue; row-level guards decide which rows show it. */
	onDelete?: (input: CatalogueInput) => void;
	/** Which fields are deletable, with the reason shown on hover when not. */
	deleteGuard?: (name: string) => { ok: boolean; reason?: string };
	/** Rewrites an admin-created field's own definition, from the picker's pencil. */
	onEditField?: (input: CatalogueInput) => void;
	/** Which fields may have their definition changed; built-ins show a muted pencil. */
	fieldGuard?: (name: string) => { ok: boolean; reason?: string };
	/**
	 * Turns a loaded (generated) body into variables; leave out when there is no
	 * generated output to match against, such as a brand-new format.
	 */
	onAutoTokenize?: () => {
		tokenized: string[];
		skipped: string[];
		refused?: boolean;
	} | null;
}

/** Profile values, which have a list of their own and so never a chip in this one. */
const PROFILE_TOKEN_NAMES = new Set(profileTokens.map((token) => token.token));

/** The chip a token is clicked by; keeps the caret in the body. */
const chipClass =
	"flex cursor-pointer items-center gap-1.5 rounded-lg border border-subtle bg-surface px-2 py-1 text-[11.5px] transition-colors duration-150 hover:border-accent/40 hover:bg-accent-soft";

/**
 * One clickable token: a deputy-profile value, or a field made at /admin.
 *
 * Clicking writes its `{{token}}` at the body's caret, and the tick says the
 * body already prints it. Cancelling the mousedown keeps the caret where it was
 * in the textarea, since the button would otherwise take focus and lose it.
 */
function TokenChip({
	token,
	label,
	title,
	inUse,
	onInsert,
}: {
	token: string;
	label: string;
	title: string;
	inUse: boolean;
	onInsert: (token: string) => void;
}) {
	return (
		<button
			type="button"
			onMouseDown={(event) => event.preventDefault()}
			onClick={() => onInsert(token)}
			title={title}
			className={cn(chipClass, inUse && "border-accent/40 bg-accent-soft")}
		>
			<span className="font-mono">{`{{${token}}}`}</span>
			{label ? <span className="max-w-[14rem] truncate text-ink-faint">{label}</span> : null}
			{inUse ? <Check className="size-3 shrink-0 text-success" /> : null}
		</button>
	);
}

/**
 * The field side of the body editor: the parts of the body that are filled in
 * when the format is used, and where each value comes from.
 *
 * Fields are chosen by type rather than by name — the body is what decides which
 * field a `{{token}}` means, so nothing here asks you to remember a variable.
 * Inserting replaces the selected text, which is how an existing (generated)
 * body is turned into a template: select a name in the text, then add the field
 * that should supply it.
 */
export function BodyVariables({
	body,
	fields,
	onInsert,
	onCreate,
	onDelete,
	deleteGuard,
	onEditField,
	fieldGuard,
	onAutoTokenize,
}: BodyVariablesProps) {
	const [summary, setSummary] = useState<{
		tokenized: string[];
		skipped: string[];
		refused?: boolean;
	} | null>(null);

	const used = useMemo(() => bodyTokens(body), [body]);
	const usedNames = new Set(used);

	// This format's own fields, and nothing else: a chip is here because the
	// format asks for that field, not because the field exists somewhere in the
	// catalogue. Where the format states its own wording, that is what the chip
	// shows; otherwise it falls back to the catalogue's label.
	const ownFields = (fields ?? [])
		.filter((field) => !PROFILE_TOKEN_NAMES.has(field.name))
		.map((field) => {
			const definition = catalogueInputFor(field.name);
			return {
				name: field.name,
				label: field.label?.trim() || (definition ? plainLabel(definition.label) : ""),
			};
		});

	// A token nothing can fill: neither a catalogue field nor a profile value.
	const unknown = used.filter((token) => !PROFILE_TOKEN_NAMES.has(token) && !catalogueInputFor(token));

	return (
		<div className="flex flex-col gap-3.5 rounded-2xl border border-subtle bg-surface-2/40 p-3.5">
			<div className="flex flex-col gap-1">
				<span className="text-[12.5px] font-medium text-ink">Fields</span>
				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					The body is what the format asks for: wrap any part of it in double braces and that text is
					replaced with a field when the format is used. Pick a field below to write its{" "}
					<code className="font-mono">{'{{token}}'}</code> at the caret, or select part of the body first
					to swap that exact text for the field. A field you create joins the format without touching the
					body — place it from Your fields below when you are ready to.
				</p>
			</div>

			{onAutoTokenize ? (
				<div className="flex flex-col gap-1.5 rounded-xl border border-subtle bg-surface/60 px-3 py-2">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-[12px] font-medium text-ink">Existing format?</span>
						<Button size="sm" variant="secondary" onClick={() => setSummary(onAutoTokenize())}>
							<Sparkles />
							Match the output to its fields
						</Button>
					</div>
					<p className="text-[11.5px] leading-relaxed text-ink-faint">
						Works out which parts of the text below came from which field and swaps those parts for
						fields, so a format that predates this editor only needs a look-over instead of a rewrite.
						Anything it cannot match exactly is left for you.
					</p>
				</div>
			) : null}

			{/* The report lives outside the button, since a successful match removes it. */}
			{summary ? (
				<div className="rounded-xl border border-subtle bg-surface/60 px-3 py-2">
					<p className="text-[11.5px] leading-relaxed">
						{summary.tokenized.length ? (
							<span className="text-success">
								Swapped in {summary.tokenized.length} field
								{summary.tokenized.length === 1 ? "" : "s"}:{" "}
								{summary.tokenized.map((token) => `{{${token}}}`).join(", ")}.
								{summary.skipped.length ? (
									<span className="text-ink-muted">
										{" "}
										Left alone because the format reshapes them: {summary.skipped.join(", ")}.
									</span>
								) : null}
							</span>
						) : summary.refused ? (
							<span className="text-warning">
								This format changes its wording based on other inputs (a rank shown as ”Mr.” or
								”Ms.”, a line that only appears for some answers), so it cannot be frozen into a
								template without printing the wrong text. Edit the body by hand instead.
							</span>
						) : (
							<span className="text-ink-muted">
								Nothing in this body comes from a field — it reads the same every time.
							</span>
						)}
					</p>
				</div>
			) : null}

			<div className="flex flex-col gap-1.5">
				<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
					Add a field
				</span>
				<FieldPicker
					used={used}
					onPick={onInsert}
					onCreate={onCreate}
					onDelete={onDelete}
					deleteGuard={deleteGuard}
					onEdit={onEditField}
					editGuard={fieldGuard}
				/>
			</div>

			{/* This format's own fields, beside the profile values: the two are the
			    same gesture, so they look and behave the same way. */}
			{ownFields.length ? (
				<div className="flex flex-col gap-1.5">
					<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
						Your fields
					</span>
					<div className="thin-scroll flex max-h-[9.5rem] flex-wrap gap-1.5 overflow-y-auto pr-1">
						{ownFields.map((field) => {
							const inUse = usedNames.has(field.name);
							return (
								<TokenChip
									key={field.name}
									token={field.name}
									label={field.label}
									title={
										inUse
											? `Already in this body — {{${field.name}}}`
											: `Insert {{${field.name}}} — ${field.label || "no wording yet"}`
									}
									inUse={inUse}
									onInsert={onInsert}
								/>
							);
						})}
					</div>
				</div>
			) : null}

			<div className="flex flex-col gap-1.5">
				<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
					From the profile
				</span>
				<div className="flex flex-wrap gap-1.5">
					{profileTokens.map((token) => {
						const inUse = usedNames.has(token.token);
						return (
							<TokenChip
								key={token.token}
								token={token.token}
								label={token.label}
								title={
									inUse
										? `Already used in this body — {{${token.token}}} is ${token.label.toLowerCase()}`
										: `Insert {{${token.token}}} — ${token.label}`
								}
								inUse={inUse}
								onInsert={onInsert}
							/>
						);
					})}
				</div>
			</div>

			{unknown.length ? (
				<div className="flex flex-col gap-1.5 rounded-xl border border-warning/30 bg-warning-soft px-3 py-2 text-[11.5px] leading-relaxed text-warning">
					{unknown.map((token) => (
						<span key={token} className="flex items-start gap-1.5">
							<TriangleAlert className="mt-px size-3.5 shrink-0" />
							<span>
								<code className="font-mono">{`{{${token}}}`}</code> is not a field, so it will come
								out blank. Pick one of the fields above instead.
							</span>
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}
