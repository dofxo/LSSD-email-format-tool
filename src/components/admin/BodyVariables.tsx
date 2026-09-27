import { useMemo, useState } from "react";
import { Plus, Sparkles, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bodyTokens, profileTokens } from "@/lib/formatTemplates";
import { FIELD_TYPES, TYPE_LABELS } from "@/lib/fieldTypes";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { FormatInputField } from "@/types";

interface BodyVariablesProps {
	/** The format this body belongs to, so a new input can be ticked for it. */
	formatId: string;
	/** Every input field in the division, whether or not it serves this format. */
	divisionFields: FormatInputField[];
	/** The body being edited, scanned for `{{tokens}}`. */
	body: string;
	/** Drops `{{token}}` in at the caret, replacing whatever is selected. */
	onInsert: (token: string) => void;
	/** Adds an input bound to this format; leave out to hide the creator. */
	onCreateField?: (field: FormatInputField) => void;
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

/** The chip a variable is clicked by; prevents the caret leaving the body. */
const chipClass =
	"flex cursor-pointer items-center gap-1.5 rounded-lg border border-subtle bg-surface px-2 py-1 text-[11.5px] transition-colors duration-150 hover:border-accent/40 hover:bg-accent-soft";

/**
 * The variable side of the body editor: which `{{tokens}}` this format can fill
 * in, where each value comes from, and what a body is currently wired up to.
 *
 * Inserting replaces the selected text, which is how an existing (generated)
 * body is turned into a template: select a name in the text, click the input
 * that should supply it, and that part becomes a token.
 */
export function BodyVariables({
	formatId,
	divisionFields,
	body,
	onInsert,
	onCreateField,
	onAutoTokenize,
}: BodyVariablesProps) {
	const [name, setName] = useState("");
	const [summary, setSummary] = useState<{
		tokenized: string[];
		skipped: string[];
		refused?: boolean;
	} | null>(null);
	const [label, setLabel] = useState("");
	const [type, setType] = useState<FormatInputField["type"]>("text");

	/** Inputs that actually answer this format — the ones the user will see. */
	const fields = useMemo(
		() => divisionFields.filter((field) => field.formats.includes(formatId)),
		[divisionFields, formatId],
	);

	const used = useMemo(() => bodyTokens(body), [body]);
	const answerable = new Set(fields.map((field) => field.name));
	const known = new Set(divisionFields.map((field) => field.name));
	const fromProfile = new Set(profileTokens.map((token) => token.token));

	// A token is a problem when nothing will fill it: no input has that name at
	// all, or the input exists but is not asked for by this format.
	const unanswered = used.filter((token) => !fromProfile.has(token) && !answerable.has(token));
	const unknown = unanswered.filter((token) => !known.has(token));
	const unticked = unanswered.filter((token) => known.has(token));
	const unused = fields.filter((field) => !used.includes(field.name));
	// renderFormatTemplate spreads the form data first and the profile over it, so
	// a field sharing a profile name can never win — worth flagging here.
	const collisions = fields.filter((field) => fromProfile.has(field.name));

	const trimmedName = name.trim();
	const canAdd = Boolean(onCreateField) && trimmedName.length > 0;

	const addField = () => {
		if (!canAdd || !onCreateField) return;
		onCreateField({
			name: trimmedName,
			label: label.trim() || trimmedName,
			type,
			formats: [formatId],
		});
		setName("");
		setLabel("");
		setType("text");
	};

	return (
		<div className="flex flex-col gap-3.5 rounded-2xl border border-subtle bg-surface-2/40 p-3.5">
			<div className="flex flex-col gap-1">
				<span className="text-[12.5px] font-medium text-ink">Variables</span>
				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					Wrap any part of the body in double braces —{" "}
					<code className="font-mono text-ink-muted">{`{{name}}`}</code> — and it is replaced with
					that value when the format is used. Click a variable to add it at the caret, or select a
					part of the body first to swap that exact text for the variable.
				</p>
			</div>

			{onAutoTokenize ? (
				<div className="flex flex-col gap-1.5 rounded-xl border border-subtle bg-surface/60 px-3 py-2">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-[12px] font-medium text-ink">Existing format?</span>
						<Button size="sm" variant="secondary" onClick={() => setSummary(onAutoTokenize())}>
							<Sparkles />
							Match the output to its inputs
						</Button>
					</div>
					<p className="text-[11.5px] leading-relaxed text-ink-faint">
						Works out which parts of the text below came from which input and swaps those parts for
						variables, so a format that predates this editor only needs a look-over instead of a
						rewrite. Anything it cannot match exactly is left for you.
					</p>
				</div>
			) : null}

			{/* The report lives outside the button, since a successful match removes it. */}
			{summary ? (
				<div className="rounded-xl border border-subtle bg-surface/60 px-3 py-2">
					<p className="text-[11.5px] leading-relaxed">
							{summary.tokenized.length ? (
								<span className="text-success">
									Swapped in {summary.tokenized.length} variable
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
									Nothing in this body comes from an input — it reads the same every time.
								</span>
							)}
					</p>
				</div>
			) : null}

			<div className="flex flex-col gap-1.5">
				<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
					From an input
				</span>
				{fields.length === 0 ? (
					<p className="text-[11.5px] leading-relaxed text-ink-muted">
						No input asks for this format yet. Add one below and it will be ticked for format{" "}
						<span className="font-mono text-ink-muted">{formatId}</span> automatically.
					</p>
				) : (
					<div className="flex flex-wrap gap-1.5">
						{fields.map((field) => (
							<button
								key={field.name}
								type="button"
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => onInsert(field.name)}
								title={`Insert {{${field.name}}} — filled by “${field.label}”`}
								className={chipClass}
							>
								<span className="font-mono">{`{{${field.name}}}`}</span>
								<span className="max-w-[14rem] truncate text-ink-faint">{field.label}</span>
							</button>
						))}
					</div>
				)}
			</div>

			<div className="flex flex-col gap-1.5">
				<span className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
					From the profile
				</span>
				<div className="flex flex-wrap gap-1.5">
					{profileTokens.map((token) => (
						<button
							key={token.token}
							type="button"
							onMouseDown={(event) => event.preventDefault()}
							onClick={() => onInsert(token.token)}
							title={`Insert {{${token.token}}} — ${token.label}`}
							className={chipClass}
						>
							<span className="font-mono">{`{{${token.token}}}`}</span>
							<span className="max-w-[14rem] truncate text-ink-faint">{token.label}</span>
						</button>
					))}
				</div>
			</div>

			{onCreateField ? (
				<div className="flex flex-col gap-2 rounded-xl border border-dashed border-strong/70 bg-surface/60 p-3">
					<span className="text-[12px] font-medium text-ink">New input for this format</span>
					<div className="flex flex-wrap items-center gap-2">
						<Input
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="fieldName"
							aria-label="New input name"
							className="h-9 w-[9.5rem] font-mono text-[12.5px]"
						/>
						<Input
							value={label}
							onChange={(event) => setLabel(event.target.value)}
							placeholder="Question shown above the input"
							aria-label="New input label"
							className="h-9 min-w-[12rem] flex-1 text-[12.5px]"
						/>
						<select
							value={type}
							onChange={(event) => setType(event.target.value as FormatInputField["type"])}
							aria-label="New input type"
							className={cn(controlFieldClass, "h-9 max-w-[12rem] px-2.5 text-[12.5px]")}
						>
							{FIELD_TYPES.map((option) => (
								<option key={option} value={option}>
									{TYPE_LABELS[option]}
								</option>
							))}
						</select>
						<Button size="sm" variant="secondary" disabled={!canAdd} onClick={addField}>
							<Plus />
							Add input
						</Button>
					</div>
					<p className="text-[11.5px] leading-relaxed text-ink-faint">
						The name is the token:{" "}
						<code className="font-mono text-ink-muted">{`{{${trimmedName || "fieldName"}}}`}</code>. It
						is also ticked for this format, so it shows up on the form.
					</p>
				</div>
			) : null}

			{unknown.length || unticked.length || collisions.length ? (
				<div className="flex flex-col gap-1.5 rounded-xl border border-warning/30 bg-warning-soft px-3 py-2 text-[11.5px] leading-relaxed text-warning">
					{collisions.map((field) => (
						<span key={field.name} className="flex items-start gap-1.5">
							<TriangleAlert className="mt-px size-3.5 shrink-0" />
							<span>
								The input <code className="font-mono">{field.name}</code> shares its name with a
								profile value, and the profile wins — <code className="font-mono">{`{{${field.name}}}`}</code>{" "}
								always comes out as the deputy's own. Rename the input to use both.
							</span>
						</span>
					))}
					{unknown.map((token) => (
						<span key={token} className="flex items-start gap-1.5">
							<TriangleAlert className="mt-px size-3.5 shrink-0" />
							<span>
								<code className="font-mono">{`{{${token}}}`}</code> has no input of that name, so it
								will come out blank. Add an input with that name, or remove the token.
							</span>
						</span>
					))}
					{unticked.map((token) => (
						<span key={token} className="flex items-start gap-1.5">
							<TriangleAlert className="mt-px size-3.5 shrink-0" />
							<span>
								<code className="font-mono">{`{{${token}}}`}</code> is filled by an input that is not
								asked for by this format, so it will come out blank. Tick this format on that input
								in the Input fields panel.
							</span>
						</span>
					))}
				</div>
			) : null}

			{unused.length ? (
				<p className="text-[11.5px] leading-relaxed text-ink-faint">
					Not used in the body yet:{" "}
					{unused.map((field) => `{{${field.name}}}`).join(", ")} — the form still asks for them, and
					they come out blank in the post.
				</p>
			) : null}
		</div>
	);
}
