// Field Training Bureau (FTB) session report formats, rebuilt 1:1 from the
// original templates.
//  "1"-3: Field Training Sessions I-III
//  "4": Field Training Evaluation
//  "5": Daily Observation Report
//  "6": Mock Pursuit Report
//  "7": Reinstatement Theory Session
//  "8": Reinstatement Evaluation
// Only "Response"/"GRADE" placeholders become inputs; everything else is
// verbatim BBCode.

import moment from "moment";

import type { DeputyData, FormatData } from "@/types";

export const FTBLabels: Record<string, string> = {
	"1": "Field Training Session I Report",
	"2": "Field Training Session II Report",
	"3": "Field Training Session III Report",
	"4": "Field Training Evaluation Report",
	"5": "Daily Observation Report",
	"6": "Mock Pursuit Report",
	"7": "Reinstatement Theory Session",
	"8": "Reinstatement Evaluation",
};

const REPORT_HEADER = "[img]https://i.ibb.co/99fTmVzk/4c-B6r4F.png[/img]";
const DOR_HEADER = "[img]https://i.ibb.co/8D5db1zD/X76p-VDn.png[/img]";
const MPR_HEADER = "[img]https://i.ibb.co/mrLt39P9/LSLctnd.png[/img]";
const REPORT_CODE = "[size=1]4cB6r4F (do not remove this text)[/size]";
const DOR_CODE = "[size=1]X76pVDn (do not remove this text)[/size]";
const LSSD_FOOTER = "[LSSDfooter][/LSSDfooter]";

const GRADE_SYSTEM = `[spoiler=Grade System]
[size=125]■[/size] - [dropshadow=black][color=#FF0000]Below satisfactory performance.[/color][/dropshadow]
[size=125]■■[/size] - [dropshadow=black][color=#FF8000]Needs some minor improvements.[/color][/dropshadow]
[size=125]■■■[/size] - [dropshadow=black][color=#00FF00]Satisfactory. [/color][/dropshadow]
[size=125]■■■■[/size] - [dropshadow=black][color=#00BF80]Outstanding, no room for improvements.[/color][/dropshadow]
[size=125]■■■■■[/size] - [dropshadow=black][color=#008040]Extraordinary[/color][/dropshadow]
[/spoiler]`;

/** Header block shared by every dated report: "Date: DD/MMM/YYYY" + patrol hours. */
const datedHeader = (date?: string, start?: string, end?: string) => {
	const toAmPm = (time?: string) => {
		if (!time) return "00:00 PM/AM";
		const parsed = moment(time, "HH:mm");
		return parsed.isValid() ? parsed.format("hh:mm A") : time;
	};
	return `[divbox=white]
[b]Date:[/b] ${date || "DD/MMM/YYYY"} 
[b]Patrol Hours [ooc]Please use UTC: [url=https://time.is/UTC]https://time.is/UTC [/url][/ooc]:[/b] ${toAmPm(start)} > ${toAmPm(end)}
[/divbox]`;
};

/** Question followed by its (initially empty) response list. */
const answerBlock = (question: string, answer?: string) =>
	`${question}\n[list]\n[*]${answer ?? ""}\n[/list]`;

/** DOR-style graded criterion: "The Trainee's ... [GRADE]" with the response list below. */
const gradeLine = (label: string, grade?: string, note?: string) =>
	`${label} [${grade ?? "GRADE"}]\n[list]\n[*]${note ?? ""}\n[/list]`;

/** Bold graded question (Mock Pursuit reports): "[b]Question? [GRADE][/b]" + response list. */
const boldGradeLine = (label: string, grade?: string, note?: string) =>
	`[b]${label}[${grade ?? "GRADE"}][/b]\n[list]\n[*]${note ?? ""}\n[/list]`;

/** FTE-style graded criterion - the grade sits inside the bold label's [ ]. */
const fteGradeLine = (label: string, grade?: string, note?: string, suffix = "") =>
	`[list][b]${label}[${grade ?? "GRADE"}]${suffix}[/b]\n[list]\n[*]${note ?? ""}\n[/list]\n[/list]`;


/** The Trainee Performance write-ups shared by all reports of a family. */
const performanceBlock = (
	sections: { title: string; minWords: string; ooc?: boolean; body: string[]; answer?: string }[],
) =>
	sections
		.map(
			(section) => `[b]${section.ooc ? "[ooc]" : ""}[u]${section.title}[/u]${section.ooc ? "[/ooc]" : ""}[/b] [size=55][color=#BF0000]Min. ${section.minWords} words[/color][/size]
${section.body.join("\n")}
[list]
[*]${section.answer ?? ""}
[/list]`,
		)
		.join("\n\n");

/** The "ADDITIONAL NOTES FOR THE NEXT FTD SESSION" block shared by FTS I-III. */
const nextSessionNotes = (f: FormatData, n: 1 | 2 | 3) => {
	const g = (key: string) => f[`fts${n}${key}` as keyof FormatData] as string | undefined;
	return `[lssdsubtitle]ADDITIONAL NOTES FOR THE NEXT FTD SESSION[/lssdsubtitle]
[divbox=white]
[b]Sections that need to be repeated during the next session:[/b]
[list]
[*]${g("SectionsToRepeat") ?? ""}
[/list]

[b]Any mistakes that need to be ironed out in the next session?[/b]
[list]
[*]${g("Mistakes") ?? ""}
[/list]

[b]Do you believe this Trainee is ready to progress to the next FTS?[/b]
[list]
[*]${g("ReadyProgress") ?? ""}
[/list]

[b]Additional Notes[/b]
[list]
[*]${g("AdditionalNotes") ?? ""}
[/list]
${REPORT_CODE}
[/divbox]`;
};

