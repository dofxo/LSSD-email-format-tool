import { OTP_SESSIONS } from "@/data/sebInputs";
import { deputyRanks } from "@/data/deputyRanks";
import type { FormatInputField, divisionsType } from "@/types";

// ---------------------------------------------------------------------------
// FTB field helpers
// ---------------------------------------------------------------------------

const gradeOptions = [
	{ value: "1", label: "1 - Below satisfactory performance" },
	{ value: "2", label: "2 - Needs some minor improvements" },
	{ value: "3", label: "3 - Satisfactory" },
	{ value: "4", label: "4 - Outstanding, no room for improvements" },
	{ value: "5", label: "5 - Extraordinary" },
	{ value: "NT", label: "NT - Not tested" },
];

// DOR/MPR forms mark the box itself with ■ squares; FTE forms use a 1-5 scale.
const gradeOptionsSquares = [
	{ value: "■", label: "■ - Below satisfactory performance" },
	{ value: "■■", label: "■■ - Needs some minor improvements" },
	{ value: "■■■", label: "■■■ - Satisfactory" },
	{ value: "■■■■", label: "■■■■ - Outstanding, no room for improvements" },
	{ value: "■■■■■", label: "■■■■■ - Extraordinary" },
	{ value: "NT", label: "NT - Not tested" },
];

/**
 * A graded criterion: question once, grade select between the question and the
 * reasoning textarea, so the grade sits right under the question it belongs to.
 */
const graded = (
	gradeField: string,
	noteField: string,
	question: string,
	formats: string[],
	options: { value: string; label: string }[] = gradeOptions,
): FormatInputField[] => [
	{ name: gradeField, label: question, type: "select", options, formats },
	{ name: noteField, label: "Reasoning", type: "textarea", formats },
];

// FTS-I checklist. The first four items and the OOC footer item are red in the original.
const FTS1_CHECKLIST_ITEMS = [
	"12 hours have passed since the Trainee's academy.",
	"Trainee has successfully created and posted their personnel profile.",
	"The trainee has signed their employment contract with the Los Santos County Sheriff's Department.",
	"The Trainee has read and understood all active announcements.",
	"The Trainee was introduced to and understood the radio procedure for starting their watch.",
	"The Trainee was introduced to our bodycamera policy and the importance of having it running whilst on duty at all times ((Including the importance of the bodycamera RP w. /time))",
	"The Trainee was introduced to the basic first aid kit and its contents.",
	"The Trainee was taught how to properly care for a wounded civilian/suspect as outlined in the medical guide.",
	"The Trainee has been instructed to apply for BLS Training with the LSEMS.",
	"The Trainee has been introduced to the force continuum and was able to understand its purpose and when each tier of force is appropriate.",
	"The Trainee was taught to avoid crossfire and the consequences when carelessly aiming their weapon.",
	"The Trainee was taught the Miranda rights and was able to understand the purpose and when to use them.",
	"The Trainee was taught the difference between /cuff & SHIFT+E and how to use them.",
	"The Trainee was taught how to properly use TAC channels, what purpose they serve when to call TAC, and how to conduct themselves in a TAC situation.",
	"The Trainee was introduced to and able to fully utilize our Mobile Data Computer:",
	"The Trainee was fully introduced to our arresting procedure including adding a note to a person's record once his mugshots and fingerprints have been taken.",
	"The Trainee was taught how to remove/suspend a license and understand the consequences if he does not apply this policy.",
	"The Trainee was fully introduced to and understood our relationship with the Department of Corrections including fulfilling their requests or add a note to a person's record once the DNA sample has been taken and logged.",
	"The Trainee has been informed of their next steps within the department and what they need to do to conclude the FTD successfully.",
	"The Trainee has been informed they must complete a feedback form after each FTS session. Failure to do so within 48 hours will result in a pause in progress for their program.",
	"Trainee has been informed of the OOC Regulation about what to do if he is being reported on the ECRP forum.",
];

// FTS-II checklist.
const FTS2_CHECKLIST_ITEMS = [
	"The Trainee knew how to start their watch and remembered this from their FTS-1",
	"The Trainee was able to unpark a cruiser",
	"The Trainee understands the differences between our cruisers and that they need to use the right one for the right situation",
	"The Trainee was introduced to and understood the correct radio procedure when responding to calls",
	"The Trainee was able to demonstrate the ability to effectively respond to calls",
	"The Trainee was introduced to and was able to fully operate all of our facilities",
	"The Trainee was introduced to the marine protocols and was able to understand the policies",
	"The Trainee was introduced to and shown around the impound lot",
	"The Trainee was introduced to and shown our flatbed wrecker, and shown the various controls to safely operate the flatbed",
	"The Trainee was shown how to impound vehicles, and release vehicles, and appeared to adequately understand the procedures",
	"The Trainee was introduced to and fully understood the probable cause, witness types, and evidence",
	"The Trainee was introduced to the 10-55 radio procedure and was able to demonstrate they could accurately adhere to this procedure",
	"The Trainee understood when a 10-55 is not considered Code-4 and how to call for back-up when required",
	"The Trainee was able to conduct a 10-55 successfully at least once",
	"The Trainee understood what a felony stop is and when a felony stop is to be called in over the radio",
	"The Trainee understood the felony stop formation and the individual role of each vehicle in the formation",
	"The Trainee was introduced to and understood the communications protocols for a felony stop",
	"The Trainee understood the importance of RP in a felony stop and taking their time with new players",
	"The Trainee was introduced to how a TAC-Call is made, Joint-TAC, and joining TAC",
	"The Trainee was able to demonstrate their knowledge of the TAC procedures",
	"The Trainee partook in pursuit and was able to give call-outs",
	"The Trainee was introduced to pursuits, PIT, safe driving, and pursuit line",
	"The Trainee partook in a simulated pursuit at Fort Zancudo or a proper live pursuit",
];

