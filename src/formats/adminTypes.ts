import type { FormatInputField, divisionsType } from "@/types";

/** The three things the /admin page lets you edit on any format. */
export interface AdminFormatFields {
	/** Name shown in the format picker. */
	title: string;
	/** phpBBcode body. `{{token}}` placeholders are filled from the form data. */
	body: string;
	/** Government website section this format is pasted into. */
	govLink: string;
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
	body?: string;
	govLink?: string;
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
