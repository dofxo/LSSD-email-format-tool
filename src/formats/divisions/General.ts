// Labels for General division formats.
// Add entries like { "1": "Some General Format" } and define the corresponding

import type { DeputyData, FormatData } from "@/types";

// body in the formats map below when you start using General-specific templates.
export const GeneralLabels: Record<string, string> = {
	"1": "Personal Email",
};

export const GeneralFormats = ({
	formatId,
	formatData,
	deputyData,
}: {
	formatId: string;
	formatData: FormatData;
	deputyData: DeputyData;
}) => {
	// Define General division formats here as needed. Example structure:
	// const formats: Record<string, { text: string; label?: string }> = {
	//   "1": { text: "Template text using " + deputyData.name, label: "My General Template" },
	// };
	const formats: Record<string, { text: string; label?: string }> = {
		"1": {
			text: `[img]https://i.ibb.co/JFHCzWMt/a3a-Dj-Gi.png[/img][divbox=white]
[img]https://i.ibb.co/chwhqKz9/FAy-Ey-Jd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr] 
[list=none][right]${formatData.date}[/right]

[size=110]Dear ${formatData.recipientName},[/size]

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.ibb.co/JFHCzWMt/a3a-Dj-Gi.png[/img]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = GeneralLabels[key];
	});

	if (!formats[formatId]) {
		return {
			format: "[Invalid format for General division]",
			formats,
		};
	}

	return { format: formats[formatId].text, formats };
};
