/**
 * Detects whether the LSSD Format Tool browser extension is installed.
 *
 * The extension's id is fixed by the `key` in extension/manifest.json, so the
 * app can always address it even though it is loaded unpacked. Chrome only
 * exposes `chrome.runtime.sendMessage` to pages an extension names in
 * `externally_connectable`, and only answers if that extension is present — so
 * a silent ping is all it takes.
 *
 * The check always fails safe: anything unexpected (no API, no answer, a
 * browser that is not Chromium) reports "not installed", which simply leaves
 * the suggestion in place.
 */

/** Fixed by the manifest `key`; see extension/README.md. */
export const EXTENSION_ID = "oipafligldacjdmbbenimnhngkpolgan";

/** How long to wait for the extension to answer before giving up on it. */
const PING_TIMEOUT_MS = 600;

interface RuntimeWithMessaging {
	sendMessage: (
		extensionId: string,
		message: unknown,
		callback: (response?: { installed?: boolean }) => void,
	) => void;
	lastError?: { message?: string };
}

const runtime = (): RuntimeWithMessaging | undefined =>
	(globalThis as { chrome?: { runtime?: RuntimeWithMessaging } }).chrome?.runtime;

/** True when the extension is installed and answered the ping. */
export const detectExtension = (): Promise<boolean> =>
	new Promise((resolve) => {
		const api = runtime();
		if (typeof api?.sendMessage !== "function") {
			resolve(false);
			return;
		}

		let settled = false;
		const finish = (value: boolean) => {
			if (settled) return;
			settled = true;
			resolve(value);
		};

		const timer = window.setTimeout(() => finish(false), PING_TIMEOUT_MS);

		try {
			api.sendMessage(EXTENSION_ID, { type: "LSSD_PING" }, (response) => {
				window.clearTimeout(timer);
				// Read lastError so a missing extension does not log a warning.
				void api.lastError;
				finish(Boolean(response?.installed));
			});
		} catch {
			window.clearTimeout(timer);
			finish(false);
		}
	});
