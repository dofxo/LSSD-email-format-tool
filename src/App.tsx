import DeputyDetails from "./components/DeputyDetails.tsx";
import SelectFormats from "./components/SelectFormats.tsx";
import {useEffect, useState} from "react";
import type {DeputyDetailsState, FormatData} from "./types.ts";
import FormatsInput from "./components/FormatsInput.tsx";
import {Button} from "antd";
import {getFormat} from "./formats.ts";
import {toast, ToastContainer} from "react-toastify";


const App = () => {
    const [details, setDetails] = useState<DeputyDetailsState>(() => {
        const savedDetails = localStorage.getItem('deputyDetails');
        return savedDetails ? JSON.parse(savedDetails) : {
            name: '', signature: '', dRank: '', rRank: ''
        };
    });

    const [formatData, setFormatData] = useState<FormatData>({
        applicantName: "",
        applicantGender: "male",
        date: "",
        interviewDate: [],
        reasons: [],
        appLink: "",
        firstImpression: "",
        answeredTruthfully: "",
        situationalQuestions: "",
        greatestWeakness: "",
        obstacleCourseProblems: "",
        acceptedIntoAcademy: "",
        oocQuestions: "",
        usageOfMeAndDo: "",
        characterDevelopment: "",
        workingMicrophone: "",
        playerAge: "",
        speakingEnglish: "",
        roleplayScreenShots: [],
        generalFeeling: ""
    });
    const [formatId, setFormat] = useState<string>('')

    useEffect(() => {
        localStorage.setItem('deputyDetails', JSON.stringify(details));
    }, [details]);


    return <main className="container">
        <section
            className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 shadow-[0_0_10px_0_#00000038] shadow- rounded-xl">
            <div
                className="bg-white rounded-[0.75rem_0.75rem_0_0] md:rounded-[0.75rem_0_0_0.75rem] flex flex-col gap-10 p-5 justify-center">
                <SelectFormats setFormat={setFormat}/>
                <FormatsInput setFormatData={setFormatData} formatId={formatId} formatData={formatData}/>
                <Button type="primary" className="mt-5" onClick={() => {
                    const generatedFormat = getFormat({formatData, deputyData: details, formatId})
                    navigator.clipboard.writeText(generatedFormat);
                    toast.success("Format copied to clipboard")
                }}>Create Format</Button>
            </div>
            <div className="p-5 flex flex-col gap-5">
                <img src="/LSSD-RED-tool/images/logo.webp" alt="LSSD Logo" className="max-w-[200px]"/>
                <DeputyDetails setDetails={setDetails} details={details}/>
            </div>
        </section>
        <ToastContainer position="top-center"/>
    </main>
}

export default App;