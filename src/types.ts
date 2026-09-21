export interface DeputyData {
	name: string;
	signature: string;
	dRank: string;
	divisionRanks: {
		RED: string;
		TSD: string;
		ATD: string;
		General: string;
		Supervisory: string;
		FTB: string;
	};
}

export type divisionsType = "RED" | "ATD" | "TSD" | "General" | "Supervisory" | "FTB";

/** A single dynamic field rendered for a response format. */
export interface FormatInputField {
	name: string;
	label: string;
	type: "text" | "number" | "date" | "time" | "select" | "textarea" | "check";
	/** Format ids (as strings) that require this field. */
	formats: string[];
	hint?: string;
	options?: { value: string; label: string }[];
	/** Output style for date fields; defaults to the app-wide email date style. */
	dateStyle?: "full" | "short" | "shortYear";
	/** Toggleable items for "check" fields; stored as "<fieldName>:<index>" keys. */
	items?: string[];
}

export interface FormatData {
	// RED fields
	applicantName?: string;
	applicantGender?: "male" | "female";
	date?: string;
	interviewDate?: string;
	dateFormat?: "full" | "short"; // "full" for "December 2nd, 2025", "short" for "02/DEC/2025"
	reasons?: string[];
	appLink?: string;
	firstImpression?: string;
	answeredTruthfully?: string;
	situationalQuestions?: string;
	greatestWeakness?: string;
	obstacleCourseProblems?: string;
	acceptedIntoAcademy?: string;
	oocQuestions?: string;
	usageOfMeAndDo?: string;
	characterDevelopment?: string;
	workingMicrophone?: string;
	playerAge?: string;
	speakingEnglish?: string;
	rolePlayScreenShots?: string;
	generalFeeling?: string;

	// TSD and ATD fields
	deputyName?: string;
	deputyRank?: string;
	certificationType?: string;
	scoredPoint?: string;
	leastPoint?: string;
	issuedBy?: string;
	certificationStatus?: "acquired" | "suspended";

	// General fields
	recipientName?: string;

	// Supervisory / personnel fields
	previousRank?: string;
	newRank?: string;
	authorizingDeputy?: string;
	dischargeType?: "honourable" | "dishonourable";
	suspensionStart?: string;
	suspensionEnd?: string;
	suspensionDuration?: string;
	summary?: string;
	reassignmentAssignment?: string;
	salutation?: string;
	response?: string;
	civilianName?: string;

	// FTB shared: dated header (Date + Patrol Hours), used by FTS I-III, FTE and both reinstatement reports
	fts1Date?: string;
	fts1PatrolStart?: string;
	fts1PatrolEnd?: string;
	fts2Date?: string;
	fts2PatrolStart?: string;
	fts2PatrolEnd?: string;
	fts3Date?: string;
	fts3PatrolStart?: string;
	fts3PatrolEnd?: string;
	fteDate?: string;
	ftePatrolStart?: string;
	ftePatrolEnd?: string;

	// FTS checklists
	fts1Checklist?: string[];
	fts2Checklist?: string[];
	fts3Checklist?: string[];

	// FTS-I trainee performance + next-session notes
	fts1Handbook?: string;
	fts1Behaviour?: string;
	fts1Communications?: string;
	fts1Roleplay?: string;
	fts1SectionsToRepeat?: string;
	fts1Mistakes?: string;
	fts1ReadyProgress?: string;
	fts1AdditionalNotes?: string;

	// FTS-II (adds vehicle operation + impound)
	fts2Handbook?: string;
	fts2VehicleOperation?: string;
	fts2Impound?: string;
	fts2Behaviour?: string;
	fts2Communications?: string;
	fts2Roleplay?: string;
	fts2SectionsToRepeat?: string;
	fts2Mistakes?: string;
	fts2ReadyProgress?: string;
	fts2AdditionalNotes?: string;

	// FTS-III (adds pursuit + driving)
	fts3Handbook?: string;
	fts3Behaviour?: string;
	fts3Communications?: string;
	fts3Pursuit?: string;
	fts3Driving?: string;
	fts3Roleplay?: string;
	fts3SectionsToRepeat?: string;
	fts3Mistakes?: string;
	fts3ReadyProgress?: string;
	fts3AdditionalNotes?: string;

