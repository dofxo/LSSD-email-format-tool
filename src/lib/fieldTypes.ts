import type { FormatInputField } from "@/types";

/** Every input type /admin can pick, in menu order. */
export const FIELD_TYPES: FormatInputField["type"][] = [
	"text",
	"number",
	"date",
	"time",
	"select",
	"textarea",
	"check",
	"list",
];

/** Human labels for those types, shared by the field editor and the body editor. */
export const TYPE_LABELS: Record<FormatInputField["type"], string> = {
	text: "Single line text",
	number: "Number",
	date: "Date picker",
	time: "Time picker",
	select: "Dropdown",
	textarea: "Paragraph",
	check: "Checklist",
	list: "Repeating list",
};
