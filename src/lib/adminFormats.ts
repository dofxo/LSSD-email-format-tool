import { adminFormatStore } from "@/formats/admin";
import type { AdminFormatOverride, AdminFormatStore } from "@/formats/adminTypes";
import type { divisionsType } from "@/types";

const ENDPOINT = "/api/admin/formats";

/** Store key for a built-in format: "DIVISION/formatId". */
export const overrideKey = (division: divisionsType, formatId: string) => `${division}/${formatId}`;

/** Values edited at /admin for a built-in format, if any. */
export const overrideFor = (division: divisionsType, formatId: string): AdminFormatOverride | undefined =>
	adminFormatStore.overrides[overrideKey(division, formatId)];

/** Formats added from /admin for a division, in the order they were saved. */
export const customFormatsFor = (division: divisionsType) =>
	adminFormatStore.custom.filter((entry) => entry.division === division);

/** A single format added from /admin, if it exists. */
export const customFormatFor = (division: divisionsType, formatId: string) =>
	adminFormatStore.custom.find((entry) => entry.division === division && entry.id === formatId);

/** The picker title for a format, after any /admin override. */
export const adminLabelFor = (division: divisionsType, formatId: string): string | null => {
	const custom = customFormatFor(division, formatId);
	if (custom) return custom.title;
	const override = overrideFor(division, formatId);
	return override?.title?.trim() ? override.title : null;
};

/** The gov link set at /admin (custom format or override), if any. */
export const adminGovLinkFor = (division: divisionsType, formatId: string): string | null => {
	const custom = customFormatFor(division, formatId);
	if (custom) return custom.govLink.trim() ? custom.govLink : null;
	const override = overrideFor(division, formatId);
	if (override?.govLink !== undefined) return override.govLink.trim() ? override.govLink : null;
	return null;
};

/**
 * The /admin body template for a format, or null when the format should keep
 * using its built-in generator.
 */
export const adminBodyFor = (division: divisionsType, formatId: string): string | null => {
	const custom = customFormatFor(division, formatId);
	if (custom) return custom.body;
	const override = overrideFor(division, formatId);
	return override?.body?.trim() ? override.body : null;
};

/** Reads the store from the dev server, with the bundled copy as a fallback. */
export const fetchAdminFormats = async (): Promise<AdminFormatStore> => {
	if (!import.meta.env.DEV) return adminFormatStore;
	try {
		const response = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
		if (!response.ok) return adminFormatStore;
		return (await response.json()) as AdminFormatStore;
	} catch {
		return adminFormatStore;
	}
};

/** Saves the store back to src/formats/admin.ts. Only the dev server can write. */
export const saveAdminFormats = async (
	store: AdminFormatStore,
): Promise<{ ok: boolean; error?: string }> => {
	if (!import.meta.env.DEV) {
		return { ok: false, error: "Saving needs the dev server. Run the app with npm run dev." };
	}
	try {
		const response = await fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(store),
		});
		if (!response.ok) {
			const message = await response.text();
			return { ok: false, error: message || `Save failed (${response.status}).` };
		}
		return { ok: true };
	} catch (error) {
		return { ok: false, error: error instanceof Error ? error.message : "Save failed." };
	}
};
