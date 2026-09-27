import { renderFormatTemplate } from "@/lib/formatTemplates";
import type { DeputyData, FormatData, FormatInputField, divisionsType } from "@/types";

/**
 * Turns a format's generated output into a template automatically.
 *
 * The generated body is literal text: the format's own code has already printed
 * each value into it. To find which parts of that text belong to which input,
 * the format is rendered again once per field with a sentinel value in that
 * field only. The text that changes is that field's contribution, and it is
 * only accepted when it comes back *exactly* as the sentinel was supplied — a
 * value a format reshapes (a rank turned into "Mr."/"Ms.", a list joined onto
 * one line) is left alone, because a token would print the raw value instead.
 *
 * Whatever is accepted is then proved: the rewritten body is rendered with
 * awkward, realistic values and must reproduce the format's own output exactly.
 * Anything less is thrown away rather than risked, and list-shaped fields are
 * dropped first if they are what breaks the proof.
 */

/** Private-use characters, so a sentinel can never collide with real content. */
const MARKERS = [
	{ open: "\uE000", close: "\uE001" },
	{ open: "\uE002", close: "\uE003" },
];

const markerFor = (token: string, index: number) =>
	`${MARKERS[index].open}${token}${MARKERS[index].close}`;

/** What a sentinel is handed to the format as, per field type. */
const sampleFor = (field: FormatInputField, marker: string): unknown =>
	field.type === "list" || field.type === "check" ? [marker] : marker;

/** The shapes a field's own text can take, so a match can be recognised. */
const shapesFor = (field: FormatInputField | null, marker: string): string[] =>
	field && (field.type === "list" || field.type === "check") ? [marker, `[*]${marker}`] : [marker];

const isListField = (field: FormatInputField | undefined) =>
	field?.type === "list" || field?.type === "check";

/** Values awkward enough to expose a token that does not print the real thing. */
const proofValueFor = (field: FormatInputField): unknown => {
	switch (field.type) {
		case "list":
		case "check":
			return ["First reason", "Second reason"];
		case "date":
			return "01/JAN/2026";
		case "time":
			return "14:35";
		case "number":
			return "42";
		case "select":
			return field.options?.[0]?.value ?? "Selected";
		default:
			return "John Q. Doe";
	}
};

/** Realistic profile values, so a combined rank/name shows up as a mismatch. */
const PROFILE_VALUES: Record<string, string> = {
	name: "Jane Deputy",
	dRank: "Sergeant",
	signature: "https://example.com/sig.png",
};

const commonPrefixLength = (a: string, b: string) => {
	let index = 0;
	while (index < a.length && index < b.length && a[index] === b[index]) index += 1;
	return index;
};

const commonSuffixLength = (a: string, b: string, floor: number) => {
	let index = 0;
	while (
		index < a.length - floor &&
		index < b.length - floor &&
		a[a.length - 1 - index] === b[b.length - 1 - index]
	)
		index += 1;
	return index;
};

interface Span {
	start: number;
	end: number;
	text: string;
}

/** The region of `base` that `next` replaced, or null when they match. */
const diffSpan = (base: string, next: string): Span | null => {
	const start = commonPrefixLength(base, next);
	const suffix = commonSuffixLength(base, next, start);
	const text = next.slice(start, next.length - suffix);
	if (!text) return null;
	return { start, end: base.length - suffix, text };
};

export interface AutoTokenizeResult {
	/** The body with every proven field replaced by its `{{token}}`. */
	body: string;
	/** Fields that became variables. */
	tokenized: string[];
	/** Fields the body prints in a reshaped way, so a human has to decide. */
	skipped: string[];
	/**
	 * Set when values were found but none could be proved safe: the format's
	 * wording changes with inputs a template cannot reproduce.
	 */
	refused?: "unstable";
}

interface Found {
	start: number;
	end: number;
	token: string;
	/** The match was a list bullet the token itself will print. */
	bullet: boolean;
}

