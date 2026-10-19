/**
 * Helpers for "timerange" fields: a start and end time kept in one value as
 * "HH:mm - HH:mm". Its token prints the range followed by the decimal hours it
 * covers — "20:20 - 23:20 (3.00 Hours)" — so a flight log totals itself.
 */

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/** The start and end a value holds, either one empty while the range is half filled. */
export const parseTimeRange = (value: unknown): { start: string; end: string } => {
	const [start = "", end = ""] = typeof value === "string" ? value.split(" - ") : [];
	return {
		start: TIME_PATTERN.test(start.trim()) ? start.trim() : "",
		end: TIME_PATTERN.test(end.trim()) ? end.trim() : "",
	};
};

/** Stores a start and end back as one value; blank when neither is set. */
export const joinTimeRange = (start: string, end: string): string =>
	!start && !end ? "" : `${start} - ${end}`;

const minutesOf = (time: string): number => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

/**
 * The hours a range covers, or null while it is incomplete. An end earlier than
 * the start is taken as the next day, so 23:30 - 01:20 counts as 1.83 hours.
 */
export const timeRangeHours = (start: string, end: string): number | null => {
	if (!TIME_PATTERN.test(start) || !TIME_PATTERN.test(end)) return null;
	const from = minutesOf(start);
	let to = minutesOf(end);
	if (to < from) to += 24 * 60;
	return (to - from) / 60;
};

/**
 * A timerange value as the report prints it: the range with the hours it covers
 * — "20:20 - 23:20 (3.00 Hours)". A half-filled range prints the one time that
 * is set, and an empty one prints nothing.
 */
export const timeRangeText = (value: unknown): string => {
	const { start, end } = parseTimeRange(value);
	if (start && end) {
		const hours = timeRangeHours(start, end);
		return hours === null ? `${start} - ${end}` : `${start} - ${end} (${hours.toFixed(2)} Hours)`;
	}
	return start || end;
};
