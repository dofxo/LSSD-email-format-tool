/**
 * Shared clipboard/URL payload helpers for the LSSD Format Tool extension.
 *
 * The tool puts a small JSON envelope — the topic title and the post body —
 * into the government link's fragment. Browsers never send that part to the
 * server, so this is how the extension gets the post without asking anything of
 * the page. Loaded before content.js.
 */
(function (global) {
	var SOURCE = "lssd-paperwork-tool";
	var FRAGMENT_KEY = "lssd";

	/** A parsed payload: { title, body }, or null when there is nothing usable. */
	function parsePayload(text) {
		if (typeof text !== "string" || !text.trim()) return null;
		var trimmed = text.trim();

		if (trimmed.charAt(0) === "{") {
			try {
				var parsed = JSON.parse(trimmed);
				if (parsed && parsed.source === SOURCE && typeof parsed.body === "string") {
					return { title: typeof parsed.title === "string" ? parsed.title : "", body: parsed.body };
				}
			} catch (error) {
				/* not an envelope — fall through to plain body */
			}
		}

		return { title: "", body: text };
	}

	/** Base64url back to text, mirroring the encoder in the app (src/lib/govPayload.ts). */
	function decodeBase64Url(encoded) {
		try {
			var base64 = String(encoded).replace(/-/g, "+").replace(/_/g, "/");
			while (base64.length % 4) base64 += "=";
			var binary = atob(base64);
			var bytes = new Uint8Array(binary.length);
			for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
			return new TextDecoder().decode(bytes);
		} catch (error) {
			return null;
		}
	}

	/** The payload waiting in a URL fragment such as "#lssd=eyJ…", if any. */
	function readPayloadFromUrl(url) {
		var hash = "";
		try {
			hash = new URL(url, "https://gov.eclipse-rp.net").hash || "";
		} catch (error) {
			return null;
		}

		var match = hash.match(new RegExp(FRAGMENT_KEY + "=([A-Za-z0-9_-]+)"));
		if (!match) return null;

		var text = decodeBase64Url(match[1]);
		return text === null ? null : parsePayload(text);
	}

	global.LSSDCommon = {
		SOURCE: SOURCE,
		FRAGMENT_KEY: FRAGMENT_KEY,
		parsePayload: parsePayload,
		readPayloadFromUrl: readPayloadFromUrl,
	};
})(typeof window !== "undefined" ? window : self);
