import { useEffect, useState } from "react";
import { CalendarDays, Check, MousePointerClick, Plus, Sparkles, Trash2 } from "lucide-react";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Field, Input, Textarea } from "@/components/ui/input";
import { PanelEmpty } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { isFilled } from "@/lib/formats";
import type { FormatData, FormatInputField } from "@/types";

const currentDateValue = (withTime: boolean) => moment().format(withTime ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD");

/** Reformats a native date/datetime input value into the email's date style. */
const formatDateValue = (raw: string, format: "full" | "short" = "full", hasTime = false) => {
	const date = moment.utc(raw);
	if (!date.isValid()) return raw;
	if (format === "short") {
		const datePart = `${date.format("DD")}/${date.format("MMM").toUpperCase()}/${date.format("YYYY")}`;
		return hasTime ? `${datePart} - ${date.format("HH:mm")}` : datePart;
	}
	return hasTime ? date.format("MMMM Do, YYYY - HH:mm") : date.format("MMMM Do, YYYY");
};

const cleanLabel = (label: string) => label.replace(/\s*\n\s*$/, "").trim();

interface FormatFieldsProps {
	formatId: string;
	fields: FormatInputField[];
	formatData: FormatData;
	setFormatData: React.Dispatch<React.SetStateAction<FormatData>>;
	/** Increment to clear the fields' local state (used by the Reset action). */
	resetKey?: number;
}

export function FormatFields({ formatId, fields, formatData, setFormatData, resetKey = 0 }: FormatFieldsProps) {
	const [rawDates, setRawDates] = useState<Record<string, string>>({});
	const [reasonDraft, setReasonDraft] = useState("");

	// Drop local (unformatted) values whenever the fields are reset upstream.
	useEffect(() => {
		if (resetKey === 0) return;
		setRawDates({});
		setReasonDraft("");
	}, [resetKey]);

	// Pre-fill the email date with today so common cases need zero typing.
	useEffect(() => {
		if (!formatId) return;
		if (!fields.some((field) => field.name === "date")) return;

		const today = currentDateValue(false);
		setRawDates((prev) => (prev.date ? prev : { ...prev, date: today }));
		setFormatData((prev) =>
			prev.date ? prev : { ...prev, date: formatDateValue(today, prev.dateFormat ?? "full") }
		);
	}, [formatId, fields, setFormatData]);

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (name: string, value: string) => {
		setRawDates((prev) => {
			const next = { ...prev };
			if (value) next[name] = value;
			else delete next[name];
			return next;
		});

		setFormatData((prev) => ({
			...prev,
			[name]: value ? formatDateValue(value, name === "date" ? (prev.dateFormat ?? "full") : "full", value.includes("T")) : undefined,
		}));
	};

	const handleDateFormatChange = (value: "full" | "short") => {
		setFormatData((prev) => ({
			...prev,
			dateFormat: value,
			date: prev.date && rawDates.date ? formatDateValue(rawDates.date, value, false) : prev.date,
		}));
	};

	const addReason = () => {
		const value = reasonDraft.trim();
		if (!value) return;
		setFormatData((prev) => ({ ...prev, reasons: [...(prev.reasons ?? []), value] }));
		setReasonDraft("");
	};

	const removeReason = (index: number) => {
		setFormatData((prev) => ({
			...prev,
			reasons: (prev.reasons ?? []).filter((_, itemIndex) => itemIndex !== index),
		}));
	};

	if (!formatId) {
		return (
			<PanelEmpty
				icon={MousePointerClick}
				title="No format selected"
				description="Pick a response format in step 1 and only the fields it needs will show up here."
			/>
		);
	}

	if (fields.length === 0) {
		return (
			<PanelEmpty
				size="sm"
				icon={Sparkles}
				title="Nothing to fill in"
				description="This format is generated from your deputy details alone. It is ready to copy."
			/>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
			{fields.map((field) => {
				const rawValue = formatData[field.name as keyof FormatData];
				const stringValue = typeof rawValue === "string" ? rawValue : "";
				const meta = isFilled(rawValue) ? (
					<Check className="size-3.5 text-success" aria-label="Filled in" />
				) : null;
				const label = cleanLabel(field.label);

				if (field.name === "reasons") {
					const reasons = formatData.reasons ?? [];
					return (
						<Field
							key={field.name}
							className="sm:col-span-2"
							label={label}
							htmlFor={field.name}
							hint={field.hint}
							meta={reasons.length ? `${reasons.length} added` : undefined}
						>
							<div className="flex gap-2">
								<Input
									id={field.name}
									name={field.name}
									value={reasonDraft}
									placeholder="Type a reason, then press Enter"
									onChange={(event) => setReasonDraft(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											addReason();
										}
									}}
								/>
								<Button
									variant="secondary"
									size="md"
									onClick={addReason}
									disabled={!reasonDraft.trim()}
									className="shrink-0"
								>
									<Plus />
									Add
								</Button>
							</div>

							{reasons.length > 0 ? (
								<ul className="mt-1 flex flex-col gap-1.5">
									{reasons.map((reason, index) => (
										<li
											key={`${reason}-${index}`}
											className="animate-fade flex items-center gap-2.5 rounded-xl border border-subtle bg-surface-2 py-1.5 pr-1.5 pl-3"
										>
											<span className="min-w-0 flex-1 truncate text-[13px] text-ink">{reason}</span>
											<button
												type="button"
												onClick={() => removeReason(index)}
												aria-label={`Remove reason ${index + 1}`}
												className="flex size-7 shrink-0 items-center justify-center rounded-lg text-ink-faint transition-colors duration-150 hover:bg-danger-soft hover:text-danger focus-visible:ring-4 focus-visible:ring-[var(--brand-ring)] focus-visible:outline-hidden"
											>
												<Trash2 className="size-3.5" />
											</button>
										</li>
									))}
								</ul>
							) : null}
						</Field>
					);
				}

				if (field.type === "date") {
					const withTime = field.name === "interviewDate";
					const hasFormatToggle = field.name === "date";
					return (
						<Field
							key={field.name}
							className={hasFormatToggle ? "sm:col-span-2" : undefined}
							label={label}
							htmlFor={field.name}
							hint={field.hint}
							meta={meta}
						>
							<div className="flex flex-wrap items-center gap-2">
								<Input
									id={field.name}
									name={field.name}
									type={withTime ? "datetime-local" : "date"}
									value={rawDates[field.name] ?? ""}
									onChange={(event) => handleDateChange(field.name, event.target.value)}
									className="min-w-[150px] flex-1 sm:max-w-[220px]"
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleDateChange(field.name, currentDateValue(withTime))}
									className="shrink-0"
								>
									<CalendarDays />
									{withTime ? "Now" : "Today"}
								</Button>
								{hasFormatToggle ? (
									<Segmented
										size="sm"
										ariaLabel="Date style"
										value={(formatData.dateFormat ?? "full") as "full" | "short"}
										onChange={handleDateFormatChange}
										options={[
											{ value: "full", label: "Month DD, YYYY" },
											{ value: "short", label: "DD/MMM/YYYY" },
										]}
										className="shrink-0"
									/>
								) : null}
							</div>
						</Field>
					);
				}

				if (field.type === "select") {
					return (
						<Field key={field.name} label={label} htmlFor={field.name} hint={field.hint} meta={meta}>
							<Combobox
								id={field.name}
								value={stringValue}
								onChange={(value) => handleSelectChange(field.name, value)}
								options={field.options ?? []}
								placeholder="Select…"
								ariaLabel={label}
							/>
						</Field>
					);
				}

				if (field.type === "textarea") {
					return (
						<Field
							key={field.name}
							className="sm:col-span-2"
							label={label}
							htmlFor={field.name}
							hint={field.hint}
							meta={meta}
						>
							<Textarea
								id={field.name}
								name={field.name}									value={stringValue}
									onChange={handleTextChange}
								/>
						</Field>
					);
				}

				return (
					<Field key={field.name} label={label} htmlFor={field.name} hint={field.hint} meta={meta}>
						<Input
							id={field.name}
							name={field.name}
							type={field.type === "number" ? "number" : "text"}
							inputMode={field.type === "number" ? "numeric" : undefined}
							value={stringValue}
							onChange={handleTextChange}
						/>
					</Field>
				);
			})}
		</div>
	);
}
