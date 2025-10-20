import { Button, DatePicker, Input, Select } from "antd";
import type { FormatData } from "../types.ts";
import moment from "moment";
import { useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";

const { TextArea } = Input;

const FormatsInput = ({
	formatId,
	formatData,
	setFormatData,
}: {
	formatId: string;
	formatData: FormatData;
	setFormatData: React.Dispatch<React.SetStateAction<FormatData>>;
}) => {
	const [reasonsInput, setReasonsInput] = useState("");
	const [screenshotsInput, setScreenshotsInput] = useState("");

	const inputsByFormat = [
		{
			name: "applicantName",
			label: "Applicant's full/last name",
			type: "text",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13"],
		},
		{
			name: "applicantGender",
			label: "Applicant's gender",
			type: "select",
			options: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
			],
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
		},
		{
			name: "date",
			label: "Email Date",
			type: "date",
			formats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		},
		{ name: "interviewDate", label: "Interview date", type: "date", formats: ["9", "13"] },
		{ name: "reasons", label: "Reason(s)", type: "text", formats: ["4", "6"] },
		{ name: "appLink", label: "Application Link", type: "text", formats: ["13"] },
		{ name: "firstImpression", label: "Impression of applicant", type: "textarea", formats: ["13"] },
		{ name: "answeredTruthfully", label: "Truthfulness & compliance", type: "textarea", formats: ["13"] },
		{ name: "situationalQuestions", label: "Situational answers & judgment", type: "textarea", formats: ["13"] },
		{ name: "greatestWeakness", label: "Applicant's greatest weakness", type: "textarea", formats: ["13"] },
		{ name: "obstacleCourseProblems", label: "Physical obstacle problems", type: "textarea", formats: ["13"] },
		{ name: "acceptedIntoAcademy", label: "Should applicant be accepted?", type: "textarea", formats: ["13"] },
		{ name: "oocQuestions", label: "OOC rules and understanding", type: "textarea", formats: ["13"] },
		{ name: "usageOfMeAndDo", label: "Usage of /me and /do", type: "textarea", formats: ["13"] },
		{ name: "characterDevelopment", label: "Roleplay character development", type: "textarea", formats: ["13"] },
		{ name: "workingMicrophone", label: "Working microphone?", type: "textarea", formats: ["13"] },
		{ name: "playerAge", label: "Player 16+ verification", type: "textarea", formats: ["13"] },
		{ name: "speakingEnglish", label: "English proficiency", type: "textarea", formats: ["13"] },
		{
			name: "roleplayScreenShots",
			label: "RP screenshots (imgur album preferred)",
			hint: "Use imgur.com (album or direct post), not i.imgur links.",
			type: "screenshots",
			formats: ["13"],
		},
		{ name: "generalFeeling", label: "General recruitment impression", type: "textarea", formats: ["13"] },
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (name === "reasons") setReasonsInput(value);
		else if (name === "roleplayScreenShots") setScreenshotsInput(value);
		else setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDatePickerChange = (_: any, dateString: string) => {
		const utcFormattedDate = moment.utc(dateString).format("MMMM Do, YYYY");
		setFormatData((prev) => ({ ...prev, date: utcFormattedDate }));
	};

	const handleInterviewDatePickerChange = (_: any, dateString: string) => {
		const formattedDate = moment(dateString).format("DD/MMM/YYYY,HH:MM");
		setFormatData((prev) => ({ ...prev, interviewDate: formattedDate.split(",") }));
	};

	const handleGenderChange = (value: "male" | "female") => {
		setFormatData((prev) => ({ ...prev, applicantGender: value }));
	};

	const addItem = (type: "reasons" | "screenshots") => {
		const inputValue = type === "reasons" ? reasonsInput : screenshotsInput;
		if (!inputValue) return;

		setFormatData((prev) => ({
			...prev,
			[type === "reasons" ? "reasons" : "roleplayScreenShots"]: [
				...(prev[type === "reasons" ? "reasons" : "roleplayScreenShots"] || []),
				inputValue,
			],
		}));
		type === "reasons" ? setReasonsInput("") : setScreenshotsInput("");
	};

	if (!formatId) return <div className="flex items-center justify-center h-32 text-gray-500">No format selected</div>;

	const filteredInputs = inputsByFormat.filter((input) => input.formats.includes(formatId));

	if (filteredInputs.length === 0)
		return (
			<div className="flex flex-col items-center justify-center h-32 gap-2">
				<p className="text-gray-600">This format doesn't require any additional input</p>
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
							onChange={
								input.name === "interviewDate"
									? handleInterviewDatePickerChange
									: handleDatePickerChange
							}
							name={input.name}
							showTime={input.name === "interviewDate"}
						/>
					) : input.type === "select" ? (
						<Select defaultValue="male" onChange={handleGenderChange} options={input.options} />
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
											: input.name === "roleplayScreenShots"
											? screenshotsInput
											: formatData[input.name as keyof FormatData] || ""
									}
								/>
								{(input.name === "reasons" || input.name === "roleplayScreenShots") && (
									<Button
										onClick={() => addItem(input.name === "reasons" ? "reasons" : "screenshots")}
										type="primary"
									>
										add
									</Button>
								)}
							</div>
							{(input.name === "reasons" || input.name === "roleplayScreenShots") && (
								<div className="flex md:flex-col gap-2">
									{(
										formatData[input.name === "reasons" ? "reasons" : "roleplayScreenShots"] || []
									).map((item, idx) => (
										<div key={idx} className="flex gap-2 items-center">
											<span className="text-[12px]">{item}</span>
											<Button
												danger
												onClick={() => {
													setFormatData((prev) => ({
														...prev,
														[input.name === "reasons" ? "reasons" : "roleplayScreenShots"]:
															(
																prev[
																	input.name === "reasons"
																		? "reasons"
																		: "roleplayScreenShots"
																] || []
															).filter((_, i) => i !== idx),
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