/** FTS-I checklist. The red items and the OOC footer item are wrapped in [b][color=#BF0000]. */
const FTS1_CHECKLIST: { text: string; red?: boolean; ooc?: boolean }[] = [
	{ text: "12 hours have passed since the Trainee's academy.", red: true },
	{ text: "Trainee has successfully created and posted their personnel profile.", red: true },
	{ text: "The trainee has signed their employment contract with the Los Santos County Sheriff's Department.", red: true },
	{ text: "The Trainee has read and understood all active announcements.", red: true },
	{ text: "The Trainee was introduced to and understood the radio procedure for starting their watch." },
	{ text: "The Trainee was introduced to our bodycamera policy and the importance of having it running whilst on duty at all times [ooc]Including the importance of the bodycamera RP w. /time[/ooc]" },
	{ text: "The Trainee was introduced to the basic first aid kit and its contents." },
	{ text: "The Trainee was taught how to properly care for a wounded civilian/suspect as outlined in the medical guide." },
	{ text: "The Trainee has been instructed to apply for BLS Training with the LSEMS." },
	{ text: "The Trainee has been introduced to the force continuum and was able to understand its purpose and when each tier of force is appropriate." },
	{ text: "The Trainee was taught to avoid crossfire and the consequences when carelessly aiming their weapon." },
	{ text: "The Trainee was taught the Miranda rights and was able to understand the purpose and when to use them." },
	{ text: "The Trainee was taught the difference between /cuff & SHIFT+E and how to use them.", ooc: true },
	{ text: "The Trainee was taught how to properly use TAC channels, what purpose they serve when to call TAC, and how to conduct themselves in a TAC situation." },
	{ text: "The Trainee was introduced to and able to fully utilize our Mobile Data Computer:" },
	{ text: "The Trainee was fully introduced to our arresting procedure including adding a note to a person's record once his mugshots and fingerprints have been taken." },
	{ text: "The Trainee was taught how to remove/suspend a license and understand the consequences if he does not apply this policy." },
	{ text: "The Trainee was fully introduced to and understood our relationship with the Department of Corrections including fulfilling their requests or add a note to a person's record once the DNA sample has been taken and logged." },
	{ text: "The Trainee has been informed of their next steps within the department and what they need to do to conclude the FTD successfully." },
	{ text: "The Trainee has been informed they must complete a feedback form after each FTS session. Failure to do so within 48 hours will result in a pause in progress for their program." },
	{ text: "Trainee has been informed of the OOC Regulation about what to do if he is being reported on the ECRP forum.", ooc: true, red: true },
];

/** FTS-II checklist. */
const FTS2_CHECKLIST: { text: string; ooc?: boolean }[] = [
	{ text: "The Trainee knew how to start their watch and remembered this from their FTS-1" },
	{ text: "The Trainee was able to unpark a cruiser" },
	{ text: "The Trainee understands the differences between our cruisers and that they need to use the right one for the right situation" },
	{ text: "The Trainee was introduced to and understood the correct radio procedure when responding to calls" },
	{ text: "The Trainee was able to demonstrate the ability to effectively respond to calls" },
	{ text: "The Trainee was introduced to and was able to fully operate all of our facilities" },
	{ text: "The Trainee was introduced to the marine protocols and was able to understand the policies" },
	{ text: "The Trainee was introduced to and shown around the impound lot" },
	{ text: "The Trainee was introduced to and shown our flatbed wrecker, and shown the various controls to safely operate the flatbed" },
	{ text: "The Trainee was shown how to impound vehicles, and release vehicles, and appeared to adequately understand the procedures" },
	{ text: "The Trainee was introduced to and fully understood the probable cause, witness types, and evidence" },
	{ text: "The Trainee was introduced to the 10-55 radio procedure and was able to demonstrate they could accurately adhere to this procedure" },
	{ text: "The Trainee understood when a 10-55 is not considered Code-4 and how to call for back-up when required" },
	{ text: "The Trainee was able to conduct a 10-55 successfully at least once" },
	{ text: "The Trainee understood what a felony stop is and when a felony stop is to be called in over the radio" },
	{ text: "The Trainee understood the felony stop formation and the individual role of each vehicle in the formation" },
	{ text: "The Trainee was introduced to and understood the communications protocols for a felony stop" },
	{ text: "The Trainee understood the importance of RP in a felony stop and taking their time with new players", ooc: true },
	{ text: "The Trainee was introduced to how a TAC-Call is made, Joint-TAC, and joining TAC" },
	{ text: "The Trainee was able to demonstrate their knowledge of the TAC procedures" },
	{ text: "The Trainee partook in pursuit and was able to give call-outs" },
	{ text: "The Trainee was introduced to pursuits, PIT, safe driving, and pursuit line" },
	{ text: "The Trainee partook in a simulated pursuit at Fort Zancudo or a proper live pursuit " },
];

