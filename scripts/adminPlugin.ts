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
import type { FormatInputField } from "../src/types";

const ENDPOINT = "/api/admin/formats";
const STORE_FILE = path.join("src", "formats", "admin.ts");
const START = "/* ADMIN_DATA */";
const END = "/* /ADMIN_DATA */";

const DIVISIONS = ["RED", "TSD", "ATD", "General", "Supervisory", "FTB", "SEB"] as const;
type DivisionId = (typeof DIVISIONS)[number];

const FIELD_TYPES: FormatInputField["type"][] = [
	"text",
	"number",
	"date",
	"time",
	"select",
	"textarea",
	"check",
	"list",
];
const DATE_STYLES: NonNullable<FormatInputField["dateStyle"]>[] = ["full", "short", "shortYear"];

const emptyStore = (): AdminFormatStore => ({ overrides: {}, custom: [], inputs: {} });

const asString = (value: unknown) => (typeof value === "string" ? value : "");

/** Keeps a single input field well-formed, or drops it when it cannot be used. */
const sanitizeField = (input: unknown): FormatInputField | null => {
	if (!input || typeof input !== "object") return null;
	const raw = input as Partial<FormatInputField>;
	const name = asString(raw.name).trim();
	const type = FIELD_TYPES.includes(raw.type as FormatInputField["type"])
		? (raw.type as FormatInputField["type"])
		: null;
	if (!name || !type) return null;

	const clean: FormatInputField = {
		name,
		label: asString(raw.label),
		type,
		formats: Array.isArray(raw.formats) ? raw.formats.map(asString).filter(Boolean) : [],
	};

	const hint = asString(raw.hint);
	if (hint) clean.hint = hint;

	if (type === "select" && Array.isArray(raw.options)) {
		clean.options = raw.options
			.filter((option): option is { value: string; label: string } => !!option && typeof option === "object")
			.map((option) => ({ value: asString(option.value), label: asString(option.label) }))
			.filter((option) => option.value);
	}

	if (type === "check" && Array.isArray(raw.items)) {
		clean.items = raw.items.map(asString).filter(Boolean);
	}

	if (type === "list" && typeof raw.itemPlaceholder === "string" && raw.itemPlaceholder) {
		clean.itemPlaceholder = raw.itemPlaceholder;
	}

	if (type === "date" && DATE_STYLES.includes(raw.dateStyle as NonNullable<FormatInputField["dateStyle"]>)) {
		clean.dateStyle = raw.dateStyle;
	}

	return clean;
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
			if (typeof entry.body === "string") clean.body = entry.body;
			if (typeof entry.govLink === "string") clean.govLink = entry.govLink;
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
				body: asString(entry.body),
				govLink: asString(entry.govLink),
			});
		}
	}

	if (raw.inputs && typeof raw.inputs === "object") {
		for (const [division, fields] of Object.entries(raw.inputs)) {
			if (!DIVISIONS.includes(division as DivisionId) || !Array.isArray(fields)) continue;
			const clean = fields.map(sanitizeField).filter((field): field is FormatInputField => field !== null);
			store.inputs[division as DivisionId] = clean;
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