export const autoTokenizeBody = ({
	base,
	fields,
	render,
	deputy,
	division,
	/** Profile values a format can print without an input of its own. */
	profileTokens = ["name", "dRank", "signature"],
}: {
	base: string;
	fields: FormatInputField[];
	render: (formatData: FormatData, deputyData: DeputyData) => string;
	deputy: DeputyData;
	division: divisionsType;
	profileTokens?: string[];
}): AutoTokenizeResult => {
	const found: Found[] = [];
	const skipped: string[] = [];

	const attempt = (formatData: FormatData, deputyData: DeputyData): string | null => {
		try {
			return render(formatData, deputyData);
		} catch {
			// A format that cannot render an unusual value simply stays manual.
			return null;
		}
	};

	type Verdict = "tokenized" | "reshaped" | "absent";

	/**
	 * Two different sentinels must land in the same place with the same shape,
	 * otherwise the field is not printed as-is and a human has to decide.
	 */
	const scan = (
		token: string,
		build: (marker: string) => { formatData: FormatData; deputyData: DeputyData },
		field: FormatInputField | null,
	): Verdict => {
		const spans = [0, 1].map((index) => {
			const marker = markerFor(token, index);
			const { formatData, deputyData } = build(marker);
			const rendered = attempt(formatData, deputyData);
			if (rendered === null || rendered === base) return null;
			return { marker, span: diffSpan(base, rendered) };
		});

		const [first, second] = spans;
		// The format does not print this value at all, so there is nothing to do.
		if (!first && !second) return "absent";
		if (!first?.span || !second?.span) return "reshaped";
		if (first.span.start !== second.span.start || first.span.end !== second.span.end) return "reshaped";
		if (!shapesFor(field, first.marker).includes(first.span.text)) return "reshaped";
		if (!shapesFor(field, second.marker).includes(second.span.text)) return "reshaped";

		found.push({
			start: first.span.start,
			end: first.span.end,
			token,
			bullet: first.span.text === `[*]${first.marker}` || second.span.text === `[*]${second.marker}`,
		});
		return "tokenized";
	};

	for (const field of fields) {
		const verdict = scan(
			field.name,
			(marker) => ({ formatData: { [field.name]: sampleFor(field, marker) }, deputyData: deputy }),
			field,
		);
		if (verdict === "reshaped") skipped.push(field.name);
	}

	for (const token of profileTokens) {
		// An input of the same name wins, so its token is the one that works.
		if (fields.some((field) => field.name === token)) continue;
		const verdict = scan(
			token,
			(marker) => ({ formatData: {}, deputyData: { ...deputy, [token]: marker } }),
			null,
		);
		if (verdict === "reshaped") skipped.push(token);
	}

	/** Replaces each match in the text, dropping any that overlap a neighbour. */
	const applyMatches = (matches: Found[]) => {
		let out = "";
		let cursor = 0;
		const used: Found[] = [];
		for (const item of [...matches].sort((a, b) => a.start - b.start)) {
			// A list bullet is printed by the token itself, so consume the one in
			// the text when the format already wrote it out.
			const start =
				item.bullet && base.slice(Math.max(0, item.start - 3), item.start) === "[*]"
					? item.start - 3
					: item.start;
			if (start < cursor) continue;
			out += `${base.slice(cursor, start)}{{${item.token}}}`;
			cursor = item.end;
			used.push(item);
		}
		return { body: out + base.slice(cursor), used };
	};

	/** Every field filled, so the wording is proved against real values. */
	const proofSet = (listSize: number, profile: Record<string, string>) => {
		const formatData: Record<string, unknown> = {};
		for (const field of fields) {
			formatData[field.name] =
				field.type === "list" || field.type === "check"
					? Array.from({ length: listSize }, (_, index) => `Reason ${index + 1}, with — punctuation`)
					: proofValueFor(field);
		}
		return {
			formatData: formatData as FormatData,
			deputyData: { ...deputy, ...profile } as DeputyData,
		};
	};

	/**
	 * Filled at two list sizes and two profiles. A format whose wording depends on
	 * a value it does not print verbatim — a rank turned into "Mr."/"Ms.", a line
	 * that only appears when a date is set — cannot be frozen into a template, so
	 * it fails here and is refused instead of printing the wrong text later.
	 */
	const proofSets = [proofSet(1, PROFILE_VALUES), proofSet(2, PROFILE_VALUES), proofSet(3, {})];

	// Try everything first; if the proof fails, the usual culprit is a field the
	// format prints as a joined list, so those are dropped and proved again.
	const candidateSets: Found[][] = [found];
	const listMatches = found.filter((item) => isListField(fields.find((field) => field.name === item.token)));
	if (listMatches.length) {
		candidateSets.push(found.filter((item) => !listMatches.includes(item)));
	}

	for (const candidates of candidateSets) {
		const { body, used } = applyMatches(candidates);
		if (!used.length) continue;

		const proven = proofSets.every(({ formatData, deputyData }) => {
			const expected = attempt(formatData, deputyData);
			if (expected === null) return false;
			return renderFormatTemplate(body, { formatData, deputyData, division }) === expected;
		});
		if (!proven) continue;

		const kept = new Set(used.map((item) => item.token));
		return {
			body,
			tokenized: used.map((item) => item.token),
			skipped: [
				...new Set([
					...skipped,
					...found.filter((item) => !kept.has(item.token)).map((item) => item.token),
				]),
			],
		};
	}

	// Nothing proved: either the format prints nothing to match, or its wording
	// depends on other inputs. Either way the body is handed back untouched.
	return found.length
		? { body: base, tokenized: [], skipped: fields.map((field) => field.name), refused: "unstable" }
		: { body: base, tokenized: [], skipped: [] };
};
