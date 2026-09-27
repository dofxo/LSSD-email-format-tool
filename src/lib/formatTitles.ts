import { adminTopicTitleFor } from "@/lib/adminFormats";
import { renderFormatTemplate } from "@/lib/formatTemplates";
import type { DeputyData, FormatData, divisionsType } from "@/types";

/**
 * Topic titles for the formats that create a post on the government website.
 *
 * Only formats listed here ask for a title; every other format is unchanged and
 * keeps its body-only flow. Anything saved at /admin wins over this table.
 */
export const titleTemplates: Partial<Record<divisionsType, Record<string, string>>> = {
	RED: {
		"13": "Interview Assessment - {{applicantName}}",
	},
	Supervisory: {
		"1": "Promotion Notice - {{recipientName}}",
		"2": "Academy Notice - {{recipientName}}",
		"3": "Demotion Notice - {{recipientName}}",
		"4": "Discharge Notice - {{recipientName}}",
		"5": "Suspension Notice - {{recipientName}}",
		"6": "Reinstatement Notice - {{recipientName}}",
		"7": "Reassignment Notice - {{recipientName}}",
		"8": "Transfer Notice - {{recipientName}}",
		"11": "Dishonourable Discharge - {{recipientName}}",
		"12": "Dishonourable Discharge - {{recipientName}}",
		"13": "Dishonourable Discharge - {{recipientName}}",
		"14": "Inactivity Notice - {{recipientName}}",
		"16": "Disciplinary Driving Assessment - {{recipientName}}",
	},
	FTB: {
		"1": "Field Training Session I - {{fts1Date}}",
		"2": "Field Training Session II - {{fts2Date}}",
		"3": "Field Training Session III - {{fts3Date}}",
		"4": "Field Training Evaluation - {{fteDate}}",
		"6": "Mock Pursuit Report - {{mprTraineeName}}",
		"7": "Reinstatement Theory Session - {{rtsDate}}",
		"8": "Reinstatement Evaluation - {{rteDate}}",
	},
	SEB: {
		"2": "Deployment Log - {{logDate}}",
		"3": "Patrol Log - {{logDate}}",
		"27": "Training Session: {{trainingName}}",
		"30": "Probationary Operator Profile - {{traineeName}}",
		"31": "OTP Session 1 - {{traineeName}}",
		"32": "OTP Session 2 - {{traineeName}}",
		"33": "OTP Session 3 - {{traineeName}}",
	},
};

/**
 * The raw title for a format, or null when it has none. A title saved at
 * /admin wins over the built-in table; an empty one there removes it.
 */
export const titleTemplateFor = (division: divisionsType, formatId: string): string | null => {
	if (!division || !formatId) return null;

	const admin = adminTopicTitleFor(division, formatId);
	if (admin !== undefined) return admin.trim() ? admin : null;

	return titleTemplates[division]?.[formatId] ?? null;
};

/** Whether a format asks for a topic title at all. */
export const hasTitleFor = (division: divisionsType, formatId: string): boolean =>
	titleTemplateFor(division, formatId) !== null;

// ---------------------------------------------------------------------------
// Prompts the title asks the person to fill in
// ---------------------------------------------------------------------------

/** Matches a braced prompt such as "{deputy name}". */
const PROMPT_PATTERN = /\{([^{}]+)\}/g;

/**
 * Whatever is written in curly braces is a note to whoever fills the format
 * in: "Promotion notice {deputy name}" asks them to swap the braced part for
 * the real value. There is no list of variable names to choose from — the text
 * between the braces is simply shown back to them as a reminder.
 */
export const titlePrompts = (title: string): string[] =>
	Array.from(title.matchAll(PROMPT_PATTERN), (match) => match[1].trim()).filter(Boolean);

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/**
 * Fills a raw title in and tidies the result: `{{token}}` values are resolved
 * (the built-in titles use them, e.g. to drop in a date), blank gaps collapse,
 * and no separator is left dangling when the trailing value is empty.
 *
 * Braced prompts are left untouched — they are for the person filling the
 * format in, not something the app can work out on its own.
 */
export const renderTitleTemplate = (
	template: string,
	context: { formatData: FormatData; deputyData: DeputyData; division: divisionsType },
): string => {
	if (!template) return "";
	return renderFormatTemplate(template, context)
		.replace(/\s{2,}/g, " ")
		.replace(/[-–]\s*$/, "")
		.trim();
};

/**
 * The generated title for a format. An empty string means the format has no
 * title, or its tokens are still blank.
 */
export const suggestedTitleFor = ({
	formatData,
	deputyData,
	formatId,
	division,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	formatId: string;
	division: divisionsType;
}): string => {
	const template = titleTemplateFor(division, formatId);
	if (!template) return "";
	return renderTitleTemplate(template, { formatData, deputyData, division });
};

/**
 * The title actually used: the deputy's own title once they have edited the
 * field, else the suggestion. Only `undefined` means "not edited" — an empty
 * string is a title the deputy deliberately cleared, so the suggestion must not
 * come back and overwrite it.
 */
export const resolveTitle = (edited: string | undefined, suggested: string): string =>
	edited === undefined ? suggested : edited.trim();
