import moment from "moment";
import type { DeputyData, FormatData } from "@/types";
import { OTP_SESSIONS } from "@/data/sebInputs";
import type { OtpSessionSpec } from "@/data/sebInputs";

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

const OTP_PROFILE_HEADER = "[img]https://i.imgur.com/Ry6I6OT.png[/img]";

/** The exam notice that closes the OTP progress section of the profile. */
const OTP_EXAM_NOTICE = `[img]https://i.ibb.co/pkZkz59/TD-Exam.png[/img]
[divbox=white]
[center][color=Orange][size=150][b]Awaiting Response[/b][/size][/color][/center]
[list=none]
The exam has been successfully sent to the Trainee Operator. SEB Command is now awaiting their response in order to proceed with grading.
[/list]
[hr]
[list=none]
Sincerely,

Special Enforcement Bureau Command
[/list]
[/divbox]
[lssdfooter][/lssdfooter]`;

/** A 24h time spelled the way the OTP worksheets write it: "hh:mm AM/PM". */
const otpTime = (time?: string) => {
	if (!time) return "HH:MM AM/PM";
	const parsed = moment(time, "HH:mm");
	return parsed.isValid() ? parsed.format("hh:mm A") : time;
};

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
	"24": "Operator Exam - Passed",
	"25": "Operator Exam - Failed",
	"26": "Promotion Email",
	"27": "Training Session Scheduling",
	"28": "Inactivity Notice",
	"29": "Email",
	"30": "Probationary Operator Profile",
	"31": "OTP Session 1",
	"32": "OTP Session 2",
	"33": "OTP Session 3",
	"34": "Exam Sent to Trainee",
	"35": "TD Instructor Acceptance",
	"36": "TD Instructor Denial",
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
	 * The letter head shared by the SEB emails: logo, department name, the red
	 * tag for the letter type and the motto, ending on the dated greeting list.
	 * The Training Division letters swap the logo and sit a blank line lower.
	 */
	const sebLetterHead = (
		tag: string,
		date?: string,
		options: { logo?: string; gapBeforeGreeting?: boolean } = {},
	) => {
		const logo = options.logo ?? "https://i.imgur.com/uXQ1hoT.png";
		const gap = options.gapBeforeGreeting ? "\n" : "";
		return `[lssdfooter][/lssdfooter]
[divbox=white]
[float=left][/float]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]${logo}[/fimg][/aligntable]
[aligntable=right,0,0,0,0,0,0][right][font=Arial][b][size=125]Los Santos County Sheriff's Department[/size][/b]
[size=110]Special Enforcement Bureau - [color=#FF0000]${tag}[/color][/size]
[size=100]"Priority One Is Saving Lives"[/size][/font][/right][/aligntable]

[hr][/hr]${gap}
[list=none][right]${date || "DAY MONTH, YEAR"}[/right]`;
	};

	/**
	 * The bureau rank line of the SEB letters: the sender's SEB rank from the
	 * deputy profile, unless a Bureau position is typed into the format, followed
	 * by any certifications. Empty both ways it falls back to the letter's own
	 * placeholder, so a blank profile never prints an empty line.
	 */
	const bureauLine = (bureauPosition?: string, certifications?: string, fallback = "") =>
		[
			bureauPosition || deputyData.divisionRanks.SEB,
			certifications,
		]
			.filter(Boolean)
			.join(", ") || fallback;

	/**
	 * The closing block shared by the SEB emails: rank and name from the deputy
	 * profile, then the sender's bureau rank and any certifications.
	 */
	const sebLetterSignature = (
		bureauPosition?: string,
		certifications?: string,
		fallback = "BureauPosition, [Insert Certifications if Desired]",
	) => `[list=none]

${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${bureauLine(bureauPosition, certifications, fallback)}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`;

	/**
	 * The signature line every certification letter shares: the sender's role,
	 * then the division, which is the same in all of them. Only the role is typed,
	 * an empty field falls back to Instructor, and a role saved with the division
	 * already on the end still renders once.
	 */
	const positionLine = () => {
		const role = (formatData.senderPosition ?? "").replace(/\s*,?\s*Training Division\s*$/i, "").trim();
		return `${role || "Instructor"}, Training Division`;
	};

	/** One OTP checklist: a single [list] with a tick box at the end of each line. */
	const otpChecklist = (items: string[], field: string) => {
		const ticked = (formatData[field as keyof FormatData] as string[] | undefined) ?? [];
		return `[list]\n${items
			.map((item, index) => `[*] ${item} ${ticked.includes(`${field}:${index}`) ? "[b][X][/b]" : "[ ]"}`)
			.join("\n")}\n[/list]`;
	};

	/** The Session Details block that opens every OTP session. */
	const otpSessionDetails = (prefix: string) => {
		const at = (key: string) => formatData[`${prefix}${key}` as keyof FormatData] as string | undefined;
		return `[lssdsubtitle]Session Details[/lssdsubtitle]\n[divbox=white]\n[b]Date & Start Time:[/b] ${at("Date") || "DD/MMM/YYYY"} ${otpTime(at("Time"))} ((UTC))\n[b]Instructor Rank & Name:[/b] ${at("Instructor") || [deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "SEBRank FNAME LNAME"}\n[/divbox]`;
	};

	/** A titled checklist section of an OTP session. */
	const otpChecklistSection = (heading: string, field: string, items: string[]) =>
		`[lssdsubtitle]${heading}[/lssdsubtitle]\n[divbox=white]\n[b][center]Mark with the following with (X)[/center][/b]${otpChecklist(items, field)}\n[/divbox]`;

	/** The OTP session worksheet on its own: details block, then every checklist. */
	const otpSessionWorksheet = (session: OtpSessionSpec) => {
		const details = otpSessionDetails(session.prefix);
		const worksheet = session.sections
			.map((section) => otpChecklistSection(section.heading, section.field, section.items))
			.join("\n\n");
		return `[img]${session.image}[/img]\n${details}\n${worksheet}`;
	};

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
${positionLine()}
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
${bureauLine(formatData.bureauPosition, formatData.certifications, "BureauPosition, [Insert Certifications if Desired]")}
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

