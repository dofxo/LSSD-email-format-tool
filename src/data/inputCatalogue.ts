import { inputsByDivision } from "@/data/formatInputs";
import type { CatalogueInput, InputDefinition } from "@/lib/inputDefinitions";

/**
 * Catalogue inputs created at /admin, registered at runtime. The static import
 * of the admin store starts empty (the server sends its state after mount), so
 * callers register the fetched inputs here; every lookup below re-reads the
 * registry, keeping the catalogue live across saves.
 */
const customInputs: CatalogueInput[] = [];

/** Adds admin-created inputs to the live catalogue; replaces existing tokens. */
export const registerCustomInputs = (inputs: CatalogueInput[]) => {
	customInputs.length = 0;
	customInputs.push(...inputs);
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

/** Every catalogue token, alphabetically, for the editor's pickers. */
export const catalogueFieldNames = (): string[] =>
	Object.keys(buildInputCatalogue()).sort((a, b) => a.localeCompare(b));

/** Whether a token names a catalogue input (rather than a deputy-profile value). */
export const isCatalogueField = (name: string): boolean =>
	Object.prototype.hasOwnProperty.call(buildInputCatalogue(), name);

/** A catalogue input's definition, or undefined when the name is unknown. */
export const catalogueInputFor = (name: string): InputDefinition | undefined =>
	buildInputCatalogue()[name];
