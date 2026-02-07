import type { DeputyData, divisionsType, FormatData } from "@/types";

export const ATDLabels: Record<string, string> = {
	"1": "Spike Strip - Application Accepted - Reply to application",
	"2": "Spike Strip - Application Accepted - Email Deputy",
	"3": "Spike Strip - Application Denied - Reply to application",
	"4": "Spike Strip - Application Denied - Email Deputy",
	"5": "Spike Strip - Certification Accepted - Reply to application",
	"6": "Spike Strip - Certification Accepted - Email Deputy",
	"7": "Spike Strip - Certification Denied - Reply to application",
	"8": "Spike Strip - Certification Denied - Email Deputy",
	"9": "HIOU Certification - Application Accepted - Reply to application",
	"10": "HIOU Certification - Application Accepted - Email Deputy",
	"11": "HIOU Certification - Application Denied - Reply to application",
	"12": "HIOU Certification - Application Denied - Email Deputy",
	"13": "HIOU Certification - Certification Accepted - Reply to application",
	"14": "HIOU Certification - Certification Accepted - Email Deputy",
	"15": "HIOU Certification - Certification Denied - Reply to application",
	"16": "HIOU Certification - Certification Denied - Email Deputy",
	"17": "HSIU Certification - Application Accepted - Reply to application",
	"18": "HSIU Certification - Application Accepted - Email Deputy",
	"19": "HSIU Certification - Application Denied - Reply to application",
	"20": "HSIU Certification - Application Denied - Email Deputy",
	"21": "HSIU Certification - Certification Accepted - Reply to application",
	"22": "HSIU Certification - Certification Accepted - Email Deputy",
	"23": "HSIU Certification - Certification Denied - Reply to application",
	"24": "HSIU Certification - Certification Denied - Email Deputy",
	"25": "HIU Certification - Application Accepted - Reply to application",
	"26": "HIU Certification - Application Accepted - Email Deputy",
	"27": "HIU Certification - Application Denied - Reply to application",
	"28": "HIU Certification - Application Denied - Email Deputy",
	"29": "HIU Certification - Certification Accepted - Reply to application",
	"30": "HIU Certification - Certification Accepted - Email Deputy",
	"31": "HIU Certification - Certification Denied - Reply to application",
	"32": "HIU Certification - Certification Denied - Email Deputy",
	"33": "HSMU Certification - Application Accepted - Reply to application",
	"34": "HSMU Certification - Application Accepted - Email Deputy",
	"35": "HSMU Certification - Application Denied - Reply to application",
	"36": "HSMU Certification - Application Denied - Email Deputy",
	"37": "HSMU Certification - Certification Accepted - Reply to application",
	"38": "HSMU Certification - Certification Accepted - Email Deputy",
	"39": "HSMU Certification - Certification Denied - Reply to application",
	"40": "HSMU Certification - Certification Denied - Email Deputy",
	"41": "Firearm Certification - Application Accepted - Reply to application and Deputy",
	"42": "Firearm Certification - Application Denied(score) - Reply to application and Deputy",
	"43": "Firearm Certification - Application Denied(Other) - Reply to application and Deputy",
	"44": "Firearm Certification - Certificaion Passed - Reply to application and Deputy",
	"45": "Firearm Certification - Certificaion Denied - Reply to application and Deputy",
	"46": "Personnel File - New certification - Reply to post",
	"47": "Personnel File - New certification - Edit main post",
};

