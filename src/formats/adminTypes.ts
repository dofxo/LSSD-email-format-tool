import type { FormatInputField, divisionsType } from "@/types";

/** The four things the /admin page lets you edit on any format. */
export interface AdminFormatFields {
	/** Name shown in the format picker. */
	title: string;
	/**
	 * Topic title used on the government website, written as plain text. Empty
	 * means "keep the format's built-in title" (built-in formats), or no title at
	 * all (formats added here, which have none of their own).
	 */
	topicTitle: string;
	/** phpBBcode body. `{{token}}` placeholders are filled from the form data. */
	body: string;
	/** Government website section this format is pasted into. */
	govLink: string;
	/** Heading the format is grouped under in the picker. `""` falls back to the default. */
	category: string;
}

/** A format added from /admin, collected alongside the built-in ones. */
export interface AdminCustomFormat extends AdminFormatFields {
	/** Format id, unique within its division. */
	id: string;
	division: divisionsType;
}

/** Edited values for a built-in format. Absent keys fall back to the default. */
export interface AdminFormatOverride {
	title?: string;
	/** Plain-text topic title replacing the format's built-in one, when set. */
	topicTitle?: string;
	body?: string;
	govLink?: string;
	/** Set to `""` to drop the format out of its default category. */
	category?: string;
}

/**
 * A division's input fields fully replaced from /admin. The list is saved whole
 * so fields can be reordered, renamed, added or removed; a division with no
 * entry keeps using the built-in list from src/data/formatInputs.ts.
 */
export type AdminInputsByDivision = Partial<Record<divisionsType, FormatInputField[]>>;

/** Everything /admin writes back into src/formats/admin.ts. */
export interface AdminFormatStore {
	/** Keyed "DIVISION/formatId", e.g. "FTB/1". */
	overrides: Record<string, AdminFormatOverride>;
	custom: AdminCustomFormat[];
	/** Input-field lists that replace a division's built-in fields, keyed by division. */
	inputs: AdminInputsByDivision;
}
