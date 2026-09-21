import type { DeputyData, divisionsType } from "@/types";

/** Ranks available inside each division (empty when the division has none). */
export const divisionRanks: Record<divisionsType, { value: string; label: string }[]> = {
	RED: [
		{ value: "Unit Commander", label: "Unit Commander" },
		{ value: "Operations Lieutenant", label: "Operations Lieutenant" },
		{ value: "Program Coordinator", label: "Program Coordinator" },
		{ value: "Application Handler", label: "Application Handler" },
		{ value: "Trial Application Handler", label: "Trial Application Handler" },
		{ value: "Head Instructor", label: "Head Instructor" },
		{ value: "Instructor", label: "Instructor" },
		{ value: "Trial Instructor", label: "Trial Instructor" },
	],
	TSD: [
		{ value: "Commanding Officer", label: "Commanding Officer" },
		{ value: "Assistant Commanding Officer", label: "Assistant Commanding Officer" },
		{ value: "Traffic Inspector", label: "Traffic Inspector" },
		{ value: "Traffic Deputy III", label: "Traffic Deputy III" },
		{ value: "Traffic Deputy II", label: "Traffic Deputy II" },
		{ value: "Traffic Deputy I", label: "Traffic Deputy I" },
		{ value: "Probationary Traffic Deputy", label: "Probationary Traffic Deputy" },
	],
	ATD: [
		{ value: "Commanding Officer", label: "Commanding Officer" },
		{ value: "Assistant Commanding Officer", label: "Assistant Commanding Officer" },
		{ value: "Head Instructor", label: "Head Instructor" },
		{ value: "Senior Instructor", label: "Senior Instructor" },
		{ value: "Instructor", label: "Instructor" },
		{ value: "Trainee Instructor", label: "Trainee Instructor" },
	],
	General: [],
	Supervisory: [],
	FTB: [],
};

export const divisionRankOptionsFor = (division: divisionsType) => divisionRanks[division] ?? [];

/** Human-readable list of profile details that are still missing. */
export const profileIssues = (details: DeputyData, division: divisionsType): string[] => {
	// FTB session reports never embed deputy details, so nothing is required.
	if (division === "FTB") return [];

	return [
		!details.name.trim() ? "full name" : null,
		!details.dRank ? "rank" : null,
		divisionRankOptionsFor(division).length > 0 && !details.divisionRanks[division]
			? `${division} rank`
			: null,
		!details.signature.trim() ? "signature" : null,
	].filter((issue): issue is string => Boolean(issue));
};

/** The three lines people paste into forum signatures. */
export const signatureBlockLines = (details: DeputyData, division: divisionsType): string[] =>
	[
		`[img]${details.signature.trim()}[/img]`,
		[details.dRank, details.name].filter(Boolean).join(" "),
		details.divisionRanks[division],
	].filter((line) => line && line !== "[img][/img]");

/** Joins issue names into a readable sentence fragment. */
export const listIssues = (issues: string[]): string =>
	issues.length > 1 ? `${issues.slice(0, -1).join(", ")} and ${issues[issues.length - 1]}` : (issues[0] ?? "");
