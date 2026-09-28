# LSSD Format Tool (browser extension)

A small Chrome/Edge (Manifest V3) extension that fills the topic **title** and
the post **body** on the department's government website
(`gov.eclipse-rp.net`) so a post written in the LSSD Format Tool needs no
copying or pasting.

## How it works

1. In the tool, pick a format and fill it in. Formats that post to the
   government website also show a **Topic title**.
2. Press **Open in government website**.
3. The posting page opens with the title and body **already filled in** — review
   it and submit.

There is nothing to click on the page and no popup: the extension reads the post
from the link the tool opens and fills the form itself.

### How the post travels

The tool puts the title and body into the link's **fragment** — the part after
`#`, e.g. `https://gov.eclipse-rp.net/…post#lssd=eyJ…`. Browsers keep fragments
entirely client-side, so:

- the forum's server never sees the content, only its normal address;
- the page can read it the moment it loads, which is what makes the fill
  automatic instead of needing a click.

The fragment is removed from the address bar as soon as the form is filled, so
refreshing the page will not fill it a second time.

The payload is base64url of a small JSON envelope:

```json
{ "source": "lssd-paperwork-tool", "version": 1, "title": "…", "body": "…" }
```

### The fields it fills

- title → `input` with id/name **`subject`**
- body → `textarea` with id/name **`message`**

A page with no subject box (a reply or an edit) still gets its body filled.

If the skin wraps the body in a rich-text editor, the post is written **through
that editor** rather than straight into the textarea — an editor keeps its own
copy of the text and syncs it back over the textarea when the post is sent, so
writing the textarea alone would be undone. The editor is also re-written for a
few seconds after the first fill, because posting pages often restore a draft or
build the editor a moment after load. The moment you start typing, the extension
stops touching the form.

When the link carries a post but no posting form turns up on the page, a small
notice says so instead of failing silently — the usual cause is not being logged
in, or the page redirecting somewhere that is not a posting page.

## How the tool knows it is installed

The manifest carries a fixed `key`, which pins the extension to one id:

```
oipafligldacjdmbbenimnhngkpolgan
```

`background.js` answers a `LSSD_PING` on that id, and `externally_connectable`
lets the tool's pages ask. Once it answers, the tool stops offering the
extension. Because the id is pinned by the key, an unpacked install always
answers on the same address instead of getting a random one per machine.

If you would rather not leave `externally_connectable` open to every site, list
just the tool's own origins instead of `<all_urls>`:

```json
"externally_connectable": {
	"matches": ["http://localhost/*", "https://your-tool.example/*"]
}
```

The check fails safe — if the answer never arrives, the tool simply keeps
showing the suggestion.

## Install (unpacked)

1. Download and unzip `lssd-format-tool.zip` (the app's header puzzle icon
   offers it), or zip this folder yourself. It unzips to a single
   `lssd-format-tool/` folder.
2. Open `chrome://extensions` (or `edge://extensions`).
3. Turn on **Developer mode** (top-right).
4. Click **Load unpacked** and select that folder.

Because the manifest pins an id, a copy loaded before that change appears as a
second, separate extension. Remove the old one so it does not sit there unused.

### Updating an installed copy

Unpacked extensions are read from the folder you pointed at, so replacing the
files is not enough on its own: open `chrome://extensions`, find **LSSD Format
Tool** and press its **Reload** icon (or remove it and load the new folder). The
version on the card tells you which copy you are running — the current one is
**1.0.1**, which writes through a rich-text editor and retries briefly after
loading.

## Files

- `manifest.json` — MV3 manifest (no popup; a fixed `key` pins the id).
- `background.js` — answers the tool's "are you installed?" ping.
- `common.js` — reads and parses the payload out of a URL fragment.
- `content.js` — fills the posting form and shows a brief confirmation.
- `icons/` — toolbar and store icons built from the department logo.
