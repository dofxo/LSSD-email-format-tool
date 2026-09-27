import { useMemo, useState } from "react";
import { Check, Sparkles, TriangleAlert } from "lucide-react";

import { FieldPicker } from "@/components/admin/FieldPicker";
import { Button } from "@/components/ui/button";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import type { CatalogueInput } from "@/lib/inputDefinitions";
import { cn } from "@/lib/utils";

interface BodyVariablesProps {
	/** The body being edited, scanned for `{{tokens}}`. */
	body: string;
	/** Drops `{{token}}` in at the caret, replacing whatever is selected. */
	onInsert: (token: string) => void;
	/** Creates a brand-new catalogue field and inserts its token. */
	onCreate: (input: CatalogueInput) => void;
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

/** The chip a profile value is clicked by; keeps the caret in the body. */
const chipClass =
	"flex cursor-pointer items-center gap-1.5 rounded-lg border border-subtle bg-surface px-2 py-1 text-[11.5px] transition-colors duration-150 hover:border-accent/40 hover:bg-accent-soft";

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
export function BodyVariables({ body, onInsert, onCreate, onAutoTokenize }: BodyVariablesProps) {
	const [summary, setSummary] = useState<{
		tokenized: string[];
		skipped: string[];
		refused?: boolean;
	} | null>(null);

	const used = useMemo(() => bodyTokens(body), [body]);
	const usedNames = new Set(used);
	const fromProfile = new Set(profileTokens.map((token) => token.token));

	// A token nothing can fill: neither a catalogue field nor a profile value.
	const unknown = used.filter((token) => !fromProfile.has(token) && !catalogueInputFor(token));

	return (
		<div className="flex flex-col gap-3.5 rounded-2xl border border-subtle bg-surface-2/40 p-3.5">
			<div className="flex flex-col gap-1">
				<span className="text-[12.5px] font-medium text-ink">Fields</span>
				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					The body is what the format asks for: wrap any part of it in double braces and that text is
					replaced with a field when the format is used. Add a field below to drop it in at the caret, or
					select part of the body first to swap that exact text for the field.
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
				<FieldPicker used={used} onPick={onInsert} onCreate={onCreate} />
			</div>

			<div className="flex flex-col gap-1.5">
				<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
					From the profile
				</span>
				<div className="flex flex-wrap gap-1.5">
					{profileTokens.map((token) => {
						const inUse = usedNames.has(token.token);
						return (
							<button
								key={token.token}
								type="button"
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => onInsert(token.token)}
								title={
									inUse
										? `Already used in this body — {{${token.token}}} is ${token.label.toLowerCase()}`
										: `Insert {{${token.token}}} — ${token.label}`
								}
								className={cn(chipClass, inUse && "border-accent/40 bg-accent-soft")}
							>
								<span className="font-mono">{`{{${token.token}}}`}</span>
								<span className="max-w-[14rem] truncate text-ink-faint">{token.label}</span>
								{inUse ? <Check className="size-3 shrink-0 text-success" /> : null}
							</button>
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
