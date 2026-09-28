/**
 * Shared class string for text-style form controls (inputs, textareas,
 * combobox triggers) so every control in the app renders identically.
 */
export const controlFieldClass =
	"control-ring w-full rounded-control border border-subtle bg-surface-2 text-[14px] text-ink shadow-[inset_0_1px_1px_rgba(16,24,40,0.03)] transition-[border-color,box-shadow,background-color] duration-150 hover:border-strong disabled:cursor-not-allowed disabled:opacity-60";

/**
 * A textarea's own box — its padding, line-height and scrolling. Kept apart from
 * the element because the admin body editor draws a second copy of the text
 * behind its textarea, and that copy has to line up with it glyph for glyph.
 */
export const textareaFieldClass = `${controlFieldClass} thin-scroll min-h-[104px] resize-y px-3.5 py-2.5 leading-relaxed`;

/**
 * Reserves the scrollbar's width in a scroll container even while nothing
 * overflows, so a textarea and the copy behind it wrap at the same column once
 * the textarea starts scrolling.
 */
export const stableScrollbarGutterClass = "[scrollbar-gutter:stable]";
