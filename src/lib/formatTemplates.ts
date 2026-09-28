import type { DeputyData, FormatData, divisionsType } from "@/types";

/** Matches {{token}} placeholders; whitespace inside the braces is ignored. */
const TOKEN_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;

/** Values a format body's tokens are filled from. */
export interface TemplateContext {
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
}

/** Turns a field value into text; lists become one `[*]` bullet per entry. */
const stringify = (value: unknown): string => {
	if (value === undefined || value === null) return "";
	if (Array.isArray(value)) return value.map((entry) => `[*]${String(entry)}`).join("\n");
	return String(value);
};

/**
 * Fills a format body's {{token}} placeholders. A token can be any form field
 * name (see FormatData in src/types.ts), or one of the deputy profile's own
 * values — `name`, `signature`, `dRank` and `badgeNumber` — plus `division` and
 * `rankName`. Unknown tokens are replaced with an empty string so a typo never
 * leaks braces into a report.
 */
export const renderFormatTemplate = (template: string, context: TemplateContext): string => {
	if (!template || !template.includes("{{")) return template;

	const { formatData, deputyData, division } = context;
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

	return template.replace(TOKEN_PATTERN, (_match, token: string) => stringify(values[token]));
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
