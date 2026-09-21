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

/**
 * Dynamic form fields for the SEB division, keyed to format ids through the
 * `formats` array.
 */
export const SEBInputs: FormatInputField[] = [
	// 1 - Confidential Email
	{ name: "date", label: "Email Date", type: "date", formats: ["1"] },
	{ name: "body", label: "Email body", type: "textarea", formats: ["1"] },
	{
		name: "bureauPosition",
		label: "Bureau position (e.g. Sergeant, Operational Support Deputy)",
		type: "text",
		formats: ["1"],
	},
	{
		name: "certifications",
		label: "Certifications (optional, e.g. K9 Handler, Sniper)",
		type: "text",
		formats: ["1"],
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
	{ name: "operatorLastName", label: "Operator's last name", type: "text", formats: ["4", "6", "7", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] },
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
		formats: ["5", "7", "9", "11", "13", "15", "17", "19", "21"],
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
];
