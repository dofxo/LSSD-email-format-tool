/**
 * The payload the browser extension (see /extension) reads to fill the posting
 * form on the government website.
 *
 * It travels in the URL's fragment — the part after `#` — which browsers keep
 * entirely client-side: it is never sent to the forum, so the body stays local
 * and the server only ever sees its normal address. That is also what makes the
 * auto-fill possible, because the page can read it on load without the user
 * having to click anything.
 *
 * The shape is deliberately tiny and versioned, and the extension treats
 * anything that is not a valid payload as a plain body.
 */
const PAYLOAD_SOURCE = "lssd-paperwork-tool";

/** Fragment key the extension looks for. */
const FRAGMENT_KEY = "lssd";

interface GovPayload {
	source: typeof PAYLOAD_SOURCE;
	version: 1;
	title: string;
	body: string;
}

/** Serializes a title + body into the payload the extension reads. */
const buildGovPayload = (title: string, body: string): string =>
	JSON.stringify({
		source: PAYLOAD_SOURCE,
		version: 1,
		title: title.trim(),
		body,
	} satisfies GovPayload);

/** Base64url of the payload's UTF-8 bytes, safe to drop into a URL. */
const encodePayload = (payload: string): string => {
	const bytes = new TextEncoder().encode(payload);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Puts a title and body on a government link as a fragment, ready for the
 * extension to fill in the moment the page opens.
 */
export const withGovPayload = (url: string, title: string, body: string): string => {
	const fragment = `${FRAGMENT_KEY}=${encodePayload(buildGovPayload(title, body))}`;
	try {
		const parsed = new URL(url);
		parsed.hash = fragment;
		return parsed.toString();
	} catch {
		// A link that is not a full URL still works with the fragment appended.
		return `${url}${url.includes("#") ? "&" : "#"}${fragment}`;
	}
};
