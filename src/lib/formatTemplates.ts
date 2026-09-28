import { checkboxRuns, runMatchesChoices, tickRun, tickedKeysFor } from "@/lib/checkboxLines";
import { chargeLine } from "@/data/penalCode";
import type { DeputyData, FormatData, GroupSubField, divisionsType } from "@/types";

/** Matches {{token}} placeholders; whitespace inside the braces is ignored. */
const TOKEN_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;

/** The choices of one checkbox field, as its body prints them. */
export interface CheckboxFieldSpec {
	/** The field's token name; its ticks are stored under it. */
	name: string;
	/** The `[cb]` lines it answers for, in order. */
	items: string[];
}

/**
 * One repeating group, as its `{{token}}` in the body prints it: the entry
 * template, filled once per entry with that entry's answers.
 */
export interface GroupFieldSpec {
	/** The field's token; its entries are stored under it. */
	name: string;
	/** The answers each entry holds, in the order the form asks for them. */
	subFields: GroupSubField[];
	/** One entry, written with the sub-fields' `{{tokens}}` and `{{index}}` / `{{letter}}`. */
	template: string;
}

/** The position of an entry written as a letter: A, B, … Z, then AA, AB, … */
export const letterFor = (index: number): string => {
	let letters = "";
	let value = index;
	do {
		letters = String.fromCharCode(65 + (value % 26)) + letters;
		value = Math.floor(value / 26) - 1;
	} while (value >= 0);
	return letters;
};

/** Whether an answer holds anything worth printing. */
const isAnswered = (value: unknown): boolean => {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return value !== undefined && value !== null;
};

/** The penal code codes a charges field holds, as the lines a report quotes. */
const chargeEntries = (value: unknown): string[] =>
	(Array.isArray(value) ? value : [])
		.map((code) => chargeLine(String(code ?? "").trim()))
		.filter(Boolean);

/** One sub-field's answer as the entry template prints it. */
const subValueText = (sub: GroupSubField, value: unknown): string => {
	if (sub.type === "charges") return chargeEntries(value).map((line) => `[*]${line}`).join("\n");
	if (Array.isArray(value)) return value.map((entry) => `[*]${String(entry)}`).join("\n");
	return value === undefined || value === null ? "" : String(value);
};

/** A line's text as a reader would see it, with every phpBBcode tag taken out. */
const withoutTags = (text: string): string => text.replace(/\[[^\]]*\]/g, "").trim();

/**
 * Takes out the body's lines that a blank answer leaves with nothing to show.
 *
 * A line that only ever held `{{tokens}}` prints nothing once every one of them
 * is unanswered, and a line of nothing but tags is worse than no line at all: an
 * unfilled `[img]{{photo}}[/img]` would post a broken image and a stray `[[/i]`
 * the reader has to scroll past. A line that says something of its own — even
 * just "[b]Full Name:[/b]" — always stays, blank answer or not.
 *
 * A checkbox field's token is left alone: with nothing ticked it still prints
 * its whole list of empty boxes, which is exactly what the form is for.
 */
const dropEmptiedLines = (template: string, values: Record<string, unknown>, checkboxNames: Set<string>): string =>
	template
		.split("\n")
		.filter((line) => {
			const tokens = Array.from(line.matchAll(TOKEN_PATTERN), (match) => match[1].trim());
			if (!tokens.length) return true;
			if (tokens.some((token) => checkboxNames.has(token))) return true;
			if (tokens.some((token) => isAnswered(values[token]))) return true;
			// Nothing answered on this line: it stays only if it still reads as text.
			return withoutTags(line.replace(TOKEN_PATTERN, "")) !== "";
		})
		.join("\n");

/** One group entry, filled in and tidied. */
const renderGroupEntry = (
	spec: GroupFieldSpec,
	answers: Record<string, unknown>,
	index: number,
): string =>
	spec.template
		.split("\n")
		.map((line) => {
			let filled = false;
			const withValues = line.replace(TOKEN_PATTERN, (_match, token: string) => {
				filled = true;
				if (token === "index") return String(index + 1);
				if (token === "letter") return letterFor(index);
				const sub = spec.subFields.find((entry) => entry.name === token);
				return sub ? subValueText(sub, answers[token]) : "";
			});
			// A line that only ever held a token prints nothing once that answer is
			// blank, so it goes rather than leaving an empty [img] or [list] behind.
			if (filled && !withoutTags(withValues)) return null;
			return withValues;
		})
		.filter((line): line is string => line !== null)
		.join("\n");

