import type { DeputyData, divisionsType, FormatData } from "@/types";

export const TSDLabels: Record<string, string> = {
	"1": "BRAVO Certification - Pending practical",
	"2": "BRAVO Certification - Application accepted",
	"3": "BRAVO Certification - Application denied",
	"4": "BRAVO Certification - Certificaion passed",
	"5": "Interceptor Certification - Pending practical",
	"6": "Interceptor Certification - Application accepted",
	"7": "Interceptor Certification - Application denied",
	"8": "Interceptor Certification - Certificaion passed",
	"9": "D10 Certification - Pending practical",
	"10": "D10 Certification - Application accepted",
	"11": "D10 Certification - Application denied",
	"12": "D10 Certification - Certification passed",
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
[size=95]"Certification Pending Practical"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your BRAVO Certification application has been moved to [b][color=orange][b]Pending Practical[/b][/color][/b]. You should now reach to out to any Traffic Deputy II or above who is BRAVO certified to complete your practical.

[/list]



[hr][/hr][list=none]

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"2": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Accepted"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

After review of your Bravo unit certification application I have decided to [b][i][color=#008000]ACCEPT[/color][/i][/b] it at this time. You must now find a Traffic Deputy II+ that is already certified in order to complete the certification with a practical test. Should you pass this test you will have permission to deploy the BRAVO unit. Congratulations and good luck.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"3": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Denied"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your BRAVO Certification application has been [b][color=red][b]Denied[/b][/color][/b] after failing to complete your practical. You must wait a period of at least 7 days before applying again.

[/list]



[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},

		"4": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Passed"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

Following the practical test of your vehicle certification, I have decided to [b][i][color=#008000]PASS[/color][/i][/b] you at this time. You now have permission to deploy the [i]BRAVO[/i] unit. Congratulations and good luck.


From,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriffs Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"5": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Pending Practical"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your Interceptor Certification application has been moved to [b][color=orange][b]Pending Practical[/b][/color][/b]. You should now reach to out to any Traffic Deputy II or above who is Interceptor certified to complete your practical.

[/list]



[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"6": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Accepted"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

After review of your Interceptor unit certification application I have decided to [b][i][color=#008000]ACCEPT[/color][/i][/b] it at this time. You must now find a Traffic Deputy II+ that is already certified in order to complete the certification with a practical test. Should you pass this test you will have permission to use the Interceptor units. Congratulations and good luck.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"7": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Denied"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your Interceptor Certification application has been [b][color=red][b]Denied[/b][/color][/b] after failing to complete your practical. You must wait a period of at least 7 days before applying again.

[/list]



[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"8": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Passed"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

Following the practical test of your vehicle certification, I have decided to [b][i][color=#008000]PASS[/color][/i][/b] you at this time. You now have permission to deploy the [i]Interceptor Units[/i] within your rank authority. Congratulations and good luck.


From,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriffs Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
		"9": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Pending Practical"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your D10 Certification application has been moved to [b][color=orange][b]Pending Practical[/b][/color][/b]. You should now reach out to any Traffic Deputy III or above who is D10 certified to complete your practical.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},

		"10": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Accepted"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

After review of your D10 unit certification application I have decided to [b][i][color=#008000]ACCEPT[/color][/i][/b] it at this time. You must now find a Traffic Deputy III+ that is already certified in order to complete the certification with a practical test. Should you pass this test you will have permission to use the D10 units. Congratulations and good luck.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		"11": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Denied"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

TSD Command is reaching out to inform you that your D10 Certification application has been [b][color=red][b]Denied[/b][/color][/b] after failing to complete your practical. You must wait a period of at least 7 days before applying again.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriff's Department

[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},

		"12": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Traffic Services Detail[/size]
[size=95]"Certification Passed"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]
[b]Deputy ${formatData.deputyName}[/b]

Following the practical test of your vehicle certification, I have decided to [b][i][color=#008000]PASS[/color][/i][/b] you at this time. You now have permission to deploy the [i]D10 Units[/i] within your rank authority. Congratulations and good luck.

From,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}, Traffic Services Detail
Los Santos County Sheriffs Department
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = TSDLabels[key];
	});
	return { format: formats[formatId].text, formats };
};
