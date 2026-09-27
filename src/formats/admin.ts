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
		}
	},
	"custom": [
		{
			"id": "37",
			"division": "SEB",
			"title": "Dive Team Certification",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] INSERT ANSWER HERE\n[b]RANK:[/b] INSERT ANSWER HERE\n[b]BADGE NUMBER:[/b] INSERT ANSWER HERE\n[b]SEB SINCE:[/b] INSERT ANSWER HERE\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Dive Team?[/i][/b] [i](Minimum 120 words)[/i]\nINSERT ANSWER HERE\n[b][i]What do you believe are the primary responsibilities of a Dive Team operator?[/i][/b]\nINSERT ANSWER HERE\n[b][i]What hazards may a diver encounter during underwater operations?[/i][/b]\nINSERT ANSWER HERE\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]  \nA 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team.\n[b][i]What is your approach to resolving this situation?[/i][/b] [b](Minimum of 100 words)[/b]\nINSERT ANSWER HERE\n\n[b][size=150]Scenario 2[/size][/b]  \nDuring a boat pursuit, suspects are observed throwing multiple bags and a firearm into the sea before escaping.\n[b][i]How would you handle the recovery operation?[/i][/b] [b](Minimum of 100 words)[/b]\nINSERT ANSWER HERE\n\n[b][size=150]Scenario 3[/size][/b]  \nDuring a dive operation, your assigned partner signals low air and begins showing signs of panic.\n[b][i]What actions do you take?[/i][/b] [b](Minimum of 100 words)[/b]\nINSERT ANSWER HERE\n\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application"
		}
	],
	"inputs": {
		"Supervisory": [
			{
				"name": "recipientName",
				"label": "Deputy full Name/Rank (or both)",
				"type": "text",
				"formats": [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"8",
					"9",
					"10",
					"11",
					"12",
					"13",
					"14",
					"15",
					"16",
					"17"
				]
			},
			{
				"name": "civilianName",
				"label": "Civilian Full Name",
				"type": "text",
				"formats": [
					"19"
				]
			},
			{
				"name": "previousRank",
				"label": "Previous rank",
				"type": "select",
				"formats": [
					"1",
					"3",
					"6",
					"7",
					"8"
				],
				"options": [
					{
						"value": "Public Relations Strategist",
						"label": "Public Relations Strategist"
					},
					{
						"value": "Deputy Sheriff Trainee",
						"label": "Deputy Sheriff Trainee"
					},
					{
						"value": "Deputy Sheriff",
						"label": "Deputy Sheriff"
					},
					{
						"value": "Deputy Sheriff (Bonus I)",
						"label": "Deputy Sheriff (Bonus I)"
					},
					{
						"value": "Deputy Sheriff (Bonus II)",
						"label": "Deputy Sheriff (Bonus II)"
					},
					{
						"value": "Deputy Sheriff (MFTD)",
						"label": "Deputy Sheriff (MFTD)"
					},
					{
						"value": "Detective",
						"label": "Detective"
					},
					{
						"value": "Corporal",
						"label": "Corporal"
					},
					{
						"value": "Sergeant",
						"label": "Sergeant"
					},
					{
						"value": "Lieutenant",
						"label": "Lieutenant"
					},
					{
						"value": "Captain",
						"label": "Captain"
					},
					{
						"value": "Commander",
						"label": "Commander"
					},
					{
						"value": "Division Chief",
						"label": "Division Chief"
					},
					{
						"value": "Assistant Sheriff",
						"label": "Assistant Sheriff"
					},
					{
						"value": "Undersheriff",
						"label": "Undersheriff"
					},
					{
						"value": "Sheriff",
						"label": "Sheriff"
					}
				]
			},
			{
				"name": "newRank",
				"label": "New rank",
				"type": "select",
				"formats": [
					"1",
					"3",
					"6",
					"8"
				],
				"options": [
					{
						"value": "Public Relations Strategist",
						"label": "Public Relations Strategist"
					},
					{
						"value": "Deputy Sheriff Trainee",
						"label": "Deputy Sheriff Trainee"
					},
					{
						"value": "Deputy Sheriff",
						"label": "Deputy Sheriff"
					},
					{
						"value": "Deputy Sheriff (Bonus I)",
						"label": "Deputy Sheriff (Bonus I)"
					},
					{
						"value": "Deputy Sheriff (Bonus II)",
						"label": "Deputy Sheriff (Bonus II)"
					},
					{
						"value": "Deputy Sheriff (MFTD)",
						"label": "Deputy Sheriff (MFTD)"
					},
					{
						"value": "Detective",
						"label": "Detective"
					},
					{
						"value": "Corporal",
						"label": "Corporal"
					},
					{
						"value": "Sergeant",
						"label": "Sergeant"
					},
					{
						"value": "Lieutenant",
						"label": "Lieutenant"
					},
					{
						"value": "Captain",
						"label": "Captain"
					},
					{
						"value": "Commander",
						"label": "Commander"
					},
					{
						"value": "Division Chief",
						"label": "Division Chief"
					},
					{
						"value": "Assistant Sheriff",
						"label": "Assistant Sheriff"
					},
					{
						"value": "Undersheriff",
						"label": "Undersheriff"
					},
					{
						"value": "Sheriff",
						"label": "Sheriff"
					}
				]
			},
			{
				"name": "reassignmentAssignment",
				"label": "New assignment",
				"type": "text",
				"formats": [
					"7"
				]
			},
			{
				"name": "date",
				"label": "Date (e.g. Month DD, YYYY)",
				"type": "date",
				"formats": [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8"
				]
			},
			{
				"name": "authorizingDeputy",
				"label": "Authorizing Deputy (Rank Fname Lname)",
				"type": "text",
				"formats": [
					"4",
					"5"
				]
			},
			{
				"name": "dischargeType",
				"label": "Type of Discharge",
				"type": "select",
				"formats": [
					"4"
				],
				"options": [
					{
						"value": "honourable",
						"label": "Honourable Discharge"
					},
					{
						"value": "dishonourable",
						"label": "Dishonourable Discharge"
					}
				]
			},
			{
				"name": "summary",
				"label": "Summary / Reason",
				"type": "textarea",
				"formats": [
					"4",
					"5",
					"17"
				]
			},
			{
				"name": "suspensionStart",
				"label": "Suspension start (Month DD, YYYY - HH:mm )",
				"type": "text",
				"formats": [
					"5",
					"17"
				]
			},
			{
				"name": "suspensionEnd",
				"label": "Suspension end (Month DD, YYYY - HH:mm )",
				"type": "text",
				"formats": [
					"5",
					"17"
				]
			},
			{
				"name": "suspensionDuration",
				"label": "Suspension duration (e.g. 3)",
				"type": "text",
				"formats": [
					"17"
				]
			},
			{
				"name": "salutation",
				"label": "Salutation (e.g. Mr., Ms.)",
				"type": "text",
				"formats": [
					"11"
				]
			},
			{
				"name": "reasons",
				"label": "Reason(s) (each item, click add)",
				"type": "list",
				"formats": [
					"12",
					"13"
				],
				"itemPlaceholder": "Type a reason, then press Enter"
			},
			{
				"name": "response",
				"label": "Response text",
				"type": "textarea",
				"formats": [
					"18"
				]
			}
		]
	}
} /* /ADMIN_DATA */;
