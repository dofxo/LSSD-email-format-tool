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
 * name (see FormatData in src/types.ts), the deputy profile's `name`,
 * `signature` or `dRank`, plus `division` and `rankName`. Unknown tokens are
 * replaced with an empty string so a typo never leaks braces into a report.
 */
export const renderFormatTemplate = (template: string, context: TemplateContext): string => {
	if (!template || !template.includes("{{")) return template;

	const { formatData, deputyData, division } = context;
	const values: Record<string, unknown> = {
		...formatData,
		name: deputyData.name,
		signature: deputyData.signature,
		dRank: deputyData.dRank,
		division,
		rankName: [deputyData.dRank, deputyData.name].filter(Boolean).join(" "),
	};

	return template.replace(TOKEN_PATTERN, (_match, token: string) => stringify(values[token]));
};

/**
 * Tokens that always resolve, whichever fields a format declares: they come
 * from the deputy profile rather than from a form input.
 */
export const profileTokens: { token: string; label: string }[] = [
	{ token: "name", label: "Deputy full name (profile)" },
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
