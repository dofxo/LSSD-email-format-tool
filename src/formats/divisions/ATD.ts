import type { DeputyData, division, FormatData } from "@/types";

export const ATDFormats = ({
	formatData,
	deputyData,
	division,
	formatId,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	division: division;
	formatId: string;
}) => {
	const formats: Record<string, string> = {};

	return formats[formatId];
};
