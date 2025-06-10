import DeputyDetails from "./components/DeputyDetails.tsx";
import SelectFormats from "./components/SelectFormats.tsx";
import {useEffect, useState} from "react";
import type {DeputyDetailsState} from "./types.ts";


const App = () => {
    const [details, setDetails] = useState<DeputyDetailsState>(() => {
        const savedDetails = localStorage.getItem('deputyDetails');
        return savedDetails ? JSON.parse(savedDetails) : {
            name: '', signature: '', dRank: '', rRank: ''
        };
    });

    const [format, setFormat] = useState<string>('')

    useEffect(() => {
        localStorage.setItem('deputyDetails', JSON.stringify(details));
    }, [details]);

    useEffect(() => {
        console.log(format)
    }, [format]);

    return <main className="container">
        <section
            className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 shadow-[0_0_10px_0_#00000038] shadow- rounded-xl">
            <div className="bg-white rounded-[0.75rem_0_0_0.75rem]">
                <SelectFormats setFormat={setFormat}/>
            </div>
            <div className="p-5 flex flex-col gap-5">
                <img src="/LSSD-RED-tool/images/logo.webp" alt="LSSD Logo" className="max-w-[200px]"/>
                <DeputyDetails setDetails={setDetails} details={details}/>
            </div>
        </section>
    </main>
}

export default App;