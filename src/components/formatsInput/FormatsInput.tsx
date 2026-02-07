import { Button, DatePicker, Input, Select } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";

import type { FormatData, divisionsType } from "../../types.ts";
import { inputsByDivision } from "./data.ts";

const { TextArea } = Input;

const FormatsInput = ({
	division,
	formatId,
	formatData,
	setFormatData,
}: {
	division: divisionsType;
	formatId: string;
	formatData: FormatData;
	setFormatData: React.Dispatch<React.SetStateAction<FormatData>>;
}) => {
	const [reasonsInput, setReasonsInput] = useState("");
	const [rawDateValues, setRawDateValues] = useState<Record<string, string>>({});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		if (name === "reasons") setReasonsInput(value);
		else setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const formatDate = (dateString: string, format: "full" | "short" = "full", hasTime: boolean = false) => {
		console.log(dateString, format, hasTime);
		const date = moment.utc(dateString);
		if (format === "short") {
			const day = date.format("DD");
			const month = date.format("MMM").toUpperCase();
			const year = date.format("YYYY");
			const datePart = `${day}/${month}/${year}`;
			if (hasTime) {
				const time = date.format("HH:mm");
				return `${datePart} - ${time}`;
			}
			return datePart;
		} else {
			const dateWithoutTime = date.format("MMMM Do, YYYY");
			const dateWithTime = date.format("MMMM Do, YYYY - HH:mm");
			return hasTime ? dateWithTime : dateWithoutTime;
		}
	};

	const handleDatePickerChange = (_momentObj: unknown, dateString: string | string[], inputName: string) => {
		if (!dateString) {
			setRawDateValues((prev) => {
				const updated = { ...prev };
				delete updated[inputName];
				return updated;
			});
			setFormatData((prev) => ({ ...prev, [inputName]: undefined }));
			return;
		}

		const dateStr = dateString as string;
		setRawDateValues((prev) => ({ ...prev, [inputName]: dateStr }));

		const hasTime = dateStr.includes(":");
		const dateFormat = inputName === "date" ? formatData.dateFormat || "full" : "full";
		const formattedDate = formatDate(dateStr, dateFormat, hasTime);
		console.log(formattedDate, "formattedDate ", inputName);
		setFormatData((prev) => ({ ...prev, [inputName]: formattedDate }));
	};

	const handleDateFormatChange = (value: "full" | "short") => {
		setFormatData((prev) => {
			const updated = { ...prev, dateFormat: value };
			// Re-format existing date if it exists
			if (rawDateValues.date) {
				const hasTime = rawDateValues.date.includes(":");
				updated.date = formatDate(rawDateValues.date, value, hasTime);
			} else if (prev.date) {
				// Try to parse existing formatted date and re-format
				try {
					const parsedDate = moment.utc(
						prev.date,
						["MMMM Do, YYYY", "MMMM Do, YYYY - HH:mm", "DD/MMM/YYYY", "DD/MMM/YYYY - HH:mm"],
						true
					);
					if (parsedDate.isValid()) {
						const hasTime = prev.date.includes(":");
						const dateStr =
							parsedDate.format("YYYY-MM-DD") + (hasTime ? " " + prev.date.split(" - ")[1] : "");
						setRawDateValues((prev) => ({ ...prev, date: dateStr }));
						updated.date = formatDate(dateStr, value, hasTime);
					}
				} catch {
					// If parsing fails, keep existing date
				}
			}
			return updated;
		});
	};

	const handleGenderChange = (value: "male" | "female") => {
		setFormatData((prev) => ({ ...prev, applicantGender: value }));
	};

	const handleSelectChange = (value: string, inputName: string) => {
		setFormatData((prev) => ({ ...prev, [inputName]: value }));
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
						<div className="flex flex-col gap-2">
							<div className="flex gap-2 items-center">
								<DatePicker
									showTime={input.name === "interviewDate"}
									onChange={(momentObj, dateString) =>
										handleDatePickerChange(momentObj, dateString, input.name)
									}
									name={input.name}
								/>
								{input.name === "date" && (
									<Select
										value={formatData.dateFormat || "full"}
										onChange={handleDateFormatChange}
										style={{ width: 180 }}
										options={[
											{ value: "full", label: "Month Day, Year" },
											{ value: "short", label: "DD/MMM/YYYY" },
										]}
									/>
								)}
							</div>
						</div>
					) : input.type === "select" ? (
						<Select
							onChange={(value) =>
								input.name === "applicantGender"
									? handleGenderChange(value as "male" | "female")
									: handleSelectChange(value, input.name)
							}
							value={formatData[input.name as keyof FormatData] as string}
							options={input.options}
						/>
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
