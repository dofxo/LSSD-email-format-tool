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
			"category": "Certification Application",
			"fields": []
		}
	],
	"inputs": []
} /* /ADMIN_DATA */;
