import type { divisionsType } from "@/types";
import { GeneralLabels } from "@/formats/divisions/General";
import { REDLabels } from "@/formats/divisions/RED";
import { SupervisoryLabels } from "@/formats/divisions/Supervisory";
import { ATDLabels } from "@/formats/divisions/ATD";
import { TSDLabels } from "@/formats/divisions/TSD";
import { FTBLabels } from "@/formats/divisions/FTB";
import { SEBLabels } from "@/formats/divisions/SEB";
import { adminLabelFor, customFormatsFor } from "@/lib/adminFormats";
import { inputsByDivision } from "@/data/formatInputs";
import { SEBInputs } from "@/data/sebInputs";
import type { FormatInputField } from "@/types";

// SEB keeps its own field module, mirroring the FTBInputs split.
if (inputsByDivision.SEB.length === 0 && SEBInputs.length > 0) {
	inputsByDivision.SEB = SEBInputs;
}

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

/** Every format available in a division, in the order the picker should show it. */
export const formatsForDivision = (division: divisionsType): FormatOption[] => {
	const labels = labelsByDivision[division];
	const leading = leadingFormats[division] ?? [];
	// Titles edited at /admin override the built-in label.
	const toOption = ([id, label]: [string, string]): FormatOption => ({
		id,
		label: adminLabelFor(division, id) ?? label,
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
	const custom = customFormatsFor(division).map((entry) => ({ id: entry.id, label: entry.title }));
	return [...builtIn, ...custom];
};

export const formatLabelFor = (division: divisionsType, formatId: string): string =>
	adminLabelFor(division, formatId) ?? labelsByDivision[division][formatId] ?? "";

/** The dynamic form fields a specific format requires. */
export const formatFieldsFor = (division: divisionsType, formatId: string): FormatInputField[] =>
	formatId ? (inputsByDivision[division] ?? []).filter((field) => field.formats.includes(formatId)) : [];

/**
 * Dev-time integrity check: every field's `formats` ids must exist in its
 * division's labels, otherwise that field can never render (the id points at
 * a format that is not selectable). Runs once per session; silently no-ops in
 * production builds.
 */
const checkInputsConsistency = () => {
	if (import.meta.env.PROD) return;
	const problems: string[] = [];
	for (const division of Object.keys(inputsByDivision) as divisionsType[]) {
		const labels = labelsByDivision[division];
		for (const field of inputsByDivision[division]) {
			for (const id of field.formats) {
				if (!(id in labels)) {
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
