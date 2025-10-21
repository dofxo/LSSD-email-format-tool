import type { DeputyData, divisionsType, FormatData } from "@/types";

export const TSDLabels: Record<string, string> = {
	"1": "BRAVO Cert - Pending Practical",
};

export const TSDFormats = ({
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
	const formats: Record<string, { text: string; label?: string }> = {
		"1": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Accepted"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy Fname Lname[/b]

After review of your Bravo unit certification application I have decided to [b][i][color=#008000]ACCEPT[/color][/i][/b] it at this time. You must now find a Traffic Deputy II+ that is already certified in order to complete the certification with a practical test. Should you pass this test you will have permission to deploy the BRAVO unit. Congratulations and good luck.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = TSDLabels[key];
	});
	return { format: formats[formatId].text, formats };
};
