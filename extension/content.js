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
 *
 * A skin that wraps the body in a rich-text editor (phpBB ships SCEditor with
 * BBCode on by default) is written through that editor, because the editor
 * syncs its own copy back over the textarea when the post is sent — writing the
 * textarea alone would be undone.
 */
(function () {
	if (window.__lssdFormatToolLoaded) return;
	window.__lssdFormatToolLoaded = true;

	var common = window.LSSDCommon;

	var SUBJECT_SELECTORS = ["input#subject", 'input[name="subject"]'];
	var MESSAGE_SELECTORS = ["textarea#message", 'textarea[name="message"]'];

	// How long to keep looking for the form when it is rendered after load.
	var FORM_TIMEOUT_MS = 15000;

	// After the first fill the page's own scripts may still be settling (a draft
	// being restored, an editor being built). The text is written again over this
	// window, unless the user has already touched the form.
	var REAPPLY_DELAYS_MS = [250, 700, 1500, 3000];

	// ---------------------------------------------------------------------------
	// The posting form
	// ---------------------------------------------------------------------------

	/** Set while this script is writing, so its own events are not read as typing. */
	var applying = false;
	/** Set the moment the user touches the form, which ends every re-write. */
	var userEdited = false;

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

	/** The rich-text editor wrapping the body, when the skin uses one. */
	function editorFor(element) {
		try {
			if (window.sceditor && typeof window.sceditor.instance === "function") {
				return window.sceditor.instance(element, true) || window.sceditor.instance(element) || null;
			}
		} catch (error) {
			/* an editor that cannot answer is treated as none */
		}
		return null;
	}

	/** An editable iframe the skin put in the body's place, if there is one. */
	function iframeFor(element) {
		var scopes = [];
		if (element.closest) {
			var container = element.closest(".sceditor-container");
			if (container) scopes.push(container);
		}
		if (element.parentElement) scopes.push(element.parentElement);

		for (var i = 0; i < scopes.length; i++) {
			var frame = scopes[i].querySelector("iframe");
			if (!frame) continue;
			try {
				var body = frame.contentDocument && frame.contentDocument.body;
				if (body && body.isContentEditable) return body;
			} catch (error) {
				/* a frame this script cannot read is not ours to write */
			}
		}
		return null;
	}

	/**
	 * Puts the body where the forum reads it from: through the editor when one
	 * wraps the textarea, otherwise into the textarea itself.
	 */
	function writeBody(element, value) {
		var editor = editorFor(element);
		if (editor) {
			try {
				if (typeof editor.val === "function") editor.val(value);
				if (typeof editor.updateOriginal === "function") editor.updateOriginal();
				return;
			} catch (error) {
				/* fall through to the textarea */
			}
		}

		var frameBody = iframeFor(element);
		if (frameBody) {
			frameBody.innerHTML = value;
			frameBody.dispatchEvent(new Event("input", { bubbles: true }));
			return;
		}

		setField(element, value);
	}

	function writeTitle(element, value) {
		if (element.value === value) return;
		setField(element, value);
	}

	/** Ends every re-write as soon as the user starts editing the post. */
	function watchForEdits(element) {
		var mark = function () {
			if (!applying) userEdited = true;
		};
		["input", "keydown", "paste", "cut", "drop"].forEach(function (type) {
			element.addEventListener(type, mark, true);
		});
	}

	/**
	 * Drops the payload into the form. The title is only written when the page
	 * actually offers a subject box (edits and replies often do not).
	 */
	function fill(payload) {
		var fields = findFields();
		if (!fields.message) return { ok: false, reason: "no-form" };

		applying = true;
		if (payload.title && fields.subject) writeTitle(fields.subject, payload.title);
		writeBody(fields.message, payload.body);
		applying = false;

		return { ok: true, filledTitle: Boolean(payload.title && fields.subject) };
	}

	/** Writes the body again while the page settles, stopping at the first edit. */
	function scheduleReapply(payload) {
		REAPPLY_DELAYS_MS.forEach(function (delay) {
			window.setTimeout(function () {
				if (userEdited) return;
				var fields = findFields();
				if (!fields.message) return;

				applying = true;
				writeBody(fields.message, payload.body);
				if (payload.title && fields.subject && !fields.subject.value) {
					writeTitle(fields.subject, payload.title);
				}
				applying = false;
			}, delay);
		});
	}

	// ---------------------------------------------------------------------------
	// Confirmation notice
	// ---------------------------------------------------------------------------

	var noticeHost = null;

	function showNotice(title, message, tone) {
		if (noticeHost) noticeHost.remove();

		var host = document.createElement("div");
		var root = host.attachShadow({ mode: "open" });
		var style = document.createElement("style");
		var badgeColor = tone === "warn" ? "#d97706" : "#16a34a";
		var badgeGlyph = tone === "warn" ? "!" : "✓";
		style.textContent =
			":host{all:initial}" +
			"*{box-sizing:border-box;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
			".toast{position:fixed;right:20px;bottom:20px;z-index:2147483000;max-width:320px;display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:14px;background:#0f172a;color:#e5e7eb;border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 44px rgba(0,0,0,.4);font-size:12.5px;line-height:1.5;opacity:0;transition:opacity .2s ease}" +
			".toast.in{opacity:1}" +
			".tick{display:flex;align-items:center;justify-content:center;flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:" +
			badgeColor +
			";color:#fff;font-size:12px;font-weight:700}" +
			".title{font-weight:600;color:#fff;display:block;margin-bottom:2px}";

		var toast = document.createElement("div");
		toast.className = "toast";
		var badge = document.createElement("span");
		badge.className = "tick";
		badge.textContent = badgeGlyph;
		var text = document.createElement("span");
		var heading = document.createElement("span");
		heading.className = "title";
		heading.textContent = title;
		text.appendChild(heading);
		text.appendChild(document.createTextNode(message));

		root.appendChild(style);
		root.appendChild(toast);
		toast.appendChild(badge);
		toast.appendChild(text);
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
		}, 8000);
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
	// Read once at load: the link either arrived with a post in it or it did not.
	var payloadAtLoad = common.readPayloadFromUrl(window.location.href);

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
		showNotice("Post filled in", "Title and body are in place — review it, then submit.");
		watchForEdits(findFields().message);
		scheduleReapply(payload);
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

		// A post that never lands is worth saying out loud: silently doing nothing
		// looks exactly like a broken extension.
		window.setTimeout(function () {
			if (filled || !payloadAtLoad) return;
			if (observer) {
				observer.disconnect();
				observer = null;
			}
			showNotice(
				"Could not fill this page",
				"The posting form was not found here, so nothing was filled in. Check you are logged in and on a posting page — otherwise copy the post from the tool.",
				"warn",
			);
		}, FORM_TIMEOUT_MS);
	}
})();
