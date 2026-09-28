// This file backs the /admin page. Formats added or edited at /admin are saved
// here so they live in the repo beside the built-in formats.
//
// Prefer editing through /admin: the JSON between the ADMIN_DATA markers below
// is regenerated on every save. Hand edits are fine too, as long as the block
// stays valid JSON.
import type { AdminFormatStore } from "./adminTypes";

export const adminFormatStore: AdminFormatStore = /* ADMIN_DATA */ {
	"overrides": {
		"General/1": {
			"title": "Personal Email",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence"
		},
		"SEB/30": {
			"title": "Probationary Operator Profile",
			"body": "",
			"govLink": "",
			"category": "Operator Training",
			"fields": [
				{
					"name": "traineeName"
				},
				{
					"name": "traineeRank"
				},
				{
					"name": "traineeJoinDate"
				},
				{
					"name": "traineeBadge"
				},
				{
					"name": "otp1Date"
				},
				{
					"name": "otp1Time"
				},
				{
					"name": "otp1Instructor"
				},
				{
					"name": "otp1Classroom"
				},
				{
					"name": "otp1Theory"
				},
				{
					"name": "otp2Date"
				},
				{
					"name": "otp2Time"
				},
				{
					"name": "otp2Instructor"
				},
				{
					"name": "otp2GroundTactics"
				},
				{
					"name": "otp3Date"
				},
				{
					"name": "otp3Time"
				},
				{
					"name": "otp3Instructor"
				},
				{
					"name": "otp3AirTactics"
				}
			]
		},
		"SEB/31": {
			"title": "OTP Session 1",
			"body": "",
			"govLink": "",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp1Date"
				},
				{
					"name": "otp1Time"
				},
				{
					"name": "otp1Instructor"
				},
				{
					"name": "otp1Classroom"
				},
				{
					"name": "otp1Theory"
				}
			]
		},
		"SEB/34": {
			"title": "Exam Sent to Trainee",
			"body": "",
			"govLink": "",
			"category": "Operator Training",
			"fields": []
		},
		"SEB/33": {
			"title": "OTP Session 3",
			"body": "",
			"govLink": "",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp3Date"
				},
				{
					"name": "otp3Time"
				},
				{
					"name": "otp3Instructor"
				},
				{
					"name": "otp3AirTactics"
				}
			]
		},
		"SEB/32": {
			"title": "OTP Session 2",
			"body": "",
			"govLink": "",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp2Date"
				},
				{
					"name": "otp2Time"
				},
				{
					"name": "otp2Instructor"
				},
				{
					"name": "otp2GroundTactics"
				}
			]
		}
	},
	"custom": [
		{
			"id": "37",
			"division": "SEB",
			"title": "Dive Team Certification",
			"topicTitle": "[DIVE TEAM Certification] Operator {Fname Lname}",
			"body": "{{theoScenario3}}{{theoScenario2}}{{theoScenario1}}{{primaryResponsibility}}{{whyApply}}{{sebJoinDate}}[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] {{name}}\n[b]RANK:[/b] {{dRank}}\n[b]BADGE NUMBER:[/b] {{badgeNumber}}\n[b]SEB SINCE:[/b] {{sebJoinDate}}\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Dive Team?[/i][/b] [i](Minimum 120 words)[/i]\n{{whyApply}}\n[b][i]What do you believe are the primary responsibilities of a Dive Team operator?[/i][/b]\n{{primaryResponsibility}}{{hazardUnderWater}}\n[b][i]What hazards may a diver encounter during underwater operations?[/i][/b]\n{{hazardUnderWater}}\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]  \nA 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team.\n[b][i]What is your approach to resolving this situation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{theoScenario1}}\n\n[b][size=150]Scenario 2[/size][/b]  \nDuring a boat pursuit, suspects are observed throwing multiple bags and a firearm into the sea before escaping.\n[b][i]How would you handle the recovery operation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{theoScenario2}}\n\n[b][size=150]Scenario 3[/size][/b]  \nDuring a dive operation, your assigned partner signals low air and begins showing signs of panic.\n[b][i]What actions do you take?[/i][/b] [b](Minimum of 100 words)[/b]\n{{theoScenario1}}\n\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "badgeNumber",
					"label": "Your badge number"
				},
				{
					"name": "sebJoinDate",
					"label": "SEB Join date"
				},
				{
					"name": "whyApply"
				},
				{
					"name": "primaryResponsibility"
				},
				{
					"name": "hazardUnderWater"
				},
				{
					"name": "theoScenario1",
					"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team.\nWhat is your approach to resolving this situation? (Minimum of 100 words)"
				},
				{
					"name": "theoScenario2",
					"label": "During a boat pursuit, suspects are observed throwing multiple bags and a firearm into the sea before escaping.\nHow would you handle the recovery operation? (Minimum of 100 words)"
				},
				{
					"name": "theoScenario3",
					"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic.\nWhat actions do you take? (Minimum of 100 words)"
				},
				{
					"name": "logDate",
					"label": "SEB Join Date"
				}
			]
		}
	],
	"inputs": [
		{
			"name": "badgeNumber",
			"type": "text",
			"label": "your badge number",
			"hint": "#10913"
		},
		{
			"name": "sebSince",
			"type": "date",
			"label": "SEB join date"
		},
		{
			"name": "sebJoinDate",
			"type": "date",
			"label": "Date (DD/MM/YYYY)",
			"dateStyle": "short"
		},
		{
			"name": "whyApply",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "primaryResponsibility",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "hazardUnderWater",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "theoScenario1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "theoScenario2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "duringADiveOperationYourAssignedPartnerSignalsLowAirAndBeginsShowingSignsOfPanicWhatActionsDoYouTakeMinimumOf100Words",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "theoScenario3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		}
	]
} /* /ADMIN_DATA */;
