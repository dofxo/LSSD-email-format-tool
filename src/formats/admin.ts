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
			"body": "[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] {{name}}\n[b]RANK:[/b] {{dRank}}\n[b]BADGE NUMBER:[/b] {{badgeNumber}}\n[b]SEB SINCE:[/b] {{sebJoinDate}}\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Dive Team?[/i][/b] [i](Minimum 120 words)[/i]\n{{dgq1}}\n[b][i]What do you believe are the primary responsibilities of a Dive Team operator?[/i][/b]\n{{dgq2}}\n[b][i]What hazards may a diver encounter during underwater operations?[/i][/b]\n{{dgq3}}\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]  \nA 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team.\n[b][i]What is your approach to resolving this situation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts1}}\n\n[b][size=150]Scenario 2[/size][/b]  \nDuring a boat pursuit, suspects are observed throwing multiple bags and a firearm into the sea before escaping.\n[b][i]How would you handle the recovery operation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts2}}\n\n[b][size=150]Scenario 3[/size][/b]  \nDuring a dive operation, your assigned partner signals low air and begins showing signs of panic.\n[b][i]What actions do you take?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts3}}\n\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebJoinDate",
					"label": "SEB Join date"
				},
				{
					"name": "dgq1"
				},
				{
					"name": "dgq2"
				},
				{
					"name": "dgq3"
				},
				{
					"name": "dts1"
				},
				{
					"name": "dts2"
				},
				{
					"name": "badgeNumber",
					"label": "Your badge number"
				}
			]
		},
		{
			"id": "38",
			"division": "SEB",
			"title": "Advanced Aerial Unit Certification",
			"topicTitle": "[AAU Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/NUbXkVL.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b]Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?[/b]\n[i]{{agq1}}[/i]\n[b]What are the responsibilities of an Advanced Aerial Unit Pilot?[/b]\n[i]{{agq2}}[/i]\n[b]Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State a few examples or experiences you have faced. [/b]\n[i]{{agq3}}[/i]\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[center][size=200]Scenario 1[/size][/center]\n[b]SAAA comes in over the department radio, wherein they state that their towers see an aircraft that won't respond to them. How do you approach the aircraft and resolve the situation? [/b]\n[i]{{ats1}}[/i]\n[center][size=200]Scenario 2[/size][/center]\n[b]You are piloting the 2-D-8 Annihilator Gunship, and you are called to a large-scale gang situation in order to perform an aerial assault with a full team of operators on board, however, your aircraft comes under large-scale direct gunfire from the hostiles mentioned previous. What do you do?[/b]\n[i]{{ats2}}[/i]\n[center][size=200]Scenario 3[/size][/center]\n[b]During a bank robbery, the suspects take a hostage and in turn negotiate for a helicopter to escape with. Knowing that the individuals on board the helicopter are armed, prone to firing upon law enforcement, and volatile, how do you approach the situation?[/b]\n[i]{{ats3}}[/i]\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "agq1",
					"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
				},
				{
					"name": "agq2",
					"label": "What are the responsibilities of an Advanced Aerial Unit Pilot?"
				},
				{
					"name": "agq3",
					"label": "Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State a few examples or experiences you have faced."
				}
			]
		},
		{
			"id": "39",
			"division": "SEB",
			"title": "EOD Technician Certification",
			"topicTitle": "[EOD Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/1qJrDRr.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b]Why are you applying for EOD, and how would you be an asset by getting the certification?[/b]\n[i]{{egq1}}[/i]\n[b]What are the responsibilities of an EOD operator?[/b]\n[i]{{egq2}}[/i]\n[b]Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State few examples or experiences you have faced. [/b]\n[i]{{egq3}}[/i]\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[center][size=200]Scenario 1[/size][/center]\n[b]You have been called to paleto station, where a deputy found on top of the front desk what looked to him as an explosive device of some sort. How would you go by to assess and identify the device? And how would you handle it? Give a detailed explanation, Image attached below of what the device looks like. [/b]\n[img]https://i.ibb.co/FbjTZ24J/rx-N9x5n.jpg[/img]\n[i]{{ets1}}[/i]\n[center][size=200]Scenario 2[/size][/center]\n[b]You arrive at a hostage situation, where the hostage taker is reported to have an explosive device in his possession, the negociator managed to have the hostage taker agree to give the bomb away. How would you use the equipment available to you to handle the retrieval of the explosive device. Give a detailed explanation of which equipment you use and why.[/b]\n[i]{{ets2}}[/i]\n[center][size=200]Scenario 3[/size][/center]\n[b]During a drug bust, your team stumbles upon a safe door, locked and they are unable to open it. How would you use the equipment available to you to get through the safe door safely.[/b]\n[i]{{ets3}}[/i]\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "egq1"
				},
				{
					"name": "egq2"
				},
				{
					"name": "egq3"
				},
				{
					"name": "ets1"
				},
				{
					"name": "ets2"
				},
				{
					"name": "ets3"
				}
			]
		},
		{
			"id": "40",
			"division": "SEB",
			"title": "Crisis Negotiator Certification",
			"topicTitle": "[CN Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] {{name}}\n[b]RANK:[/b] {{dRank}}\n[b]BADGE NUMBER:[/b] {{badgeNumber}}\n[b]SEB SINCE:[/b] {{sebSince}}\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Crisis Negotiator Certification?[/i][/b] [i](Minimum 120 words)[/i]\n{{cgq1}}\n[b][i]Have you ever been in a situation where you had to negotiate a situation?[/i][/b]\n{{cgq2}}\n[b][i]How would you define negotiation?[/i][/b]\n{{cgq3}}\n[b][i]What negotiation skills do you believe are crucial for successful outcomes?[/i][/b]\n{{cgq4}}\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]\n[b]Situation: A group of armed individuals has barricaded themselves in a residential building, holding multiple hostages. Describe the strategic considerations you would make as the assigned negotiator and how you would direct your team to approach this delicate and very dangerous situation.[/b]\n{{cts1}}\n[b][size=150]Scenario 2[/size][/b]\n[b]Situation: A hostage-taker exhibits signs of extreme agitation and is becoming increasingly unpredictable. Outline your communication strategy and how you would manage the evolving threat while ensuring the safety of both hostages and your team. Please be detailed in your response.[/b]\n{{cts2}}\n[b][size=150]Scenario 3[/size][/b]\n[b]Situation: You are negotiating a hostage situation and the hostage taker is becoming very agitated and is failing to adhere to the previously discussed demands. You have been very open to working with the Hostage Taker to the best of your ability but are beginning to believe that there will not be an easy way to get the hostage to safety. You have a Sniper Certified Operator Available, explain your next course of action and how you would handle the situation from there.[/b]\n{{cts3}}\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "cgq1"
				},
				{
					"name": "cgq2"
				},
				{
					"name": "cgq3"
				},
				{
					"name": "cgq4"
				},
				{
					"name": "cts1"
				},
				{
					"name": "cts2"
				},
				{
					"name": "cts3"
				}
			]
		},
		{
			"id": "41",
			"division": "SEB",
			"title": "Long Range Rifle Certification",
			"topicTitle": "[LRR Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/7SSPqSy.png[/img]\n\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n \n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n \n[divbox=white]\n[b]How would you be an asset to the Special Enforcement Bureau if you became Long Range Rifle Qualified[/b]\n[i]{{lgq1}}[/i]\n \n[b]Do you feel comfortable making split-second decisions? If so, provide us a detailed description of a scenario where you had to make a split-second decision previously.[/b]\n[i]{{lgq2}}[/i]\n \n[b]What motivates you to become certified to use Long Range Rifles? (in depth, at least 1 paragraph)[/b]\n[i]{{lgq3}}[/i]\n[/divbox]\n \n[lssdsubtitle] Section 3 - Theoretical Scenario Questions [/lssdsubtitle]\n \n[divbox=white]\n[hr][/hr]\n[size=125][b]SCENARIO 1[/b][/size]\n[b] In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. ([color=#FF0000]see illustrative picture below[/color]). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage.[/b]\n\n[spoiler=Image][center][img]https://i.ibb.co/V0JPbw9L/Hly7k-NC.png[/img][/center][/spoiler]\n \n[i]{{lts1}}[/i]\n[hr][/hr]\n \n[size=125][b]SCENARIO 2[/b][/size]\n[b]On your way to an operation, you find a deputy along the road that just got shot at and you see a car leaving the area. You have two vehicles present. One vehicle will go after the suspect and the other one will treat the deputy. A long pursuit follows and when the suspect is finally brought to a stop, he gets out and aims his weapon and you and your team. However, you only have your service pistol and sniper rifle on you. Would you be allowed to use the sniper rifle? If so, how would you use it? If not, why wouldn't you be allowed to use it?[/b]\n \n[i]{{lts2}}[/i]\n[hr][/hr]\n \n[size=125][b]SCENARIO 3[/b][/size]\n[b] In the following scenario, you are responding to a large shoot-out with multiple injured 10-15's, 10-16's and PD officers. The location is the Legion Square parking lot. To respond quickly, you use the Blackstar to get there as quickly as possible. Shots are still being fired and heavy weapons are involved. Where and how would you deploy? Would you go street level, would you ask to be placed on a rooftop, how would you assess who is a threat and who is not?[/b]\n\n \n[i]{{lts3}}[/i]\n\n\n[/divbox]\n[img]https://i.imgur.com/q0fHG1F.png[/img]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "lgq1"
				},
				{
					"name": "lgq2"
				},
				{
					"name": "lgq3"
				},
				{
					"name": "lts1",
					"label": "In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. (see illustrative picture below). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage.\n{img=https://i.ibb.co/V0JPbw9L/Hly7k-NC.png}"
				},
				{
					"name": "lts2"
				},
				{
					"name": "lts3"
				}
			]
		},
		{
			"id": "2",
			"division": "General",
			"title": "Accepted",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST ACCEPTED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nWe are glad to inform you that your ride-along request for the Los Santos County Sheriff's Department has been [b][i]accepted[/i][/b]. We request that you print this ride-along request out and keep it with you at all times throughout any ride-along that you may take. We would also like to thank you for showing interest in our ride-along program, we hope that you'll meet your desires and that you'll receive first-hand experience on what it's like being a Deputy Sheriff for the Los Santos County Sheriff's Department. \n \nThis ride-along request is valid for [b]7 days[/b], if you are still interested in partaking in the program after 7 days, you must send in a new request. \n \n[b]What should you do now?[/b]\n[list][*]Make sure that you come properly dressed for a Ride-Along, and with respect for our deputies, your personal hygiene should be prioritized. Refrain from using too much or very strong perfume as it may disorientate not only deputies but any civilians that you may come across during the ride-along. \n \n[*]If you are a licensed firearm holder, make sure that your firearm is kept safe, and locked away, in either your vehicle or at home. You may not bring your firearm with you during the ride-along.\n \n[*]Make sure that you carry not only a printed copy of this response but also some form of identification card. \n \n[*]If you are ready for a ride-along, proceed to visit Paleto or Sandy Station, you can consult with the deputy at the front desk or deputies leaving the station on whether they're available to take you on a ride-along. [/list]\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": [
				{
					"name": "FnameLname"
				}
			]
		},
		{
			"id": "3",
			"division": "General",
			"title": "Denied",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST DENIED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nYou are being contacted regarding your ride-along request that you sent to the Los Santos County Sheriff's Department. Your request has been [b][i]denied[/i][/b] due to the following reasons: \n[list]\n[*]\n[*]\n[*]\n[/list]\n \nYou are free to send in a new request if you are still interested in partaking in the program.\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "4",
			"division": "General",
			"title": "Denied (Banned) -  Criminal Record",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST DENIED - BANNED[/lssdsubtitle] \n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nYou are being contacted regarding your ride-along request that you sent to the Los Santos County Sheriff's Department. Your request has been [b][i]denied[/i][/b] and you are [b][i]banned[/i][/b] from re-applying to the program. The reason for this status is either due to your criminal record and/or for the reason(s) mentioned below. \n \n(( This ban is In Character only unless otherwise specified. You are free to reapply under a different character. ))\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "5",
			"division": "General",
			"title": "Request Expired",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST EXPIRED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nWe're sending you this notice to inform you that your ride-along request with the Los Santos County Sheriff's Department has expired and is no longer valid. If you wish to resume taking ride-alongs with deputies of the Sheriff's Department, you must resubmit another ride-along request on our website. \n\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "6",
			"division": "General",
			"title": "Ride-Along Session Report",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]RIDE-ALONG SESSION REPORT[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Deputy Name:[/b] {{name}}\n[b]Deputy Rank[/b] {{dRank}}\n[b]Date and Time (( (Please use UTC: https://time.is/UTC )):[/b] {{rideAlongDate}} {{startTime}} > {{EndTime}}\n\n[b]Brief Summary of Session:[/b]\n[list]\n{{sessionSummary}}\n[/list]\n\n[b]Did any problems or issues occur?:[/b]\n[list]\n{{anyProblem}}\n[/list]\n\n[b]Notes for further ride-along sessions:[/b]\n[list]\n{{notesForFurther}}\n[/list]\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": [
				{
					"name": "rideAlongDate"
				},
				{
					"name": "startTime",
					"label": "Start Time "
				},
				{
					"name": "EndTime",
					"label": "End Time"
				},
				{
					"name": "sessionSummary"
				},
				{
					"name": "anyProblem"
				},
				{
					"name": "notesForFurther"
				}
			]
		}
	],
	"inputs": [
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
		},
		{
			"name": "whyApplytoAAU",
			"type": "textarea",
			"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
		},
		{
			"name": "responsibilites",
			"type": "textarea",
			"label": "What are the responsibilities of an Advanced Aerial Unit Pilot?"
		},
		{
			"name": "s1q1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "gq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "gq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "gq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "ts1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "ts2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "ts3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "gs1",
			"type": "textarea",
			"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
		},
		{
			"name": "dgq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "dgq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "dgq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "dts1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "dts2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "dts3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "agq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "agq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "agq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "ats1",
			"type": "textarea",
			"label": "SAAA comes in over the department radio, wherein they state that their towers see an aircraft that won't respond to them. How do you approach the aircraft and resolve the situation?"
		},
		{
			"name": "ats2",
			"type": "textarea",
			"label": "You are piloting the 2-D-8 Annihilator Gunship, and you are called to a large-scale gang situation in order to perform an aerial assault with a full team of operators on board, however, your aircraft comes under large-scale direct gunfire from the hostiles mentioned previous. What do you do?"
		},
		{
			"name": "ats3",
			"type": "textarea",
			"label": "During a bank robbery, the suspects take a hostage and in turn negotiate for a helicopter to escape with. Knowing that the individuals on board the helicopter are armed, prone to firing upon law enforcement, and volatile, how do you approach the situation?"
		},
		{
			"name": "egq1",
			"type": "textarea",
			"label": "Why are you applying for EOD, and how would you be an asset by getting the certification?"
		},
		{
			"name": "egq2",
			"type": "textarea",
			"label": "What are the responsibilities of an EOD operator?"
		},
		{
			"name": "egq3",
			"type": "textarea",
			"label": "Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State few examples or experiences you have faced."
		},
		{
			"name": "ets1",
			"type": "textarea",
			"label": "You have been called to paleto station, where a deputy found on top of the front desk what looked to him as an explosive device of some sort. How would you go by to assess and identify the device? And how would you handle it? Give a detailed explanation, Image attached below of what the device looks like. \n[img]https://i.ibb.co/FbjTZ24J/rx-N9x5n.jpg[/img]"
		},
		{
			"name": "ets2",
			"type": "textarea",
			"label": "You arrive at a hostage situation, where the hostage taker is reported to have an explosive device in his possession, the negociator managed to have the hostage taker agree to give the bomb away. How would you use the equipment available to you to handle the retrieval of the explosive device. Give a detailed explanation of which equipment you use and why."
		},
		{
			"name": "ets3",
			"type": "textarea",
			"label": "During a drug bust, your team stumbles upon a safe door, locked and they are unable to open it. How would you use the equipment available to you to get through the safe door safely."
		},
		{
			"name": "cgq1",
			"type": "textarea",
			"label": "Why are you applying for the Crisis Negotiator Certification? (Minimum 120 words)"
		},
		{
			"name": "cgq2",
			"type": "textarea",
			"label": "Have you ever been in a situation where you had to negotiate a situation?"
		},
		{
			"name": "cgq3",
			"type": "textarea",
			"label": "How would you define negotiation?"
		},
		{
			"name": "cgq4",
			"type": "textarea",
			"label": "What negotiation skills do you believe are crucial for successful outcomes?"
		},
		{
			"name": "cts1",
			"type": "textarea",
			"label": "A group of armed individuals has barricaded themselves in a residential building, holding multiple hostages. Describe the strategic considerations you would make as the assigned negotiator and how you would direct your team to approach this delicate and very dangerous situation."
		},
		{
			"name": "cts2",
			"type": "textarea",
			"label": "A hostage-taker exhibits signs of extreme agitation and is becoming increasingly unpredictable. Outline your communication strategy and how you would manage the evolving threat while ensuring the safety of both hostages and your team. Please be detailed in your response."
		},
		{
			"name": "cts3",
			"type": "textarea",
			"label": "Situation: You are negotiating a hostage situation and the hostage taker is becoming very agitated and is failing to adhere to the previously discussed demands. You have been very open to working with the Hostage Taker to the best of your ability but are beginning to believe that there will not be an easy way to get the hostage to safety. You have a Sniper Certified Operator Available, explain your next course of action and how you would handle the situation from there."
		},
		{
			"name": "lgq1",
			"type": "textarea",
			"label": "How would you be an asset to the Special Enforcement Bureau if you became Long Range Rifle Qualified"
		},
		{
			"name": "lgq2",
			"type": "textarea",
			"label": "Do you feel comfortable making split-second decisions? If so, provide us a detailed description of a scenario where you had to make a split-second decision previously."
		},
		{
			"name": "lgq3",
			"type": "textarea",
			"label": "What motivates you to become certified to use Long Range Rifles? (in depth, at least 1 paragraph)"
		},
		{
			"name": "lts1",
			"type": "textarea",
			"label": "In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. (see illustrative picture below). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage."
		},
		{
			"name": "lts2",
			"type": "textarea",
			"label": "On your way to an operation, you find a deputy along the road that just got shot at and you see a car leaving the area. You have two vehicles present. One vehicle will go after the suspect and the other one will treat the deputy. A long pursuit follows and when the suspect is finally brought to a stop, he gets out and aims his weapon and you and your team. However, you only have your service pistol and sniper rifle on you. Would you be allowed to use the sniper rifle? If so, how would you use it? If not, why wouldn't you be allowed to use it?"
		},
		{
			"name": "lts3",
			"type": "textarea",
			"label": "In the following scenario, you are responding to a large shoot-out with multiple injured 10-15's, 10-16's and PD officers. The location is the Legion Square parking lot. To respond quickly, you use the Blackstar to get there as quickly as possible. Shots are still being fired and heavy weapons are involved. Where and how would you deploy? Would you go street level, would you ask to be placed on a rooftop, how would you assess who is a threat and who is not?"
		},
		{
			"name": "FnameLname",
			"type": "text",
			"label": "First Lastname"
		},
		{
			"name": "rideAlongDate",
			"type": "date",
			"label": "Date",
			"dateStyle": "short"
		},
		{
			"name": "startTie",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "startTime",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "EndTime",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "sessionSummary",
			"type": "textarea",
			"label": "Brief Summary of Session"
		},
		{
			"name": "anyProblem",
			"type": "textarea",
			"label": "Did any problems or issues occur?"
		},
		{
			"name": "notesForFurther",
			"type": "textarea",
			"label": "Notes for further ride-along sessions"
		}
	]
} /* /ADMIN_DATA */;
