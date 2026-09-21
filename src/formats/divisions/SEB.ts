import type { DeputyData, FormatData } from "@/types";

/**
 * The six graded areas of the Crisis Negotiator practical review, in the order
 * the letter lists them. src/data/sebInputs.ts mirrors this list by index
 * (cnGrade0-5 / cnReason0-5), so keep the two in step.
 */
const CN_CRITERIA = [
	"Scene Awareness",
	"Strategic Thinking",
	"Situation Control",
	"Self Control",
	"Communication",
	"Empathy",
];

/** One graded criterion of the Crisis Negotiator review: grade, then the reason. */
const cnGradeBlock = (label: string, grade?: string, reason?: string) =>
	`[b]${label}[/b] - [${grade ?? "GRADE"}]\n${reason ?? "REASON"}`;

/** The closing decision line, coloured per the letter's own PASS/FAIL styling. */
const CN_PASS = "[color=#008000][b]PASS[/b][/color]";
const CN_FAIL = "[color=#FF0000][b]FAIL[/b][/color]";

// Labels for Special Enforcement Bureau formats.
// Each key is the format id; the ids are referenced by the field definitions
// in src/data/sebInputs.ts.
export const SEBLabels: Record<string, string> = {
	"1": "Confidential Email",
	"2": "Deployment Log",
	"3": "Patrol Log",
	"4": "Dive Team Certification - Passed (Written Exam)",
	"5": "Dive Team Certification - Failed (Written Exam)",
	"6": "Advanced Aerial Unit Certification - Passed (Written Exam)",
	"7": "Advanced Aerial Unit Certification - Failed (Written Exam)",
	"8": "Long Range Rifle Certification - Passed (Written Exam)",
	"9": "Long Range Rifle Certification - Failed (Written Exam)",
	"10": "EOD Technician Certification - Passed (Written Exam)",
	"11": "EOD Technician Certification - Failed (Written Exam)",
	"12": "Crisis Negotiator Certification - Passed (Written Exam)",
	"13": "Crisis Negotiator Certification - Failed (Written Exam)",
	"14": "Dive Team Certification - Passed (Practical Exam)",
	"15": "Dive Team Certification - Failed (Practical Exam)",
	"16": "Advanced Aerial Unit Certification - Passed (Practical Exam)",
	"17": "Advanced Aerial Unit Certification - Failed (Practical Exam)",
	"18": "Long Range Rifle Certification - Passed (Practical Exam)",
	"19": "Long Range Rifle Certification - Failed (Practical Exam)",
	"20": "EOD Technician Certification - Passed (Practical Exam)",
	"21": "EOD Technician Certification - Failed (Practical Exam)",
	"22": "Crisis Negotiator Certification - Passed (Practical Exam)",
	"23": "Crisis Negotiator Certification - Failed (Practical Exam)",
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
	/**
	 * The Crisis Negotiator practical review. The passed and failed letters are
	 * the same document apart from the closing decision, so the body is built
	 * once and handed the verdict.
	 */
	const crisisNegotiatorReview = (decision: string) => `[img]https://i.imgur.com/0vn8z3q.png[/img]
[lssdsubtitle]Introduction[/lssdsubtitle]
[divbox=white]
[list=none]

Operator [[i]${formatData.operatorLastName || "INSERT LAST NAME"}[/i]],

You are being contacted today in regards to the Crisis Negotiator Training you have recently taken part in. Below you will find a comprehensive review of your performance as well as your results further below. I would like to thank you on behalf of the Special Enforcement Bureau for the time you have taken in order to undertake this training, and we hope that this result is what was expected.
[/list]
[/divbox]

[lssdsubtitle]Grading and Review[/lssdsubtitle]
[divbox=white]
[list=none]
Below you will find a grading system based on several criteria that we have determined are key areas of evaluation for this certification. Please note that Grading, although subjective to the Instructor, is final and is not meant to praise or shame, it is simply to highlight areas that may need improving, or areas that will serve you well during your negotiations.

[divbox=white]
[spoiler=Grading System]
■  --[color=#FF0000][b]Needs Improvement[/b][/color]
■■ -- [color=#FF8000][b]Room for Improvement[/b][/color]
■■■ -- [color=#808000][b]Satisfactory[/b][/color]
■■■■ -- [color=#80BF00][b]Excellent[/b][/color]
■■■■■ -- [color=#00FF00][b]Exemplary[/b][/color]
[/spoiler]
[/divbox]
[hr][/hr]
[list=none]
${CN_CRITERIA.map((label, index) =>
		cnGradeBlock(
			label,
			formatData[`cnGrade${index}` as keyof FormatData] as string | undefined,
			formatData[`cnReason${index}` as keyof FormatData] as string | undefined,
		),
	).join("\n\n[hr][/hr]\n")}

[/divbox]

[lssdsubtitle]Closing Statement[/lssdsubtitle]
[divbox=white]
[list=none]
With the aforementioned considerations, I have decided to ${decision} your certification at this time. Thank you for your time, and going forward, we hope that you take into consideration the areas that need improvement, but also remain aware of your strong areas regardless of your result so that you may improve, and you do not let your already established skills diminish.
[/list]
[hr][/hr]
[list=none]
Kind Regards,

[img]${deputyData.signature || " SIGNATURE IMAGE HERE "}[/img]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/list]
[/divbox]`;

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

		// 4. Dive Team Certification - Passed (Written Exam)
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

		// 5. Dive Team Certification - Failed (Written Exam)
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

		// 6. Advanced Aerial Unit Certification - Passed (Written Exam)
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

		// 7. Advanced Aerial Unit Certification - Failed (Written Exam)
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

		// 8. Long Range Rifle Certification - Passed (Written Exam)
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

		// 9. Long Range Rifle Certification - Failed (Written Exam)
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

		// 10. EOD Technician Certification - Passed (Written Exam)
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

		// 11. EOD Technician Certification - Failed (Written Exam)
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

		// 12. Crisis Negotiator Certification - Passed (Written Exam)
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

		// 13. Crisis Negotiator Certification - Failed (Written Exam)
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

		// 14. Dive Team Certification - Passed (Practical Exam)
		"14": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#00FF00]Application Response[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]

Operator ${formatData.operatorLastName || "LName"},

You are being contacted today regarding your Dive Team Application that you underwent on ${formatData.practicalDate || "DATE"},

This email serves as notice that you have successfully passed the practical portion of your Dive Team Unit Certification Program and are now authorized to perform Dive Team Unit operations.

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

		// 15. Dive Team Certification - Failed (Practical Exam)
		"15": {
			text: `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://i.imgur.com/uXQ1hoT.png[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#FF0000]Application Response[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]

Operator ${formatData.operatorLastName || "LName"},

You are being contacted today regarding your Dive Team Application that you underwent on ${formatData.practicalDate || "DATE"},

This email serves as notice that, unfortunately, we must reject your certification.
The reasons for your denial are the following:

${(formatData.reasons ?? []).map((reason) => `[list]${reason}[/list]`).join("\n") || "[list]Reason 1[/list]\n[list]Reason 2[/list]"}

Do not let this impede your future; take the critique received and improve yourself using it as a baseline.
You are free to reapply for the Dive Team Program in 7 days unless other requirements have already been laid out.
[hr][/hr]
[list=none]

[img]${deputyData.signature || "Image"}[/img]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "RANK FNAME LNAME"}
${formatData.senderPosition || "Instructor, Training Division"}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 16. Advanced Aerial Unit Certification - Passed (Practical Exam)
		"16": {
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

You are being contacted today in regards to your Advanced Aerial Unit training that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that you have successfully passed the practical portion of your Advanced Aerial Unit Certification Program and are now authorized to perform Advanced Aerial Unit operations.

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

		// 17. Advanced Aerial Unit Certification - Failed (Practical Exam)
		"17": {
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

You are being contacted today in regards to your Advanced Aerial Unit Application that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that unfortunately, we must reject your certification. 
The reasons for your denial are the following:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]
Do not let this impede your future, take the critique received, and improve yourself using it as a baseline. 
You are free to reapply for the Advanced Aerial Unit Program in 7 days unless other requirements have already been laid out.
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

		// 18. Long Range Rifle Certification - Passed (Practical Exam)
		"18": {
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

You are being contacted today in regards to your Long Range Rifle Certification that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that you have successfully passed the practical portion of your Long Range Rifleperson Certification Program and are now authorized to perform Long Range Rifle operations.

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

		// 19. Long Range Rifle Certification - Failed (Practical Exam)
		"19": {
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

You are being contacted today in regards to your Long Range Rifle Certification that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that unfortunately, we must reject your certification. 
The reasons for your denial are the following:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]
Do not let this impede your future, take the critique received, and improve yourself using it as a baseline. 
You are free to reapply for the Long Range Rifleperson Program in 7 days unless other requirements have already been laid out.
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

		// 20. EOD Technician Certification - Passed (Practical Exam)
		"20": {
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

You are being contacted today in regards to your EOD Technician training that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that you have successfully passed the practical portion of your EOD Technician Certification Program and are now authorized to perform EOD Technician operations.

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

		// 21. EOD Technician Certification - Failed (Practical Exam)
		"21": {
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

You are being contacted today in regards to your EOD Technician Application that you underwent on ${formatData.practicalDate || "DATE"}, 

This email serves as notice that unfortunately, we must reject your certification. 
The reasons for your denial are the following:
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*]Reason 1\n[*]Reason 2"}
[/list]
Do not let this impede your future, take the critique received, and improve yourself using it as a baseline. 
You are free to reapply for the EOD Technician Program in 7 days unless other requirements have already been laid out.
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

		// 22/23. Crisis Negotiator Certification - Passed / Failed (Practical Exam)
		"22": { text: crisisNegotiatorReview(CN_PASS) },
		"23": { text: crisisNegotiatorReview(CN_FAIL) },
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