${
	formatData.confiscatedItems?.length
		? `[spoiler=Confiscated Items (Optional - if arrest report is linked)]
[b]Confiscated Items: [/b]
[list]
${formatData.confiscatedItems.map((item) => `[*]${item}`).join("\n")}
[/list]
[/spoiler]

`
		: ""
}${
				formatData.suspects?.length
					? `[spoiler=Suspects (Optional - if arrest report is linked) ]
[b]Suspects:[/b]
[list]
${formatData.suspects.map((suspect) => `[*]${suspect}`).join("\n")}
[/list]
[/spoiler]

`
					: ""
			}[b]Event Description:[/b]
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
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
${positionLine()}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 22/23. Crisis Negotiator Certification - Passed / Failed (Practical Exam)
		"22": { text: crisisNegotiatorReview(CN_PASS) },
		"23": { text: crisisNegotiatorReview(CN_FAIL) },

		// 24. Operator Exam - Passed
		"24": {
			text: `${sebLetterHead("Exam Results", formatData.date)}

After reviewing your Special Enforcement Bureau Operator Exam, the command has determined that you have [color=#00FF00]passed[/color] the exam.

Your promotion will take place once you have reached a minimum of 21 days in your current rank of Trainee Operator

If you have any questions, feel free to reach out.


[/list]
[hr][/hr]
${sebLetterSignature(formatData.bureauPosition, formatData.certifications)}`,
		},

		// 25. Operator Exam - Failed
		"25": {
			text: `${sebLetterHead("Exam Results", formatData.date)}

After reviewing your Special Enforcement Bureau Operator Exam, the command has determined that you have [color=#FF0000]not passed[/color] the exam at this time.

The following reason(s) were noticed during our review:
${(formatData.reasons ?? []).map((reason) => `- ${reason}`).join("\n") || "- Reason\n- Reason"}

You will have the opportunity to retake the exam once you meet the 21 days in rank as a Trainee Operator. Please use this time to further review SEB procedures.


[/list]
[hr][/hr]
${sebLetterSignature(formatData.bureauPosition, formatData.certifications)}`,
		},

		// 26. Promotion Email
		"26": {
			text: `${sebLetterHead("Promotion Email", formatData.date)}

The Special Enforcement Bureau Command is pleased to inform you that you have been promoted from Trainee Operator to Operator.

As a Full Operator, you are now authorized to utilize a wider range of SEB firearms and equipment in accordance with bureau guidelines. As well, if you wish to apply for certifications, you must have a minimum of 14 days in rank as a Full Operator before doing so.

SEB Command would like to congratulate you on this achievement, and we are looking forward to your continued performance within the bureau.

If you have any questions, feel free to reach out.

[/list]
[hr][/hr]
[list=none]
On behalf of the SEB command,
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${bureauLine(formatData.bureauPosition, formatData.certifications, "BureauPosition, [Insert Certifications if Desired]")}
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 27. Training Session Scheduling
		"27": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img]
[divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=100,100]https://imgur.com/kua7JpL.png[/fimg][fimg=100,100]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=130]Los Santos County Sheriff's Department[/size][/b]
[size=115]Special Enforcement Bureau[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]

[list=none]
[b][i]Dear SEB Operators,[/i][/b]

A training session has been scheduled with the following details:

[b]Training[/b]: ${formatData.trainingName || "[Insert Training Name]"}
[b]Date & Time (UTC)[/b]: ${formatData.sessionDate || "DD/MON/YYYY"} - ${formatData.sessionTime || "HH:MM"} UTC
[b]Location[/b]: ${formatData.location || "[Insert Location]"}
[b]Instructor[/b]: ${formatData.instructor || [deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "[Rank Name]"}

Please ensure you arrive 15 minutes prior to the training starting.

[/list]

[hr][/hr]

On behalf of,
The Special Enforcement Bureau Instructor Team

[/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},

		// 28. Inactivity Notice
		"28": {
			text: `${sebLetterHead("Inactivity Notice", formatData.date)}

[b]Subject: Inactivity Notice[/b]

Operator ${formatData.operatorLastName || "[Last Name]"},

This notice is to inform you that you have been marked inactive for not attending any scheduled trainings within the past month. Please make sure to fill in your training attendance [url=https://docs.google.com/forms/d/e/1FAIpQLScEKZtp6MdZ-dEB3Q2gMto3zUn111zO-MHjotHHQEa4Vp8aMA/viewform][color=#0000BF]HERE[/color][/url], as all operators are required to attend at least one training session per month to remain active.

This email serves as an internal written warning regarding failure to meet training participation requirements.

If you have any questions or need to communicate your availability, please reach out to SEB Command.

[/list]
[hr][/hr]
${sebLetterSignature(formatData.bureauPosition, undefined, "BureauPosition")}`,
		},

		// 29. Email
		"29": {
			text: `${sebLetterHead("Email", formatData.date)}
${formatData.body || "[Insert text]"}

[/list]
[hr][/hr]
${sebLetterSignature(formatData.bureauPosition, formatData.certifications)}`,
		},

		// 30. Probationary Operator Profile
		"30": {
			text: `${OTP_PROFILE_HEADER}
[lssdsubtitle]Trainee Operator Details[/lssdsubtitle]
[divbox=white]
[b]Trainee Operator Name:[/b] ${formatData.traineeName || "Lname, Fname"}
[b]Trainee Operator Department Rank:[/b] ${formatData.traineeRank || "Rank"}
[b]Trainee Operator Bureau Join Date:[/b] ${formatData.traineeJoinDate || "DD/MMM/YYYY"}
[b]Trainee Operator Badge Number:[/b] ${formatData.traineeBadge || "#12345"}
[/divbox]
[lssdsubtitle]Trainee Operator Program Progress[/lssdsubtitle]
[divbox=white]

[spoiler=OTP Session 1]
${otpSessionWorksheet(OTP_SESSIONS[0])}
[/spoiler]


[hr][/hr]


[spoiler=OTP Session 2]
${otpSessionWorksheet(OTP_SESSIONS[1])}
[/spoiler]


[hr][/hr]


[spoiler=OTP Session 3]
${otpSessionWorksheet(OTP_SESSIONS[2])}
[/spoiler]

[hr][/hr]

[spoiler=Exam Sent to Trainee]
${OTP_EXAM_NOTICE}
[/spoiler]
[hr][/hr]


[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 31/32/33. Each OTP session on its own, extracted from the profile above
		// but without the [code] copy, which belongs to the profile alone.
		"31": { text: otpSessionWorksheet(OTP_SESSIONS[0]) },
		"32": { text: otpSessionWorksheet(OTP_SESSIONS[1]) },
		"33": { text: otpSessionWorksheet(OTP_SESSIONS[2]) },

		// 34. Exam Sent to Trainee
		"34": { text: OTP_EXAM_NOTICE },

		// 35. TD Instructor Acceptance
		"35": {
			text: `${sebLetterHead("Training Division", formatData.date, {
				logo: "https://i.ibb.co/dsZSqrs2/u-XQ1ho-T.png",
				gapBeforeGreeting: true,
			})}

Dear ${formatData.recipientName || "[Fname Lname]"},

On behalf of the Special Enforcement Bureau's Training Division, we are pleased to inform you that you have been [color=#00FF00][b]accepted[/b][/color] as a [color=#fc7b03][b]TD Instructor[/b][/color].

As a TD Instructor, you will be expected to actively contribute to the development and training of department personnel. This includes, but is not limited to:

[list]
[*]Conducting OTP and certification training.
[*]Reviewing, accepting, or denying certification applications.
[*]Conducting practical certification sessions.
[*]Hosting and assisting with general training sessions.
[*]Providing constructive feedback and guidance to trainees.
[*]Maintaining the standards and professionalism expected of the Training Division.
[/list]

To help you get started, please familiarize yourself with the following resources:

[list]
[*] [url=https://gov.eclipse-rp.net/viewforum.php?f=4082]TD - Staff Area[/url]
[*] [url=https://gov.eclipse-rp.net/viewforum.php?f=4085]TD - Internal Database[/url]
[*][url=https://gov.eclipse-rp.net/viewforum.php?f=4090]TD - External Database[/url]
[*][url=https://docs.google.com/forms/d/e/1FAIpQLSdvMfhud5onI4FVfiN1vNIyhne_ulCOvvkXyFF7A7rTDwgzfw/viewform]SEB Training Division Response Sheet[/url]
[*][url=https://docs.google.com/spreadsheets/d/17W5Oz-_mAk7xFJ9ggnouqUl-jLCXkkVcaP8K8kMbSv4/edit?gid=606853931#gid=606853931]SEB Training Division - Activity Tracker[/url]
[*][url=https://docs.google.com/spreadsheets/d/1wqRppbk8rfMA4AILezcYyg4MBYNRUjuwzSIQAOb2uUI/edit?usp=sharing]Roster for updating certifications/OTP sessions[/url]
[/list]

We are pleased to welcome you to the Training Division and look forward to seeing the contribution you will make as an instructor. Please do not hesitate to reach out to TD Command should you have any questions or require assistance getting started.

Welcome to the team, and congratulations on your acceptance.

[/list]

[hr][/hr]

[list=none]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${bureauLine(formatData.bureauPosition, formatData.certifications, "Bureau Position, [Insert Certifications if Desired]")}
Training Division
Special Enforcement Bureau
[/divbox]
[lssdfooter][/lssdfooter]`,
		},

		// 36. TD Instructor Denial
		"36": {
			text: `${sebLetterHead("Training Division", formatData.date, {
				logo: "https://i.ibb.co/dsZSqrs2/u-XQ1ho-T.png",
				gapBeforeGreeting: true,
			})}

Dear ${formatData.recipientName || "[Fname Lname]"},

On behalf of the Special Enforcement Bureau's Training Division, we regret to inform you that your application for the position of [color=#fc7b03][b]TD Instructor[/b][/color] has been [color=#FF0000][b]denied[/b][/color].

After reviewing your application and considering the information provided, TD Command has determined that your application does not currently meet the requirements or expectations for appointment as a Training Division Instructor.

[b]Reason for Denial:[/b]
[list]
${(formatData.reasons ?? []).map((reason) => `[*]${reason}`).join("\n") || "[*][Insert reason(s) for denial here.]"}
[/list]

This decision does not prevent you from applying again in the future. We encourage you to take the feedback provided into consideration and continue developing your knowledge, experience, and ability to effectively instruct and mentor department personnel.

Should you have any questions regarding this decision or the feedback provided, you may reach out to TD Command for clarification.

Thank you for your interest in contributing to the Training Division and for the time and effort put into your application.

[/list]

[hr][/hr]

[list=none]
${[deputyData.dRank, deputyData.name].filter(Boolean).join(" ") || "Rank Fname Lname"}
${bureauLine(formatData.bureauPosition, formatData.certifications, "Bureau Position, [Insert Certifications if Desired]")}
Training Division
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
