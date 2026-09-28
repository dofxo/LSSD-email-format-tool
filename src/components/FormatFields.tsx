import { useEffect, useState } from "react";
import { CalendarDays, Check, Clock, ImageIcon, MousePointerClick, Plus, Sparkles, Square, SquareCheck, Trash2 } from "lucide-react";
import moment from "moment";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChargesPicker } from "@/components/ChargesPicker";
import { Combobox } from "@/components/ui/combobox";
import { GroupField } from "@/components/GroupField";
import { Field, Input, LabelContent, Textarea } from "@/components/ui/input";
import { PanelEmpty } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { TimeInput } from "@/components/ui/timeInput";
import { isFilled } from "@/lib/formats";
import { plainLabel } from "@/lib/labelText";
import type { DateStyle, FormatData, FormatInputField } from "@/types";

const currentDateValue = (withTime: boolean) => moment().format(withTime ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD");

/** Reformats a native date/datetime input value into the email's date style. */
const formatDateValue = (raw: string, format: DateStyle = "full", hasTime = false) => {
	const date = moment.utc(raw);
	if (!date.isValid()) return raw;
	if (format === "shortYear") {
		return `${date.format("DD")}/${date.format("MMM").toUpperCase()}/${date.format("YY")}`;
	}
	if (format === "short") {
		const datePart = `${date.format("DD")}/${date.format("MMM").toUpperCase()}/${date.format("YYYY")}`;
		return hasTime ? `${datePart} - ${date.format("HH:mm")}` : datePart;
	}
	return hasTime ? date.format("MMMM Do, YYYY - HH:mm") : date.format("MMMM Do, YYYY");
};

/** The output styles every date input can be switched between, picker order. */
const DATE_STYLE_OPTIONS: { value: DateStyle; label: string }[] = [
	{ value: "full", label: "Month DD, YYYY" },
	{ value: "short", label: "DD/MMM/YYYY" },
	{ value: "shortYear", label: "DD/MMM/YY" },
];

const cleanLabel = (label: string) => label.replace(/\s*\n\s*$/, "").trim();

/**
 * The link inside an image answer: a whole `[img]…[/img]` block pasted off a
 * post is taken back to the URL in it, so the preview shows the picture and the
 * tags the field prints are the only ones in the report.
 */
const imageUrlIn = (value: string) =>
	value
		.trim()
		.replace(/^\[img[^\]]*\]\s*/i, "")
		.replace(/\s*\[\/img\]$/i, "")
		.trim();

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
	const [listDrafts, setListDrafts] = useState<Record<string, string>>({});
	/** Links that would not load, so a picture that is not there is not drawn over and over. */
	const [brokenLinks, setBrokenLinks] = useState<Record<string, boolean>>({});

	// Drop local (unformatted) values whenever the fields are reset upstream.
	useEffect(() => {
		if (resetKey === 0) return;
		setRawDates({});
		setListDrafts({});
		setBrokenLinks({});
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

	// Restore the raw date-picker values for inputs saved from an earlier visit,
	// by reverse-parsing the formatted date stored in the report data.
	useEffect(() => {
		if (!formatId) return;
		fields.forEach((field) => {
			if (field.type !== "date") return;
			const saved = formatData[field.name as keyof FormatData];
			if (typeof saved !== "string" || !saved) return;

			setRawDates((prev) => {
				if (prev[field.name]) return prev;
				const withTime = field.name === "interviewDate";
				const patterns = [
					"DD/MMM/YYYY - HH:mm",
					"MMMM Do, YYYY - HH:mm",
					"DD/MMM/YYYY",
					"DD/MMM/YY",
					"MMMM Do, YYYY",
				];
				const strict = moment.utc(saved, patterns, true);
				const date = strict.isValid() ? strict : moment.utc(saved, patterns);
				if (!date.isValid()) return prev;
				return {
					...prev,
					[field.name]: date.format(withTime ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"),
				};
			});
		});
	}, [formatId, fields, formatData]);

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	const markBroken = (url: string) =>
		setBrokenLinks((prev) => (prev[url] ? prev : { ...prev, [url]: true }));

	const handleSelectChange = (name: string, value: string) => {
		setFormatData((prev) => ({ ...prev, [name]: value }));
	};

	/**
	 * The style a date field prints in: whatever was chosen for it here, then the
	 * catalogue's own default, then (for the shared `date` field) the app-wide
	 * style saved with earlier drafts.
	 */
	const dateStyleFor = (field: FormatInputField): DateStyle =>
		formatData.dateFormats?.[field.name] ??
		field.dateStyle ??
		(field.name === "date" ? (formatData.dateFormat ?? "full") : "full");

	const handleDateChange = (name: string, value: string, dateStyle?: DateStyle) => {
		setRawDates((prev) => {
			const next = { ...prev };
			if (value) next[name] = value;
			else delete next[name];
			return next;
		});

		setFormatData((prev) => ({
			...prev,
			[name]:
				value
					? formatDateValue(
							value,
							dateStyle ?? (name === "date" ? (prev.dateFormat ?? "full") : "full"),
							value.includes("T"),
						)
					: undefined,
		}));
	};

	/**
	 * Switches one date field's output style, re-printing whatever it already
	 * holds. The choice is remembered per field, so changing the Dive Team's log
	 * date leaves every other format's dates exactly as they were.
	 */
	const handleDateStyleChange = (name: string, value: DateStyle) => {
		const raw = rawDates[name];
		setFormatData((prev) => ({
			...prev,
			dateFormats: { ...prev.dateFormats, [name]: value },
			// The field named `date` keeps the app-wide style in step with it.
			...(name === "date" ? { dateFormat: value } : {}),
			...(raw ? { [name]: formatDateValue(raw, value, raw.includes("T")) } : {}),
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
		<div className="flex min-w-0 flex-col gap-5">
			{fields.map((field, index) => {
				const rawValue = formatData[field.name as keyof FormatData];
				const stringValue = typeof rawValue === "string" ? rawValue : "";
				const meta = isFilled(rawValue) ? (
					<Check className="size-3.5 text-success" aria-label="Filled in" />
				) : null;
				const label = cleanLabel(field.label);
				// The wording as it is shown — numbered as the form asks it, with any
				// picture the label asks for — and as plain words for the places a screen
				// reader reads it out.
				const labelNode = <LabelContent text={label} ordinal={index + 1} />;
				const labelText = plainLabel(label);

				if (field.type === "list" || field.type === "images") {
					// A repeating list that holds image links: the entries are URLs, so each
					// one is typed and checked the same way a single image field's is.
					const isImageList = field.type === "images";
					const items = Array.isArray(rawValue) ? (rawValue as string[]) : [];
					const draft = listDrafts[field.name] ?? "";
					const addItem = () => {
						const value = isImageList ? imageUrlIn(draft) : draft.trim();
						if (!value) return;
						setFormatData((prev) => ({
							...prev,
							[field.name]: [...((prev[field.name as keyof FormatData] as string[]) ?? []), value],
						}));
						setListDrafts((prev) => ({ ...prev, [field.name]: "" }));
					};
					const removeItem = (index: number) => {
						setFormatData((prev) => ({
							...prev,
							[field.name]: ((prev[field.name as keyof FormatData] as string[]) ?? []).filter(
								(_, itemIndex) => itemIndex !== index,
							),
						}));
					};
					return (
						<Field
							key={field.name}
							label={labelNode}
							htmlFor={field.name}
							hint={field.hint}
							wide
							meta={items.length ? `${items.length} added` : undefined}
						>
							<div className="flex gap-2">
								<Input
									id={field.name}
									name={field.name}
									type={isImageList ? "url" : "text"}
									inputMode={isImageList ? "url" : undefined}
									autoComplete={isImageList ? "off" : undefined}
									spellCheck={isImageList ? false : undefined}
									value={draft}
									placeholder={
										field.itemPlaceholder ??
										(isImageList ? "Paste an image link, then press Enter" : "Type an item, then press Enter")
									}
									onChange={(event) => setListDrafts((prev) => ({ ...prev, [field.name]: event.target.value }))}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											addItem();
										}
									}}
								/>
								<Button
									variant="secondary"
									size="md"
									onClick={addItem}
									disabled={!draft.trim()}
									className="shrink-0"
								>
									<Plus />
									Add
								</Button>
							</div>

							{items.length > 0 ? (
								<ul className="mt-1 flex flex-col gap-1.5">
									{items.map((item, index) => (
										<li
											key={`${item}-${index}`}
											className="animate-fade flex items-center gap-2.5 rounded-xl border border-subtle bg-surface-2 py-1.5 pr-1.5 pl-3"
										>
											{isImageList && !brokenLinks[imageUrlIn(item)] ? (
												<img
													src={imageUrlIn(item)}
													alt=""
													title={imageUrlIn(item)}
													onError={() => markBroken(imageUrlIn(item))}
													className="size-8 shrink-0 rounded-lg border border-subtle bg-surface-2 object-cover"
												/>
											) : null}
											<span className="min-w-0 flex-1 truncate text-[13px] text-ink">{item}</span>
											<button
												type="button"
												onClick={() => removeItem(index)}
												aria-label={`Remove item ${index + 1}`}
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
					const dateStyle = dateStyleFor(field);
					return (
						<Field
							key={field.name}
							wide
							label={labelNode}
							htmlFor={field.name}
							hint={field.hint}
							meta={meta}
						>
							<div className="flex flex-wrap items-center gap-2">									<Input
										id={field.name}
										name={field.name}
										type={withTime ? "datetime-local" : "date"}
										lang="en-GB"
										value={rawDates[field.name] ?? ""}
									onChange={(event) => handleDateChange(field.name, event.target.value, dateStyle)}
									className="min-w-[150px] flex-1 sm:max-w-[220px]"
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleDateChange(field.name, currentDateValue(withTime), dateStyle)}
									className="shrink-0"
								>
									<CalendarDays />
									{withTime ? "Now" : "Today"}
								</Button>
								<Segmented
									size="sm"
									ariaLabel={`${labelText} date style`}
									value={dateStyle}
									onChange={(value) => handleDateStyleChange(field.name, value)}
									options={DATE_STYLE_OPTIONS}
									className="shrink-0"
								/>
							</div>
						</Field>
					);
				}

				if (field.type === "check" || field.type === "checkbox") {
					const selected = Array.isArray(rawValue) ? (rawValue as string[]) : [];
					return (
						<Field
							key={field.name}
							label={labelNode}
							hint={field.hint}
							wide
							meta={selected.length ? `${selected.length} ticked` : undefined}
						>
							<div className="grid gap-1.5 sm:grid-cols-2">
								{(field.items ?? []).map((item, index) => {
									const itemKey = `${field.name}:${index}`;
									const checked = selected.includes(itemKey);
									return (
										<label
											key={itemKey}
											className={cn(
												"flex cursor-pointer items-start gap-2.5 rounded-xl border border-subtle bg-surface-2 px-3 py-2 text-[13px] leading-snug text-ink transition-colors duration-150",
												"hover:bg-surface-3",
												checked && "border-accent bg-accent-soft",
											)}
										>
											<input
												type="checkbox"
												className="sr-only"
												checked={checked}
												onChange={() => {
													const next = checked
														? selected.filter((item) => item !== itemKey)
														: [...selected, itemKey];
													setFormatData((prev) => ({ ...prev, [field.name]: next }));
												}}
											/>
											{checked ? (
												<SquareCheck className="mt-0.5 size-4 shrink-0 text-accent" />
											) : (
												<Square className="mt-0.5 size-4 shrink-0 text-ink-faint" />
											)}
											<span>{item}</span>
										</label>
									);
								})}
							</div>
						</Field>
					);
				}

				if (field.type === "group") {
					return (
						<GroupField
							key={field.name}
							field={field}
							value={rawValue}
							label={labelNode}
							onChange={(entries) => setFormatData((prev) => ({ ...prev, [field.name]: entries }))}
						/>
					);
				}

				if (field.type === "charges") {
					const codes = Array.isArray(rawValue) ? (rawValue as string[]) : [];
					return (
						<Field
							key={field.name}
							label={labelNode}
							hint={field.hint}
							wide
							meta={codes.length ? `${codes.length} picked` : undefined}
						>
							<ChargesPicker
								id={field.name}
								value={codes}
								ariaLabel={labelText}
								onChange={(next) => setFormatData((prev) => ({ ...prev, [field.name]: next }))}
							/>
						</Field>
					);
				}

				if (field.type === "time") {
					return (
						<Field key={field.name} label={labelNode} htmlFor={field.name} hint={field.hint} wide meta={meta}>
							<div className="flex flex-wrap items-center gap-2">
								<TimeInput
									id={field.name}
									value={stringValue}
									ariaLabel={labelText}
									onChange={(value) => setFormatData((prev) => ({ ...prev, [field.name]: value || undefined }))}
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										setFormatData((prev) => ({ ...prev, [field.name]: moment().utc().format("HH:mm") }))
									}
									className="shrink-0"
								>
									<Clock className="size-4" />
									Now
								</Button>
							</div>
						</Field>
					);
				}

				if (field.type === "select") {
					return (
						<Field
							key={field.name}
							label={labelNode}
							htmlFor={field.name}
							hint={field.hint}
							meta={meta}
						>
							<Combobox
								id={field.name}
								value={stringValue}
								onChange={(value) => handleSelectChange(field.name, value)}
								options={field.options ?? []}
								placeholder="Select…"
								ariaLabel={labelText}
							/>
						</Field>
					);
				}

				if (field.type === "textarea") {
					return (
						<Field
							key={field.name}
							label={labelNode}
							htmlFor={field.name}
							hint={field.hint}
							wide
							meta={meta}
						>
							<Textarea
								id={field.name}
								name={field.name}
								value={stringValue}
								onChange={handleTextChange}
							/>
						</Field>
					);
				}

				// An image field asks for a link and prints it as the picture it points
				// at, so the answer is shown above the report as the reader will see it.
				if (field.type === "image") {
					const url = imageUrlIn(stringValue);
					const shown = Boolean(url) && !brokenLinks[url];
					return (
						<Field
							key={field.name}
							label={labelNode}
							htmlFor={field.name}
							hint={field.hint}
							wide
							meta={meta}
						>
							<div className="flex min-w-0 items-center gap-2">
								<Input
									id={field.name}
									name={field.name}
									type="url"
									inputMode="url"
									autoComplete="off"
									spellCheck={false}
									placeholder="https://…"
									value={stringValue}
									onChange={handleTextChange}
									className="min-w-0 flex-1"
								/>
								{shown ? (
									<img
										src={url}
										alt=""
										title="Preview of the linked picture"
										onError={() => markBroken(url)}
										className="size-11 shrink-0 rounded-xl border border-subtle bg-surface-2 object-cover"
									/>
								) : (
									<span
										title="The linked picture shows here once a link is pasted"
										className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-subtle text-ink-faint"
									>
										<ImageIcon className="size-4" />
									</span>
								)}
							</div>
						</Field>
					);
				}

				return (
					<Field
						key={field.name}
						label={labelNode}
						htmlFor={field.name}
						hint={field.hint}
						meta={meta}
					>
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
