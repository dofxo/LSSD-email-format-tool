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

/** A short reference the admin editor shows above the body field. */
export const templateTokenHints: { token: string; description: string }[] = [
	{ token: "name", description: "Deputy's full name from the profile" },
	{ token: "dRank", description: "Deputy's department rank" },
	{ token: "signature", description: "Deputy's signature image URL" },
	{ token: "rankName", description: "`dRank name` combined" },
	{ token: "division", description: "The division the format belongs to" },
	{ token: "date", description: "The email date field" },
	{ token: "recipientName", description: "Recipient name (where the format has it)" },
	{ token: "applicantName", description: "RED applicant name" },
	{ token: "deputyName", description: "TSD/ATD deputy name" },
	{ token: "body", description: "Free body text (SEB emails)" },
];