/** FTS-III checklist. */
const FTS3_CHECKLIST: { text: string }[] = [
	{ text: "The Trainee was able to unpark a cruiser" },
	{ text: "The Trainee was introduced on how to operated CCTV Cameras" },
	{ text: "The Trainee was introduced to communications protocols for \"Arriving on Scene\"" },
	{ text: "The Trainee was introduced to and understood scene management and the importance of using the correct barrier for the correct objective" },
	{ text: "The Trainee understood the role of a scene manager, and when they can and cannot leave a scene" },
	{ text: "The Trainee was able to conduct a 10-55 successfully on his own" },
	{ text: "The Trainee understood how to call TAC and was able to demonstrate the ability to do so" },
	{ text: "The Trainee was able to pursue a vehicle in TAC and effectively communicate while in TAC (If not able to get a normal pursuit, initiate a MOC one at Fort Zancudo)" },
	{ text: "The Trainee was able to lead a pursuit as the primary unit" },
	{ text: "The Trainee was introduced to and understood how to properly utilize the BOLO system when a suspect is lost" },
	{ text: "The Trainee was able to demonstrate the ability to effectively respond to calls" },
	{ text: "When going to calls the Trainee was able to adhere to our driving protocols and understood the response codes they were utilizing" },
	{ text: "The Trainee was able to properly arrest, search, and process a suspect per our arresting procedure protocols" },
	{ text: "The Trainee was able to properly file the arrest report" },
	{ text: "The Trainee was introduced to property searches and understands the requirements for it" },
	{ text: "The Trainee was introduced to Scene Management and was able to successfully set up a scenario" },
];

const ftsChecklist = (
	items: { text: string; ooc?: boolean; red?: boolean }[],
	field: string,
	f: FormatData,
) => {
	const ticked = (f[field as keyof FormatData] as string[] | undefined) ?? [];
	return items
		.map((item, index) => {
			const done = ticked.includes(`${field}:${index}`);
			const box = done ? "[b][X][/b]" : "[ ]";
			let line = `${box} ${item.text}`;
			if (item.ooc) line = `[ooc]${line}[/ooc]`;
			if (item.red) line = `[b][color=#BF0000]${line}[/color][/b]`;
			return `[list]${line}[/list]`;
		})
		.join("\n");
};

/** Trainee Performance sections for each FTS. */
const FTS1_PERFORMANCE = (f: FormatData) => {
	const g = (key: string) => f[`fts1${key}` as keyof FormatData] as string | undefined;
	return performanceBlock([
		{
			title: "HANDBOOK KNOWLEDGE",
			minWords: "50",
			body: [
				"Has the Trainee demonstrated that they have read the handbook before this session and have understood the material?",
				"Did you quiz the training on his handbook knowledge before starting the FTS making sure he read it, if so what was asked and how did he respond?",
				"At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook?",
				"Please describe how they did or did not demonstrate good handbook knowledge.",
			],
			answer: g("Handbook"),
		},
		{
			title: "BEHAVIOUR",
			minWords: "50",
			body: [
				"How would you describe your first impression of the Trainee?",
				"Were they friendly and open to your approach?",
				"How did the trainee behave with other deputies/ other departments/civilians?",
				"At any point during your session, did you feel the Trainee was bored or inattentive?",
				"Please describe their behavior and personality.",
			],
			answer: g("Behaviour"),
		},
		{
			title: "COMMUNICATIONS",
			minWords: "20",
			body: [
				"Do you feel like the Trainee has communicated well throughout this session?",
				"Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations?",
				"Does the Trainee speak clearly? ",
				"Please give your opinion on the Trainee's ability to communicate.",
			],
			answer: g("Communications"),
		},
		{
			title: "ROLE-PLAY ABILITIES",
			minWords: "20",
			ooc: true,
			body: [
				"Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities?",
				"Have they demonstrated good and in-depth roleplay during your session?",
				"Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you?",
				"Please describe the Trainee's roleplay abilities. We understand that during the first initial field training session not a lot of roleplay may be conducted. We advise that you go through the first aid roleplay and ensure they understand fully our expectations",
			],
			answer: g("Roleplay"),
		},
	]);
};

const FTS2_PERFORMANCE = (f: FormatData) => {
	const g = (key: string) => f[`fts2${key}` as keyof FormatData] as string | undefined;
	return performanceBlock([
		{
			title: "HANDBOOK KNOWLEDGE",
			minWords: "50",
			body: [
				"Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? ",
				"At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? ",
				"Please describe how they did or did not demonstrate good handbook knowledge.",
			],
			answer: g("Handbook"),
		},
		{
			title: "TRAINEE VEHICLE OPERATION",
			minWords: "50",
			body: [
				"During this session, did the trainee demonstrate proper use of their department vehicle? ",
				"Did the Trainee follow all traffic laws when operating in non-emergency settings (e.g. following speed limit, maintaining single lane, etc.)? ",
				"Did the Trainee demonstrate the ability to operate the vehicle safely in an emergency condition?",
				"Please provide specific examples of things you say (good or bad) regarding the trainee's driving.",
			],
			answer: g("VehicleOperation"),
		},
		{
			title: "IMPOUND LOT PROTOCOLS AND PROCEDURES",
			minWords: "50",
			body: [
				"Did the Trainee have any difficulties securing impounding and releasing their vehicle?",
				"[ooc]How was their RP of doing so?[/ooc]",
			],
			answer: g("Impound"),
		},
		{
			title: "BEHAVIOUR",
			minWords: "50",
			body: [
				"How would you describe your impression of the Trainee? ",
				"Were they friendly and open to your approach? ",
				"At any point during your session, did you feel the Trainee was bored or inattentive? ",
				"Please describe their behavior and personality.",
			],
			answer: g("Behaviour"),
		},
		{
			title: "COMMUNICATIONS",
			minWords: "20",
			body: [
				"Do you feel like the Trainee has communicated well throughout this session? ",
				"Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? ",
				"Does the Trainee speak clearly? ",
				"Please give your opinion on the Trainee's ability to communicate.",
			],
			answer: g("Communications"),
		},
		{
			title: "ROLE-PLAY ABILITIES",
			minWords: "20",
			ooc: true,
			body: [
				"Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities? Have they demonstrated good and in-depth roleplay during your session? ",
				"Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? ",
				"Please describe the Trainee's roleplay abilities.",
			],
			answer: g("Roleplay"),
		},
	]);
};

