import type { CatalogueInput } from "@/lib/inputDefinitions";
import type { FormatFieldPick, divisionsType } from "@/types";

/** The things the /admin page lets you edit on any format. */
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
	/**
	 * The fields this format asks for, in form order, picked from the shared
	 * catalogue. An empty list means the format asks for nothing — except one whose
	 * body names its own tokens: there the body settles which fields exist, and
	 * this list says what order they are asked in and how they are worded.
	 */
	fields: FormatFieldPick[];
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
	/** Replaces the format's built-in input list (name, order and wording). */
	fields?: FormatFieldPick[];
}

/**
 * A format's unsaved values, handed to the page-level save by the card holding
 * them. Cards keep their own state while being edited, so the save asks each of
 * them what is on screen rather than trusting the store.
 */
export interface AdminFormatDraft {
	division: divisionsType;
	formatId: string;
	fields: AdminFormatFields;
}

/** Everything /admin writes back into src/formats/admin.ts. */
export interface AdminFormatStore {
	/** Keyed "DIVISION/formatId", e.g. "FTB/1". */
	overrides: Record<string, AdminFormatOverride>;
	custom: AdminCustomFormat[];
	/** Inputs created at /admin, added to the shared catalogue for every division. */
	inputs: CatalogueInput[];
}
