import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Car, GraduationCap, Shield, Users } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "antd";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import DeputyDetails from "./components/deputyDetails/DeputyDetails.tsx";
import type { DeputyData, divisionsType, FormatData } from "./types.ts";
import FormatsInput from "./components/formatsInput/FormatsInput.tsx";
import SelectFormats from "./components/SelectFormats.tsx";
import { getFormat } from "./formats";
import pkg from "../package.json";

const SUPERVISORY_PASSWORD = "supersecretpwtounlock69";

const App = () => {
	const [division, setDivision] = useState<divisionsType>("RED");
	const [pendingDivision, setPendingDivision] = useState<divisionsType | null>(null);
	const [isSupervisoryUnlocked, setIsSupervisoryUnlocked] = useState(false);
	const [showPasswordDialog, setShowPasswordDialog] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");

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
						General: "",
						Supervisory: "",
					},
			  };
	});

	const [formatData, setFormatData] = useState<FormatData>({});
	const [formatId, setFormat] = useState<string>("");

	useEffect(() => {
		const stored = localStorage.getItem("supervisoryUnlocked");
		if (stored === "true") {
			setIsSupervisoryUnlocked(true);
		}
	}, []);

	useEffect(() => {
		setFormat("");
		setFormatData({});
	}, [division]);

	useEffect(() => {
		localStorage.setItem("deputyDetails", JSON.stringify(details));
	}, [details]);

	const handleDivisionChange = (val: divisionsType) => {
		if (val === "Supervisory" && !isSupervisoryUnlocked) {
			setPendingDivision(val);
			setShowPasswordDialog(true);
			return;
		}
		setDivision(val);
	};

	const handlePasswordSubmit = () => {
		if (passwordInput === SUPERVISORY_PASSWORD) {
			setIsSupervisoryUnlocked(true);
			localStorage.setItem("supervisoryUnlocked", "true");
			if (pendingDivision) {
				setDivision(pendingDivision);
				setPendingDivision(null);
			} else {
				setDivision("Supervisory");
			}
			setShowPasswordDialog(false);
			setPasswordInput("");
			toast.success("Supervisory formats unlocked");
		} else {
			toast.error("Incorrect password");
		}
	};

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
		{
			id: "General" as const,
			icon: <Shield className="w-4 h-4 opacity-80" />,
			color: "from-gray-400 to-gray-600",
		},
		{
			id: "Supervisory" as const,
			icon: <Shield className="w-4 h-4 opacity-80" />,
			color: "from-purple-400 to-purple-600",
		},
	];

	return (
		<main className="container">
			<section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
					LSSD Email Format Tool
				</h1>

				<Select
					value={division || "RED"}
					onValueChange={(val) => handleDivisionChange((val || "RED") as divisionsType)}
				>
					<SelectTrigger className="clay-select w-[280px]">
						<SelectValue placeholder="Select Division" />
					</SelectTrigger>
					<SelectContent className="clay-dropdown">
						{divisions.map((div) => (
							<SelectItem
								key={div.id}
								value={div.id}
								className={cn(
									"flex items-center gap-3 py-2.5 px-4 text-sm hover:bg-[#e8dfc8] rounded-xl cursor-pointer transition-colors clay-select-item"
								)}
							>
								<div className={cn(`h-5 w-5 rounded-full bg-gradient-to-br shadow-sm ${div.color}`)} />
								<div className="flex items-center gap-2">
									{div.icon}
									<span>{div.id}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-2 gap-6 clay-main-card">
				<div className="clay-panel-left flex flex-col gap-10 p-6 sm:p-8 justify-center">
					<SelectFormats setFormat={setFormat} division={division} />
					<FormatsInput
						setFormatData={setFormatData}
						formatId={formatId}
						formatData={formatData}
						division={division}
					/>
					<Button type="primary" className="clay-btn-primary mt-5" onClick={handleCopyFormat}>
						Create Format
					</Button>
				</div>

				<div className="clay-panel-right p-6 sm:p-8 flex flex-col gap-6">
					<img src="/images/logo.webp" alt="LSSD Logo" className="max-w-[160px] clay-logo" />
					<DeputyDetails setDetails={setDetails} details={details} division={division || "RED"} />
				</div>
			</section>

			<footer className="mt-10 text-start text-sm text-[#7a6349] select-none drop-shadow-sm">
				Developed by dofxo - App version v{pkg.version}
			</footer>

			<ToastContainer position="top-center" />

			<Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
				<DialogContent showCloseButton className="clay-dialog">
					<DialogHeader>
						<DialogTitle>Enter Supervisory Password</DialogTitle>
						<DialogDescription>
							Access to Supervisory formats is restricted. Enter the password to unlock this section.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-3 mt-2">
						<label className="text-sm font-medium text-[#5a4a3a]" htmlFor="supervisory-password">
							Password
						</label>
						<input
							id="supervisory-password"
							type="password"
							className="clay-input px-4 py-3 text-sm rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#B57B2F]/50"
							value={passwordInput}
							onChange={(e) => setPasswordInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handlePasswordSubmit();
								}
							}}
						/>
						<div className="flex justify-end gap-3 mt-4">
							<Button onClick={() => setShowPasswordDialog(false)} className="clay-btn-secondary">
								Cancel
							</Button>
							<Button type="primary" onClick={handlePasswordSubmit} className="clay-btn-primary">
								Unlock
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default App;
