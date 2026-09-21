import { Car, ClipboardCheck, GraduationCap, Landmark, ScrollText, ShieldCheck, Users, type LucideIcon } from "lucide-react";

import type { divisionsType } from "@/types";

export interface Division {
	id: divisionsType;
	/** Short label used in the switcher. */
	label: string;
	/** Full division name shown in headings. */
	name: string;
	/** One-line description of what the division handles. */
	blurb: string;
	icon: LucideIcon;
	/** CSS class that sets the --accent custom property for this division. */
	accent: string;
	/** Restricted divisions require the supervisory password. */
	restricted?: boolean;
	/** Preview copy for the switcher. */
	tagline?: string;
}

export const divisions: Division[] = [
	{
		id: "RED",
		label: "RED",
		name: "Recruitment & Employment Division",
		blurb: "Applications, interviews, denials and academy intake.",
		icon: Users,
		accent: "accent-red",
	},
	{
		id: "TSD",
		label: "TSD",
		name: "Traffic Services Division",
		blurb: "Traffic certifications, assessments and enforcement notices.",
		icon: Car,
		accent: "accent-amber",
	},
	{
		id: "ATD",
		label: "ATD",
		name: "Academy & Training Division",
		blurb: "Training records, certifications and instructor correspondence.",
		icon: GraduationCap,
		accent: "accent-emerald",
	},
	{
		id: "FTB",
		label: "FTB",
		name: "Field Training Bureau",
		blurb: "Field training session reports, evaluations and observation reports.",
		icon: ClipboardCheck,
		accent: "accent-sky",
	},
	{
		id: "SEB",
		label: "SEB",
		name: "Special Enforcement Bureau",
		blurb: "Bureau correspondence, operations and personnel notices.",
		icon: Landmark,
		accent: "accent-rose",
	},
	{
		id: "General",
		label: "General",
		name: "General Correspondence",
		blurb: "Everyday department emails and civilian replies.",
		icon: ScrollText,
		accent: "accent-steel",
	},
	{
		id: "Supervisory",
		label: "Supervisory",
		name: "Supervisory & Command",
		blurb: "Promotions, discharges, suspensions and restricted notices.",
		icon: ShieldCheck,
		accent: "accent-violet",
		restricted: true,
	},
];

export const getDivision = (id: divisionsType): Division =>
	divisions.find((division) => division.id === id) ?? divisions[0];
