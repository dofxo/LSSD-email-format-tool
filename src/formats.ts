import type {DeputyDetailsState, FormatData} from "./types.ts";

export const getFormat = ({formatData, deputyData, formatId}: {
    formatData: FormatData, deputyData: DeputyDetailsState, formatId: string
}): string => {

    console.log(formatData)
    const formats = {
        "1": `
    [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PENDING REVIEW[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has received and acknowledged your application for employment. Our application handlers will thoroughly review your application in the coming days. Please remain patient at this time, as reviewing your application could take up to several days due to particular circumstances.

There is no expected timeframe and no guarantee that you will be given the opportunity at employment. Please check your application daily.

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] Application - [i]PENDING REVIEW[/i]

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
    `
    }

    return formats[formatId as keyof typeof formats];
}