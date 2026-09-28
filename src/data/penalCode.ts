/**
 * The State of San Andreas penal code, as published on the government website
 * (viewtopic.php?t=182965, version 17-SEP-2026).
 *
 * Only what a report needs is kept: the charge's code, its name and the section
 * it is filed under. Descriptions and penalties are left out on purpose — a
 * charge is quoted by code and name, e.g. ”VC01 - Speeding 1st Degree“, which is
 * how the forms ask for it.
 *
 * Reserved and placeholder entries carry no charge, so they are not offered.
 */

export interface PenalCharge {
	/** The section the charge is filed under, e.g. "Vehicular Citations". */
	category: string;
	/** The charge's code, e.g. "VC01". */
	code: string;
	/** The charge's name, e.g. "Speeding 1st Degree". */
	name: string;
}

/** The sections, in the order the penal code lists them. */
export const PENAL_CATEGORIES = [
	"Vehicular Citations",
	"General Citations",
	"General Misdemeanors",
	"Nuisance Misdemeanors",
	"Vehicular Charges",
	"Drug Charges",
	"Weapon Charges",
	"General Felonies",
	"Serious Felonies",
	"Aviation Charges",
	"Business Licensing Bureau",
] as const;

/** Every charge of the code, grouped by the section it sits in. */
const SECTIONS: { category: (typeof PENAL_CATEGORIES)[number]; charges: [string, string][] }[] = [
	{
		category: "Vehicular Citations",
		charges: [
			["VC01", "Speeding 1st Degree"],
			["VC02", "Speeding 2nd Degree"],
			["VC03", "Speeding 3rd Degree"],
			["VC04", "Illegal Parking"],
			["VC05", "Improper Traffic Maneuvers"],
			["VC06", "Following or Impeding Emergency Response"],
			["VC07", "Operating a Vehicle Without A License On Your Person"],
			["VC08", "Negligent Operation of a Road or Marine Vehicle"],
			["VC09", "Blocking Intersection"],
			["VC10", "Unroadworthy Vehicle"],
			["VC11", "Failure to Pay a Toll"],
			["VC12", "Operating an Unregistered Vehicle"],
			["VC13", "Disruptive Impeding or Blocking Travel"],
			["VC14", "Operation of a Vehicle without a License Plate"],
		],
	},
	{
		category: "General Citations",
		charges: [
			["GC01", "Loitering"],
			["GC02", "Traffic Endangerment"],
			["GC03", "Disorderly Conduct"],
			["GC05", "Misuse of Government Public Safety Radio Frequencies or Hotlines"],
			["GC06", "Possession of Cannabis"],
			["GC07", "Petty Theft"],
		],
	},
	{
		category: "General Misdemeanors",
		charges: [
			["GM01", "Assault"],
			["GM02", "Battery"],
			["GM03", "Possession of a Blade"],
			["GM04", "Resisting Arrest"],
			["GM05", "Receiving Stolen Property"],
			["GM07", "Criminal Fraud"],
			["GM08", "Vandalism"],
			["GM09", "Vigilantism"],
			["GM10", "Failure to Comply / Identify"],
			["GM11", "Predatory Lending"],
			["GM12", "Giving False Information to a Police Officer"],
			["GM13", "Criminal Threats"],
			["GM14", "Obstruction of Justice"],
			["GM15", "Animal Cruelty"],
			["GM16", "Failure to Pay a Fine"],
			["GM17", "Bribery"],
			["GM18", "Looting of a Dead Human Body"],
			["GM19", "Face Concealment"],
			["GM20", "Minor Sales Tax Evasion"],
			["GM21", "False Imprisonment"],
			["GM22", "Contempt of Court"],
			["GM23", "Parole Violation"],
			["GM24", "Contempt of Congress"],
			["GM25", "Possession/Unlawful use of Government Equipment"],
			["GM26", "Possession of Illegal Information Gathering Devices"],
			["GM27", "Incitement of Violence against a Peace Officer"],
			["GM28", "Transfer/Smuggling of External Goods into Correctional Facilities"],
		],
	},
	{
		category: "Nuisance Misdemeanors",
		charges: [
			["NM01", "Inciting a Riot"],
			["NM02", "Participating in a Riot"],
			["NM03", "Unlawful Assembly"],
			["NM04", "Stalking"],
			["NM05", "Public Intoxication"],
			["NM06", "Trespassing"],
			["NM07", "Prostitution, Pimping or Pandering"],
			["NM08", "Abuse of Government Public Safety Radio Frequencies or Hotlines"],
			["NM09", "Harassment"],
			["NM10", "Disturbing the Peace"],
			["NM11", "Public Lewdness"],
		],
	},
	{
		category: "Vehicular Charges",
		charges: [
			["VM01", "Operating a Vehicle without a Valid License"],
			["VM02", "Operating a Vehicle with a Suspended License"],
			["VM03", "Reckless Operation of a Road or Marine Vehicle"],
			["VM05", "Drunk, Impaired, or Distracted Driving"],
			["VM06", "Street Competition"],
			["VM07", "Hit and Run"],
			["VM08", "Vehicle Registration Fraud"],
			["VM09", "Operation of a Vehicle without a License Plate"],
			["VF01", "Evading an Officer"],
			["VF02", "Felony Hit and Run"],
			["VF03", "Operating a Chop Shop"],
			["VF04", "Felony Public Endangerment"],
		],
	},
	{
		category: "Drug Charges",
		charges: [
			["DM01", "Possession of a Schedule I Controlled Substance"],
			["DM02", "Possession of a Schedule II Controlled Substance"],
			["DM03", "Possession of a Schedule III Controlled Substance"],
			["DM04", "Possession of a Controlled Substance while Armed"],
			["DM05", "Possession of Drug Paraphernalia"],
			["DM06", "Cultivation of a Controlled Substance"],
			["DM07", "Possession of a Controlled Substance/Drug Paraphernalia within a Correctional Facility"],
			["DF01", "Possession of a Controlled Substance with Intent of Sales"],
			["DF02", "Sale of a Controlled Substance"],
			["DF03", "Sale of Drug Paraphernalia"],
			["DF04", "Trafficking a Controlled Substance"],
			["DF05", "Manufacturing a Controlled Substance"],
			["DF06", "Unlawful Administering of Drugs"],
			["DF07", "Transfer/Smuggling of Controlled Substances/Drug Paraphernalia into Correctional Facilities"],
		],
	},
	{
		category: "Weapon Charges",
		charges: [
			["WM01", "Unlawful Brandishing of a Firearm or Weapon"],
			["WM02", "Possession of a Class 1 Firearm"],
			["WM03", "Criminal Use of Weapon Modifications"],
			["WM04", "Possession of Illegal Body Armor"],
			["WM05", "Possession of Body Armor as a Felon"],
			["WF01", "Assault with a Deadly Weapon"],
			["WF02", "Shooting from a Vehicle (Drive-By)"],
			["WF03", "Possession of a Class 2 Firearm"],
			["WF04", "Possession of a Class 3 Firearm"],
			["WF05", "Possession of a Class 4 Firearm"],
			["WF06", "Unlicensed transfer of firearms, ammunition and body armor"],
			["WF07", "Firearms Trafficking"],
			["WF08", "Possession of a Weapon within a Correctional Facility"],
			["WF09", "Transfer/Smuggling of Weapons into Correctional Facilities"],
			["WF12", "Battery with a Deadly Weapon"],
		],
	},
	{
		category: "General Felonies",
		charges: [
			["GF01", "Child Endangerment"],
			["GF02", "Robbery"],
			["GF03", "Armed Robbery"],
			["GF04", "Sexual Assault"],
			["GF05", "Extortion"],
			["GF06", "Blackmail"],
			["GF07", "Felony Fraud"],
			["GF08", "Illegal Gambling"],
			["GF09", "Embezzlement"],
			["GF10", "Grand Theft"],
			["GF11", "Grand Theft Auto"],
			["GF12", "Forgery or Counterfeiting"],
			["GF13", "Arson"],
			["GF14", "False Impersonation"],
			["GF15", "Burglary"],
			["GF16", "Tampering with Evidence"],
			["GF17", "Rape"],
			["GF18", "Racketeering"],
			["GF19", "Abuse or Desecration of Dead Human Body"],
			["GF20", "Possession of Human Body Tissue"],
			["GF21", "Prison Break"],
			["GF22", "Breach of Trust"],
			["GF23", "Grand Sales Tax Evasion"],
			["GF24", "Perjury"],
			["GF25", "Felony Contempt of Court"],
			["GF26", "Organized Assault on Government or Law Enforcement Operations"],
			["GF27", "Incitement of Violence against a Peace Officer"],
			["GF28", "Election Fraud"],
		],
	},
	{
		category: "Serious Felonies",
		charges: [
			["SF01", "Domestic Terrorism"],
			["SF02", "Murder"],
			["SF03", "Involuntary or Vehicular Manslaughter"],
			["SF04", "Kidnapping"],
			["SF05", "Torture"],
			["SF06", "Possessing Destructive Devices or Explosives"],
			["SF07", "Bank Robbery"],
			["SF08", "Human Trafficking"],
			["SF09", "False Imprisonment of a Hostage"],
		],
	},
	{
		category: "Aviation Charges",
		charges: [
			["AM01", "Negligent Operation of an Aircraft"],
			["AM02", "Operating an Unregistered Aircraft"],
			["AM03", "Operating an Aircraft without a License on your Person"],
			["AM04", "Disrupting Airport/Aircraft Operations"],
			["AM05", "Operating an Aircraft without Proper Equipment"],
			["AM06", "Failure to Make Way for Emergency, State Government, or Military Aircraft"],
			["AM07", "Operating an Aircraft in Controlled Airspace without Clearance"],
			["AM08", "Violating a Restricted Airspace Order or Temporary Flight Restriction"],
			["AF01", "Reckless Operation of an Aircraft"],
			["AF02", "Committing a Crime Aboard an Aircraft in Flight"],
			["AF03", "Operating an Aircraft without an Active License"],
			["AF04", "Failure to Obey Intercepting Military or Law Enforcement Aircraft/ATC Orders"],
			["AF05", "Violating a Prohibited Airspace Order"],
			["AF06", "Transporting Dangerous Cargo"],
			["AF07", "Drunk, Impaired, or Distracted Flying"],
			["AF08", "Aircraft Piracy"],
			["AF09", "Destruction of an Aircraft or Aircraft Facilities"],
			["AF10", "Disobeying a Grounding Order"],
		],
	},
	{
		category: "Business Licensing Bureau",
		charges: [
			["BLB01", "Breach of Minor Licensing Conditions"],
			["BLB02", "Breach of Moderate Licensing Conditions"],
			["BLB03", "Breach of Major Licensing Conditions"],
			["BLB04", "Operating Without Valid Documents 1st Degree"],
			["BLB05", "Operating Without Valid Documents 2nd Degree"],
			["BLB06", "Operating Without Valid Documents 3rd Degree"],
		],
	},
];

/** Every charge of the code, in section order. */
export const penalCharges: PenalCharge[] = SECTIONS.flatMap(({ category, charges }) =>
	charges.map(([code, name]) => ({ category, code, name })),
);

/** Charges by code, for turning a picked code back into its line. */
const byCode = new Map(penalCharges.map((charge) => [charge.code, charge]));

/** A charge's code from its printed line ("VC01 - Speeding 1st Degree"). */
export const chargeByCode = (code: string): PenalCharge | undefined => byCode.get(code);

/**
 * A charge as a report quotes it: ”VC01 - Speeding 1st Degree“. An unknown code
 * is handed back as typed, so a charge added to the code before this tool is
 * updated still prints.
 */
export const chargeLine = (code: string): string => {
	const charge = byCode.get(code);
	return charge ? `${charge.code} - ${charge.name}` : code;
};

/** Charges grouped by section, in section order, for the pickers. */
export const chargesByCategory = (): { category: string; charges: PenalCharge[] }[] =>
	PENAL_CATEGORIES.map((category) => ({
		category,
		charges: penalCharges.filter((charge) => charge.category === category),
	})).filter((section) => section.charges.length > 0);
