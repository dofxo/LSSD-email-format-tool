import type { divisionsType } from "@/types";
import { GeneralLabels } from "@/formats/divisions/General";
import { REDLabels } from "@/formats/divisions/RED";
import { SupervisoryLabels } from "@/formats/divisions/Supervisory";
import { ATDLabels } from "@/formats/divisions/ATD";
import { TSDLabels } from "@/formats/divisions/TSD";
import { FTBLabels } from "@/formats/divisions/FTB";
import { SEBLabels } from "@/formats/divisions/SEB";
import {
	adminBodyFor,
	adminLabelFor,
	adminPicksFor,
	customFormatsFor,
	overrideFor,
} from "@/lib/adminFormats";
import { bodyTokens } from "@/lib/formatTemplates";
import { inputsByDivision } from "@/data/formatInputs";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { formatCategories } from "@/formats/formatCategories";
import type { FormatFieldPick, FormatInputField } from "@/types";

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
 * The inputs a format falls back to before it has any /admin picks: the built-in
 * field table's entries ticked for it, in that table's order. This is only the
 * default the format editor loads — there is no division-level list any more.
 */
export const defaultFieldNamesFor = (division: divisionsType, formatId: string): string[] => {
	const names: string[] = [];
	for (const field of inputsByDivision[division] ?? []) {
		if (field.formats.includes(formatId) && !names.includes(field.name)) names.push(field.name);
	}
	return names;
};

/** Turns a catalogue token into the field a form renders, with any format wording applied. */
const resolveField = (name: string, pick?: FormatFieldPick): FormatInputField | null => {
	const definition = catalogueInputFor(name);
	if (!definition) return null;
	const { label, ...rest } = definition;
	return {
		name,
		label: pick?.label?.trim() || label,
		hint: pick?.hint?.trim() || definition.hint,
		// Nothing needs the legacy per-format ticks any more; the body or the pick decides.
		formats: [],
		...rest,
	};
};

/**
 * Whether a format prints its own body written at /admin, rather than the output
 * of its built-in generator.
 */
export const usesOwnBody = (division: divisionsType, formatId: string): boolean =>
	adminBodyFor(division, formatId) !== null;

/** The `{{tokens}}` a format's own body names; empty when it has no body of its own. */
export const bodyTokensFor = (division: divisionsType, formatId: string): string[] => {
	const body = adminBodyFor(division, formatId);
	return body === null ? [] : bodyTokens(body);
};

/**
 * The dynamic form fields a specific format asks for.
 *
 * A format with a body of its own says this itself: the inputs its `{{tokens}}`
 * name are the ones its form shows, so nothing has to be ticked for it. A format
 * still running its built-in generator has no template to read, so it uses the
 * inputs picked for it at /admin — falling back to the built-in defaults ticked
 * for it until those picks are made.
 *
 * Either way the shared catalogue supplies each field's type, options and
 * default wording, and a per-format pick overrides just the label and hint.
 */
export const formatFieldsFor = (division: divisionsType, formatId: string): FormatInputField[] => {
	if (!formatId) return [];

	const picks = adminPicksFor(division, formatId);
	const pickByName = new Map((picks ?? []).map((pick) => [pick.name, pick]));

	const names = usesOwnBody(division, formatId)
		? bodyTokensFor(division, formatId)
		: (picks?.map((pick) => pick.name) ?? defaultFieldNamesFor(division, formatId));

	return names
		.map((name) => resolveField(name, pickByName.get(name)))
		.filter((field): field is FormatInputField => field !== null);
};

/** Whether a value counts as "filled in" for progress purposes. */
export const isFilled = (value: unknown): boolean => {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return value !== undefined && value !== null;
};
