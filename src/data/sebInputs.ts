/**
 * Operator Training Program session specs. Shared by the SEB format generators
 * (src/formats/divisions/SEB.ts) and the SEB input fields, which now live with
 * every other division in src/data/formatInputs.ts.
 */

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
