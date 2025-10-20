import type { DeputyData, FormatData } from "@/types";

export const ATDFormats = ({
	formatData,
	deputyData,
	division,
	formatId,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	division: "RED" | "TSD" | "ATD";
	formatId: string;
}) => {
	const formats: Record<string, string> = {};

	return formats[formatId];
};