// FTS-III checklist.
const FTS3_CHECKLIST_ITEMS = [
	"The Trainee was able to unpark a cruiser",
	"The Trainee was introduced on how to operated CCTV Cameras",
	"The Trainee was introduced to communications protocols for \"Arriving on Scene\"",
	"The Trainee was introduced to and understood scene management and the importance of using the correct barrier for the correct objective",
	"The Trainee understood the role of a scene manager, and when they can and cannot leave a scene",
	"The Trainee was able to conduct a 10-55 successfully on his own",
	"The Trainee understood how to call TAC and was able to demonstrate the ability to do so",
	"The Trainee was able to pursue a vehicle in TAC and effectively communicate while in TAC (If not able to get a normal pursuit, initiate a MOC one at Fort Zancudo)",
	"The Trainee was able to lead a pursuit as the primary unit",
	"The Trainee was introduced to and understood how to properly utilize the BOLO system when a suspect is lost",
	"The Trainee was able to demonstrate the ability to effectively respond to calls",
	"When going to calls the Trainee was able to adhere to our driving protocols and understood the response codes they were utilizing",
	"The Trainee was able to properly arrest, search, and process a suspect per our arresting procedure protocols",
	"The Trainee was able to properly file the arrest report",
	"The Trainee was introduced to property searches and understands the requirements for it",
	"The Trainee was introduced to Scene Management and was able to successfully set up a scenario",
];

// Reinstatement Theory checklist.
const RTS_CHECKLIST_ITEMS = [
	"The Trainee signed all the active announcements and created his personnel file",
	"The Trainee was reminded of all the options in the MDC",
	"The Trainee was taught about the protocols of being on the scene",
	"The Trainee was taught the proper way of placing the scene management",
	"The Trainee was taught about the proper procedures for a 10-55",
	"The Trainee was taught about the proper procedures for a 10-66",
	"The Trainee was taught about the content of his BLS bag and how to properly use it with 10-15 or 10-16",
	"The Trainee was taught about the proper etiquette in TAC and how to call it for any situation requiring it",
	"The Trainee remembered how to properly utilize the BOLO system when a suspect is lost",
	"The Trainee was taught about the processing of a 10-15",
	"The Trainee was taught about the protocol of hot pursuit and warrant procedures",
];

// Reinstatement Evaluation checklist.
const RTE_CHECKLIST_ITEMS = [
	"Conducted an arrest",
	"Filed the arrest report",
	"Conducted a 10-55",
	"Conducted a 10-66",
	"Participated in a pursuit",
	"Primary in a pursuit (not mandatory for reinstatement but still a plus)",
	"Responded to a 10-21",
	"Participated in a 10-1",
	"Responded to the department radio",
	"Demonstrated the ability to provide clear and concise communication",
	"Demonstrated the basic elements of policing",
	"Demonstrated the ability to remain calm under stress or duress",
	"Demonstrated basic problem-solving skills and investigative ability",
	"Demonstrated the ability to distinguish between IC and OOC roleplay",
];

/** The DOR-style grading criteria (■ squares + NT), shared by FTS I-III and the DOR. */
const DOR_GRADE_CRITERIA = [
	"The Deputy Sheriff Trainee's general demeanor and behavior around the public",
	"The Deputy Sheriff Trainee's understanding of our departmental procedures and protocols",
	"The Deputy Sheriff Trainee's Driving Ability",
	"The Deputy Sheriff Trainee's understanding of the force continuum",
	"The Deputy Sheriff Trainee's Weapon Usage and Field Awareness",
	"The Deputy Sheriff Trainee's ability to use the Mobile Data Centre (MDC) for such things as checking warrants, running plates, searching firearms serial numbers, etc",
	"The Deputy Sheriff Trainee's ability to communicate with dispatch and other field operatives through their radio",
];

/** The FTE grading criteria (1-5), verbatim from the original. */
const FTE_CRITERIA_LABELS = [
	"General Attitude and Demeanor (CPR):",
	"Field Awareness:",
	"Handbook knowledge: Suspect Detention / Arrest",
	"Handbook Knowledge: 10-55 / 10-66:",
	"Handbook Knowledge : Pursuits:",
	"Communication during TAC/JTAC Scenarios:",
	"High-Speed Pursuit Driving:",
	"Demeanor Under Stress / Duress:",
	"Roleplay Ability:",
];

