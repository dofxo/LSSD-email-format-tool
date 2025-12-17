import type { DeputyData, FormatData } from "@/types";

export const SupervisoryLabels: Record<string, string> = {
	"1": "Promotion Notice",
	"2": "Academy Notice",
	"3": "Demotion Notice",
	"4": "Discharge Notice",
	"5": "Suspension Notice (Form)",
	"6": "Reinstatement Notice",
	"7": "Reassignment Notice",
	"8": "Transfer Notice",
	"9": "Master Deputy Information Email",
	"10": "Resignation Email",
	"11": "Dishonourable Discharge (AWOL)",
	"12": "Dishonourable Discharge ((OOC Reason))",
	"13": "Dishonourable Discharge (Input Reason)",
	"14": "Inactivity Notice",
	"15": "((Ratio Notice))",
	"16": "Disciplinary Driving Assessment Notice",
	"17": "Suspension Notice (Email)",
	"18": "LOA/ROH Response",
	"19": "Commendation Response",
};

export const SupervisoryFormats = ({
	formatId,
	formatData,
	deputyData,
}: {
	formatId: string;
	formatData: FormatData;
	deputyData: DeputyData;
}) => {
	const dischargeTypeLine = (type: "honourable" | "dishonourable") => {
		const selected = formatData.dischargeType === type;
		const label = type === "honourable" ? "Honourable Discharge" : "Dishonourable Discharge";
		return `${selected ? "[X]" : "[ ]"} ${label}`;
	};

	const reasonsList =
		formatData.reasons && formatData.reasons.length
			? formatData.reasons.map((reason) => `[*]${reason}`).join("\n")
			: "[*]Reason";

	const formats: Record<string, { text: string; label?: string }> = {
		// 1. Promotion Notice
		"1": {
			text: `[LSSDfooter][/LSSDfooter]
[divbox=white]
[center][img]https://i.ibb.co/FLkvLnZm/niwvfjz.png[/img]

[size=150][font=Bradley Hand ITC]This certifies that[/font][/size]
[size=130]${formatData.recipientName}[/size]

[size=150][font=Bradley Hand ITC]has met all the guidelines and has shown satisfactory performance in their field and responsibilities as a[/font][/size]
[size=125]${formatData.previousRank}[/size]

[size=150][font=Bradley Hand ITC]and is hereby promoted to[/font][/size]
[size=125]${formatData.newRank}[/size]

[size=115]${formatData.date}[/size]

[/center]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 2. Academy Notice
		"2": {
			text: `[LSSDfooter][/LSSDfooter]
[divbox=white]
[center][img]https://i.ibb.co/7tXSC1cX/FDry-LCM.png[/img]

[size=150][font=Bradley Hand ITC]This certifies that[/font][/size]
[size=130]${formatData.recipientName}[/size]

[size=150][font=Bradley Hand ITC]has completed all necessary stages of the Sheriff's Department recruitment program and have shown satisfactory performance in the Academy Training as an[/font][/size]
[size=125]Academy Student[/size]

[size=150][font=Bradley Hand ITC]and is hereby promoted to[/font][/size]
[size=125]Deputy Sheriff Trainee[/size]

[size=115]${formatData.date}[/size]

[/center]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 3. Demotion Notice
		"3": {
			text: `[LSSDfooter][/LSSDfooter]
[divbox=white]
[center][img]https://i.ibb.co/rjsf0NX/c-Rhwwm-J.png[/img]

[size=150][font=Bradley Hand ITC]This certifies that[/font][/size]
[size=130]${formatData.recipientName}[/size]

[size=150][font=Bradley Hand ITC]is hereby being demoted from their position as a [/font][/size]
[size=125]${formatData.previousRank}[/size]

[size=150][font=Bradley Hand ITC]and is hereby appointed as a[/font][/size]
[size=125]${formatData.newRank}[/size]

[size=115]${formatData.date}[/size]

[/center]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 4. Discharge Notice
		"4": {
			text: `[img]https://i.ibb.co/RGWtQ2Fj/2O9Vgd-K.png[/img]
[lssdsubtitle]DISCHARGE DETAILS[/lssdsubtitle]
[divbox=white]
[center][size=115]${formatData.date}[/size][/center]

[list=none]
[b]Type of Discharge:[/b][list=none]
${dischargeTypeLine("honourable")}
${dischargeTypeLine("dishonourable")}
[/list]

[b]Deputy's Rank and Full Name:[/b] ${formatData.recipientName}
[b]Authorizing Deputy:[/b] ${formatData.authorizingDeputy}

[b]Reason:[/b] ${formatData.summary}

[/list]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 5. Suspension Notice (Form)
		"5": {
			text: `[img]https://i.ibb.co/8Ln0CW2d/c3P6q7r.png[/img]
[lssdsubtitle]SUSPENSION DETAILS[/lssdsubtitle]
[divbox=white]
[center][size=115]${formatData.date}[/size][/center]

[list=none]

[b]Deputy's Rank and Full Name:[/b] ${formatData.recipientName}
[b]Authorizing Deputy:[/b] ${formatData.authorizingDeputy}

[b]Suspension Start:[/b] ${formatData.suspensionStart}
[b]Suspension End:[/b] ${formatData.suspensionEnd}

[b]Reason:[/b] ${formatData.summary}

[/list]

[list=none]

[img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 6. Reinstatement Notice
		"6": {
			text: `[img]https://i.ibb.co/QjPNsPvM/Af-E7EAe.png[/img]
[lssdsubtitle]REINSTATEMENT DETAILS[/lssdsubtitle]
[divbox=white]
[list=none]
[center][size=115]${formatData.date}[/size][/center]

[size=105]
[b]Full Name:[/b] ${formatData.recipientName}

[b]Previous Rank & Position:[/b] ${formatData.previousRank}

[b]Reinstated Rank & Position:[/b] ${formatData.newRank}
[/size]

[/list]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 7. Reassignment Notice
		"7": {
			text: `[img]https://i.ibb.co/Zzm9B45z/d977aec3d88e586375fad7bd5988232d.png[/img]
[lssdsubtitle]REASSIGNMENT DETAILS[/lssdsubtitle]
[divbox=white]
[center][size=115]${formatData.date}[/size][/center]

[list=none]

[b]Deputy Name:[/b] ${formatData.recipientName}
[b]Deputy Rank:[/b] ${formatData.previousRank}

[b]New Assignment:[/b] ${formatData.reassignmentAssignment}
[/list]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][lssdfooter][/lssdfooter]`,
		},

		// 8. Transfer Notice
		"8": {
			text: `[img]https://i.ibb.co/7FWpHKL/2ab5874453ee7fd92ff5c773ef9f00c6.png[/img]
[lssdsubtitle]TRANSFER DETAILS[/lssdsubtitle]
[divbox=white]
[list=none]

[center][size=115]${formatData.date}[/size][/center]

[size=105]
[b]Full Name:[/b] ${formatData.recipientName}

[b]Previous Rank & Position:[[/b] ${formatData.previousRank}

[b]New Rank & Position:[/b] ${formatData.newRank}
[/size]
[/list]

[list=none][img]https://i.ibb.co/B2Z35x93/UMxXsrQ.png[/img]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 9. Master Deputy Information Email
		"9": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Master Deputy Information.[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]
[b]Re:[/b] Master Deputy Information.

Master Deputy [b]${formatData.recipientName},[/b]

First and foremost, I would like to congratulate you on your promotion to Master Deputy. You have worked hard to achieve the rank of Master Deputy (MFTD) and you should be nothing but proud of yourself. You should make yourself acquainted with your new rank authority by reading [url=https://gov.eclipse-rp.net/viewtopic.php?t=194190]2.2 - Rank Authority[/url] of the Los Santos County Sheriff's Department Employee Manual.

Being a Master Deputy means that you're at the last field staff position that the Los Santos County Sheriff's Department offers. We understand that some Master Deputies wish to further progress and become supervisors of the Los Santos County Sheriff's Department, and that is great. You can read about what it takes to become a Sergeant-in-Training in [url=https://gov.eclipse-rp.net/viewtopic.php?t=194196]2.5 Promotion Guidelines[/url] of the Los Santos County Sheriff's Department Employee Manual and about the Sergeant Training Program in the [url=https://gov.eclipse-rp.net/viewforum.php?f=998]Position Opportunities[/url] board.

As a Master Deputy, you will be expected to handle [b]Ride-Along requests[/b]. You can find all information (including response formats) in the Los Santos County Sheriff's Department Employee Manual, [url=https://gov.eclipse-rp.net/viewtopic.php?t=205777]3.14 - Ride Along Program[/url], it is recommended that you keep a copy with you [ooc]bookmark it[/ooc].

If you have any questions about being a Master Deputy or your responsibilities, then don't hesitate to reach out - we would love to assist you.

Best of luck with your new position,
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 10. Resignation Email
		"10": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]AUTOMATED EMAIL[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]
Dear ${formatData.recipientName}

This is an email to inform you that your employment with the Los Santos County Sheriff's Department has been terminated following your resignation notice. This discharge is now irreversible and you need to wait at least 30 days before you can file for reinstatement should you choose to. 
We ask that within 72 hours, you return any standard-issued police equipment that was issued to you upon your graduation from the academy. This equipment must be returned properly to the Los Santos County Sheriff's Department, as otherwise, you may be liable to legal actions as theft of police equipment is a serious criminal charge in the State of San Andreas.
We thank you for your service and for your time with the Los Santos County Sheriff's Department.
[/list]

[hr]

[list=none]

[b]From[/b],
[i]Office of the Sheriff[/i]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 11. Dishonourable Discharge (AWOL)
		"11": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Personal Email[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]

Dear ${formatData.salutation || "Mr./Ms."} ${formatData.recipientName},

You are being contacted about your employment with the Los Santos County Sheriff's Department being terminated. As of this date and time, you have been dishonorably discharged from the Los Santos County Sheriff's Department for being AWAY WITHOUT OFFICIAL LEAVE. You have failed to show up to several shifts and despite receiving written letters by the Supervisory Staff team, you have failed to acknowledge the problem and made any efforts to correct your behavior. 
[b](([/b] Due to not meeting the faction's activity rule, you are being removed from the faction. Although this is a dishonorable discharge, you are permitted to file for reinstatement in 30 days should your situation improve. [b]))[/b]
We ask that within 72 hours, you return any standard-issued police equipment that was issued to you upon your graduation from the academy. This equipment must be returned properly to the Los Santos County Sheriff's Department, as otherwise, you may be liable to legal actions as theft of police equipment is a serious criminal charge in the State of San Andreas.
We thank you for your service and for your time with the Los Santos County Sheriff's Department.
[/list]

[hr]

[list=none]

[b]From[/b],
[i]Office of the Sheriff[/i]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 12. Dishonourable Discharge (OOC Reason)
		"12": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]AUTOMATED EMAIL[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]

Dear ${formatData.recipientName},

Due to budget cuts imposed on the Los Santos County Sheriff's Department by the Los Santos Government, we've been forced to look into our expenses and employees.  After thorough deliberations, it has been decided that you can no longer be employed with the Los Santos County Sheriff's Department, and your employment is being terminated effective immediately.
We ask that within 72 hours, you return any standard-issued police equipment that was issued to you upon your graduation from the academy. This equipment must be returned properly to the Los Santos County Sheriff's Department, as otherwise, you may be liable to legal actions as theft of police equipment is a serious criminal charge in the State of San Andreas.
We thank you for your service and for your time with the Los Santos County Sheriff's Department.

[list]
${reasonsList}
[/list]
[/list]
[hr]

[list=none]

[b]From[/b],
[i]Office of the Sheriff[/i]
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 13. Dishonourable Discharge (Input Reason)
		"13": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Personal Email[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]

Dear ${formatData.recipientName},

You are being contacted regarding your employment with the Los Santos County Sheriff's Department being terminated. Effective immediately, you are no longer an employee of the Los Santos County Sheriff's Department. The reasons for your dishonorable discharge is as follows:
[list]
${reasonsList}
[/list]

We ask that within 72 hours, you return any standard-issued police equipment that was issued to you upon your graduation from the academy. This equipment must be returned properly to the Los Santos County Sheriff's Department, as otherwise, you may be liable to legal actions as theft of police equipment is a serious criminal charge in the State of San Andreas.

We thank you for your service and for your time with the Los Santos County Sheriff's Department. 

[/list]

[hr]

[list=none]

[b]From[/b],

[i]Office of the Sheriff[/i]

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 14. Inactivity Notice
		"14": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115][i][color=#FF0000]INACTIVITY NOTICE - ACTION REQUIRED[/color][/i][/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]
[b]Re:[/b] INACTIVITY NOTICE

[b]${formatData.recipientName}[/b],

I am sending you this email to inform you that you've been marked as inactive by the supervisory team as you have not met the required minimum hours for this week. It's imperative that you understand the importance of showing up to work, and the impact it has on our operations should you not show up.
As per [url=https://gov.eclipse-rp.net/viewtopic.php?t=194090]1.10 - Filing for Leave of Absence & Employment Resignation[/url] in the Los Santos County Sheriff's Department, you must either file for Leave of Absence or Resignation should you be unable to show up to work. 
You have 7 days to send a reply back to this email on whether you intend to show up to work again or not. If not, we urge you to post a resignation so that you can be honorably discharged, if you do not, you will be dishonorably discharged. 
[b](([/b] If there are out-of-character reasons for your inactivity, please state that in your reply. [b]))[/b]

[/list]

[hr][/hr][list=none]

From

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 15. ((Ratio Notice))
		"15": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115][i][color=#FF0000]((RATIO NOTICE - ACTION REQUIRED))[/color][/i][/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]

[list=none]

[b](([/b] [b]Re:[/b] RATIO NOTICE

[b]${formatData.recipientName}[/b],

I am sending you this message to inform you that you've been under the minimum required ratio between your Sheriff's Deputy character and alternative characters. As per [url=https://gov.eclipse-rp.net/viewtopic.php?t=194090]1.10[/url] in the LSSD Employee Manual, we require all of our faction members to spend at least 50% of their playtime on their PD character. This is also something that you agreed on upon joining this faction, both in the interview as well as when you signed the Employment Contract.
Please send a reply back or contact me on Discord and let me know if you're having any issues that have prompted your playtime on your SD character to decrease. It's important to us that SD's faction members enjoy what they do on their Sheriff's Deputy characters, or if not, we hope that we can find a solution. 
If you feel that you will not be able to fix your ratio or find the motivation to focus more on your SD character, then you can also file for resignation and take some time off SD. We allow members to attempt to be reinstated into the faction 30 days after their resignation.
Please do not ignore this notice, we hope to be able to help you (if that's the case), but if we cannot solve the problem and you continue violating our activity requirements, we will be forced to take action.

[/list]

[hr][/hr][list=none]

From

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department [b]))[/b]
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 16. Disciplinary Driving Assessment Notice
		"16": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Disciplinary Driving Assessment Notice[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]

[hr]

[list=none]

[b]Re:[/b] Disciplinary Driving Assessment.

${formatData.recipientName},

You are being informed that a Disciplinary Driving Assessment has been issued on your record. This means that you are not permitted to operate any of the Los Santos County Sheriff's Department vehicles and that you must conduct a Driving Assessment with a Sergeant or above. It is your responsibility to try and reach out to a Sergeant and schedule one with them, however, should you have issues finding a Sergeant or getting a response, you can reach out to Command Staff and they will organize it for you. 
Once you have completed your Driving Assessment and passed it, you will receive another email.
[/list]

[hr][/hr][list=none]

From

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 17. Suspension Notice (Email)
		"17": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Suspension Notice[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]

[hr]

[list=none]

[b]Re:[/b] Suspension from active field duty.

${formatData.recipientName},

You are being contacted to inform you that following deliberations, you are being suspended from performing active field duty for ${
				formatData.suspensionDuration + " DAYS" || "X DAYS"
			}. 

[list]
[*][b]Start:[/b] ${formatData.suspensionStart || "MONTH DAY, YYYY 00:00 am/pm"}
[*][b]End:[/b] ${formatData.suspensionEnd || "MONTH DAY, YYYY 00:00 am/pm"}
[/list]

[b]The reason for your suspension:[/b] ${formatData.summary || "Input Summary"}

[/list]

[hr][/hr][list=none]

From

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department
[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 18. LOA/ROH Response
		"18": {
			text: `[LSSDfooter][/LSSDfooter][divbox=white]
[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Leave of Absence Request[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]

[list=none]

[b]Re:[/b] Leave of Absence Request

${formatData.response}

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department

[/list][/divbox][LSSDfooter][/LSSDfooter]`,
		},

		// 19. Commendation Response
		"19": {
			text: `[lssdfooter][/lssdfooter][divbox=white]
[img]https://i.ibb.co/KxK8WcLX/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Re: Commendation Request[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]

[list=none]

[i][b]Dear ${formatData.civilianName}[/b][/i],

On behalf of the Los Santos County Sheriff's Department, we would like to thank you for taking the time to submit your employee commendation. This has now been received and handled by a member of our Supervisory team, who will be sure to reach out to the employee and inform them of their commendation, and a copy has been attached to their personnel file for future record.
As a department, we strive to ensure that we're always meeting the high standards that we set for ourselves, and part of that is ensuring we handle feedback when appropriate.
Thank you very much for your input!

[hr][/hr]

From

[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
Los Santos County Sheriff's Department

On behalf of,

[fpimg=20]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/fpimg]
Sheriff Ian Walter
Los Santos County Sheriff's Department[/list][/divbox]
[lssdfooter][/lssdfooter]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = SupervisoryLabels[key];
	});

	if (!formats[formatId]) {
		return {
			format: "[Invalid format for Supervisory division]",
			formats,
		};
	}

	return { format: formats[formatId].text, formats };
};
