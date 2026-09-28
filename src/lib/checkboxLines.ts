/**
 * The `[cb]` lines a body already carries, and which of them a checkbox field
 * ticks.
 *
 * A checkbox field does not need a `{{token}}`: its choices name the lines it
 * answers for. The body keeps the block of `[cb] …` lines exactly as it is
 * written, and the field's ticked choices are printed as `[cbc] …` in place —
 * one block per field, top to bottom, so two blocks that happen to list the same
 * words (damage to this vehicle, damage to that one) stay independent.
 */

/** A body line that is a BBCode checkbox: `[cb] Text`, ticked as `[cbc] Text`. */
const CHECKBOX_LINE = /^[ \t]*\[(?:cb|cbc)\][ \t]?(.*)$/;

/** One field's worth of checkbox lines: a run of consecutive `[cb]` lines. */
export interface CheckboxRun {
	/** Index of the run's first line in the body. */
	start: number;
	/** How many lines the run covers. */
	count: number;
	/** Each line's wording, trimmed, in order. */
	items: string[];
}

/**
 * The runs of consecutive checkbox lines a body holds, top to bottom. A blank
 * line (or anything else) ends a run, which is what keeps neighbouring blocks —
 * Driving Code and Injuries sustained — apart.
 */
export const checkboxRuns = (lines: string[]): CheckboxRun[] => {
	const runs: CheckboxRun[] = [];
	let index = 0;
	while (index < lines.length) {
		const match = CHECKBOX_LINE.exec(lines[index]);
		if (!match) {
			index += 1;
			continue;
		}

		const start = index;
		const items: string[] = [];
		while (index < lines.length) {
			const line = CHECKBOX_LINE.exec(lines[index]);
			if (!line) break;
			items.push(line[1].trim());
			index += 1;
		}
		runs.push({ start, count: items.length, items });
	}
	return runs;
};

/** Whether a run's lines are exactly a field's choices, in order. */
export const runMatchesChoices = (run: CheckboxRun, choices: string[]): boolean =>
	run.count === choices.length && run.items.every((item, index) => item === choices[index].trim());

/** Whether the body holds a block of checkbox lines a field's choices name. */
export const bodyHasRunFor = (body: string, choices: string[]): boolean => {
	if (!choices.length) return false;
	return checkboxRuns(body.split("\n")).some((run) => runMatchesChoices(run, choices));
};

/** The ticked choices a field holds, as `"<fieldName>:<index>"` keys. */
export const tickedKeysFor = (value: unknown): Set<string> =>
	new Set(Array.isArray(value) ? value.map((entry) => String(entry)) : []);

/** Writes a run's ticked lines as `[cbc]`, leaving the rest of it `[cb]`. */
export const tickRun = (lines: string[], run: CheckboxRun, name: string, ticked: Set<string>): void => {
	for (let offset = 0; offset < run.count; offset += 1) {
		const line = lines[run.start + offset];
		const match = CHECKBOX_LINE.exec(line);
		if (!match) continue;
		// A bare index is accepted too, so a store written by hand still reads back.
		const chosen = ticked.has(`${name}:${offset}`) || ticked.has(String(offset));
		const tag = chosen ? "cbc" : "cb";
		if (line.includes(`[${tag}]`)) continue;
		lines[run.start + offset] = line.replace(/\[(?:cb|cbc)\]/, `[${tag}]`);
	}
};