/**
 * A group's entries as the body prints them: one filled entry after another,
 * with entries nobody answered left out — so the letters and numbers run A, B, C
 * with no gaps.
 */
const renderGroup = (spec: GroupFieldSpec, value: unknown): string =>
	(Array.isArray(value) ? value : [])
		.filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === "object")
		.filter((entry) => spec.subFields.some((sub) => isAnswered(entry[sub.name])))
		.map((entry, index) => renderGroupEntry(spec, entry, index))
		.join("\n");

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
	/**
	 * The format's repeating groups, as its body prints them. A group's token is
	 * filled with its entry template, once per entry the deputy added.
	 */
	groupFields?: GroupFieldSpec[];
	/**
	 * The names of the format's charges fields. What each holds is a list of
	 * penal code codes, printed as the charge lines a report quotes.
	 */
	chargeFields?: string[];
	/**
	 * The names of the format's image fields, both the one-link kind and the
	 * several-links kind. Each link is printed as the picture it points at, so the
	 * body only has to carry the token — and a blank answer leaves no `[img]` tag
	 * behind to post.
	 */
	imageFields?: string[];
}

/**
 * One pasted link, with any `[img]` tags it arrived in taken off: the whole
 * `[img]…[/img]` block copied off a post works as it is, rather than nesting one
 * tag pair inside another. Empty when there is no link in the answer.
 */
const imageUrl = (value: unknown): string =>
	typeof value === "string"
		? value
				.trim()
				.replace(/^\[img[^\]]*\]\s*/i, "")
				.replace(/\s*\[\/img\]$/i, "")
				.trim()
		: "";

/**
 * An image field's answer as the body prints it: one `[img]url[/img]` line per
 * picture — a single-link field has one, a several-links field has as many as
 * were added, in the order they were added. Links left blank are left out, and
 * an answer with nothing in it at all prints nothing.
 */
const imageLinks = (value: unknown): string =>
	(Array.isArray(value) ? value : [value])
		.map(imageUrl)
		.filter(Boolean)
		.map((url) => `[img]${url}[/img]`)
		.join("\n");

/** Matches an image field's token already sitting inside `[img]` tags. */
const WRAPPED_IMAGE_TOKEN = /\[img[^\]]*\]\s*\{\{\s*([\w.]+)\s*\}\}\s*\[\/img\]/gi;

/**
 * Leaves an image field's token bare where the body wraps it in `[img]` tags
 * itself: the field prints the tags, so keeping both would nest one pair inside
 * the other. Wrapping that names anything but an image field is left as written.
 */
const unwrapImageTokens = (template: string, imageFields: Set<string>): string =>
	template.replace(WRAPPED_IMAGE_TOKEN, (match, token: string) =>
		imageFields.has(token.trim()) ? `{{${token.trim()}}}` : match,
	);

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
	const {
		formatData,
		deputyData,
		division,
		checkboxFields = [],
		groupFields = [],
		chargeFields = [],
		imageFields = [],
	} = context;
	if (!template || (!template.includes("{{") && !checkboxFields.length)) return template;
	// Image fields print their own `[img]` tags, so a token the body already wraps
	// is written bare from here on.
	const body = imageFields.length ? unwrapImageTokens(template, new Set(imageFields)) : template;
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

	// Repeating groups, charge pickers and image fields print generated text rather
	// than what was typed, so they are rendered into the value map here and the
	// ordinary fill below prints each one verbatim, wherever its token sits in the body.
	for (const spec of groupFields) {
		const text = renderGroup(spec, values[spec.name]);
		if (text.trim()) values[spec.name] = text;
	}
	for (const name of chargeFields) {
		const lines = chargeEntries(values[name]);
		if (lines.length) values[name] = lines.map((line) => `[*]${line}`).join("\n");
	}
	for (const name of imageFields) {
		values[name] = imageLinks(values[name]);
	}

	// Lines the blank answers emptied come out before anything is filled, so an
	// unfilled photo input leaves no [img] tag behind to post.
	const trimmed = dropEmptiedLines(
		body,
		values,
		new Set(checkboxFields.map((field) => field.name)),
	);

	// A field whose token the body carries prints its block there instead of
	// ticking one, so only the token-less fields look for a run of lines.
	const tokens = new Set(bodyTokens(trimmed));
	const runFields = checkboxFields.filter((field) => !tokens.has(field.name));
	let withTicks = trimmed;

	if (runFields.length) {
		const lines = trimmed.split("\n");
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
