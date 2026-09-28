import { REDFormats } from "./divisions/RED";
import { TSDFormats } from "./divisions/TSD";
import { ATDFormats } from "./divisions/ATD";
import { GeneralFormats } from "./divisions/General";
import { SupervisoryFormats } from "./divisions/Supervisory";
import { FTBFormats } from "./divisions/FTB";
import { SEBFormats } from "./divisions/SEB";
import { adminBodyFor } from "@/lib/adminFormats";
import { formatFieldsFor } from "@/lib/formats";
import { renderFormatTemplate, type CheckboxFieldSpec } from "@/lib/formatTemplates";
import type { DeputyData, divisionsType, FormatData } from "@/types";

export const registry = {
	RED: REDFormats,
	TSD: TSDFormats,
	ATD: ATDFormats,
	General: GeneralFormats,
	Supervisory: SupervisoryFormats,
	FTB: FTBFormats,
	SEB: SEBFormats,
} as const;

/**
 * The format's checkbox fields, in the order its form asks for them, so the
 * renderer ticks the `[cb]` lines each one answers for. They are the same fields
 * the form shows, which is what keeps the two in step when one is moved.
 */
const checkboxFieldsFor = (division: divisionsType, formatId: string): CheckboxFieldSpec[] =>
	formatFieldsFor(division, formatId)
		.filter((field) => field.type === "checkbox" && field.items?.length)
		.map((field) => ({ name: field.name, items: field.items as string[] }));

export const getFormat = ({
	formatData,
	deputyData,
	formatId,
	division,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	formatId: string;
	division: divisionsType;
}) => {
	// A body saved at /admin (an edited or newly added format) replaces the
	// generator entirely, with its {{tokens}} filled from the form data.
	const adminBody = adminBodyFor(division, formatId);
	if (adminBody !== null) {
		return {
			format: renderFormatTemplate(adminBody, {
				formatData,
				deputyData,
				division,
				checkboxFields: checkboxFieldsFor(division, formatId),
			}),
			formats: {},
		};
	}

	const build = registry[division];
	if (!build) return { format: "[Invalid division]", formats: {} };
	return build({ formatData, deputyData, division, formatId });
};
