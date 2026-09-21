import type { DeputyData, FormatData } from "@/types";

// Labels for Special Enforcement Bureau formats.
// Each key is the format id; the ids are referenced by the field definitions
// in src/data/sebInputs.ts.
export const SEBLabels: Record<string, string> = {
	"1": "Confidential Email",
	"2": "Deployment Log",
	"3": "Patrol Log",
	"4": "Dive Team Certification - Passed",
	"5": "Dive Team Certification - Failed",
	"6": "Advanced Aerial Unit Certification - Passed",
	"7": "Advanced Aerial Unit Certification - Failed",
	"8": "Long Range Rifle Certification - Passed",
	"9": "Long Range Rifle Certification - Failed",
	"10": "EOD Technician Certification - Passed",
	"11": "EOD Technician Certification - Failed",
	"12": "Crisis Negotiator Certification - Passed",
	"13": "Crisis Negotiator Certification - Failed",
};

export const SEBFormats = ({
	formatId,
	formatData,
	deputyData,
}: {
	formatId: string;
	formatData: FormatData;
	deputyData: DeputyData;
}) => {
	const formats: Record<string, { text: string; label?: string }> = {
		// 1. Confidential Email
		"1": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.ibb.co/dsZSqrs2/u-XQ1ho-T.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial]
[b][size=125][color=#FF0000]CONFIDENTIAL INFORMATION - DO NOT SHARE[/color][/size][/b]
[b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#FF0000]Email[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]
[list=none][right]${formatData.date || "DAY MONTH, YEAR"}[/right]
${formatData.body || "[Insert text]"}

[/list]
[hr][/hr]
[list=none]

${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${[formatData.bureauPosition, formatData.certifications].filter(Boolean).join(", ") || "BureauPosition, [Insert Certifications if Desired]"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 2. Deployment Log
		"2": {
			text: `[img]https://i.imgur.com/lBPmkME.png[/img]
[center][color=#BF0000][size=85]Sharing this information is strictly forbidden.[/size][/color][/center]
[divbox=white]
[b]Operators:[/b]
[list]
${(formatData.operators ?? []).map((operator) => `[*]${operator}`).join("\n") || "[*]\n[*]"}
[/list]
[b]Date:[/b] ${formatData.logDate || "DD/MM/YYYY"}
[b]Deployment Hours:[/b] ${formatData.deploymentStart || "00:00"}
[b]Deployment End Time:[/b] ${formatData.deploymentEnd || "00:00"}

${formatData.confiscatedItems?.length ? `[spoiler=Confiscated Items (Optional - if arrest report is linked)]
[b]Confiscated Items: [/b]
[list]
${formatData.confiscatedItems.map((item) => `[*]${item}`).join("\n")}
[/list]
[/spoiler]

` : ""}${formatData.suspects?.length ? `[spoiler=Suspects (Optional - if arrest report is linked) ]
[b]Suspects:[/b]
[list]
${formatData.suspects.map((suspect) => `[*]${suspect}`).join("\n")}
[/list]
[/spoiler]

` : ""}[b]Event Description:[/b]
${formatData.eventDescription ?? ""}


[/divbox]`,
		},

		// 3. Patrol Log
		"3": {
			text: `[img]https://i.imgur.com/XKbhNaG.png[/img]
[center][color=#BF0000][size=85]Sharing this information is strictly forbidden.[/size][/color][/center]
[divbox=white][center][size=85][i]S.E.B. Callsign: ${formatData.callsign || "XX"}[/i][/size][/center]
[b]Operators:[/b]
[list=]
${(formatData.operators ?? []).map((operator) => `[*]${operator}`).join("\n") || "[*]\n[*]"}
[/list]
[b]Date:[/b] ${formatData.logDate || "01/JAN/2000"}
[b]Time:[/b] ${formatData.deploymentStart || "00:00"} - ${formatData.deploymentEnd || "00:00"}

[b]DELTA Summary/Timeline:[/b]
${formatData.eventDescription ?? ""}



[b]Signature:[/b] [i]${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Insert Here"}[/i]
[/divbox]`,
		},

		// 4. Dive Team Certification - Passed
		"4": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#00FF00]Application Response[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]

Operator ${formatData.operatorLastName || "LName"},

You are being contacted today regarding your Dive Team Certification Application that you submitted on ${formatData.applicationDate || "DATE"},

This email serves as notice that you have successfully passed the written examination portion of your Dive Team Application and are invited to take the next step in becoming a certified Diver. Please reach out to a member of the instructor team in order to schedule a training time that works for you!

Congratulations, and good luck!


[hr][/hr]
[list=none]

[img]${deputyData.signature || "Image"}[/img]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 5. Dive Team Certification - Failed
		"5": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#FF0000]Application Response[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]

Operator ${formatData.operatorLastName || "LName"},

You are being contacted today regarding your Dive Team Certification Application that you submitted on ${formatData.applicationDate || "DATE"},

This email serves as notice that, unfortunately, your performance on the written examination was not sufficient to consider you for continued progress in the Dive Team Certification Program.

The reason for your denial from the certification program is as follows:
[list]
${(formatData.reasons ?? []).map((reason) => `[list]${reason}[/list]`).join("\n") || "[list]Reason 1[/list]\n[list]Reason 2[/list]"}
[/list]
We thank you for your interest in the certification program, and wish you luck on your future attempts, should you decide to try again.


[hr][/hr]
[list=none]

[img]${deputyData.signature || "Image"}[/img]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 6. Advanced Aerial Unit Certification - Passed
		"6": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#008040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Advanced Aerial Unit Certification Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that you have successfully passed the written examination portion of your Crisis Negotiator Application and are invited to take the next step in becoming a certified Long Range Rifleperson. Please reach out to a member of the instructor team in order to schedule a training time that works for you!

Congratulations, and good luck!
[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 7. Advanced Aerial Unit Certification - Failed
		"7": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#BF0040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Advanced Aerial Unit Certification Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that unfortunately your performance on the written examination was not sufficient to consider you for continued progress in the Advanced Aerial Unit Certification Program.

The reason for your denial from the certification program is as follows:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]

We thank you for your interest in the certification program, and wish you luck on your future attempts, should you decide to try again.

[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 8. Long Range Rifle Certification - Passed
		"8": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#008040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Long Range Rifle Certification Application that you submitted, 

This email serves as notice that you have successfully passed the written examination portion of your Long Range Rifle Application and are invited to take the next step in becoming a certified Long Range Rifleperson. Please reach out to a member of the instructor team in order to schedule a training time that works for you!

Congratulations, and good luck!
[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 9. Long Range Rifle Certification - Failed
		"9": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#BF0040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Long Range Rifle Certification Application that you submitted, 

This email serves as notice that unfortunately your performance on the written examination was not sufficient to consider you for continued progress in the Long Range Rifle Certification Program.

The reason for your denial from the certification program is as follows:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]

We thank you for your interest in the certification program, and wish you luck on your future attempts, should you decide to try again.

[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 10. EOD Technician Certification - Passed
		"10": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/zA0qcgC.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#008040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your EOD Technician Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that you have successfully passed the written examination portion of your EOD Technician Application and are invited to take the next step in becoming a certified EOD Technician. Please reach out to a member of the instructor team in order to schedule a training time that works for you!

Congratulations, and good luck!
[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 11. EOD Technician Certification - Failed
		"11": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/zA0qcgC.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#BF0040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Crisis Negotiator Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that unfortunately your performance on the written examination was not sufficient to consider you for continued progress in the Crisis Negotiator Certification Program.

The reason for your denial from the certification program is as follows:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]

We thank you for your interest in the certification program, and wish you luck on your future attempts, should you decide to try again.

[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 12. Crisis Negotiator Certification - Passed
		"12": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/zA0qcgC.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#008040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Crisis Negotiator Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that you have successfully passed the written examination portion of your Crisis Negotiator Application and are invited to take the next step in becoming a certified Crisis Negotiator. Please reach out to a member of the instructor team in order to schedule a training time that works for you!

Congratulations, and good luck!
[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 13. Crisis Negotiator Certification - Failed
		"13": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/zA0qcgC.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=95]Special Enforcement Bureau - [color=#BF0040]Application Response[/color][/size]
[size=85]"SAVING LIVES PRIORITY 1"[/size][/font][/right][/aligntable]
[hr][/hr]
[list=none][right]${formatData.date || "Month Day, Year"}[/right]

[b]Operator ${formatData.operatorLastName || "LName"},[/b]

You are being contacted today in regards to your Crisis Negotiator Application that you submitted on ${formatData.applicationDate || "DATE"}, 

This email serves as notice that unfortunately your performance on the written examination was not sufficient to consider you for continued progress in the Crisis Negotiator Certification Program.

The reason for your denial from the certification program is as follows:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]

We thank you for your interest in the certification program, and wish you luck on your future attempts, should you decide to try again.

[/list]
[hr][/hr]
[list=none]

[font=cursive][size=90][img]${deputyData.signature || "INSERT LINK HERE"}[/img][/size][/font]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = SEBLabels[key];
	});

	if (!formats[formatId] || !SEBLabels[formatId]) {
		return {
			format: "[Invalid format for SEB division]",
			formats,
		};
	}

	return { format: formats[formatId]?.text ?? "", formats };
};
