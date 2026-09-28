// Relative on purpose: this module sits in the dev server's own config graph
// (scripts/adminPlugin.ts reads it), where the `@` alias is not applied.
import { plainLabel } from "./labelText";
import type { FormatInputField, GroupSubField, GroupFieldType } from "@/types";

/** Every input type /admin can pick, in menu order. */
export const FIELD_TYPES = [
	"text",
	"number",
	"date",
	"time",
	"select",
	"textarea",
	"check",
	"checkbox",
	"list",
	"image",
	"images",
	"charges",
	"group",
] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

/** The types a repeating group's own answers can be. */
export const GROUP_FIELD_TYPES: GroupFieldType[] = ["text", "textarea", "select", "list", "charges"];

/** Human labels for a group's sub-field types. */
export const GROUP_TYPE_LABELS: Record<GroupFieldType, string> = {
	text: "Single line text",
	textarea: "Paragraph",
	select: "Dropdown",
	list: "Repeating list",
	charges: "Charges (penal code)",
};

/** Output styles a date input can render in. */
export const DATE_STYLES = ["full", "short", "shortYear"] as const;

/** Human labels for the input types, shared by the editors. */
export const TYPE_LABELS: Record<FieldType, string> = {
	text: "Single line text",
	number: "Number",
	date: "Date picker",
	time: "Time picker",
	select: "Dropdown",
	textarea: "Paragraph",
	check: "Checklist",
	checkbox: "Checkbox",
	list: "Repeating list",
	image: "Image URL",
	images: "Image URLs (several)",
	charges: "Charges (penal code)",
	group: "Repeating group",
};

/**
 * The definition of a shared catalogue input: everything except which formats
 * use it. `custom` marks inputs created at /admin — they live in the admin
 * store rather than the built-in tables.
 */
export type InputDefinition = Omit<FormatInputField, "name" | "formats"> & { custom?: boolean };

/** A catalogue input together with its token name. */
export type CatalogueInput = InputDefinition & { name: string };

/** A token name the body templates accept (`{{…}}` allows word characters and dots). */
export const isValidTokenName = (name: string): boolean => /^[\w.]+$/.test(name);

/**
 * A token name worked out from a field's wording, so the name box can be
 * offered filled in: "SEB Join Date" becomes `sebJoinDate`, "Note (optional)"
 * becomes `noteOptional`. Empty when the label holds nothing usable.
 */
export const suggestTokenName = (label: string): string => {
	// Any picture the wording asks for is left out first: a name worked out from
	// `{img=https://…}` would be the URL read aloud, not the question.
	const words = plainLabel(label)
		.replace(/[^\w\s.-]/g, " ")
		.split(/[\s._-]+/)
		.filter(Boolean);
	if (!words.length) return "";
	return words
		.map((word, index) =>
			index === 0
				? word.toLowerCase()
				: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
		)
		.join("");
};

/**
 * Keeps a catalogue input well-formed, whatever produced it (an /admin form or
 * a JSON payload). Returns null when it cannot be used.
 */
export const normaliseInput = (input: unknown): CatalogueInput | null => {
	if (!input || typeof input !== "object") return null;
	const raw = input as Partial<FormatInputField>;
	const name = typeof raw.name === "string" ? raw.name.trim() : "";
	const type = FIELD_TYPES.includes(raw.type as FieldType) ? (raw.type as FieldType) : null;
	if (!name || !isValidTokenName(name) || !type) return null;

	const definition: InputDefinition = {
		type,
		label: typeof raw.label === "string" ? raw.label : "",
	};
	const hint = typeof raw.hint === "string" ? raw.hint.trim() : "";
	if (hint) definition.hint = hint;

	if (type === "select" && Array.isArray(raw.options)) {
		const options = (raw.options as unknown[])
			.filter((option) => !!option && typeof option === "object")
			.map((option) => {
				const entry = option as { value?: unknown; label?: unknown };
				return { value: String(entry.value ?? ""), label: String(entry.label ?? "") };
			})
			.filter((option) => option.value);
		if (options.length) definition.options = options;
	}

	if (type === "check" && Array.isArray(raw.items)) {
		const items = raw.items.map((item) => String(item ?? "")).filter(Boolean);
		if (items.length) definition.items = items;
	}

	if (type === "checkbox" && Array.isArray(raw.items)) {
		const items = raw.items.map((item) => String(item ?? "")).filter(Boolean);
		if (items.length) definition.items = items;
	}

	if (type === "list" && typeof raw.itemPlaceholder === "string" && raw.itemPlaceholder.trim()) {
		definition.itemPlaceholder = raw.itemPlaceholder.trim();
	}

	if (type === "group") {
		const subFields = normaliseSubFields(raw.subFields);
		if (subFields.length) definition.subFields = subFields;
		// The entry template is kept verbatim — its line breaks and spacing are the
		// layout of the repeated block, so nothing here may tidy them away.
		if (typeof raw.template === "string" && raw.template.trim()) definition.template = raw.template;
	}

	if (type === "date" && DATE_STYLES.includes(raw.dateStyle as (typeof DATE_STYLES)[number])) {
		definition.dateStyle = raw.dateStyle as (typeof DATE_STYLES)[number];
	}

	return { name, ...definition };
};

/**
 * Keeps a repeating group's answers well-formed, dropping anything without a
 * usable name — a sub-field is filled in by token from the entry template, so
 * one that cannot be named could never be printed.
 */
export const normaliseSubFields = (input: unknown): GroupSubField[] => {
	if (!Array.isArray(input)) return [];
	return input
		.filter((entry) => !!entry && typeof entry === "object")
		.map((entry) => entry as Partial<GroupSubField>)
		.map((entry) => {
			const name = typeof entry.name === "string" ? entry.name.trim() : "";
			const type = GROUP_FIELD_TYPES.includes(entry.type as GroupFieldType)
				? (entry.type as GroupFieldType)
				: "text";
			const subField: GroupSubField = {
				name,
				label: typeof entry.label === "string" ? entry.label : "",
				type,
			};
			if (type === "select" && Array.isArray(entry.options)) {
				const options = (entry.options as unknown[])
					.filter((option) => !!option && typeof option === "object")
					.map((option) => {
						const o = option as { value?: unknown; label?: unknown };
						return { value: String(o.value ?? ""), label: String(o.label ?? "") };
					})
					.filter((option) => option.value);
				if (options.length) subField.options = options;
			}
			if (type === "list" && typeof entry.placeholder === "string" && entry.placeholder.trim()) {
				subField.placeholder = entry.placeholder.trim();
			}
			return subField;
		})
		.filter((entry) => entry.name && isValidTokenName(entry.name));
};
