import type { divisionsType } from "@/types";
import { GeneralLabels } from "@/formats/divisions/General";
import { REDLabels } from "@/formats/divisions/RED";
import { SupervisoryLabels } from "@/formats/divisions/Supervisory";
import { ATDLabels } from "@/formats/divisions/ATD";
import { TSDLabels } from "@/formats/divisions/TSD";
import { inputsByDivision } from "@/data/formatInputs";
import type { FormatInputField } from "@/types";

export const labelsByDivision: Record<divisionsType, Record<string, string>> = {
	RED: REDLabels,
	TSD: TSDLabels,
	ATD: ATDLabels,
	General: GeneralLabels,
	Supervisory: SupervisoryLabels,
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

/** Whether a value counts as "filled in" for progress purposes. */
export const isFilled = (value: unknown): boolean => {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return value !== undefined && value !== null;
};