const FTS3_PERFORMANCE = (f: FormatData) => {
	const g = (key: string) => f[`fts3${key}` as keyof FormatData] as string | undefined;
	return performanceBlock([
		{
			title: "HANDBOOK KNOWLEDGE",
			minWords: "50",
			body: [
				"Has the Trainee demonstrated that they have read the handbook before this session and have understood the material?",
				"Did you have to repeat past FTS information?",
				"At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook?",
				"Please describe how they did or did not demonstrate good handbook knowledge.",
			],
			answer: g("Handbook"),
		},
		{
			title: "BEHAVIOUR",
			minWords: "50",
			body: [
				"How would you describe your impression of the Trainee?",
				"How was he acting toward other Deputies or civilians?",
				"Were they friendly and open to your approach? At any point during your session, did you feel the Trainee was bored or inattentive?",
				"Please describe their behavior and personality.",
			],
			answer: g("Behaviour"),
		},
		{
			title: "COMMUNICATIONS",
			minWords: "20",
			body: [
				"Do you feel like the Trainee has communicated well throughout this session?",
				"Did he remember to update his status, 10-8/10-9?",
				"Was the trainee able to respond clearly on the radio if deputies were asking him questions?",
				"Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations?",
				"Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate.",
			],
			answer: g("Communications"),
		},
		{
			title: "PUSUIT ABILITY",
			minWords: "50",
			body: [
				"Did the trainee properly call Tac and drop a backup?",
				"Did he relay the usual information (pursuing a car, the direction of travel, RO) once the other units joined TAC, or did they have to ask for it?",
				"Did he follow the pursuit line, advise other units before passing them, and ask permission before doing a P.I.T.?",
				"Describes his/her calls, in detail.",
			],
			answer: g("Pursuit"),
		},
		{
			title: "DRIVING ABILITY",
			minWords: "30",
			body: [
				"Was the Trainee a competent driver? ",
				"Did they follow traffic laws and adhere to our driving protocols?",
				"Describe his ability to drive off-road and on a road.",
				"Do you have any issues with the Trainee's driving ability?",
			],
			answer: g("Driving"),
		},
		{
			title: "ROLE-PLAY ABILITIES",
			minWords: "20",
			ooc: true,
			body: [
				"Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities?",
				"Have they demonstrated good and in-depth roleplay during your session? ",
				"Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? ",
				"Please describe the Trainee's roleplay abilities.",
			],
			answer: g("Roleplay"),
		},
	]);
};

/** The DOR-style grading criteria (■ squares + NT). */
const DOR_GRADE_CRITERIA = [
	"The Deputy Sheriff Trainee's general demeanor and behavior around the public",
	"The Deputy Sheriff Trainee's understanding of our departmental procedures and protocols",
	"The Deputy Sheriff Trainee's Driving Ability",
	"The Deputy Sheriff Trainee's understanding of the force continuum",
	"The Deputy Sheriff Trainee's Weapon Usage and Field Awareness",
	"The Deputy Sheriff Trainee's ability to use the Mobile Data Centre (MDC) for such things as checking warrants, running plates, searching firearms serial numbers, etc",
	"The Deputy Sheriff Trainee's ability to communicate with dispatch and other field operatives through their radio",
];

/** The FTE grading criteria (1-5 + reasoning inside the bold label's list). */
const FTE_CRITERIA: { label: string; suffix?: string }[] = [
	{ label: "General Attitude and Demeanor (CPR): " },
	{ label: "Field Awareness: " },
	{ label: "Handbook knowledge: Suspect Detention / Arrest " },
	{ label: "Handbook Knowledge: 10-55 / 10-66: " },
	{ label: "Handbook Knowledge : Pursuits: " },
	{ label: "Communication during TAC/JTAC Scenarios: " },
	{ label: "High-Speed Pursuit Driving: " },
	{ label: "Demeanor Under Stress / Duress: " },
	{ label: "[ooc]Roleplay Ability: ", suffix: "[/ooc]" },
];

