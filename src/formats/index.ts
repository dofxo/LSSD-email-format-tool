import type { DeputyData, FormatData } from "../types";
import { registry } from "./registry";

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
}) => {
	const branch = registry?.[division];
	if (!branch)
		return {
			format: `[${division} division failed to load]`,
			formats: {},
		};

	const template = branch({ formatData, deputyData, division, formatId });
	return {
		format: template.format ?? "[Invalid format ID or division]",
		formats: template.formats,
	};
};