	// Field Training Evaluation report
	fteTask0?: string;
	fteTask1?: string;
	fteTask2?: string;
	fteTask3?: string;
	fteTask4?: string;
	fteTask5?: string;
	fteTask6?: string;
	fteTask7?: string;
	fteTask8?: string;
	fteTask9?: string;
	fteTask10?: string;
	fteTimeline?: string;
	fteGrade0?: string;
	fteNote0?: string;
	fteGrade1?: string;
	fteNote1?: string;
	fteGrade2?: string;
	fteNote2?: string;
	fteGrade3?: string;
	fteNote3?: string;
	fteGrade4?: string;
	fteNote4?: string;
	fteGrade5?: string;
	fteNote5?: string;
	fteGrade6?: string;
	fteNote6?: string;
	fteGrade7?: string;
	fteNote7?: string;
	fteGrade8?: string;
	fteNote8?: string;
	fteMockWith?: string;
	fteMockGradeKeepUp?: string;
	fteMockNoteKeepUp?: string;
	fteMockGradeCallouts?: string;
	fteMockNoteCallouts?: string;
	fteMockGradeDriving?: string;
	fteMockNoteDriving?: string;
	fteMockGradeBackups?: string;
	fteMockNoteBackups?: string;
	fteArrestReportLink?: string;
	fteReadySolo?: string;
	fteIssues?: string;
	fteIntervention?: string;
	fteConcerning?: string;
	fteRpCommands?: string;
	fteOocDemeanor?: string;
	fteRulesUnderstanding?: string;
	fteShouldPass?: string;

	// Daily Observation Report
	dorTraineeResponse?: string;
	dorPatrolSummary?: string;
	dorWrong?: string;
	dorAdditionalTraining?: string;
	dorGrade0?: string;
	dorResponse0?: string;
	dorGrade1?: string;
	dorResponse1?: string;
	dorGrade2?: string;
	dorResponse2?: string;
	dorGrade3?: string;
	dorResponse3?: string;
	dorGrade4?: string;
	dorResponse4?: string;
	dorGrade5?: string;
	dorResponse5?: string;
	dorGrade6?: string;
	dorResponse6?: string;
	dorFeedback?: string;

	// Mock Pursuit Report
	mprDate?: string;
	mprTime?: string;
	mprFtdRankName?: string;
	mprTraineeName?: string;
	mprGradeKeepUp?: string;
	mprNoteKeepUp?: string;
	mprGradeCallouts?: string;
	mprNoteCallouts?: string;
	mprGradeDriving?: string;
	mprNoteDriving?: string;
	mprGradeBackups?: string;
	mprNoteBackups?: string;
	mprAnythingElse?: string;

	// Reinstatement Theory Session
	rtsDate?: string;
	rtsPatrolStart?: string;
	rtsPatrolEnd?: string;
	rtsChecklist?: string[];
	rtsHandbook?: string;
	rtsBehaviour?: string;
	rtsCommunications?: string;
	rtsRoleplay?: string;
	rtsArrestReportLink?: string;
	rtsSectionsToRepeat?: string;
	rtsMistakes?: string;
	rtsReadyProgress?: string;
	rtsAdditionalNotes?: string;

	// Reinstatement Evaluation
	rteDate?: string;
	rtePatrolStart?: string;
	rtePatrolEnd?: string;
	rteChecklist?: string[];
	rteTimeline?: string;
	rteGradeAttitude?: string;
	rteNoteAttitude?: string;
	rteGradeFieldAwareness?: string;
	rteNoteFieldAwareness?: string;
	rteGradeHandbook?: string;
	rteNoteHandbook?: string;
	rteGradeCommunication?: string;
	rteNoteCommunication?: string;
	rteGradeDriving?: string;
	rteNoteDriving?: string;
	rteGradeStress?: string;
	rteNoteStress?: string;
	rteGradeRoleplay?: string;
	rteNoteRoleplay?: string;
	rteArrestReportLink?: string;
	rteReadySolo?: string;
	rteIssues?: string;
	rteIntervention?: string;
	rteConcerning?: string;
	rteRpCommands?: string;
	rteOocDemeanor?: string;
	rteRulesUnderstanding?: string;
	rteShouldPass?: string;
}
