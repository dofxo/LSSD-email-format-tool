import { Button, Input, Select } from "antd";
import { toast } from "react-toastify";
import { deputyRanks } from "./deputyRanks";
import type { DeputyData } from "@/types";

const DeputyDetails = ({
	setDetails,
	details,
	division,
}: {
	setDetails: React.Dispatch<React.SetStateAction<DeputyData>>;
	details: DeputyData;
	division: "RED" | "TSD" | "ATD";
}) => {
	const divisionRanks = {
		RED: [
			{ value: "Trial Application Handler", label: "Trial Application Handler" },
			{ value: "Application Handler", label: "Application Handler" },
			{ value: "Senior Application Handler", label: "Senior Application Handler" },
			{ value: "R.E.D. Supervisor", label: "R.E.D. Supervisor" },
			{ value: "R.E.D. Assistant Commanding Officer", label: "R.E.D. Assistant Commanding Officer" },
			{ value: "R.E.D. Commanding Officer", label: "R.E.D. Commanding Officer" },
		],
		TSD: [
			{ value: "Commanding Officer", label: "Commanding Officer" },
			{ value: "Assistant Commanding Officer", label: "Assistant Commanding Officer" },
			{ value: "Traffic Inspector", label: "Traffic Inspector" },
			{ value: "Traffic Deputy III", label: "Traffic Deputy III" },
			{ value: "Traffic Deputy II", label: "Traffic Deputy II" },
			{ value: "Traffic Deputy I", label: "Traffic Deputy I" },
			{ value: "Probationary Traffic Deputy", label: "Probationary Traffic Deputy" },
		],
		ATD: [
			{ value: "Commanding Officer", label: "Commanding Officer" },
			{ value: "Assistant Commanding Officer", label: "Assistant Commanding Officer" },
			{ value: "Head Instructor", label: "Head Instructor" },
			{ value: "Senior Instructor", label: "Senior Instructor" },
			{ value: "Trainee Instructor", label: "Trainee Instructor" },
		],
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleDeputyRankChange = (value: string) => {
		setDetails((prev) => ({ ...prev, dRank: value }));
	};

	const handleDivisionRankChange = (value: string) => {
		setDetails((prev) => ({
			...prev,
			divisionRanks: { ...prev.divisionRanks, [division]: value },
		}));
	};

	const dRankDefault = details.dRank || deputyRanks[0].value;
	const rRankDefault = details.divisionRanks[division] || divisionRanks[division][0].value;

	return (
		<section className="flex flex-col gap-5">
			<h2 className="font-semibold text-3xl text-white">Deputy Details</h2>

			<form id="inputs" className="flex gap-2 flex-wrap">
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Deputy full name</label>
					<Input
						id="name"
						type="text"
						placeholder="e.g. Bobby Kirk"
						name="name"
						value={details.name}
						onChange={handleInputChange}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label>Deputy rank</label>
					<Select
						showSearch
						optionFilterProp="label"
						onChange={handleDeputyRankChange}
						value={dRankDefault}
						options={deputyRanks}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label>{division} rank</label>
					<Select
						optionFilterProp="label"
						onChange={handleDivisionRankChange}
						value={rRankDefault}
						options={divisionRanks[division]}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="signature">Signature</label>
					<Input
						id="signature"
						type="text"
						placeholder="Signature link"
						name="signature"
						value={details.signature}
						onChange={handleInputChange}
					/>
				</div>
			</form>

			<Button
				variant="solid"
				color="default"
				className="w-fit"
				onClick={() => {
					const rRank = rRankDefault;
					navigator.clipboard.writeText(
						`[img]${details.signature}[/img]\n${dRankDefault} ${details.name}\n${rRank}`
					);
					toast.success("Signature copied to clipboard");
				}}
			>
				Copy {division} signature
			</Button>

			<span className="text-[12px] text-red-500">
				<span className="text-red-700 font-bold">Note:</span> This button is only for grabbing the 3 lines of
				the signature for other uses. The formats contain it if you fill out these inputs.
			</span>
		</section>
	);
};

export default DeputyDetails;
