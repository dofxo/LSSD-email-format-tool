/**
 * LSSD Format Tool — background service worker.
 *
 * Its only job is to answer a ping from the paperwork tool's pages, so the tool
 * can tell the extension is already installed and stop offering it. The id the
 * tool pings is fixed by the `key` in the manifest, so an unpacked install
 * always answers on the same address.
 *
 * It replies only to that ping — nothing else is exposed to web pages.
 */
const PING = "LSSD_PING";

chrome.runtime.onMessageExternal.addListener((message, _sender, sendResponse) => {
	if (!message || message.type !== PING) return;

	sendResponse({
		installed: true,
		version: chrome.runtime.getManifest().version,
	});
});
