import type { DeputyData, FormatData } from "../types.ts";
import { REDFormats } from "./divisions/RED.ts";
import { TSDFormats } from "./divisions/TSD.ts";
import { ATDFormats } from "./divisions/ATD.ts";

const registry = {
	RED: REDFormats,
	TSD: TSDFormats,
	ATD: ATDFormats,
};

export const getFormat = ({
	formatData,
	deputyData,
	formatId,
	division,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	formatId: string;
	division: "RED" | "TSD" | "ATD";
}): string => {
	const branch = registry[division];
	const template = branch?.({ formatData, deputyData, division, formatId });
	return template ?? "[Invalid format ID or division]";
};