export const ATDFormats = ({
	formatData,
	deputyData,
	division,
	formatId,
}: {
	formatData: FormatData;
	deputyData: DeputyData;
	division: divisionsType;
	formatId: string;
}) => {
	const formats: Record<string, { text: string; label?: string }> = {
		"1": {
			text: `[img]https://i.ibb.co/pvJC5kgn/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the written application. The employee will need to find an Advanced Training Division Instructor to conduct their Spike Strip training. After they’ve completed this training, they will be certified to deploy this equipment into the field.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"2": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Spike Strip Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your application for the [i]Spike Strip Certification[/i] has been reviewed and accepted. Please find an Advanced Training Division Instructor to conduct your practical training/evaluation. After you have successfully completed this examination you will be Spike Strip certified.
[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},

		"3": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

The employee has failed their Spike Strip certification application and has been informed to reapply when they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},

		"4": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Spike Strip Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that your application for the [i]Spike Strip Certification[/i] has been reviewed and denied. You are able to reapply whenever you feel that you are ready.
[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"5": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the examination. The employee is now Spike Strip certified. The employee is able to utilize Spike Strip's (Stingers) during situations or pursuits requiring it. The employee is expected to follow Spike Strip procedure.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"6": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Spike Strip Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have successfully passed the [i]Spike Strip Certification[/i]. The employee can utilize Spike Strip's (Stingers) during situations or pursuits requiring it. Ensure to follow the Spike Strip procedures at all times.

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department



[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"7": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has [color=#800000][b]failed[/b][/color] the examination. The employee is allowed to re-apply when they feel that they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"8": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Spike Strip Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that you failed the [i]Spike Strip Certification[/i]. You are able to re-apply as soon as you see that you are ready.

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"9": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the written application. The employee will need to find an Advanced Training Division Instructor to conduct their HIOU training. After they’ve completed this training, they will be certified to deploy Heavy Interceptor Off-Road Unit equipment into the field.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"10": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIOU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your application for the [i]HIOU Certification[/i] has been reviewed and accepted. Please find an Advanced Training Division Instructor to conduct your practical training/evaluation. After you have successfully completed this examination you will be HIOU certified.
[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"11": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

The employee has failed their HIOU certification application and has been informed to reapply when they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"12": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIOU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that your application for the [i]HIOU Certification[/i] has been reviewed and denied. You are able to reapply whenever you feel that you are ready.
[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"13": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the examination. The employee is now HIOU certified. The employee is able to utilize Heavy Interceptor Off-Road Unit vehicles during authorized situations or pursuits requiring it. The employee is expected to follow HIOU procedure.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"14": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIOU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have successfully passed the [i]HIOU Certification[/i]. You are now authorized to operate Heavy Interceptor Off-Road Unit vehicles during assigned duties. Ensure to follow all HIOU procedures at all times.

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department



[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"15": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has [color=#800000][b]failed[/b][/color] the Heavy Interceptor Off-Road Unit examination. The employee is allowed to re-apply when they feel that they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"16": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIOU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that you failed the [i]HIOU Certification[/i]. You are able to re-apply as soon as you see that you are ready.

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"17": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the written application. The employee will need to find an Advanced Training Division Instructor to conduct their HSIU training. After they’ve completed this training, they will be certified to deploy Heavy Special Interceptor Unit equipment into the field.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"18": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSIU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your application for the [i]HSIU Certification[/i] has been reviewed and accepted. Please find an Advanced Training Division Instructor to conduct your practical training/evaluation. After you have successfully completed this examination you will be HSIU certified.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"19": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

The employee has failed their HSIU certification application and has been informed to reapply when they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"20": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSIU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that your application for the [i]HSIU Certification[/i] has been reviewed and denied. You are able to reapply whenever you feel that you are ready.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"21": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the examination. The employee is now HSIU certified. The employee is able to utilize high-speed interception unit vehicles during authorized situations or pursuits requiring it. The employee is expected to follow HSIU procedure.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"22": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSIU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have successfully passed the [i]HSIU Certification[/i]. You are now authorized to operate Heavy Special Interceptor Unit vehicles during assigned duties. Ensure to follow all HSIU procedures at all times.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"23": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has [color=#800000][b]failed[/b][/color] the high-speed interception unit Unit examination. The employee is allowed to re-apply when they feel that they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"24": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSIU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that you failed the [i]HSIU Certification[/i]. You are able to re-apply as soon as you see that you are ready.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"25": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the written application. The employee will need to find an Advanced Training Division Instructor to conduct their HIU training. After they’ve completed this training, they will be certified to deploy Heavy Interceptor Unit equipment into the field.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"26": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your application for the [i]HIU Certification[/i] has been reviewed and accepted. Please find an Advanced Training Division Instructor to conduct your practical training/evaluation. After you have successfully completed this examination you will be HIU certified.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"27": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

The employee has failed their HIU certification application and has been informed to reapply when they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"28": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that your application for the [i]HIU Certification[/i] has been reviewed and denied. You are able to reapply whenever you feel that you are ready.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"29": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the examination. The employee is now HIU certified. The employee is able to utilize Heavy Interceptor Unit vehicles during authorized situations or pursuits requiring it. The employee is expected to follow HIU procedure.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"30": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have successfully passed the [i]HIU Certification[/i]. You are now authorized to operate Heavy Interceptor Unit vehicles during assigned duties. Ensure to follow all HIU procedures at all times.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"31": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has [color=#800000][b]failed[/b][/color] the Heavy Interceptor Unit examination. The employee is allowed to re-apply when they feel that they are ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"32": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HIU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that you failed the [i]HIU Certification[/i]. You are able to re-apply as soon as you see that you are ready.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"33": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the written application. The employee will need to find an Advanced Training Division Instructor to conduct their HSMU training. After they’ve completed this training, they will be certified to deploy Heavy Special Mobility Unit equipment into the field.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"34": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSMU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your application for the [i]HSMU Certification[/i] has been reviewed and accepted. Please find an Advanced Training Division Instructor to conduct your practical training/evaluation. After successfully completing this examination you will be HSMU certified.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"35": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

The employee has failed their HSMU certification application and has been informed to reapply when ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"36": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSMU Certification [/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that your application for the [i]HSMU Certification[/i] has been reviewed and denied. You can reapply whenever you feel ready.
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"37": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has passed the examination and is now HSMU certified. The employee may operate high-speed motorcycle unit vehicles during authorized situations or pursuits requiring them and must adhere to HSMU procedure.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"38": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSMU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have successfully passed the [i]HSMU Certification[/i]. You are now authorized to operate high-speed motorcycle unit vehicles during assigned duties. Always follow HSMU procedures at all times.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"39": {
			text: `[img]https://i.imgur.com/h8PAEv3.png[/img][divbox=white]
Dear [i]Instructor[/i],

This employee has [color=#800000][b]failed[/b][/color] the high-speed motorcycle unit examination. The employee is allowed to reapply when they feel ready.

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department[/divbox]`,
		},
		"40": {
			text: `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: HSMU Certification[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

Dear [I] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We regret to inform you that you failed the [i]HSMU Certification[/i]. You may reapply as soon as you are ready.

[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Sheriff's Training Bureau
Los Santos County Sheriff’s Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
		},
		"41": {
			text: `[img]https://i.imgur.com/5xQDKhy.png[/img]

[divbox=white]
Dear [i] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that your certification application for the [i]${formatData.certificationType} [/i] has been reviewed and accepted. You must now find an ATD instructor in order to conduct your practical certification. Please do not use this weapon until you have passed the practical certification.


Thank you,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Office of Administrative Services
[/divbox]
[img]https://i.imgur.com/q0fHG1F.png[/img]`,
		},
		"42": {
			text: `[img]https://i.imgur.com/5xQDKhy.png[/img]

[divbox=white]
Dear [i] ${formatData.deputyRank} ${formatData.deputyName}[/i],

You are being contacted in regards to your firearms certification application. Unfortunately, you did not score sufficient points on your exam to be certified. You scored [${formatData.scoredPoint}/${formatData.leastPoint} points] and you need at least ${formatData.leastPoint} points to pass. 

Please read over the relevant firearm certification guide to iron out any potential mistakes for the next time when you apply. You can send in a new certification application when you feel that you are ready.

Thank you,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Office of Administrative Services
[/divbox]
[img]https://i.imgur.com/q0fHG1F.png[/img]`,
		},
		"43": {
			text: `[img]https://i.imgur.com/5xQDKhy.png[/img]

[divbox=white]
Dear [i] ${formatData.deputyRank} ${formatData.deputyName}[/i],

You are being contacted in regards to your firearms certification application. Unfortunately, we've decided to deny your certification application for the following reasons:
[list]
${formatData?.reasons?.map((reason) => `[*]${reason}`).join("")}
[/list]

Thank you,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Office of Administrative Services
[/divbox]
[img]https://i.imgur.com/q0fHG1F.png[/img]`,
		},
		"44": {
			text: `[img]https://i.imgur.com/5xQDKhy.png[/img]

[divbox=white]
Dear [i] ${formatData.deputyRank} ${formatData.deputyName}[/i],

We're pleased to inform you that you have passed the certification for the [i]${formatData.certificationType}[/i] and will now have the authority to utilize the WEAPON for situations requiring it.


Thank you,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Office of Administrative Services
[/divbox]
[img]https://i.imgur.com/q0fHG1F.png[/img]`,
		},
		"45": {
			text: `[img]https://i.imgur.com/5xQDKhy.png[/img]

[divbox=white]
Dear [i] ${formatData.deputyRank} ${formatData.deputyName}[/i],

You are being contacted in regards to your practical firearms certification. Unfortunately, we've decided to deny your certification for the following reasons:
[list]
${formatData?.reasons?.map((reason) => `[*]${reason}`).join("")}
[/list]

Feel free to re-apply for this certification once you are ready.


Thank you,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.divisionRanks[division]}
Advanced Training Division
Office of Administrative Services
[/divbox]
[img]https://i.imgur.com/q0fHG1F.png[/img]`,
		},

		"46": {
			text: `[LSSDfooter][/LSSDfooter]
[divbox=white]
[center][img]https://i.imgur.com/PVVkVRC.png[/img]

[size=150][font=Bradley Hand ITC]This certifies that[/font][/size]
[size=130]${formatData.deputyName}[/size]

[size=150][font=Bradley Hand ITC]has met all the requirements and completed the practical assessment to receive their certification in:[/font][/size]

[size=125]${formatData.certificationType}[/size]

[size=115]${formatData.date}[/size]


[/center]
[center] [img]https://i.imgur.com/BoT6bvh.png[/img][/center]
[/divbox]
[LSSDfooter][/LSSDfooter]`,
		},

		"47": {
			text: `[b]#########################[/b]

[b][color=#800000]${formatData.date}[/color][/b]
[b]${formatData.certificationType}[/b]
Certification ${formatData.certificationStatus === "suspended" ? "suspended" : "acquired"}.
[i]Issued by ${formatData.issuedBy}[/i]`,
		},
	};

	Object.keys(formats).forEach((key) => {
		if (!formats[key].label) formats[key].label = ATDLabels[key];
	});

	return { format: formats[formatId].text, formats };
};
