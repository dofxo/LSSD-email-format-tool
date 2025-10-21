import type { DeputyData, divisionsType, FormatData } from "@/types";

export const ATDLabels: Record<string, string> = {};

export const ATDFormats = ({
	formatData,
	deputyData,
	division,
	formatId,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
	formatId: string;
}) => {
	const formats: Record<string, { text: string; label?: string }> = {};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = ATDLabels[key];
	});

	return { format: formats[formatId].text, formats };
};
