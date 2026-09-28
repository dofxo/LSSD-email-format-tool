import { checkboxRuns, runMatchesChoices, tickRun, tickedKeysFor } from "@/lib/checkboxLines";
import type { DeputyData, FormatData, divisionsType } from "@/types";

/** Matches {{token}} placeholders; whitespace inside the braces is ignored. */
const TOKEN_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;

/** The choices of one checkbox field, as its body prints them. */
export interface CheckboxFieldSpec {
	/** The field's token name; its ticks are stored under it. */
	name: string;
	/** The `[cb]` lines it answers for, in order. */
	items: string[];
}

/** Values a format body's tokens are filled from. */
export interface TemplateContext {
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
	/**
	 * The format's checkbox fields, in the order its form asks for them.
	 *
	 * A checkbox field works either way round. With its `{{token}}` in the body it
	 * prints the whole block there — one `[cb]` line per choice, `[cbc]` for the
	 * ticked ones. Without a token it ticks the block of `[cb]` lines the body
	 * already carries and its choices name, so the list is left exactly as written
	 * and only the ticked lines change.
	 */
	checkboxFields?: CheckboxFieldSpec[];
}

/** Turns a field value into text; lists become one `[*]` bullet per entry. */
const stringify = (value: unknown): string => {
	if (value === undefined || value === null) return "";
	if (Array.isArray(value)) return value.map((entry) => `[*]${String(entry)}`).join("\n");
	return String(value);
};

/**
 * The `[cb]` block a checkbox token prints: one line per choice, in the order
 * they were defined, with the ticked ones written `[cbc]` instead. Ticks are
 * stored the way the checklist does — `"<fieldName>:<index>"` keys — with a
 * bare index accepted so a hand-edited store still reads back.
 */
const checkboxBlockFor = (name: string, choices: string[], value: unknown): string => {
	const ticked = tickedKeysFor(value);
	return choices
		.map((choice, index) => `${ticked.has(`${name}:${index}`) || ticked.has(String(index)) ? "[cbc]" : "[cb]"} ${choice}`)
		.join("\n");
};

/** Expands each checkbox field's `{{token}}` into the block of lines it prints. */
const expandCheckboxTokens = (
	template: string,
	fields: CheckboxFieldSpec[],
	values: Record<string, unknown>,
): string => {
	if (!fields.length || !template.includes("{{")) return template;
	const byName = new Map(fields.map((field) => [field.name, field]));
	return template.replace(TOKEN_PATTERN, (match, token: string) => {
		const field = byName.get(token);
		return field ? checkboxBlockFor(field.name, field.items, values[token]) : match;
	});
};

/**
 * Fills a format body's {{token}} placeholders. A token can be any form field
 * name (see FormatData in src/types.ts), or one of the deputy profile's own
 * values — `name`, `signature`, `dRank` and `badgeNumber` — plus `division` and
 * `rankName`. Unknown tokens are replaced with an empty string so a typo never
 * leaks braces into a report.
 *
 * Checkbox fields are settled first, since each one is either a block of text a
 * token prints or a block of `[cb]` lines already in the body that its ticks
 * flip in place.
 */
export const renderFormatTemplate = (template: string, context: TemplateContext): string => {
	const { formatData, deputyData, division, checkboxFields = [] } = context;
	if (!template || (!template.includes("{{") && !checkboxFields.length)) return template;
	const profile: Record<string, unknown> = {
		name: deputyData.name,
		signature: deputyData.signature,
		dRank: deputyData.dRank,
		badgeNumber: deputyData.badgeNumber,
		division,
		rankName: [deputyData.dRank, deputyData.name].filter(Boolean).join(" "),
	};

	// A format's own answer wins, since it is the one just typed in; whatever the
	// form left blank — a field it never showed, or one still empty — falls back to
	// the profile. That is what lets {{badgeNumber}} print from the profile in a
	// format that does not ask for one, while a format that does ask keeps the
	// answer given to it.
	const values: Record<string, unknown> = { ...profile, ...formatData };
	for (const [token, fallback] of Object.entries(profile)) {
		if (!values[token]) values[token] = fallback;
	}

	// A field whose token the body carries prints its block there instead of
	// ticking one, so only the token-less fields look for a run of lines.
	const tokens = new Set(bodyTokens(template));
	const runFields = checkboxFields.filter((field) => !tokens.has(field.name));
	let withTicks = template;

	if (runFields.length) {
		const lines = template.split("\n");
		const runs = checkboxRuns(lines);
		// Each field takes the first block its choices name that no other field has
		// taken, so two blocks listing the same words stay independent.
		const taken = new Set<number>();
		let ticked = false;

		for (const field of runFields) {
			const value = values[field.name];
			// Nothing answered yet: the body's own lines stand as written.
			if (value === undefined || value === null) continue;

			const index = runs.findIndex((run, at) => !taken.has(at) && runMatchesChoices(run, field.items));
			if (index === -1) continue;
			taken.add(index);
			tickRun(lines, runs[index], field.name, tickedKeysFor(value));
			ticked = true;
		}

		if (ticked) withTicks = lines.join("\n");
	}

	// Checkbox tokens expand next: their block of [cb] lines is literal output, so
	// the ordinary fill below must not see the token.
	const expanded = expandCheckboxTokens(withTicks, checkboxFields, values);

	return expanded.replace(TOKEN_PATTERN, (_match, token: string) => stringify(values[token]));
};

/**
 * Tokens that always resolve, whichever fields a format declares: they come
 * from the deputy profile rather than from a form input. They are what the body
 * editor offers under “From the profile”.
 */
export const profileTokens: { token: string; label: string }[] = [
	{ token: "name", label: "Deputy full name (profile)" },
	{ token: "badgeNumber", label: "Deputy badge number (profile)" },
	{ token: "dRank", label: "Deputy rank (profile)" },
	{ token: "rankName", label: "Rank and name together (profile)" },
	{ token: "signature", label: "Signature image URL (profile)" },
	{ token: "division", label: "Division the format belongs to" },
];

/**
 * Every distinct `{{token}}` a body references, in the order they appear. Used
 * by the admin body editor to show what a template is wired up to, and to call
 * out tokens no input can ever fill.
 */
export const bodyTokens = (body: string): string[] =>
	[...new Set(Array.from(body.matchAll(TOKEN_PATTERN), (match) => match[1].trim()))];

/** A run of body text, either plain or a whole `{{token}}` placeholder. */
export interface BodySegment {
	/** The exact text, braces and spacing included, so it can be printed back verbatim. */
	text: string;
	/** The token's name, set only on placeholder segments. */
	token?: string;
}

/**
 * A body cut into plain runs and `{{token}}` placeholders, in order. The admin
 * body editor draws this over the textarea to pick the tokens out of the text,
 * which a textarea itself cannot do — it styles one block of text, not parts of
 * it.
 */
export const bodySegments = (body: string): BodySegment[] => {
	const segments: BodySegment[] = [];
	let end = 0;
	for (const match of body.matchAll(TOKEN_PATTERN)) {
		const start = match.index ?? 0;
		if (start > end) segments.push({ text: body.slice(end, start) });
		segments.push({ text: match[0], token: match[1].trim() });
		end = start + match[0].length;
	}
	if (end < body.length) segments.push({ text: body.slice(end) });
	return segments;
};