/** The FTD comments block shared by both evaluations. */
const ftdCommentsSection = (c: {
	arrestReportLink?: string;
	readySolo?: string;
	issues?: string;
	intervention?: string;
	concerning?: string;
	rpCommands?: string;
	oocDemeanor?: string;
	rulesUnderstanding?: string;
	shouldPass?: string;
}) => `[lssdsubtitle]FIELD TRAINING DEPUTY COMMENTS[/lssdsubtitle]
[divbox=white]
[b]Arrest report:[/b]
[list][url=${c.arrestReportLink || "LINK"}]REPORT[/url][/list]

${answerBlock("[b]Do you consider the Trainee ready to conduct solo patrol? Why do you believe as such?[/b]", c.readySolo)}

${answerBlock("[b]Did you have any issues with the Trainee's performance or demeanor? Explain why, and if applicable, cite handbook procedures and regulations.[/b]", c.issues)}

${answerBlock("[b]Did you at any point have to assist the Trainee or intervene? What was the purpose of your intervention, and what was the outcome?[/b]", c.intervention)}

${answerBlock("[ooc][b]At any point during the evaluation, did the trainee demonstrate any concerning behaviors, such as poor sportsmanlike remarks, or toxic behaviors? I.E. Mentioning Rule breaks ICly, spamming /b, or commenting as such in Teamspeak?[/b][/ooc]", c.concerning)}

${answerBlock("[ooc][b]Did the Trainee demonstrate the ability to execute RP commands appropriately and engage in fluid and organic RP?[/b][/ooc]", c.rpCommands)}

${answerBlock("[ooc][b]Did the Trainee demonstrate a positive OOC demeanor throughout the entire Evaluation?[/b][/ooc]", c.oocDemeanor)}

${answerBlock("[b][ooc]Did the Trainee demonstrate an understanding of the rules of the server throughout their patrol?[/ooc][/b]", c.rulesUnderstanding)}

${answerBlock("[b]Do you believe the Trainee should pass the Field Training Evaluation? Why or Why Not?[/b]", c.shouldPass)}
${REPORT_CODE}
[/divbox]`;

/** Shared FTS-I/II/III performance grading intro text differs per report family. */

/** Builds one of the three Field Training Session reports. */
const ftsReport = (
	f: FormatData,
	n: 1 | 2 | 3,
	checklist: { text: string; ooc?: boolean; red?: boolean }[],
	performance: string,
) => {
	const g = (key: string) => f[`fts${n}${key}` as keyof FormatData] as string | undefined;

	return `${REPORT_HEADER}
[lssdsubtitle]FIELD TRAINING SESSION ${["I", "II", "III"][n - 1]}[/lssdsubtitle]
${datedHeader(g("Date"), g("PatrolStart"), g("PatrolEnd"))}
[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
Mark each box with a [b][X][/b] if they performed each action and leave it empty if they did not.

${ftsChecklist(checklist, `fts${n}Checklist`, f)}
[/divbox]

[lssdsubtitle]TRAINEE PERFORMANCE[/lssdsubtitle]
[divbox=white]
${performance}
[/divbox]

${nextSessionNotes(f, n)}
${LSSD_FOOTER}`;
};

/** Reinstatement Theory checklist. */
const RTS_CHECKLIST: { text: string }[] = [
	{ text: "The Trainee signed all the active announcements and created his personnel file" },
	{ text: "The Trainee was reminded of all the options in the MDC" },
	{ text: "The Trainee was taught about the protocols of being on the scene" },
	{ text: "The Trainee was taught the proper way of placing the scene management" },
	{ text: "The Trainee was taught about the proper procedures for a 10-55" },
	{ text: "The Trainee was taught about the proper procedures for a 10-66" },
	{ text: "The Trainee was taught about the content of his BLS bag and how to properly use it with 10-15 or 10-16" },
	{ text: "The Trainee was taught about the proper etiquette in TAC and how to call it for any situation requiring it" },
	{ text: "The Trainee remembered how to properly utilize the BOLO system when a suspect is lost" },
	{ text: "The Trainee was taught about the processing of a 10-15" },
	{ text: "The Trainee was taught about the protocol of hot pursuit and warrant procedures" },
];

/** Reinstatement Evaluation checklist ("[ x ]" boxes). */
const RTE_CHECKLIST: { text: string; ooc?: boolean }[] = [
	{ text: "Conducted an arrest" },
	{ text: "Filed the arrest report" },
	{ text: "Conducted a 10-55" },
	{ text: "Conducted a 10-66" },
	{ text: "Participated in a pursuit " },
	{ text: "Primary in a pursuit (not mandatory for reinstatement but still a plus)" },
	{ text: "Responded to a 10-21" },
	{ text: "Participated in a 10-1" },
	{ text: "Responded to the department radio" },
	{ text: "Demonstrated the ability to provide clear and concise communication" },
	{ text: "Demonstrated the basic elements of policing" },
	{ text: "Demonstrated the ability to remain calm under stress or duress" },
	{ text: "Demonstrated basic problem-solving skills and investigative ability" },
	{ text: "Demonstrated the ability to distinguish between IC and OOC roleplay", ooc: true },
];

