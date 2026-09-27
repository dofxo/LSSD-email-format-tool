/**
 * Caret-aware insertion for the admin body editors.
 *
 * Selecting part of a body and inserting a token replaces that exact text,
 * which is how a loaded (generated) body is turned into a template.
 */

/** The placeholder text for a field or profile token. */
export const tokenSnippet = (token: string) => `{{${token}}}`;

/**
 * The body with every `{{token}}` for a field taken back out, so a token-driven
 * format can drop a field from its rows without anyone hunting through the body
 * text by hand. Whatever the token held reverts to plain (empty) text.
 */
export const removeTokenFromBody = (body: string, token: string): string =>
	body.split(tokenSnippet(token)).join("");

/**
 * The body with one `{{token}}` renamed. The body is what names a field, so
 * this is how a token is changed after it was dropped in: every occurrence is
 * rewritten and the field it asks for follows the name.
 */
export const renameTokenInBody = (body: string, from: string, to: string): string =>
	from === to ? body : body.split(tokenSnippet(from)).join(tokenSnippet(to));

/**
 * The body with `{{token}}` dropped in at the textarea's caret, replacing any
 * selection. Returns the next value and moves the caret after the insertion.
 */
export const insertTokenAtCaret = (
	element: HTMLTextAreaElement | null,
	token: string,
	value: string,
): string => {
	const snippet = tokenSnippet(token);
	if (!element) return `${value}${snippet}`;

	const start = element.selectionStart ?? element.value.length;
	const end = element.selectionEnd ?? start;
	const caret = start + snippet.length;
	const next = element.value.slice(0, start) + snippet + element.value.slice(end);

	// The state update re-renders before this runs, so the caret can be placed
	// after the token without the browser resetting it to the end.
	requestAnimationFrame(() => {
		element.focus();
		element.setSelectionRange(caret, caret);
	});

	return next;
};