/** FTE task list, verbatim from the original. */
const FTE_TASKS = [
	"The Trainee conducted an arrest",
	"The Trainee filed the arrest report in a timely manner",
	"The Trainee conducted a 10-66 or a 10-55",
	"The Trainee participated in a pursuit",
	"The Trainee served as the Primary Unit in a pursuit",
	"The Trainee served as the Primary Unit in a mock pursuit",
	"The Trainee demonstrated the ability to provide clear and concise communication through TAC or radio frequencies",
	"The Trainee demonstrated the ability to remain calm under stress or duress",
	"The Trainee demonstrated basic problem-solving skills and investigative ability",
	"The Trainee demonstrated the ability to render basic medical aid to an individual on the field",
	"The Trainee demonstrated the ability to distinguish between IC and OOC roleplay",
];

// ---------------------------------------------------------------------------
// SEB field helpers
// ---------------------------------------------------------------------------

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
 * Every dynamic form field, by division. This is the single source of truth for
 * the inputs the response tool renders; `/admin` can override or extend any
 * division's list through the format store.
 */

export const inputsByDivision: Record<divisionsType, FormatInputField[]> = {
	RED: [
		{
			name: "applicantName",
			label: "Applicant's full/last name",
			type: "text",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13"],
		},
		{
			name: "applicantGender",
			label: "Applicant's gender",
			type: "select",
			options: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
			],
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
		},
		{
			name: "date",
			label: "Email Date",
			type: "date",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		},
		{
			name: "interviewDate",
			label: "Interview date",
			type: "date",
			formats: ["9", "13"],
		},
		{
			name: "reasons",
			label: "Reason(s) (each item, click add)",
			type: "list",
			itemPlaceholder: "Type a reason, then press Enter",
			formats: ["4", "6"],
		},
		{ name: "appLink", label: "Application Link", type: "text", formats: ["13"] },
		{
			name: "firstImpression",
			label: "How was your first impression of the applicant, were they friendly with you, introduced themselves, etc?",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "answeredTruthfully",
			label: "Did the applicant answer all questions truthfully, provide their full ID, and were they compliant during their search? Did they bring something to the interview they are not supposed to, a firearm for an example?",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "situationalQuestions",
			label: "How did the applicant respond to the situational questions? Did they have common sense when it came to answering the questions? Do you think they will be a good fit for the department?\n",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "greatestWeakness",
			label: "What's the Applicant's greatest weakness ( Please be specific )",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "obstacleCourseProblems",
			label: "Did the applicant have any problems with the physical obstacle course?",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "acceptedIntoAcademy",
			label: "Do you believe this applicant should be accepted into the academy?",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "oocQuestions",
			label: "(( Did they answer all OOC questions correctly, were they familiar with the server rules? ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "usageOfMeAndDo",
			label: "(( Do you think they have provided sufficient details and fair usage of /me's and /do's? ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "characterDevelopment",
			label: "(( Did they role-play any 'character development' during the role-play test? E.g. role-playing fatigue/exhaustion, pain etc. ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "workingMicrophone",
			label: "(( Does the player have a working microphone? ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "playerAge",
			label: "(( Is the player 16 or older? ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "speakingEnglish",
			label: "(( Was the applicant proficient at speaking English? ))",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "rolePlayScreenShots",
			label: "(( Provide screenshots of ALL of their RP throughout the physical evaluation ))",
			hint: "Add link(s) with ; separator. you can also add one link without ; separator. (Also make sure to use the direct link, not the viewer link. https://ibb.co/2223C4VcBF - incorrect / https://i.ibb.co/322jZ6SHT/2025-11-01-22-53.png - correct )",
			type: "textarea",
			formats: ["13"],
		},
		{
			name: "generalFeeling",
			label: "(( How was your general feeling towards them? Do they come across as willing to learn and invest time into this faction, or do they seem like they want to rush and can't dedicate themselves to something long-term? ))\n",
			type: "textarea",
			formats: ["13"],
		},
	],
	TSD: [
		{
			name: "deputyName",
			label: "Deputy Fname and Lname",
			type: "text",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		},
		{
			name: "date",
			label: "Email Date",
			type: "date",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		},
	],
	ATD: [
		{
			name: "deputyName",
			label: "Deputy Fname and Lname",
			type: "text",
			formats: [
				"2",
				"4",
				"6",
				"8",
				"10",
				"12",
				"14",
				"16",
				"18",
				"20",
				"22",
				"24",
				"26",
				"28",
				"30",
				"32",
				"34",
				"36",
				"38",
				"40",
				"41",
				"42",
				"43",
				"44",
				"45",
				"46",
			],
		},
		{
			name: "deputyRank",
			label: "Deputy Rank",
			type: "select",
			options: deputyRanks,
			formats: [
				"2",
				"4",
				"6",
				"8",
				"10",
				"12",
				"14",
				"16",
				"18",
				"20",
				"22",
				"24",
				"26",
				"28",
				"30",
				"32",
				"34",
				"36",
				"38",
				"40",
				"41",
				"42",
				"43",
				"44",
				"45",
			],
		},
		{
			name: "certificationType",
			label: "Certification Type",
			type: "text",
			formats: ["41", "42", "43", "44", "46", "47"],
		},
		{
			name: "scoredPoint",
			label: "Deputy Score",
			type: "number",
			formats: ["42"],
		},
		{
			name: "leastPoint",
			label: "Minimum Score",
			type: "number",
			formats: ["42"],
		},
		{
			name: "reasons",
			label: "Reason(s) (each item, click add)",
			type: "list",
			itemPlaceholder: "Type a reason, then press Enter",
			formats: ["43", "45"],
		},
		{
			name: "date",
			label: "email date",
			type: "date",
			formats: [
				"2",
				"4",
				"6",
				"8",
				"10",
				"12",
				"14",
				"16",
				"18",
				"20",
				"22",
				"24",
				"26",
				"28",
				"30",
				"32",
				"34",
				"36",
				"38",
				"40",
				"46",
				"47",
			],
		},
		{
			name: "issuedBy",
			label: "Issued By",
			type: "text",
			formats: ["47"],
		},
		{
			name: "certificationStatus",
			label: "Certification Status",
			type: "select",
			options: [
				{ value: "acquired", label: "Acquired" },
				{ value: "suspended", label: "Suspended" },
			],
			formats: ["47"],
		},
	],
	General: [
		{
			name: "date",
			label: "Email Date",
			type: "date",
			formats: ["1"],
		},
		{
			name: "recipientName",
			label: "Recipient Rank and Name",
			type: "text",
			formats: ["1"],
		},
	],
	Supervisory: [
		// 1 Promotion Notice
		{
			name: "recipientName",
			label: "Deputy full Name/Rank (or both)",
			type: "text",
			formats: ["1", "2", "3", "4", "5", "6", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
		},
		{
			name: "civilianName",
			label: "Civilian Full Name",
			type: "text",
			formats: ["19"],
		},
		{
			name: "previousRank",
			label: "Previous rank",
			type: "select",
			options: deputyRanks,
			formats: ["1", "3", "6", "7", "8"],
		},
		{
			name: "newRank",
			label: "New rank",
			type: "select",
			options: deputyRanks,
			formats: ["1", "3", "6", "8"],
		},
		{
			name: "reassignmentAssignment",
			label: "New assignment",
			type: "text",
			formats: ["7"],
		},
		{
			name: "date",
			label: "Date (e.g. Month DD, YYYY)",
			type: "date",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8"],
		},
		// 4 Discharge Notice
		{
			name: "authorizingDeputy",
			label: "Authorizing Deputy (Rank Fname Lname)",
			type: "text",
			formats: ["4", "5"],
		},
		{
			name: "dischargeType",
			label: "Type of Discharge",
			type: "select",
			options: [
				{ value: "honourable", label: "Honourable Discharge" },
				{ value: "dishonourable", label: "Dishonourable Discharge" },
			],
			formats: ["4"],
		},
		{
			name: "summary",
			label: "Summary / Reason",
			type: "textarea",
			formats: ["4", "5", "17"],
		},
		{
			name: "suspensionStart",
			label: "Suspension start (Month DD, YYYY - HH:mm )",
			type: "text",
			formats: ["5", "17"],
		},
		{
			name: "suspensionEnd",
			label: "Suspension end (Month DD, YYYY - HH:mm )",
			type: "text",
			formats: ["5", "17"],
		},
		{
			name: "suspensionDuration",
			label: "Suspension duration (e.g. 3)",
			type: "text",
			formats: ["17"],
		},
		// 9–18 Emails to deputies
		{
			name: "salutation",
			label: "Salutation (e.g. Mr., Ms.)",
			type: "text",
			formats: ["11"],
		},
		{
			name: "reasons",
			label: "Reason(s) (each item, click add)",
			type: "list",
			itemPlaceholder: "Type a reason, then press Enter",
			formats: ["12", "13"],
		},
		{
			name: "response",
			label: "Response text",
			type: "textarea",
			formats: ["18"],
		},
	],

	FTB: [
		// Dated header (Date + Patrol Hours) shared by the FTS, FTE and reinstatement reports
		{ name: "fts1Date", label: "Date", type: "date", dateStyle: "short", formats: ["1"] },
		{ name: "fts1PatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["1"] },
		{ name: "fts1PatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["1"] },
		{ name: "fts2Date", label: "Date", type: "date", dateStyle: "short", formats: ["2"] },
		{ name: "fts2PatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["2"] },
		{ name: "fts2PatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["2"] },
		{ name: "fts3Date", label: "Date", type: "date", dateStyle: "short", formats: ["3"] },
		{ name: "fts3PatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["3"] },
		{ name: "fts3PatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["3"] },
		{ name: "fteDate", label: "Date", type: "date", dateStyle: "short", formats: ["4"] },
		{ name: "ftePatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["4"] },
		{ name: "ftePatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["4"] },

		// 1 - Field Training Session I
		{ name: "fts1Checklist", label: "FTS-I checklist - mark each box if the Trainee performed the action, leave empty if they did not", type: "check", formats: ["1"], items: FTS1_CHECKLIST_ITEMS },
		{ name: "fts1Handbook", label: "HANDBOOK KNOWLEDGE (Min. 50 words) - Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? Did you quiz the training on his handbook knowledge before starting the FTS making sure he read it, if so what was asked and how did he respond? At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? Please describe how they did or did not demonstrate good handbook knowledge.", type: "textarea", formats: ["1"] },
		{ name: "fts1Behaviour", label: "BEHAVIOUR (Min. 50 words) - How would you describe your first impression of the Trainee? Were they friendly and open to your approach? How did the trainee behave with other deputies/ other departments/civilians? At any point during your session, did you feel the Trainee was bored or inattentive? Please describe their behavior and personality.", type: "textarea", formats: ["1"] },
		{ name: "fts1Communications", label: "COMMUNICATIONS (Min. 20 words) - Do you feel like the Trainee has communicated well throughout this session? Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate.", type: "textarea", formats: ["1"] },
		{ name: "fts1Roleplay", label: "ROLE-PLAY ABILITIES (Min. 20 words, OOC) - Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities? Have they demonstrated good and in-depth roleplay during your session? Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? Please describe the Trainee's roleplay abilities.", type: "textarea", formats: ["1"] },
		{ name: "fts1SectionsToRepeat", label: "Sections that need to be repeated during the next session", type: "textarea", formats: ["1"] },
		{ name: "fts1Mistakes", label: "Any mistakes that need to be ironed out in the next session?", type: "textarea", formats: ["1"] },
		{ name: "fts1ReadyProgress", label: "Do you believe this Trainee is ready to progress to the next FTS?", type: "textarea", formats: ["1"] },
		{ name: "fts1AdditionalNotes", label: "Additional Notes", type: "textarea", formats: ["1"] },

		// 2 - Field Training Session II
		{ name: "fts2Checklist", label: "FTS-II checklist - mark each box if the Trainee performed the action, leave empty if they did not", type: "check", formats: ["2"], items: FTS2_CHECKLIST_ITEMS },
		{ name: "fts2Handbook", label: "HANDBOOK KNOWLEDGE (Min. 50 words) - Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? Please describe how they did or did not demonstrate good handbook knowledge.", type: "textarea", formats: ["2"] },
		{ name: "fts2VehicleOperation", label: "TRAINEE VEHICLE OPERATION (Min. 50 words) - During this session, did the trainee demonstrate proper use of their department vehicle? Did the Trainee follow all traffic laws when operating in non-emergency settings (e.g. following speed limit, maintaining single lane, etc.)? Did the Trainee demonstrate the ability to operate the vehicle safely in an emergency condition? Please provide specific examples of things you say (good or bad) regarding the trainee's driving.", type: "textarea", formats: ["2"] },
		{ name: "fts2Impound", label: "IMPOUND LOT PROTOCOLS AND PROCEDURES (Min. 50 words) - Did the Trainee have any difficulties securing impounding and releasing their vehicle? How was their RP of doing so?", type: "textarea", formats: ["2"] },
		{ name: "fts2Behaviour", label: "BEHAVIOUR (Min. 50 words) - How would you describe your impression of the Trainee? Were they friendly and open to your approach? At any point during your session, did you feel the Trainee was bored or inattentive? Please describe their behavior and personality.", type: "textarea", formats: ["2"] },
		{ name: "fts2Communications", label: "COMMUNICATIONS (Min. 20 words) - Do you feel like the Trainee has communicated well throughout this session? Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate.", type: "textarea", formats: ["2"] },
		{ name: "fts2Roleplay", label: "ROLE-PLAY ABILITIES (Min. 20 words, OOC) - Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities? Have they demonstrated good and in-depth roleplay during your session? Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? Please describe the Trainee's roleplay abilities.", type: "textarea", formats: ["2"] },
		{ name: "fts2SectionsToRepeat", label: "Sections that need to be repeated during the next session", type: "textarea", formats: ["2"] },
		{ name: "fts2Mistakes", label: "Any mistakes that need to be ironed out in the next session?", type: "textarea", formats: ["2"] },
		{ name: "fts2ReadyProgress", label: "Do you believe this Trainee is ready to progress to the next FTS?", type: "textarea", formats: ["2"] },
		{ name: "fts2AdditionalNotes", label: "Additional Notes", type: "textarea", formats: ["2"] },

		// 3 - Field Training Session III
		{ name: "fts3Checklist", label: "FTS-III checklist - mark each box if the Trainee performed the action, leave empty if they did not", type: "check", formats: ["3"], items: FTS3_CHECKLIST_ITEMS },
		{ name: "fts3Handbook", label: "HANDBOOK KNOWLEDGE (Min. 50 words) - Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? Did you have to repeat past FTS information? At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? Please describe how they did or did not demonstrate good handbook knowledge.", type: "textarea", formats: ["3"] },
		{ name: "fts3Behaviour", label: "BEHAVIOUR (Min. 50 words) - How would you describe your impression of the Trainee? How was he acting toward other Deputies or civilians? Were they friendly and open to your approach? At any point during your session, did you feel the Trainee was bored or inattentive? Please describe their behavior and personality.", type: "textarea", formats: ["3"] },
		{ name: "fts3Communications", label: "COMMUNICATIONS (Min. 20 words) - Do you feel like the Trainee has communicated well throughout this session? Did he remember to update his status, 10-8/10-9? Was the trainee able to respond clearly on the radio if deputies were asking him questions? Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate.", type: "textarea", formats: ["3"] },
		{ name: "fts3Pursuit", label: "PUSUIT ABILITY (Min. 50 words) - Did the trainee properly call Tac and drop a backup? Did he relay the usual information (pursuing a car, the direction of travel, RO) once the other units joined TAC, or did they have to ask for it? Did he follow the pursuit line, advise other units before passing them, and ask permission before doing a P.I.T.? Describes his/her calls, in detail.", type: "textarea", formats: ["3"] },
		{ name: "fts3Driving", label: "DRIVING ABILITY (Min. 30 words) - Was the Trainee a competent driver? Did they follow traffic laws and adhere to our driving protocols? Describe his ability to drive off-road and on a road. Do you have any issues with the Trainee's driving ability?", type: "textarea", formats: ["3"] },
		{ name: "fts3Roleplay", label: "ROLE-PLAY ABILITIES (Min. 20 words, OOC) - Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities? Have they demonstrated good and in-depth roleplay during your session? Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? Please describe the Trainee's roleplay abilities.", type: "textarea", formats: ["3"] },
		{ name: "fts3SectionsToRepeat", label: "Sections that need to be repeated during the next session", type: "textarea", formats: ["3"] },
		{ name: "fts3Mistakes", label: "Any mistakes that need to be ironed out in the next session?", type: "textarea", formats: ["3"] },
		{ name: "fts3ReadyProgress", label: "Do you believe this Trainee is ready to progress to the next FTS?", type: "textarea", formats: ["3"] },
		{ name: "fts3AdditionalNotes", label: "Additional Notes", type: "textarea", formats: ["3"] },

		// 4 - Field Training Evaluation
		...FTE_TASKS.map((task, index) => ({
			name: `fteTask${index}`,
			label: `${task} - grade of effectiveness`,
			type: "select" as const,
			options: gradeOptionsSquares,
			formats: ["4"],
		})),
		{ name: "fteTimeline", label: "Detailed timeline of the session (min. 200 words)", type: "textarea", formats: ["4"] },
		...FTE_CRITERIA_LABELS.flatMap((label, index) => [
			{ name: `fteGrade${index}`, label, type: "select" as const, options: gradeOptionsSquares, formats: ["4"] },
			{ name: `fteNote${index}`, label: `${label} - reasoning`, type: "textarea" as const, formats: ["4"] },
		]),
		{ name: "fteMockWith", label: "Who was the FTD Command, ATD Command or Supervisor that you conducted this mock pursuit with?", type: "text", formats: ["4"] },
		...graded("fteMockGradeKeepUp", "fteMockNoteKeepUp", "Was the trainee able to keep up with the mock evader in the mock pursuit?", ["4"]),
		...graded("fteMockGradeCallouts", "fteMockNoteCallouts", "How were the trainee's callouts throughout the mock pursuit?", ["4"]),
		...graded("fteMockGradeDriving", "fteMockNoteDriving", "Was the trainee's driving as primary in a mock pursuit safe and in line with our pursuit protocols?", ["4"]),
		...graded("fteMockGradeBackups", "fteMockNoteBackups", "Did the trainee drop well-timed backups before/during the pursuit?", ["4"]),
		{ name: "fteArrestReportLink", label: "Arrest report link", type: "text", formats: ["4"] },
		{ name: "fteReadySolo", label: "Do you consider the Trainee ready to conduct solo patrol? Why do you believe as such?", type: "textarea", formats: ["4"] },
		{ name: "fteIssues", label: "Did you have any issues with the Trainee's performance or demeanor? Explain why, and if applicable, cite handbook procedures and regulations.", type: "textarea", formats: ["4"] },
		{ name: "fteIntervention", label: "Did you at any point have to assist the Trainee or intervene? What was the purpose of your intervention, and what was the outcome?", type: "textarea", formats: ["4"] },
		{ name: "fteConcerning", label: "(( At any point during the evaluation, did the trainee demonstrate any concerning behaviors, such as poor sportsmanlike remarks, or toxic behaviors? I.E. Mentioning Rule breaks ICly, spamming /b, or commenting as such in Teamspeak? ))", type: "textarea", formats: ["4"] },
		{ name: "fteRpCommands", label: "(( Did the Trainee demonstrate the ability to execute RP commands appropriately and engage in fluid and organic RP? ))", type: "textarea", formats: ["4"] },
		{ name: "fteOocDemeanor", label: "(( Did the Trainee demonstrate a positive OOC demeanor throughout the entire Evaluation? ))", type: "textarea", formats: ["4"] },
		{ name: "fteRulesUnderstanding", label: "(( Did the Trainee demonstrate an understanding of the rules of the server throughout their patrol? ))", type: "textarea", formats: ["4"] },
		{ name: "fteShouldPass", label: "Do you believe the Trainee should pass the Field Training Evaluation? Why or Why Not?", type: "textarea", formats: ["4"] },

		// 5 - Daily Observation Report
		{ name: "dorTraineeResponse", label: "Trainee response - Ask the trainee what area they wish to work on during the DOR or where he still feels uncomfortable, Radio calls/ Driving skills/ Traffic Stops/ etc.", type: "textarea", formats: ["5"] },
		{ name: "dorPatrolSummary", label: "Resume of patrol here - Patrol Summary", type: "textarea", formats: ["5"] },
		{ name: "dorWrong", label: "Was there anything you saw the trainee doing wrong, and what steps did you take regarding it?", type: "textarea", formats: ["5"] },
		{ name: "dorAdditionalTraining", label: "What additional training did you do regarding the areas the trainee was still uncomfortable with, and do you think the trainee overcame it?", type: "textarea", formats: ["5"] },
		...DOR_GRADE_CRITERIA.flatMap((criterion, index) => [
			{ name: `dorGrade${index}`, label: criterion, type: "select" as const, options: gradeOptionsSquares, formats: ["5"] },
			{ name: `dorResponse${index}`, label: `${criterion} - reasoning`, type: "textarea" as const, formats: ["5"] },
		]),
		{ name: "dorFeedback", label: "Field Training Deputy feedback (the Trainee may or may not get to read this; CC FTD Command for personal feedback)", type: "textarea", formats: ["5"] },

		// 6 - Mock Pursuit Report
		{ name: "mprDate", label: "Date", type: "date", dateStyle: "shortYear", formats: ["6"] },
		{ name: "mprTime", label: "Time (UTC)", type: "time", formats: ["6"] },
		{ name: "mprFtdRankName", label: "FTD Rank and Name", type: "text", formats: ["6"] },
		{ name: "mprTraineeName", label: "Trainee Name", type: "text", formats: ["6"] },
		...graded("mprGradeKeepUp", "mprNoteKeepUp", "Was the trainee able to keep up in the pursuit?", ["6"], gradeOptionsSquares),
		...graded("mprGradeCallouts", "mprNoteCallouts", "How were the trainee's callouts throughout the pursuit?", ["6"], gradeOptionsSquares),
		...graded("mprGradeDriving", "mprNoteDriving", "Was the trainee's driving as primary in the pursuit safe and in line with our pursuit protocols?", ["6"], gradeOptionsSquares),
		...graded("mprGradeBackups", "mprNoteBackups", "Did the trainee drop well-timed backups before/during the pursuit?", ["6"], gradeOptionsSquares),
		{ name: "mprAnythingElse", label: "Is there anything else you would like to add?", type: "textarea", formats: ["6"] },

		// 7 - Reinstatement Theory Session
		{ name: "rtsDate", label: "Date", type: "date", dateStyle: "short", formats: ["7"] },
		{ name: "rtsPatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["7"] },
		{ name: "rtsPatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["7"] },
		{ name: "rtsChecklist", label: "Session checklist - mark each box if the Trainee performed the action, leave empty if they did not", type: "check", formats: ["7"], items: RTS_CHECKLIST_ITEMS },
		{ name: "rtsHandbook", label: "HANDBOOK KNOWLEDGE (Min. 50 words) - Has the Trainee demonstrated that they have read the handbook before this session and have understood the material? At any point during this session, did the Trainee run into any trouble remembering the handbook contents or were they unsure of a procedure demonstrated in the handbook? Please describe how they did or did not demonstrate good handbook knowledge.", type: "textarea", formats: ["7"] },
		{ name: "rtsBehaviour", label: "BEHAVIOUR (Min. 50 words) - How would you describe your impression of the Trainee? Were they friendly and open to your approach? At any point during your session, did you feel the Trainee was bored or inattentive? Please describe their behavior and personality.", type: "textarea", formats: ["7"] },
		{ name: "rtsCommunications", label: "COMMUNICATIONS (Min. 20 words) - Do you feel like the Trainee has communicated well throughout this session? Would you consider the Trainee capable of holding calm and collected conversations with suspects and civilians in high-stress situations? Does the Trainee speak clearly? Please give your opinion on the Trainee's ability to communicate", type: "textarea", formats: ["7"] },
		{ name: "rtsRoleplay", label: "ROLE-PLAY ABILITIES (Min. 20 words, OOC) - Do you believe the Trainee is up to par with the rest of the department in terms of roleplay abilities? Have they demonstrated good and in-depth roleplay during your session? Has the Trainee used /me and /do in his roleplay to add more depth and immersion for you? Please describe the Trainee's roleplay abilities.", type: "textarea", formats: ["7"] },
		{ name: "rtsArrestReportLink", label: "Arrest report link", type: "text", formats: ["7"] },
		{ name: "rtsSectionsToRepeat", label: "Sections that need to be repeated in a DOR", type: "textarea", formats: ["7"] },
		{ name: "rtsMistakes", label: "Any mistakes that need to be ironed out?", type: "textarea", formats: ["7"] },
		{ name: "rtsReadyProgress", label: "Do you believe this Trainee is ready to progress to the evaluation?", type: "textarea", formats: ["7"] },
		{ name: "rtsAdditionalNotes", label: "Additional Notes", type: "textarea", formats: ["7"] },

		// 8 - Reinstatement Evaluation
		{ name: "rteDate", label: "Date", type: "date", dateStyle: "short", formats: ["8"] },
		{ name: "rtePatrolStart", label: "Patrol Start (UTC time)", type: "time", formats: ["8"] },
		{ name: "rtePatrolEnd", label: "Patrol End (UTC time)", type: "time", formats: ["8"] },
		{ name: "rteChecklist", label: "Session checklist - mark each box if the Trainee performed the action, leave empty if they did not (the Trainee is not required to do everything on this list)", type: "check", formats: ["8"], items: RTE_CHECKLIST_ITEMS },
		{ name: "rteTimeline", label: "Detailed timeline of the session (min. 200 words)", type: "textarea", formats: ["8"] },
		...graded("rteGradeAttitude", "rteNoteAttitude", "General Attitude and Demeanor (CPR)", ["8"], gradeOptionsSquares),
		...graded("rteGradeFieldAwareness", "rteNoteFieldAwareness", "Field Awareness", ["8"], gradeOptionsSquares),
		...graded("rteGradeHandbook", "rteNoteHandbook", "Handbook knowledge", ["8"], gradeOptionsSquares),
		...graded("rteGradeCommunication", "rteNoteCommunication", "Communication", ["8"], gradeOptionsSquares),
		...graded("rteGradeDriving", "rteNoteDriving", "Driving Ability", ["8"], gradeOptionsSquares),
		...graded("rteGradeStress", "rteNoteStress", "Demeanor Under Stress / Duress", ["8"], gradeOptionsSquares),
		...graded("rteGradeRoleplay", "rteNoteRoleplay", "Roleplay Ability (OOC)", ["8"], gradeOptionsSquares),
		{ name: "rteArrestReportLink", label: "Arrest report link", type: "text", formats: ["8"] },
		{ name: "rteReadySolo", label: "Do you consider the Trainee ready to conduct solo patrol? Why do you believe as such?", type: "textarea", formats: ["8"] },
		{ name: "rteIssues", label: "Did you have any issues with the Trainee's performance or demeanor? Explain why, and if applicable, cite handbook procedures and regulations.", type: "textarea", formats: ["8"] },
		{ name: "rteIntervention", label: "Did you at any point have to assist the Trainee or intervene? What was the purpose of your intervention, and what was the outcome?", type: "textarea", formats: ["8"] },
		{ name: "rteConcerning", label: "(( At any point during the evaluation, did the trainee demonstrate any concerning behaviors, such as poor sportsmanlike remarks, or toxic behaviors? I.E. Mentioning Rule breaks ICly, spamming /b, or commenting as such in Teamspeak? ))", type: "textarea", formats: ["8"] },
		{ name: "rteRpCommands", label: "(( Did the Trainee demonstrate the ability to execute RP commands appropriately and engage in fluid and organic RP? ))", type: "textarea", formats: ["8"] },
		{ name: "rteOocDemeanor", label: "(( Did the Trainee demonstrate a positive OOC demeanor throughout the entire Evaluation? ))", type: "textarea", formats: ["8"] },
		{ name: "rteRulesUnderstanding", label: "(( Did the Trainee demonstrate an understanding of the rules of the server throughout their patrol? ))", type: "textarea", formats: ["8"] },
		{ name: "rteShouldPass", label: "Do you believe the Trainee should pass the Field Training Evaluation? Why or Why Not?", type: "textarea", formats: ["8"] },
	],
	SEB: [
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
			hint: "Leave empty to use your SEB rank from the deputy profile. Anything typed here replaces it.",
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
		{
			name: "senderPosition",
			label: "Your position (e.g. Instructor)",
			type: "text",
			hint: "\"Training Division\" is added automatically. If left empty, \"Instructor\" is used.",
			formats: ["4", "5", "6", "7", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
		},
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
				label: `${session.label} - start time (UTC, 24h)`,
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
				type: "check" as const,
				items: section.items,
				formats: ["30", session.id],
			})),
		]),
	],
};
