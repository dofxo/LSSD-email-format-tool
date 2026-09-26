import type { divisionsType } from "@/types";

/**
 * Per-format links into the LSSD section of the government website
 * (gov.eclipse-rp.net). Keyed by division first, then the format's id; each
 * entry is the forum section the generated format is meant to be pasted into.
 *
 * Formats without an entry fall back to an informational toast, so links can
 * be added here one format at a time without touching the UI.
 *
 * Example:
 * RED: {
 * 	"1": "https://gov.eclipse-rp.net/viewforum.php?f=958",
 * },
 */
const govLinks: Partial<Record<divisionsType, Record<string, string>>> = {};

/** The government website section a format is pasted into, if one is set up. */
export const govLinkFor = (division: divisionsType, formatId: string): string | null =>
	govLinks[division]?.[formatId] ?? null;
