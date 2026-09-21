import type { FormatInputField } from "@/types";

/**
 * Crisis Negotiator grade legend, matching the spoiler printed in the letter
 * itself. Mirrors CN_CRITERIA in src/formats/divisions/SEB.ts by index, so keep
 * the two lists in step.
 */
const cnGradeOptions = [
	{ value: "■", label: "■ - Needs Improvement" },
	{ value: "■■", label: "■■ - Room for Improvement" },
	{ value: "■■■", label: "■■■ - Satisfactory" },
	{ value: "■■■■", label: "■■■■ - Excellent" },
	{ value: "■■■■■", label: "■■■■■ - Exemplary" },
];

const CN_CRITERIA = [
	"Scene Awareness",
	"Strategic Thinking",
	"Situation Control",
	"Self Control",
	"Communication",
	"Empathy",
];

/** One checklist of an OTP session, as the worksheet prints it. */
export interface OtpSection {
	/** Heading in the worksheet, e.g. "SEB Classroom Checklist". */
	heading: string;
	/** Heading used inside the session's [code] copy, e.g. "OTP #1 Classroom Checklist". */
	copyHeading: string;
	/** Field that stores the ticked boxes. */
	field: string;
	items: string[];
}

/** An Operator Training Program session, shared by the profile and its own format. */
export interface OtpSessionSpec {
	id: string;
	label: string;
	/** Field-name prefix, e.g. "otp1" for otp1Date / otp1Time / otp1Instructor. */
	prefix: string;
	image: string;
	sections: OtpSection[];
}

export const OTP_SESSIONS: OtpSessionSpec[] = [
	{
		id: "31",
		label: "OTP Session 1",
		prefix: "otp1",
		image: "https://i.imgur.com/3im4MUn.png",
		sections: [
			{
				heading: "SEB Classroom Checklist",
				copyHeading: "OTP #1 Classroom Checklist",
				field: "otp1Classroom",
				items: [
					"Operator Trainee has read through the SEB handbook",
					"Operator Trainee has been informed of situations SEB Operators will face",
					"Operator Trainee has been introduced to the two different types of Deployments",
					"Operator Trainee has been informed on the SEB Force Continuum",
					"Operator Trainee has been introduced to the gear we use in the Bureau",
				],
			},
			{
				heading: "SEB Theory Component",
				copyHeading: "OTP #1 Theory Component",
				field: "otp1Theory",
				items: [
					"Operator Trainee has been informed of the weaponry we use in the Bureau",
					"Operator Trainee has been brought through every weapon and used them in the Firing Range",
					"Operator Trainee has been taught the importance of Breach n Clear Training",
					"Operator Trainee has run through the Practical Breach n Clear Training",
					"Operator Trainee has been notified of the differences between DELIBERATE and DYNAMIC CQB",
				],
			},
		],
	},
	{
		id: "32",
		label: "OTP Session 2",
		prefix: "otp2",
		image: "https://i.imgur.com/MtaAYVv.png",
		sections: [
			{
				heading: "SEB Ground Tactics",
				copyHeading: "SEB Ground Tactics Theory Component",
				field: "otp2GroundTactics",
				items: [
					"Operator Trainee has been introduced to Non-Lethal Vehicle Interception",
					"Operator Trainee understands that failure to follow the procedures can lead to serious consequences",
					"Operator Trainee has been taught how to perform a Hard-Stop",
					"Operator Trainee has run through the Hard-Stop procedure and has adequately performed it",
					"Operator Trainee has been taught the differences between Immobilizing Force, Disabling Force, and Defensive Force",
					"Operator Trainee has been taught the basics on Returning Fire",
					"Operator Trainee has been shown the different types of cover and different ways to hold them",
					"Operator Trainee has been taught the basics of hopping out of vehicles and firing from them",
					"Operator Trainee has been run through the live fire exercises of Training 2.",
				],
			},
		],
	},
	{
		id: "33",
		label: "OTP Session 3",
		prefix: "otp3",
		image: "https://i.imgur.com/1oat35d.png",
		sections: [
			{
				heading: "SEB Air Tactics Theory Component",
				copyHeading: "SEB Air Tactics Theory Component",
				field: "otp3AirTactics",
				items: [
					"Operator Trainee has been introduced to the Air Tactics SEB Uses",
					"Operator Trainee has been introduced to how to apply to be an SEB Pilot once becoming an Operator",
					"Operator Trainee has been shown the Buzzard and the weaponry we use from the helicopter",
					"Operator Trainee has run through the Air Combat Training Using the Carbine Rifle",
					"Operator Trainee has been introduced to Rappelling Protocols and how to do so",
					"Operator Trainee has been introduced to Parachuting Protocols and how to use one",
					"Operator Trainee has run through Parachuting and has adequately performed to SEB Standards",
				],
			},
		],
	},
];

/**
 * Dynamic form fields for the SEB division, keyed to format ids through the
 * `formats` array.
 */
