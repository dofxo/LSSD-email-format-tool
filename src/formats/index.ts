import { REDFormats } from "./divisions/RED";
import { TSDFormats } from "./divisions/TSD";
import { ATDFormats } from "./divisions/ATD";
import { GeneralFormats } from "./divisions/General";
import { SupervisoryFormats } from "./divisions/Supervisory";
import { FTBFormats } from "./divisions/FTB";
import { SEBFormats } from "./divisions/SEB";
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
	const build = registry[division];
	if (!build) return { format: "[Invalid division]", formats: {} };
	return build({ formatData, deputyData, division, formatId });
};
