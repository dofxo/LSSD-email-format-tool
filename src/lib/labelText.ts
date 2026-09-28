/**
 * Labels are wording, but a question sometimes needs a picture with it — a
 * diagram of the procedure being asked about, or a signature banner to sign
 * under. An admin writes `{img=https://…}` in a field's label and that becomes
 * the picture itself when the form is filled in.
 *
 * Only a link that can actually be fetched is turned into one; anything else is
 * left on screen exactly as typed, so a mistyped marker is visible rather than
 * silently swallowed.
 */

/** A label's text, cut into plain runs with the images it asks for between them. */
export interface LabelPart {
	/** The literal text, or the whole marker when its URL was not usable. */
	text: string;
	/** The picture's URL, set only on the parts that render an image. */
	image?: string;
}

/**
 * `{img=https://…}` (the braces may be doubled, as in a body token), or the
 * BBCode `[img]https://…[/img]` shape, which is what a hand editing a body is
 * already used to.
 */
const IMAGE_MARKER = /\{\{?\s*img\s*=\s*([^}]*?)\s*\}?\}|\[img\]\s*(\S+?)\s*\[\/img\]/gi;

/** A link an `<img>` can be pointed at: a full http(s) URL, or a path from the site root. */
const usableImageUrl = (url: string): boolean => /^https?:\/\/\S+$/i.test(url) || /^\/[^/\s]/.test(url);

/**
 * A label as the parts it renders as. Markers with an unusable URL are folded
 * back into the text, so the text of the parts always adds back up to the label
 * the way it was written.
 */
export const labelParts = (label: string): LabelPart[] => {
	const parts: LabelPart[] = [];
	let end = 0;

	for (const match of label.matchAll(IMAGE_MARKER)) {
		const start = match.index ?? 0;
		const url = (match[1] ?? match[2] ?? "").trim();
		if (!usableImageUrl(url)) continue;
		if (start > end) parts.push({ text: label.slice(end, start) });
		parts.push({ text: "", image: url });
		end = start + match[0].length;
	}

	if (end < label.length) parts.push({ text: label.slice(end) });
	return parts;
};

/** Whether a label asks for a picture at all, so a preview is only shown when there is one. */
export const labelHasImage = (label: string): boolean =>
	labelParts(label).some((part) => part.image !== undefined);

/** The label's wording alone, with any picture markers taken out of it. */
export const plainLabel = (label: string): string =>
	labelParts(label)
		.map((part) => part.text)
		.join("")
		.replace(/[ \t]+/g, " ")
		.replace(/\n{2,}/g, "\n")
		.trim();
