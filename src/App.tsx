import { useEffect, useState } from "react";
import { Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { getFormat } from "./formats.ts";
import DeputyDetails from "./components/deputyDetails/DeputyDetails.tsx";
import SelectFormats from "./components/SelectFormats.tsx";
import FormatsInput from "./components/FormatsInput.tsx";
import type { DeputyDetailsState, FormatData } from "./types.ts";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Car, GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const App = () => {
	const [division, setDivision] = useState<"RED" | "TSD" | "ATD">("RED");

	const [details, setDetails] = useState<DeputyDetailsState>(() => {
		const saved = localStorage.getItem("deputyDetails");
		return saved
			? JSON.parse(saved)
			: {
					name: "",
					signature: "",
					dRank: "",
					divisionRanks: {
						RED: "",
						TSD: "",
						ATD: "",
					},
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
		generalFeeling: "",
	});

	const [formatId, setFormat] = useState<string>("");

	useEffect(() => {
		localStorage.setItem("deputyDetails", JSON.stringify(details));
	}, [details]);

	const handleCopyFormat = () => {
		const rRank = details.divisionRanks[division];
		const deputyData = { ...details, rRank };
		const generatedFormat = getFormat({ formatData, deputyData, formatId });
		navigator.clipboard.writeText(generatedFormat);
		toast.success("Format copied to clipboard");
	};

	const divisions = [
		{
			id: "RED" as const,
			icon: <Users className="w-4 h-4 opacity-80" />,
			color: "from-red-500 to-red-700",
		},
		{
			id: "TSD" as const,
			icon: <Car className="w-4 h-4 opacity-80" />,
			color: "from-yellow-400 to-yellow-600",
		},
		{
			id: "ATD" as const,
			icon: <GraduationCap className="w-4 h-4 opacity-80" />,
			color: "from-blue-500 to-blue-700",
		},
	];

	return (
		<main className="container py-5">
			{/* Header with division dropdown */}
			<section className="flex items-center justify-between mb-8">
				<h1 className="text-xl font-semibold text-white tracking-tight">LSSD Email Format Tool</h1>

				<Select value={division} onValueChange={(val) => setDivision(val as "RED" | "TSD" | "ATD")}>
					<SelectTrigger className="w-[280px] bg-white text-nuetral-900 shadow-sm">
						<SelectValue placeholder="Select Division" />
					</SelectTrigger>
					<SelectContent className="bg-white border-neutral-300">
						{divisions.map((div) => (
							<SelectItem
								key={div.id}
								value={div.id}
								className={cn(
									"flex items-center gap-3 py-2 px-3 text-sm hover:bg-neutral-800 rounded-md cursor-pointer"
								)}
							>
								<div className={cn(`h-4 w-4 rounded-full bg-gradient-to-br ${div.color}`)} />
								<div className="flex items-center gap-2">
									{div.icon}
									<span>{div.id}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</section>

			<Separator className="my-6" />

			{/* Main grid content */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-[0_0_10px_0_#00000038] rounded-xl">
				<div className="bg-white rounded-[0.75rem_0.75rem_0_0] md:rounded-[0.75rem_0_0_0.75rem] flex flex-col gap-10 p-5 justify-center">
					<SelectFormats setFormat={setFormat} />
					<FormatsInput setFormatData={setFormatData} formatId={formatId} formatData={formatData} />
					<Button type="primary" className="mt-5" onClick={handleCopyFormat}>
						Create Format
					</Button>
				</div>

				<div className="p-5 flex flex-col gap-5">
					<img src="/LSSD-RED-tool/images/logo.webp" alt="LSSD Logo" className="max-w-[160px]" />
					<DeputyDetails setDetails={setDetails} details={details} division={division} />
				</div>
			</section>

			<ToastContainer position="top-center" />
		</main>
	);
};

export default App;
