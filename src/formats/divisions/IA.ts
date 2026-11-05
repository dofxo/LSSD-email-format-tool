// Labels for Internal Affairs division formats.
// Add entries like { "1": "Some Internal Affairs Format" } and the matching body
// in the formats map below when you start using IA-specific templates.

import type { DeputyData, divisionsType, FormatData } from "@/types";

export const IALabels: Record<string, string> = {};

export const IAFormats = ({
	formatId,
}: {
	formatId: string;
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
}) => {
	// Define Internal Affairs formats here as needed. Example structure:
	// const formats: Record<string, { text: string; label?: string }> = {
	//   "1": { text: "Template text using " + deputyData.name, label: "My IA Template" },
	// };
	const formats: Record<string, { text: string; label?: string }> = {};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = IALabels[key];
	});

	if (!formats[formatId]) {
		return {
			format: "[Invalid format for Internal Affairs division]",
			formats,
		};
	}

	return { format: formats[formatId].text, formats };
};
