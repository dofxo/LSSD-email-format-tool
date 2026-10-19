import type { DeputyData, FormatData, divisionsType } from "@/types";

// Labels for Air Support Bureau formats. Formats for this division are added
// from /admin, so there are no built-in formats to name here yet.
export const ASBLabels: Record<string, string> = {};

export const ASBFormats = ({
	formatId,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
	formatId: string;
}) => ({
	format: `[Invalid format for ASB division: ${formatId}]`,
	formats: {} as Record<string, { text: string; label?: string }>,
});
