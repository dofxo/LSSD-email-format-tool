import DeputyDetails from "./components/DeputyDetails.tsx";

const App = () => {
    return <main className="container">
        <section className="grid grid-cols-2 gap-5 shadow-[0_0_10px_0_#00000038] shadow- rounded-xl">
            <div className="bg-white rounded-[0.75rem_0_0_0.75rem]"></div>
            <div className="p-5 flex flex-col gap-5">
                <img src="/LSSD-RED-tool/images/logo.webp" alt="LSSD Logo" className="max-w-[200px]"/>
                <DeputyDetails/>
            </div>
        </section>
    </main>
}

export default App;