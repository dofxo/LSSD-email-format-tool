export interface DeputyDetailsState {
    name: string;
    signature: string;
    dRank: string;
    rRank: string;
}

export interface FormatData {
    applicantName: string,
    applicantGender: "male" | "female",
    date: string,
    interviewDate: string[],
    reasons: string[]
    appLink: string
    firstImpression: string
    answeredTruthfully: string
    situationalQuestions: string
    greatestWeakness: string
    obstacleCourseProblems: string
    acceptedIntoAcademy: string
    oocQuestions: string
    usageOfMeAndDo: string
    characterDevelopment: string
    workingMicrophone: string
    playerAge: string
    speakingEnglish: string
    roleplayScreenShots: string[]
    generalFeeling: string
}
