// Dev-only bridge for the /admin page. A static SPA cannot write to disk, so
// while `npm run dev` is running this middleware exposes the formats store:
//
//   GET  /api/admin/formats  -> the store currently saved in the file
//   POST /api/admin/formats  -> rewrite the ADMIN_DATA block of the file
//
// It is never part of the production build (configureServer only runs in dev).
import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

import type { Plugin } from "vite";

import type {
	AdminCustomFormat,
	AdminFormatOverride,
	AdminFormatStore,
} from "../src/formats/adminTypes";
import { normaliseInput } from "../src/lib/inputDefinitions";
import type { FormatFieldPick } from "../src/types";

const ENDPOINT = "/api/admin/formats";
const STORE_FILE = path.join("src", "formats", "admin.ts");
const START = "/* ADMIN_DATA */";
const END = "/* /ADMIN_DATA */";

const DIVISIONS = ["RED", "TSD", "ATD", "General", "Supervisory", "FTB", "SEB"] as const;
type DivisionId = (typeof DIVISIONS)[number];

const emptyStore = (): AdminFormatStore => ({ overrides: {}, custom: [], inputs: [] });

const asString = (value: unknown) => (typeof value === "string" ? value : "");

/**
 * Keeps a format's input picks well-formed: a catalogue name plus optional
 * wording. Returns undefined when the value is not an array at all, so an
 * override that never touched its inputs keeps falling back to the defaults.
 */
const sanitizePicks = (input: unknown): FormatFieldPick[] | undefined => {
	if (!Array.isArray(input)) return undefined;
	const picks: FormatFieldPick[] = [];
	for (const value of input) {
		if (!value || typeof value !== "object") continue;
		const raw = value as Partial<FormatFieldPick>;
		const name = asString(raw.name).trim();
		if (!name) continue;
		const pick: FormatFieldPick = { name };
		const label = asString(raw.label);
		if (label) pick.label = label;
		const hint = asString(raw.hint);
		if (hint) pick.hint = hint;
		picks.push(pick);
	}
	return picks;
};

/** Keeps only well-formed entries, so a bad request can never corrupt the file. */
const sanitize = (input: unknown): AdminFormatStore => {
	const store = emptyStore();
	if (!input || typeof input !== "object") return store;
	const raw = input as Partial<AdminFormatStore>;

	if (raw.overrides && typeof raw.overrides === "object") {
		for (const [key, value] of Object.entries(raw.overrides)) {
			if (!value || typeof value !== "object") continue;
			const entry = value as AdminFormatOverride;
			const clean: AdminFormatOverride = {};
			if (typeof entry.title === "string") clean.title = entry.title;
			if (typeof entry.topicTitle === "string") clean.topicTitle = entry.topicTitle;
			if (typeof entry.body === "string") clean.body = entry.body;
			if (typeof entry.govLink === "string") clean.govLink = entry.govLink;
			if (typeof entry.category === "string") clean.category = entry.category;
			const picks = sanitizePicks(entry.fields);
			if (picks) clean.fields = picks;
			if (Object.keys(clean).length > 0) store.overrides[key] = clean;
		}
	}

	if (Array.isArray(raw.custom)) {
		for (const value of raw.custom) {
			if (!value || typeof value !== "object") continue;
			const entry = value as AdminCustomFormat;
			const division = asString(entry.division) as DivisionId;
			const id = asString(entry.id);
			if (!id || !DIVISIONS.includes(division)) continue;
			store.custom.push({
				id,
				division,
				title: asString(entry.title),
				topicTitle: asString(entry.topicTitle),
				body: asString(entry.body),
				govLink: asString(entry.govLink),
				category: asString(entry.category),
				fields: sanitizePicks(entry.fields) ?? [],
			});
		}
	}

	if (Array.isArray(raw.inputs)) {
		for (const value of raw.inputs) {
			const clean = normaliseInput(value);
			if (clean) store.inputs.push(clean);
		}
	}

	return store;
};

const readStore = (root: string): AdminFormatStore => {
	const file = path.resolve(root, STORE_FILE);
	const source = fs.readFileSync(file, "utf8");
	const start = source.indexOf(START);
	const end = source.indexOf(END, start + START.length);
	if (start === -1 || end === -1) return emptyStore();
	const json = source.slice(start + START.length, end).trim();
	return sanitize(JSON.parse(json) as unknown);
};

const writeStore = (root: string, store: AdminFormatStore) => {
	const file = path.resolve(root, STORE_FILE);
	const json = JSON.stringify(store, null, "\t");
	const source = `// This file backs the /admin page. Formats added or edited at /admin are saved
// here so they live in the repo beside the built-in formats.
//
// Prefer editing through /admin: the JSON between the ADMIN_DATA markers below
// is regenerated on every save. Hand edits are fine too, as long as the block
// stays valid JSON.
import type { AdminFormatStore } from "./adminTypes";

export const adminFormatStore: AdminFormatStore = ${START} ${json} ${END};
`;
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, source, "utf8");
};

const readBody = (req: IncomingMessage): Promise<string> =>
	new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += String(chunk);
		});
		req.on("end", () => resolve(body));
		req.on("error", reject);
	});

const reply = (res: ServerResponse, status: number, payload: unknown) => {
	res.statusCode = status;
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Cache-Control", "no-store");
	res.end(typeof payload === "string" ? payload : JSON.stringify(payload));
};

export function adminFormatsPlugin(): Plugin {
	return {
		name: "lssd-admin-formats",
		apply: "serve",
		configureServer(server) {
			const root = server.config.root;

			server.middlewares.use(ENDPOINT, (req, res, next) => {
				void (async () => {
					try {
						if (req.method === "GET") {
							reply(res, 200, readStore(root));
							return;
						}

						if (req.method === "POST") {
							const body = await readBody(req);
							const store = sanitize(JSON.parse(body) as unknown);
							writeStore(root, store);
							reply(res, 200, { ok: true });
							return;
						}

						next();
					} catch (error) {
						reply(res, 400, error instanceof Error ? error.message : "Bad request");
					}
				})();
			});
		},
	};
}
