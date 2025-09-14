import type {DeputyDetailsState, FormatData} from "./types.ts";

export const getFormat = ({formatData, deputyData, formatId}: {
    formatData: FormatData, deputyData: DeputyDetailsState, formatId: string
}): string => {

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
    `,
        "2": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — SHORTLISTED[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has received and acknowledged your application for employment. Because we have reached the maximum amount of applicants for this Recruitment Drive, we've put your application on hold and shortlisted you for potential employment. What this means is that if one of the current applicants fails one of the recruitment stages, you might potentially be pushed forward in the process. 

There is no expected timeframe and no guarantee that you will be given the opportunity at employment. Please check your application daily.

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] Application - [i]SHORTLISTED[/i]

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,

        "3": `
    [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — DENIED[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],


The Los Santos County Sheriff's Department has received and acknowledged your application for employment. After completing our preliminary background checks, we have found you ineligible for employment with the Los Santos County Sheriff's Department because you have a criminal record. If you are unsure of our Selection Requirements & Recruitment Information, you can read about them [url=https://gov.eclipse-rp.net/viewtopic.php?f=958&t=20594]here.[/url]

[b](([/b] This is not an Out of Character denial, you may try to apply under a NEW character (not the same character) given that it meets the requirements outlined in our Selection Requirements & Recruitment Information. Should your new character not meet our EXP requirements but it's on the same account as your main character, you can simply state that and show a screenshot of your main character's experience. This does not apply to characters on separate accounts, as we do not want members with the New Player tag. [b]))[/b]

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] N/A
[/list]

[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
    `,
        "4": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — DENIED[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has received and acknowledged your application for employment. We cannot proceed with your application at this time. See below for the reason(s). Please feel free to reapply in 30 days, or the next recruitment drive, whichever occurs first.

The reason(s) for your denial are as following; 
[list]
${formatData.reasons.map((reason) => `[*]${reason}`).join("")}
[/list]

If you are unsure of our Selection Requirements & Recruitment Information, you can read about them [url=https://gov.eclipse-rp.net/viewtopic.php?f=958&t=20594]here.[/url]

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] N/A

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,
        "5": `
      [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — DENIED[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has received and acknowledged your application for employment. We cannot proceed with your application at this time because we do not have any more spots available in our recruitment drive. 

You may try again in 30 days, or our next recruitment drive, whichever occurs first, should you still be interested in seeking employment with the Los Santos County Sheriff's Department.

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] N/A

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,

        "6": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PENDING[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has received and acknowledged your application for employment. There are one or more errors on your application that needs to be corrected before we can proceed with deliberating it among the Recruitment Division. You will be given 48 hours to amend the error(s) after which your application will either be denied or moved for deliberations.

[list]
${formatData.reasons.map((reason) => `[*]${reason}`).join("")}
[/list]

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] Application

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,
        "7": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white][aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PENDING INTERVIEW[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has completed its deliberations of your application for employment and after preliminary background checks, you have passed the initial application screening and are now pending to conduct a formal interview & a physical evaluation with a Recruitment & Employment Application Handler. We recommend that you read up on our [url=https://gov.eclipse-rp.net/viewtopic.php?f=958&t=20594][Selection Requirements & Recruitment Information][/url] so that you understand the stages of our recruitment process. 

Attached to this notice is some information regarding how to schedule an interview with us. After your submission of the requested form, one of our application handlers will reach out to you to schedule an interview within 48 hours of your submission. 
Additionally, you may also walk into Paleto Station at any given time of day to request a RED member who could conduct your interview. Please take into consideration that a member may not always be available.

You will soon be given access to an area of our website that holds more information about this stage of the recruitment process.

[spoiler=Attachment: Interview Scheduling Information]
[img]https://i.imgur.com/zonhmwe.png[/img]
[divbox=white]
Congratulations on being selected for an interview and physical assessment with a member of the Los Santos County Sheriff's Department Recruitment & Employment Division (RED).  This is the next step in the hiring process.  In order to progress further into the application process, a member of RED will need to conduct an interview and physical assessment with you.

Please fill out the below form to list your availability for the next week.  A member of RED will reach out to you via e-mail or phone to attempt to schedule an interview at a time that is convenient to you both.  As such, it is absolutely imperative that you list all of your availability for the upcoming week.  

If an interview is not scheduled within a week of your request, submit another form for the following week. As a reminder, your interview must be conducted within two weeks of being accepted for an interview.

[ooc]

[spoiler=Interview Request Form]
[img]https://i.imgur.com/FYZzoAa.png[/img]
[divbox=white]
[size=150][b]CANDIDATE DETAILS[/b][/size]

[b]Name:[/b] First Lastname

[b]Date of Birth:[/b] MM/DD/YYYY

[b]Phone Number:[/b] (209) ### - ####

E-Mail address: [url=LINKTOPM]firstname.lastname@lifeinvader.net[/url]  
[ooc]Obtain the link to compose a message to you, insert the link after the url= section, and put your name in the appropriate fields[/ooc]

[b]Please provide your availability for all days of the week, for the next 1 week [color=#0000FF](([/color]IN UTC TIME[color=#0000FF]))[/color][/b] 
[list]
[*] Monday: [i]List availability here[/i]
[*] Tuesday: [i]List availability here[/i]
[*] Wednesday: [i]List availability here[/i]
[*]Thursday: [i]List availability here[/i]
[*]Friday: [i]List availability here[/i]
[*]Saturday: [i]List availability here[/i]
[*]Sunday: [i]List availability here[/i]

[/list]

[/divbox]

[c]
[img]https://i.imgur.com/FYZzoAa.png[/img]
[divbox=white]
[size=150][b]CANDIDATE DETAILS[/b][/size]

[b]Name:[/b] First Lastname

[b]Date of Birth:[/b] MM/DD/YYYY

[b]Phone Number:[/b] (209) ### - ####

E-Mail address: [url=LINKTOPM]firstname.lastname@lifeinvader.net[/url]  
[ooc]Obtain the link to compose a message to you, insert the link after the url= section, and put your name in the appropriate fields[/ooc]

[b]Please provide your availability for all days of the week, for the next 1 week[/b] 
[list]
[*] Monday: [i]List availability here[/i]
[*] Tuesday: [i]List availability here[/i]
[*] Wednesday: [i]List availability here[/i]
[*]Thursday: [i]List availability here[/i]
[*]Friday: [i]List availability here[/i]
[*]Saturday: [i]List availability here[/i]
[*]Sunday: [i]List availability here[/i]

[/list]

[/divbox]
[/c]
[/spoiler]
[/divbox]


[/spoiler]

[ooc] Alternatively, you can also join our Discord server to arrange roleplay opportunities with application handlers to conduct your interview. The link to the LSSD Discord server can be found in the pinned message in the 'Pending Interview' section, subforum where your application currently sits. [/ooc]

[b]Stage Completed:[/b] Application 
[b]Current Stage:[/b] Interview 



[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
        "8": `
[img]https://i.imgur.com/zonhmwe.png[/img]
[divbox=white]
Dear [i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

You have been sent an email with possible interview times for the upcoming application period. Please respond to this email in a timely manner so that we may schedule your interview. If you need to request any changes to your availability time, please request such changes here. Otherwise, choose a potential time.

Thank you,

[hr][/hr]
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Recruitment and Employment Division,
Los Santos County Sheriff's Department
[/divbox]
        `,
        "9": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PENDING[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

I will be conducting your interview at Paleto Station on ${formatData.interviewDate[0]} at ${formatData.interviewDate[1]} [color=blue](([/color] UTC [color=blue]))[/color]. I am looking forward to meeting you.  Please e-mail me if you cannot make it or if there has been a change to your schedule.

Please remember that it is crucial to finalize your interview within a maximum of two weeks after receiving confirmation. Neglecting to attend a scheduled interview without prior notification can lead to the denial of your application. Additionally, kindly note that wearing formal attire for the interview is mandatory, and it is recommended to bring sports clothing (with a towel) for the physical evaluation.

[color=blue](([/color] There is a mandatory OOC section of the interview that will be conducted on TeamSpeak. Please ensure you have [url=https://www.teamspeak.com/en/downloads/#ts3client]Teamspeak 3 installed[/url]. To log in to the ECRP Teamspeak server; use the connection details found in our [url=https://gov.eclipse-rp.net/viewtopic.php?t=23141]RED | Interview Information Section[/url]

Ensure your name on TeamSpeak reflects your In-Character name and wait to be moved for the interview in the Lobby. [color=#0000FF]))[/color]

[b]Stage Completed:[/b] N/A
[b]Current Stage:[/b] Interview

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,
        "10": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PENDING ACADEMY[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


[i][b]${formatData.applicantGender === 'male' ? `Mr. ${formatData.applicantName}` : `Ms. ${formatData.applicantName}`}[/b][/i],

The Los Santos County Sheriff's Department has completed its review of performance during the [i]Interview Stage[/i]. We are contacting you to inform you that we're moving you onto the final stage of the recruitment process, the Sheriff's Academy. In the next coming days, you will be scheduled for an academy that you will need to attend before you can potentially become a full employee of the Los Santos County Sheriff's Department. We recommend that you read up on our [url=https://gov.eclipse-rp.net/viewtopic.php?f=958&t=20594][Selection Requirements & Recruitment Information][/url] so that you understand the stages of our recruitment process. 

You will soon be given access to an area of our website that holds more information about this stage of the recruitment process.

[b]Stage Completed:[/b] Interview
[b]Current Stage:[/b] Academy
[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,
        "11": `
        [img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]RE: Application for Employment — PASSED ACADEMY[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]


The applicant has passed the Sheriff's Academy and is now an employee of the Los Santos County Sheriff's Department.

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department

On behalf of
[img]https://i.imgur.com/WxRbg4x.png[/img]
Lieutenant Clay Thompson
Recruitment & Employment Division Commanding Officer

[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,
        '12': `
        [img]https://i.imgur.com/zu4NcrL.png[/img]
[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[img]https://i.imgur.com/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Letter Of Recommendation[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none][right]${formatData.date}[/right]

[b][i]Good Day[/i][/b],

We are reaching out to you today in regard to one of your PREVIOUS/CURRENT employees that have applied for the [b]Los Santos County Sheriff's Department[/b]. We hereby request access to their file and, most importantly, their disciplinary history and activity within your department. We also wish to have a brief statement from their direct supervisor, if possible, along with the other requested information. 

Here's a list of names
[list][*]${formatData.applicantName}[/list]

Please do not hesitate to share any additional information with us even if you think it is something minor; it might help us make a better judgment!

We would like to receive these promptly in order to prevent delays in our program and that we will wait 48 hours for your response. Should we not receive a response from you, we will go ahead and continue with the application process.

Please send your response to the Sheriff's Department Recruitment Division; [url=https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose&g=183]click here to send[/url].
 [/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department

On behalf of,

[img]https://i.imgur.com/WxRbg4x.png[/img]
Lieutenant Clay Thompson
Recruitment & Employment Division Commanding Officer
Los Santos County Sheriff's Department

[/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]
        `,
        "13": `
[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[aligntable=left,0,0,0,0,0,0][fimg=120,120]https://i.imgur.com/VUBguS0.png[/fimg][fimg=120,120]https://i.imgur.com/FAyEyJd.png[/fimg][/aligntable][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Interview Evaluation[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable][list=none]
[hr]


[b][i]Date and Time of the Interview:[/i][/b] ${formatData.interviewDate[0]} ${formatData.interviewDate[1]}
[b][i]Applicant's Name:[/i][/b] ${formatData.applicantName}
[b][i]Application Link:[/i][/b] [url=${formatData.appLink}]Application[/url]

[b][i]How was your first impression of the applicant, were they friendly with you, introduced themselves, etc?[/i][/b]:
${formatData.firstImpression}

[b][i]Did the applicant answer all questions truthfully, provide their full ID, and were they compliant during their search? Did they bring something to the interview they are not supposed to, a firearm for an example?[/i][/b]:
${formatData.answeredTruthfully}

[b][i]How did the applicant respond to the situational questions? Did they have common sense when it came to answering the questions? Do you think they will be a good fit for the department?[/i][/b]:
${formatData.situationalQuestions}

[b][i]What's the Applicant's greatest weakness ( Please be specific )[/i][/b]:
${formatData.greatestWeakness}

[b][i]Did the applicant have any problems with the physical obstacle course?[/i][/b]:
${formatData.obstacleCourseProblems}

[b][i]Do you believe this applicant should be accepted into the academy?[/i][/b]:
${formatData.acceptedIntoAcademy}

[b][i](( Did they answer all OOC questions correctly, were they familiar with the server rules? ))[/i][/b]
(( ${formatData.oocQuestions} ))

[b][i](( Do you think they have provided sufficient details and fair usage of /me's and /do's? ))[/i][/b]
(( ${formatData.usageOfMeAndDo} ))

[b][i](( Did they role-play any 'character development' during the role-play test? E.g. role-playing fatigue/exhaustion, pain etc. ))[/i][/b]
(( ${formatData.characterDevelopment} ))

[b][i](( Does the player have a working microphone? ))[/i][/b]
(( ${formatData.workingMicrophone} ))

[b][i](( Is the player 16 or older? ))[/i][/b]
(( ${formatData.playerAge} ))

[b][i](( Was the applicant proficient at speaking English? ))[/i][/b]
(( ${formatData.speakingEnglish} ))

[b][i](( Provide screenshots of ALL of their RP throughout the physical evaluation ))[/i][/b]
(( ${formatData.roleplayScreenShots.map(imageLink => {
            return `${imageLink}`
        }).join('\n')} ))

[b][i](( How was your general feeling towards them? Do they come across as willing to learn and invest time into this faction, or do they seem like they want to rush and can't dedicate themselves to something long-term? ))[/i][/b]
(( ${formatData.generalFeeling} ))

[/list]


[hr][/hr][list=none]

From
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`,

        "14": `[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]
[fimg=130,130]https://i.imgur.com/VUBguS0.png[/fimg][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos County Sheriff's Department[/size][/b]
[size=115]Recruitment and Employment Division[/size]
[size=95]"A TRADITION OF SERVICE"[/size][/font][/right][/aligntable]
[hr]
[list=none]

Text
[/list]


[hr][/hr][list=none]

Respectfully,
[img]${deputyData.signature}[/img]
${deputyData.dRank} ${deputyData.name}
${deputyData.rRank}
Los Santos County Sheriff's Department
[/list][/divbox]
[img]https://i.imgur.com/a3aDjGi.png[/img]`

    }

    return formats[formatId as keyof typeof formats];
}