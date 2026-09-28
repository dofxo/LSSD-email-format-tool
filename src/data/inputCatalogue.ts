import { inputsByDivision } from "@/data/formatInputs";
import { profileTokens } from "@/lib/formatTemplates";
import type { CatalogueInput, InputDefinition } from "@/lib/inputDefinitions";

/**
 * Catalogue inputs created at /admin, registered at runtime. The static import
 * of the admin store starts empty (the server sends its state after mount), so
 * callers register the fetched inputs here; every lookup below re-reads the
 * registry, keeping the catalogue live across saves.
 */
const customInputs: CatalogueInput[] = [];

/** Bumped whenever the registry changes, so cached derivatives know to rebuild. */
let revision = 0;

/**
 * Tokens the deputy profile fills for every format. A field of the same name
 * could never be asked for: the two would shadow each other, and which value a
 * body printed would depend on which of them was read last.
 */
const profileOwned = new Set(profileTokens.map((token) => token.token));

/**
 * Adds admin-created inputs to the live catalogue; replaces existing tokens.
 * Anything named after a profile token is dropped rather than registered, so a
 * store that predates one cannot bring the duplicate field back.
 */
export const registerCustomInputs = (inputs: CatalogueInput[]) => {
	customInputs.length = 0;
	customInputs.push(...inputs.filter((field) => !profileOwned.has(field.name)));
	// Bumped rather than rebuilt here: the next lookup notices and folds the
	// catalogue once, however many of them there are.
	revision += 1;
};

/** The admin-created inputs currently registered. */
export const getCustomInputs = (): CatalogueInput[] => [...customInputs];

/** Strips the legacy per-format ticks, leaving just the field's own definition. */
const toDefinition = (field: CatalogueInput): InputDefinition => {
	const definition = { ...field } as Partial<CatalogueInput>;
	delete definition.name;
	return definition as InputDefinition;
};

/**
 * The predefined inputs any format can use, keyed by token name.
 *
 * Built by folding every division's built-in field table together (first
 * definition of each name wins), then overlaying the inputs created at /admin
 * so they shadow or extend the built-ins. Reads the registry on every call, so
 * a save at /admin is visible immediately.
 */
export const buildInputCatalogue = (): Record<string, InputDefinition> => {
	const catalogue: Record<string, InputDefinition> = {};
	for (const fields of Object.values(inputsByDivision)) {
		for (const field of fields) {
			if (catalogue[field.name]) continue;
			catalogue[field.name] = toDefinition(field);
		}
	}
	for (const field of customInputs) {
		catalogue[field.name] = toDefinition(field);
	}
	return catalogue;
};

/** Convenience: the catalogue computed once (static built-ins only). */
export const staticCatalogue = buildInputCatalogue();

/**
 * How many times the catalogue has changed. A caller that wants to remember
 * something derived from it (a list of rows, say) can hold this as a dependency
 * instead of rebuilding on every render.
 */
export const catalogueRevision = (): number => revision;

/**
 * The folded catalogue and its sorted names, kept from the last build. Folding
 * every division's field table is not free, and the surfaces that use it do one
 * lookup per field on screen — the picker alone would otherwise fold the whole
 * catalogue hundreds of times per render.
 */
let cache: { revision: number; catalogue: Record<string, InputDefinition>; names: string[] } | null = null;

const current = (): NonNullable<typeof cache> => {
	if (!cache || cache.revision !== revision) {
		const catalogue = buildInputCatalogue();
		cache = {
			revision,
			catalogue,
			names: Object.keys(catalogue).sort((a, b) => a.localeCompare(b)),
		};
	}
	return cache;
};

/** Every catalogue token, alphabetically, for the editor's pickers. */
export const catalogueFieldNames = (): string[] => [...current().names];

/** Whether a token names a catalogue input (rather than a deputy-profile value). */
export const isCatalogueField = (name: string): boolean =>
	Object.prototype.hasOwnProperty.call(current().catalogue, name);

/** A catalogue input's definition, or undefined when the name is unknown. */
export const catalogueInputFor = (name: string): InputDefinition | undefined =>
	current().catalogue[name];
