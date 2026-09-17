/**
 * Turns the raw BBCode template into readable prose so the preview can be
 * skimmed. This is display-only; copying always uses the original text.
 */
export function toReadableText(raw: string): string {
	return raw
		.replace(/\[img\]([\s\S]*?)\[\/img\]/gi, "⟨image⟩")
		.replace(/\[fimg[^\]]*\]([\s\S]*?)\[\/fimg\]/gi, "⟨image⟩")
		.replace(/\[\/?(?:[a-z][a-z0-9]*)(?:=[^\]]*)?\]/gi, "")
		.split("\n")
		.map((line) => line.replace(/[ \t]+$/g, ""))
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

export const countWords = (text: string): number => {
	const trimmed = text.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
};