export const SEBInputs: FormatInputField[] = [
	// 1 - Confidential Email
	{ name: "date", label: "Email Date", type: "date", formats: ["1", "24", "25", "26", "28", "29", "35", "36"] },
	// 35-36 - Training Division application responses
	{
		name: "recipientName",
		label: "Recipient name (Fname Lname)",
		type: "text",
		formats: ["35", "36"],
	},
	{ name: "body", label: "Email body", type: "textarea", formats: ["1", "29"] },
	{
		name: "bureauPosition",
		label: "Bureau position (e.g. Sergeant, Operational Support Deputy)",
		type: "text",
		formats: ["1", "24", "25", "26", "28", "29", "35", "36"],
	},
	{
		name: "certifications",
		label: "Certifications (optional, e.g. K9 Handler, Sniper)",
		type: "text",
		formats: ["1", "24", "25", "26", "29", "35", "36"],
	},

	// 2 - Deployment Log, 3 - Patrol Log (shared operator/date/time fields)
	{
		name: "operators",
		label: "Operators",
		type: "list",
		itemPlaceholder: "Rank Fname Lname, then press Enter",
		formats: ["2", "3"],
	},
	{ name: "logDate", label: "Date (DD/MM/YYYY)", type: "date", dateStyle: "short", formats: ["2", "3"] },
	{ name: "deploymentStart", label: "Deployment Hours (start, 24h)", type: "time", formats: ["2", "3"] },
	{ name: "deploymentEnd", label: "Deployment End Time (24h)", type: "time", formats: ["2", "3"] },
	{
		name: "confiscatedItems",
		label: "Confiscated items (optional - only if no arrest report is linked)",
		type: "list",
		itemPlaceholder: "Item name, then press Enter",
		formats: ["2"],
	},
	{
		name: "suspects",
		label: "Suspects (optional - only if no arrest report is linked)",
		type: "list",
		itemPlaceholder: "Suspect name, then press Enter",
		formats: ["2"],
	},
	{ name: "eventDescription", label: "Event description", type: "textarea", formats: ["2"] },

	// 3 - Patrol Log
	{ name: "callsign", label: "S.E.B. Callsign (e.g. 12)", type: "text", formats: ["3"] },
	{ name: "eventDescription", label: "DELTA Summary/Timeline", type: "textarea", formats: ["3"] },

	// 4-13 - Certification responses (shared operator/date/position/signature fields)
	{ name: "operatorLastName", label: "Operator's last name", type: "text", formats: ["4", "6", "7", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "28"] },
	{ name: "applicationDate", label: "Application submitted date", type: "date", dateStyle: "full", formats: ["4", "6", "7", "10", "11", "12", "13"] },
	// 14-15 - Practical exam responses. The letter says the application was
	// "underwent on" this date, which is later than the written exam, so it gets
	// its own field rather than reusing applicationDate.
	{
		name: "practicalDate",
		label: "Practical exam date",
		type: "date",
		dateStyle: "full",
		formats: ["14", "15", "16", "17", "18", "19", "20", "21"],
	},
	{ name: "senderPosition", label: "Your position (e.g. Instructor, Training Division)", type: "text", formats: ["4", "5", "6", "7", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] },
	// The signature image comes from the deputy profile, not a per-format field.
	// Email date used by formats 6-13 (renders in the letter's top-right corner).
	{ name: "date", label: "Email Date", type: "date", formats: ["6", "7", "8", "9", "10", "11", "12", "13", "16", "17", "18", "19", "20", "21"] },

	// 5 - Dive Team Certification - Failed (Written Exam) (reuses operatorLastName / applicationDate /
	// senderPosition from format 4, plus a denial reason list)
	{
		name: "reasons",
		label: "Denial reason(s) (each reason, click add)",
		type: "list",
		itemPlaceholder: "Type a reason, then press Enter",
		formats: ["5", "7", "9", "11", "13", "15", "17", "19", "21", "25", "36"],
	},

	// 22-23 - Crisis Negotiator practical review: one grade and reasoning pair per
	// criterion, in the order the letter prints them.
	...CN_CRITERIA.flatMap((criterion, index) => [
		{
			name: `cnGrade${index}`,
			label: criterion,
			type: "select" as const,
			options: cnGradeOptions,
			formats: ["22", "23"],
		},
		{
			name: `cnReason${index}`,
			label: `${criterion} - reasoning`,
			type: "textarea" as const,
			formats: ["22", "23"],
		},
	]),

	// 27 - Training Session Scheduling
	{ name: "trainingName", label: "Training name", type: "text", formats: ["27"] },
	{ name: "sessionDate", label: "Training date", type: "date", dateStyle: "short", formats: ["27"] },
	{ name: "sessionTime", label: "Training start time (UTC, 24h)", type: "time", formats: ["27"] },
	{ name: "location", label: "Location", type: "text", formats: ["27"] },
	{
		name: "instructor",
		label: "Instructor (leave blank to use your profile name)",
		type: "text",
		formats: ["27"],
	},

	// 30 - Probationary Operator profile
	{ name: "traineeName", label: "Trainee operator name (Lname, Fname)", type: "text", formats: ["30"] },
	{ name: "traineeRank", label: "Trainee department rank", type: "text", formats: ["30"] },
	{ name: "traineeJoinDate", label: "Bureau join date", type: "date", dateStyle: "short", formats: ["30"] },
	{ name: "traineeBadge", label: "Badge number (e.g. #12345)", type: "text", formats: ["30"] },

	// 30-33 - The three OTP sessions. The profile (30) and the standalone session
	// formats (31-33) render the same worksheets, so they share every field.
	...OTP_SESSIONS.flatMap((session) => [
		{
			name: `${session.prefix}Date`,
			label: `${session.label} - date`,
			type: "date" as const,
			dateStyle: "short" as const,
			formats: ["30", session.id],
		},
		{
			name: `${session.prefix}Time`,
			label: `${session.label} - start time (24h, shown as AM/PM)`,
			type: "time" as const,
			formats: ["30", session.id],
		},
		{
			name: `${session.prefix}Instructor`,
		label: `${session.label} - instructor (leave blank to use your profile name)`,
		type: "text" as const,
		formats: ["30", session.id],
	},
		...session.sections.map((section) => ({
			name: section.field,
			label: `${session.label} - ${section.heading}`,
			type: "check" as const,		items: section.items,
		formats: ["30", session.id],
	})),
]),
];
