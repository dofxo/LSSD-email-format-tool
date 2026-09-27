/**
 * LSSD Format Tool — content script for gov.eclipse-rp.net.
 *
 * Pressing "Open in government website" in the tool opens the posting page with
 * the title and body carried in the URL fragment. This script reads that on
 * load and fills the form, so the post is ready to submit with no clicking,
 * copying or pasting.
 *
 * The fields it targets are the forum's own:
 *   subject -> input id/name "subject"
 *   message -> textarea id/name "message"
 */
(function () {
	if (window.__lssdFormatToolLoaded) return;
	window.__lssdFormatToolLoaded = true;

	var common = window.LSSDCommon;

	var SUBJECT_SELECTORS = ["input#subject", 'input[name="subject"]'];
	var MESSAGE_SELECTORS = ["textarea#message", 'textarea[name="message"]'];

	// How long to keep looking for the form when it is rendered after load.
	var FORM_TIMEOUT_MS = 15000;

	// ---------------------------------------------------------------------------
	// The posting form
	// ---------------------------------------------------------------------------

	function find(selectors) {
		for (var i = 0; i < selectors.length; i++) {
			var element = document.querySelector(selectors[i]);
			if (element && !element.disabled && !element.readOnly) return element;
		}
		return null;
	}

	function findFields() {
		return { subject: find(SUBJECT_SELECTORS), message: find(MESSAGE_SELECTORS) };
	}

	function setField(element, value) {
		element.focus();
		element.value = value;
		element.dispatchEvent(new Event("input", { bubbles: true }));
		element.dispatchEvent(new Event("change", { bubbles: true }));
		element.dispatchEvent(new Event("keyup", { bubbles: true }));
	}

	/**
	 * Drops the payload into the form. The title is only written when the page
	 * actually offers a subject box (edits and replies often do not).
	 */
	function fill(payload) {
		var fields = findFields();
		if (!fields.message) return { ok: false, reason: "no-form" };

		if (payload.title && fields.subject) setField(fields.subject, payload.title);
		setField(fields.message, payload.body);
		return { ok: true, filledTitle: Boolean(payload.title && fields.subject) };
	}

	// ---------------------------------------------------------------------------
	// Confirmation notice
	// ---------------------------------------------------------------------------

	var noticeHost = null;

	function showNotice(message) {
		if (noticeHost) noticeHost.remove();

		var host = document.createElement("div");
		var root = host.attachShadow({ mode: "open" });
		var style = document.createElement("style");
		style.textContent =
			":host{all:initial}" +
			"*{box-sizing:border-box;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
			".toast{position:fixed;right:20px;bottom:20px;z-index:2147483000;max-width:300px;display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:14px;background:#0f172a;color:#e5e7eb;border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 44px rgba(0,0,0,.4);font-size:12.5px;line-height:1.5;opacity:0;transition:opacity .2s ease}" +
			".toast.in{opacity:1}" +
			".tick{display:flex;align-items:center;justify-content:center;flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:#16a34a;color:#fff;font-size:12px;font-weight:700}" +
			".title{font-weight:600;color:#fff;display:block;margin-bottom:2px}";

		var toast = document.createElement("div");
		toast.className = "toast";
		toast.innerHTML =
			'<span class="tick">✓</span>' +
			'<span><span class="title">Post filled in</span>' +
			"Title and body are in place — review it, then submit.</span>";

		root.appendChild(style);
		root.appendChild(toast);
		document.body.appendChild(host);
		noticeHost = host;

		requestAnimationFrame(function () {
			toast.classList.add("in");
		});
		setTimeout(function () {
			toast.classList.remove("in");
			setTimeout(function () {
				if (noticeHost === host) {
					host.remove();
					noticeHost = null;
				}
			}, 250);
		}, 6000);
	}

	// ---------------------------------------------------------------------------
	// Auto-fill from the link the tool opened
	// ---------------------------------------------------------------------------

	/** Removes the payload from the address bar so a refresh starts clean. */
	function clearFragment() {
		try {
			history.replaceState(null, "", window.location.pathname + window.location.search);
		} catch (error) {
			/* a page that blocks history rewriting just keeps the fragment */
		}
	}

	var filled = false;
	var startedAt = Date.now();
	var observer = null;

	function attempt() {
		if (filled) return true;

		var payload = common.readPayloadFromUrl(window.location.href);
		if (!payload || !payload.body) return false;

		// Wait for the form rather than giving up on the first pass.
		if (!findFields().message) return false;

		var result = fill(payload);
		if (!result.ok) return false;

		filled = true;
		clearFragment();
		showNotice();
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		return true;
	}

	window.addEventListener("hashchange", function () {
		attempt();
	});

	if (!attempt()) {
		// Posting pages sometimes build the form after load, so keep watching
		// until it shows up (or we run out of patience).
		observer = new MutationObserver(function () {
			if (attempt() || Date.now() - startedAt > FORM_TIMEOUT_MS) {
				observer.disconnect();
				observer = null;
			}
		});
		observer.observe(document.documentElement, { childList: true, subtree: true });
	}
})();
