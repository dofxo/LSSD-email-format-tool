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
	};
}

export type divisionsType = "RED" | "ATD" | "TSD" | "General" | "Supervisory";

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
}
