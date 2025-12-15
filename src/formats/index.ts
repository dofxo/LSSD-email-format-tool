import { REDFormats } from "./divisions/RED";
import { TSDFormats } from "./divisions/TSD";
import { ATDFormats } from "./divisions/ATD";
import { GeneralFormats } from "./divisions/General";
import type { DeputyData, divisionsType, FormatData } from "@/types";

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
	switch (division) {
		case "RED":
			return REDFormats({ formatData, deputyData, division, formatId });
		case "TSD":
			return TSDFormats({ formatData, deputyData, division, formatId });
		case "ATD":
			return ATDFormats({ formatData, deputyData, division, formatId });
		case "General":
			return GeneralFormats({ formatData, deputyData, formatId });
		default:
			return { format: "[Invalid division]", formats: {} };
	}
};
