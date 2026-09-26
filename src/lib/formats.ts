import type { divisionsType } from "@/types";
import { GeneralLabels } from "@/formats/divisions/General";
import { REDLabels } from "@/formats/divisions/RED";
import { SupervisoryLabels } from "@/formats/divisions/Supervisory";
import { ATDLabels } from "@/formats/divisions/ATD";
import { TSDLabels } from "@/formats/divisions/TSD";
import { FTBLabels } from "@/formats/divisions/FTB";
import { SEBLabels } from "@/formats/divisions/SEB";
import { adminInputsFor, adminLabelFor, customFormatsFor, overrideFor } from "@/lib/adminFormats";
import { inputsByDivision } from "@/data/formatInputs";
import { formatCategories } from "@/formats/formatCategories";
import type { FormatInputField } from "@/types";

export const labelsByDivision: Record<divisionsType, Record<string, string>> = {
	RED: REDLabels,
	TSD: TSDLabels,
	ATD: ATDLabels,
	General: GeneralLabels,
	Supervisory: SupervisoryLabels,
	FTB: FTBLabels,
	SEB: SEBLabels,
};

export interface FormatOption {
	id: string;
	label: string;
	/** Heading this format is grouped under in the picker; undefined when it is not filed anywhere. */
	category?: string;
}

/**
 * Formats that lead their division's picker instead of sitting in id order. SEB
 * opens with the blank Email, since that is the one its operators reach for
 * most; every other format then follows in id order, one row further down.
 * Keeping the ids untouched means saved drafts keep pointing at the format they
 * were typed into.
 */
const leadingFormats: Partial<Record<divisionsType, string[]>> = {
	SEB: ["29"],
};

/**
 * The heading a format is grouped under, or undefined when it has none. A
 * format added at /admin uses its own category, an edited one can clear its
 * default by saving an empty category, and everything else falls back to the
 * built-in table.
 */
export const formatCategoryFor = (division: divisionsType, formatId: string): string | undefined => {
	const custom = customFormatsFor(division).find((entry) => entry.id === formatId);
	if (custom) return custom.category?.trim() || undefined;

	const override = overrideFor(division, formatId);
	if (override && override.category !== undefined) return override.category.trim() || undefined;

	return formatCategories[division]?.[formatId];
};

/** Every format available in a division, in the order the picker should show it. */
export const formatsForDivision = (division: divisionsType): FormatOption[] => {
	const labels = labelsByDivision[division];
	const leading = leadingFormats[division] ?? [];
	// Titles edited at /admin override the built-in label.
	const toOption = ([id, label]: [string, string]): FormatOption => ({
		id,
		label: adminLabelFor(division, id) ?? label,
		category: formatCategoryFor(division, id),
	});

	const builtIn = leading.length
		? [
				...leading.filter((id) => id in labels).map((id) => toOption([id, labels[id]])),
				...Object.entries(labels)
					.filter(([id]) => !leading.includes(id))
					.map(toOption),
			]
		: Object.entries(labels).map(toOption);

	// Formats added at /admin sit after the built-in ones.
	const custom = customFormatsFor(division).map((entry) => ({
		id: entry.id,
		label: entry.title,
		category: entry.category?.trim() || undefined,
	}));
	return [...builtIn, ...custom];
};

export const formatLabelFor = (division: divisionsType, formatId: string): string =>
	adminLabelFor(division, formatId) ?? labelsByDivision[division][formatId] ?? "";

/**
 * Every input field defined for a division: the list replaced at /admin when
 * one is saved, otherwise the built-in fields from src/data/formatInputs.ts.
 */
export const inputsForDivision = (division: divisionsType): FormatInputField[] =>
	adminInputsFor(division) ?? inputsByDivision[division] ?? [];

/** The dynamic form fields a specific format requires. */
export const formatFieldsFor = (division: divisionsType, formatId: string): FormatInputField[] =>
	formatId ? inputsForDivision(division).filter((field) => field.formats.includes(formatId)) : [];

/**
 * Dev-time integrity check: every field's `formats` ids must exist in its
 * division's labels (or in the formats added at /admin), otherwise that field
 * can never render (the id points at a format that is not selectable). Runs
 * once per session; silently no-ops in production builds.
 */
const checkInputsConsistency = () => {
	if (import.meta.env.PROD) return;
	const problems: string[] = [];
	for (const division of Object.keys(inputsByDivision) as divisionsType[]) {
		const known = new Set([
			...Object.keys(labelsByDivision[division]),
			...customFormatsFor(division).map((entry) => entry.id),
		]);
		for (const field of inputsForDivision(division)) {
			for (const id of field.formats) {
				if (!known.has(id)) {
					problems.push(`${division}: field "${field.name}" points at unknown format id "${id}"`);
				}
			}
			if (field.type === "select" && !field.options?.length) {
				problems.push(`${division}: select field "${field.name}" has no options`);
			}
			if (field.type === "check" && !field.items?.length) {
				problems.push(`${division}: check field "${field.name}" has no items`);
			}
		}
	}
	if (problems.length) console.warn(`[formats] ${problems.length} input problem(s):\n${problems.join("\n")}`);
};

checkInputsConsistency();

/** Whether a value counts as "filled in" for progress purposes. */
export const isFilled = (value: unknown): boolean => {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return value !== undefined && value !== null;
};