export const FTBFormats = ({
	formatId,
	formatData,
	deputyData,
}: {
	formatId: string;
	formatData: FormatData;
	deputyData: DeputyData;
}) => {
	const f = formatData;
	// "Your Rank and Name" on the Mock Pursuit Report comes from the deputy profile.
	const yourRankName =
		[deputyData.dRank, deputyData.name].filter(Boolean).join(" ").trim() || "Rank FName LName";

	const formats: Record<string, { text: string; label?: string }> = {
		"1": {
			text: ftsReport(f, 1, FTS1_CHECKLIST, FTS1_PERFORMANCE(f)),
		},
		"2": {
			text: ftsReport(f, 2, FTS2_CHECKLIST, FTS2_PERFORMANCE(f)),
		},
		"3": {
			text: ftsReport(f, 3, FTS3_CHECKLIST, FTS3_PERFORMANCE(f)),
		},
		"4": {
			text: `${REPORT_HEADER}
[lssdsubtitle]FIELD TRAINING EVALUATION[/lssdsubtitle]
${datedHeader(f.fteDate, f.ftePatrolStart, f.ftePatrolEnd)}
[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
[size=85][i]Ensure that the Trainee performs all tasks on this list, When they do, Check if off of the list and include a grade of effectiveness [ooc]you must be in the same Teamspeak Channel as your Trainee for the duration of the Evaluation[/ooc][/i][/size]
${GRADE_SYSTEM}

[list][] The Trainee conducted an arrest [${f.fteTask0 ?? "GRADE"}][/list]
[list][] The Trainee filed the arrest report in a timely manner [${f.fteTask1 ?? "GRADE"}][/list]
[list][] The Trainee conducted a 10-66 or a 10-55 [${f.fteTask2 ?? "GRADE"}][/list]
[list][] The Trainee participated in a pursuit [${f.fteTask3 ?? "GRADE"}][/list]
[list][] The Trainee served as the Primary Unit in a pursuit [${f.fteTask4 ?? "GRADE"}][/list]
[list][] The Trainee served as the Primary Unit in a mock pursuit [${f.fteTask5 ?? "GRADE"}][/list]
[list][] The Trainee demonstrated the ability to provide clear and concise communication through TAC or radio frequencies [${f.fteTask6 ?? "GRADE"}][/list]
[list][] The Trainee demonstrated the ability to remain calm under stress or duress [${f.fteTask7 ?? "GRADE"}][/list]
[list][] The Trainee demonstrated basic problem-solving skills and investigative ability [${f.fteTask8 ?? "GRADE"}][/list]
[list][] The Trainee demonstrated the ability to render basic medical aid to an individual on the field [${f.fteTask9 ?? "GRADE"}][/list]
[list][ooc][] The Trainee demonstrated the ability to distinguish between IC and OOC roleplay [${f.fteTask10 ?? "GRADE"}][/ooc][/list]
[/divbox]

[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
[i][size=85]Please provide a detailed timeline of the session below. [color=#BF0000]Min. 200 words[/color]. [/size][/i]

[list]
[*]${f.fteTimeline ?? ""}
[/list]
[/divbox]

[lssdsubtitle]TRAINEE PERFORMANCE | GRADING[/lssdsubtitle]
[divbox=white]
[size=85][i]Below is a grading system to determine the Trainee's performance during the Field Training Evaluative Session. The system grades the Trainee's ability to perform certain tasks with adherence to our handbook. Provide in-depth answers, and provide examples of when the trainee displayed these areas of performance to justify your grading. [/i][/size]

${GRADE_SYSTEM}

${FTE_CRITERIA.map((criterion, index) =>
	fteGradeLine(
		criterion.label,
		f[`fteGrade${index}` as keyof FormatData] as string | undefined,
		f[`fteNote${index}` as keyof FormatData] as string | undefined,
		criterion.suffix,
	),
).join("\n\n")}
[/divbox]

[lssdsubtitle]MOCK PURSUIT COMMENTS[/lssdsubtitle]
[divbox=white]
[size=85][i]If the trainee managed to partake as primary in a normal pursuit this section can be skipped. If they did not then you are welcome to conduct a mock pursuit, however, the following rules [b]MUST [/b]be upheld:[/size][/i]
[spoiler=Mock Pursuit Checklist:]
[list]
[*] Mock pursuits are [b]ONLY [/b]allowed to be conducted [b]AFTER 1.5 hours[/b] of the evaluation.
[*] Mock pursuits are [b]ONLY[/b] allowed to be conducted [b]AFTER [/b]all other aspects (10-55, arrest, etc) of the evaluation being completed.
[*] The mock pursuit is to be conducted with either FTD Command, ATD Command or a Supervisor being the mock evader.
[*] The mock pursuit must be done [b]SAFELY [/b]at Grapeseed/Sandy where the trainee has to keep up with the evader for[b] 5 minutes[/b], both offroad and on the street, they have a total of [b]three[/b] tries.
[*] If a real pursuit gets called out the FTD and Trainee [b]MUST [/b]respond to it and drop their mock. If they do not get enough then they can resume the mock.
[/list][/spoiler]

${answerBlock("[b]Who was the FTD Command, ATD Command or Supervisor that you conducted this mock pursuit with?:[/b]", f.fteMockWith)}

${boldGradeLine("Was the trainee able to keep up with the mock evader in the mock pursuit?: ", f.fteMockGradeKeepUp, f.fteMockNoteKeepUp)}

${boldGradeLine("How were the trainee's callouts throughout the mock pursuit?: ", f.fteMockGradeCallouts, f.fteMockNoteCallouts)}

${boldGradeLine("Was the trainee's driving as primary in a mock pursuit safe and in line with our pursuit protocols?: ", f.fteMockGradeDriving, f.fteMockNoteDriving)}

${boldGradeLine("Did the trainee drop well-timed backups before/during the pursuit?: ", f.fteMockGradeBackups, f.fteMockNoteBackups)}

[/divbox]
${ftdCommentsSection({
	arrestReportLink: f.fteArrestReportLink,
	readySolo: f.fteReadySolo,
	issues: f.fteIssues,
	intervention: f.fteIntervention,
	concerning: f.fteConcerning,
	rpCommands: f.fteRpCommands,
	oocDemeanor: f.fteOocDemeanor,
	rulesUnderstanding: f.fteRulesUnderstanding,
	shouldPass: f.fteShouldPass,
})}
${LSSD_FOOTER}`,
		},
		"5": {
			text: `${DOR_HEADER}
[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
[size=85][i]Below is a section for you to write a bit about your experience with the Deputy Sheriff Trainee on patrol. Include general situations, anything to note with the Deputy Sheriff Trainee's demeanor and what you generally did on patrol as well as how involved the Deputy Sheriff Trainee was. There is [b]no[/b] minimum word requirement and you may write as much or as little as you like - though this will be judged by FTP Command if this is included on your monthly statistics as a Field Training Deputy. [/i][/size]

[b]Ask the trainee what area they wish to work on during the DOR or where he still feels uncomfortable, Radio calls/ Driving skills/ Traffic Stops/ etc. It is expected from you that you will work on those during your DOR with the trainee. [color=#BF0000]This section does not apply if you are doing a DOR in a pursuit for the completion of a final evaluation.[/color][/b]
[list]
[*]${f.dorTraineeResponse ?? ""}
[/list]

[b]Resume of patrol here[/b]
${f.dorPatrolSummary ?? ""}
[/divbox]

[lssdsubtitle]ACTIVE TRAINING[/lssdsubtitle]
[divbox=white]
Was there anything you saw the trainee doing wrong, and what steps did you take regarding it?
[list]
[*]${f.dorWrong ?? ""}
[/list]

What additional training did you do regarding the areas the trainee was still uncomfortable with, and do you think the trainee overcame it?
[list]
[*]${f.dorAdditionalTraining ?? ""}
[/list]
[/divbox]

[lssdsubtitle]GRADING[/lssdsubtitle]
[divbox=white]
[size=85][i]Below is a grading system similar to that found on our Field Training Division Session forms. Mark each box with a grade and below each grade is the option to leave the reasoning behind your grade. Explaining your grade is important so we can understand your reasoning behind it, include as little or as much as you like. If the Deputy Sheriff Trainee wasn't tested at all on a particular question then mark the box as [b]NT[/b] for not tested. [/i][/size]

${GRADE_SYSTEM}

${DOR_GRADE_CRITERIA.map((label, index) =>
	gradeLine(
		label,
		f[`dorGrade${index}` as keyof FormatData] as string | undefined,
		f[`dorResponse${index}` as keyof FormatData] as string | undefined,
	),
).join("\n\n")}
[/divbox]

[lssdsubtitle]FIELD TRAINING DEPUTY FEEDBACK[/lssdsubtitle]
[divbox=white]
[size=85][i]Below is a second box in which you may leave some feedback for the Deputy Sheriff Trainee after your session. The Deputy Sheriff Trainee [b]may[/b] or [b]may not[/b] get to read this feedback and such decisions will be left at the discretion of FTD Command. Again, leave as little or as much as you like. If you would like to give the Deputy Sheriff Trainee some personal feedback we encourage you to take the initiative and send them an email with your thoughts on how they performed. Make sure to CC FTD Command for visibility.[/i][/size]
[list]
[*]${f.dorFeedback ?? ""}
[/list]
${DOR_CODE}
[/divbox]
${LSSD_FOOTER}`,
		},
		"6": {
			text: `${MPR_HEADER}
[lssdsubtitle]GENERAL INFORMATION:[/lssdsubtitle]
[divbox=white]
[b]Date:[/b] ${f.mprDate || "DD/MMM/YY"}
[b]Time:[/b] ${(() => {
	const parsed = moment(f.mprTime, "HH:mm");
	return f.mprTime ? (parsed.isValid() ? parsed.format("hh:mm A") : f.mprTime) : "XX:XX PM/AM";
})()} ((UTC))
[b]Your Rank and Name:[/b] ${yourRankName}
[b]FTD Rank and Name:[/b] ${f.mprFtdRankName || "Rank FName LName"}
[b]Trainee Name:[/b] ${f.mprTraineeName || "FName LName"}
[/divbox]

[lssdsubtitle]MOCK PURSUIT DETAILS:[/lssdsubtitle]
[divbox=white]

${GRADE_SYSTEM}

${boldGradeLine("Was the trainee able to keep up in the pursuit?: ", f.mprGradeKeepUp, f.mprNoteKeepUp)}

${boldGradeLine("How were the trainee's callouts throughout the pursuit?: ", f.mprGradeCallouts, f.mprNoteCallouts)}

${boldGradeLine("Was the trainee's driving as primary in the pursuit safe and in line with our pursuit protocols?: ", f.mprGradeDriving, f.mprNoteDriving)}

${boldGradeLine("Did the trainee drop well-timed backups before/during the pursuit?: ", f.mprGradeBackups, f.mprNoteBackups)}

${answerBlock("[b]Is there anything else you would like to add?:[/b]", f.mprAnythingElse)}
${DOR_CODE}
[/divbox]
${LSSD_FOOTER}`,
		},
		"7": {
			text: `${REPORT_HEADER}
[lssdsubtitle]REINSTATEMENT THEORY SESSION[/lssdsubtitle]
${datedHeader(f.rtsDate, f.rtsPatrolStart, f.rtsPatrolEnd)}
[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
Mark each box with a [b][X][/b] if they performed each action and leave it empty if they did not.

${ftsChecklist(RTS_CHECKLIST, "rtsChecklist", f)}
[/divbox]

[lssdsubtitle]TRAINEE PERFORMANCE[/lssdsubtitle]
[divbox=white]
${performanceBlock([
	{
		title: "HANDBOOK KNOWLEDGE",
		minWords: "50",
		body: [
			"Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? ",
			"At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? ",
			"Please describe how they did or did not demonstrate good handbook knowledge. ",
		],
		answer: f.rtsHandbook,
	},
	{
		title: "BEHAVIOUR",
		minWords: "50",
		body: [
			"How would you describe your impression of the Trainee? ",
			"Were they friendly and open to your approach? ",
			"At any point during your session, did you feel the Trainee was bored or inattentive? ",
			"Please describe their behavior and personality.",
		],
		answer: f.rtsBehaviour,
	},
	{
		title: "COMMUNICATIONS",
		minWords: "20",
		body: [
			"Do you feel like the Trainee has communicated well throughout this session? ",
			"Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? ",
			"Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate",
		],
		answer: f.rtsCommunications,
	},
	{
		title: "ROLE-PLAY ABILITIES",
		minWords: "20",
		ooc: true,
		body: [
			"Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities?",
			"Have they demonstrated good and in-depth roleplay during your session? ",
			"Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? ",
			"Please describe the Trainee's roleplay abilities.",
		],
		answer: f.rtsRoleplay,
	},
])}
[/divbox]

[lssdsubtitle]ADDITIONAL NOTES FOR THE NEXT FTD SESSION[/lssdsubtitle]
[divbox=white]
[b]Arrest report:[/b]
[list]
[*][url=${f.rtsArrestReportLink || "LINK"}]REPORT[/url]
[/list]

${answerBlock("[b]Sections that need to be repeated in a DOR:[/b]", f.rtsSectionsToRepeat)}

${answerBlock("[b]Any mistakes that need to be ironed out?[/b]", f.rtsMistakes)}

${answerBlock("[b]Do you believe this Trainee is ready to progress to the evaluation?[/b]", f.rtsReadyProgress)}

${answerBlock("[b]Additional Notes[/b]", f.rtsAdditionalNotes)}
${REPORT_CODE}
[/divbox]
${LSSD_FOOTER}`,
		},
		"8": {
			text: `${REPORT_HEADER}
[lssdsubtitle]REINSTATEMENT EVALUATION[/lssdsubtitle]
${datedHeader(f.rteDate, f.rtePatrolStart, f.rtePatrolEnd)}
[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
[size=85][i]Mark each box with a [b][ x ][/b] if they performed each action and leave empty if they did not. The Trainee is [b]not[/b] required to do everything on this list[/i][/size]

[list]
${RTE_CHECKLIST.map((item, index) => {
	const done = (f.rteChecklist ?? []).includes(`rteChecklist:${index}`);
	const box = done ? "[b][ x ][/b]" : "[ ] ";
	return `[*]${item.ooc ? "[ooc]" : ""}${box}${item.ooc ? "" : ""}${item.text}${item.ooc ? "[/ooc]" : ""}`;
}).join("\n")}
[/list]

[/divbox]

[lssdsubtitle]SESSION DETAILS[/lssdsubtitle]
[divbox=white]
[i][size=85]Please provide a detailed timeline of the session below. [color=#BF0000]Min. 200 words[/color]. [/size][/i]

[list]
[*]${f.rteTimeline ?? ""}
[/list]
[/divbox]

[lssdsubtitle]TRAINEE PERFORMANCE | GRADING[/lssdsubtitle]
[divbox=white]
[size=85][i]Below is a grading system to determine the Trainee's performance during the Field Training Division Session-5, the system grades the Trainee's ability to perform certain tasks with adherence to our handbook. The system ranks each criterion on a scale of 1-5, with 1 being below satisfactory performance and 5 being extraordinary, below each grade is a section to explain your reasoning behind the grade chosen. Please be impartial in your grading at all times and there is a description of each rank at the bottom of this document. [/i][/size]

${GRADE_SYSTEM}

[list][b]General Attitude and Demeanor (CPR): [${f.rteGradeAttitude ?? ""}][/b]
[list]
[*]${f.rteNoteAttitude ?? ""}
[/list]
[/list]

[list][b]Field Awareness: [${f.rteGradeFieldAwareness ?? ""}][/b]
[list]
[*]${f.rteNoteFieldAwareness ?? ""}
[/list]
[/list]

[list][b]Handbook knowledget [${f.rteGradeHandbook ?? ""}][/b]
[list]
[*]${f.rteNoteHandbook ?? ""}
[/list]
[/list]


[list][b]Communication [${f.rteGradeCommunication ?? ""}][/b]
[list]
[*]${f.rteNoteCommunication ?? ""}
[/list]
[/list]

[list][b]Driving Ability: [${f.rteGradeDriving ?? ""}][/b]
[list]
[*]${f.rteNoteDriving ?? ""}
[/list]
[/list]

[list][b]Demeanor Under Stress / Duress: [${f.rteGradeStress ?? ""}][/b]
[list]
[*]${f.rteNoteStress ?? ""}
[/list]
[/list]

[list][b][ooc]Roleplay Ability: [${f.rteGradeRoleplay ?? ""}][/ooc][/b]
[list]
[*]${f.rteNoteRoleplay ?? ""}
[/list]
[/list]
[/divbox]

${ftdCommentsSection({
	arrestReportLink: f.rteArrestReportLink,
	readySolo: f.rteReadySolo,
	issues: f.rteIssues,
	intervention: f.rteIntervention,
	concerning: f.rteConcerning,
	rpCommands: f.rteRpCommands,
	oocDemeanor: f.rteOocDemeanor,
	rulesUnderstanding: f.rteRulesUnderstanding,
	shouldPass: f.rteShouldPass,
})}
${LSSD_FOOTER}`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = FTBLabels[key];
	});

	if (!formats[formatId]) {
		return {
			format: "[Invalid format for FTB division]",
			formats,
		};
	}

	return { format: formats[formatId].text, formats };
};
