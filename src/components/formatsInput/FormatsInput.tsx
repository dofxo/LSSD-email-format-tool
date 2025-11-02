import { Button, DatePicker, Input, Select } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";

import type { FormatData } from "../../types.ts";
import { inputsByDivision } from "./data.ts";

const { TextArea } = Input;

const FormatsInput = ({
	division,
	formatId,
	formatData,
	setFormatData,
}: {
	division: "TSD" | "ATD" | "RED";
	formatId: string;
	formatData: FormatData;
	setFormatData: React.Dispatch<React.SetStateAction<FormatData>>;
}) => {
	const [reasonsInput, setReasonsInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		if (name === "reasons") setReasonsInput(value);
		else setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDatePickerChange = (_: never, dateString: string | string[]) => {
		const hasTime = dateString.includes(":");
		const formattedDate = moment
			.utc(dateString as string)
			.format(!hasTime ? "MMMM Do, YYYY" : "MMMM Do, YYYY - HH:mm");
		setFormatData((prev) => ({ ...prev, date: formattedDate }));
	};

	const handleGenderChange = (value: "male" | "female") => {
		setFormatData((prev) => ({ ...prev, applicantGender: value }));
	};

	const addItem = () => {
		const inputValue = reasonsInput;
		if (!inputValue) return;
		setFormatData((prev) => ({
			...prev,
			reasons: [...(prev.reasons || []), inputValue],
		}));
		setReasonsInput("");
	};

	if (!formatId) return <div className="flex items-center justify-center h-32 text-gray-500">No format selected</div>;

	const divisionInputs = inputsByDivision[division] || [];
	const filteredInputs: {
		name: string;
		label: string;
		type: string;
		formats: string[];
		hint?: string;
		options?: [];
	}[] = divisionInputs.filter((input) => input.formats.includes(formatId));

	if (filteredInputs.length === 0)
		return (
			<div className="flex flex-col items-center justify-center h-32 gap-2">
				<p className="text-gray-600">This format doesn&apos;t require any additional input</p>
				<p className="text-gray-500 text-sm">You can proceed by clicking the Create Format button</p>
			</div>
		);

	return (
		<div className="flex flex-wrap gap-x-2 gap-y-5">
			{filteredInputs.map((input) => (
				<div key={input.name} className="flex flex-col gap-2">
					<label className="text-[13px]" htmlFor={input.name}>
						{input.label}
					</label>
					{input.hint && <span className="text-[12px] text-red-400">{input.hint}</span>}
					{input.type === "date" ? (
						<DatePicker
							showTime={input.name === "interviewDate"}
							onChange={handleDatePickerChange}
							name={input.name}
						/>
					) : input.type === "select" ? (
						<Select onChange={handleGenderChange} options={input.options} />
					) : input.type === "textarea" ? (
						<TextArea
							onChange={handleInputChange}
							name={input.name}
							value={formatData[input.name as keyof FormatData] || ""}
						/>
					) : (
						<>
							<div className="flex gap-2 items-center">
								<Input
									onChange={handleInputChange}
									name={input.name}
									type="text"
									value={
										input.name === "reasons"
											? reasonsInput
											: (formatData[input.name as keyof FormatData] as string) || ""
									}
								/>
								{input.name === "reasons" && (
									<Button onClick={() => addItem()} type="primary">
										add
									</Button>
								)}
							</div>

							{input.name === "reasons" && (
								<div className="flex md:flex-col gap-2">
									{(formatData.reasons || []).map((item, idx) => (
										<div key={idx} className="flex gap-2 items-center">
											<span className="text-[12px]">{item}</span>
											<Button
												danger
												onClick={() => {
													setFormatData((prev) => ({
														...prev,
														reasons: (prev.reasons || []).filter((_, i) => i !== idx),
													}));
												}}
												icon={<DeleteTwoTone style={{ color: "red" }} />}
											/>
										</div>
									))}
								</div>
							)}
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default FormatsInput;
