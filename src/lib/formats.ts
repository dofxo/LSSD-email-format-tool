import type { divisionsType } from "@/types";
import { GeneralLabels } from "@/formats/divisions/General";
import { REDLabels } from "@/formats/divisions/RED";
import { SupervisoryLabels } from "@/formats/divisions/Supervisory";
import { ATDLabels } from "@/formats/divisions/ATD";
import { TSDLabels } from "@/formats/divisions/TSD";
import { FTBLabels } from "@/formats/divisions/FTB";
import { inputsByDivision } from "@/data/formatInputs";
import type { FormatInputField } from "@/types";

export const labelsByDivision: Record<divisionsType, Record<string, string>> = {
	RED: REDLabels,
	TSD: TSDLabels,
	ATD: ATDLabels,
	General: GeneralLabels,
	Supervisory: SupervisoryLabels,
	FTB: FTBLabels,
};

export interface FormatOption {
	id: string;
	label: string;
}

/** Every format available in a division, in the order the registry defines it. */
export const formatsForDivision = (division: divisionsType): FormatOption[] =>
	Object.entries(labelsByDivision[division]).map(([id, label]) => ({ id, label }));

export const formatLabelFor = (division: divisionsType, formatId: string): string =>
	labelsByDivision[division][formatId] ?? "";

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
