import { useEffect, useState } from "react";
import { Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import DeputyDetails from "./components/deputyDetails/DeputyDetails.tsx";
import SelectFormats from "./components/SelectFormats.tsx";
import FormatsInput from "./components/formatsInput/FormatsInput.tsx";
import type { DeputyData, divisionsType, FormatData } from "./types.ts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Car, GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFormat } from "./formats";
import pkg from "../package.json";

const App = () => {
	const [division, setDivision] = useState<divisionsType>("RED");

	const [details, setDetails] = useState<DeputyData>(() => {
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

	const [formatData, setFormatData] = useState<FormatData>({});
	const [formatId, setFormat] = useState<string>("");

	useEffect(() => {
		setFormat("");
		setFormatData({});
	}, [division]);

	useEffect(() => {
		localStorage.setItem("deputyDetails", JSON.stringify(details));
	}, [details]);

	const handleCopyFormat = () => {
		const rRank = details.divisionRanks[division];
		const deputyData = { ...details, rRank };
		const generatedFormat = getFormat({ formatData, deputyData, formatId, division });
		navigator.clipboard.writeText(generatedFormat.format);
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
		<main className="container">
			<section className="flex items-center justify-between mb-8">
				<h1 className="text-xl font-semibold text-white tracking-tight">LSSD Email Format Tool</h1>

				<Select
					value={division || "RED"}
					onValueChange={(val) => setDivision((val || "RED") as "RED" | "TSD" | "ATD")}
				>
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

			<section className="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-[0_0_10px_0_#00000038] rounded-xl">
				<div className="bg-white rounded-[0.75rem_0.75rem_0_0] md:rounded-[0.75rem_0_0_0.75rem] flex flex-col gap-10 p-5 justify-center">
					<SelectFormats setFormat={setFormat} division={division} />
					<FormatsInput
						setFormatData={setFormatData}
						formatId={formatId}
						formatData={formatData}
						division={division}
					/>
					<Button type="primary" className="mt-5" onClick={handleCopyFormat}>
						Create Format
					</Button>
				</div>

				<div className="p-5 flex flex-col gap-5">
					<img src="/LSSD-email-format-tool/images/logo.webp" alt="LSSD Logo" className="max-w-[160px]" />
					<DeputyDetails setDetails={setDetails} details={details} division={division} />
				</div>
			</section>

			<footer className="mt-10 text-start text-sm text-gray-600 select-none">
				Developed by dofxo - App version v{pkg.version}
			</footer>

			<ToastContainer position="top-center" />
		</main>
	);
};

export default App;
