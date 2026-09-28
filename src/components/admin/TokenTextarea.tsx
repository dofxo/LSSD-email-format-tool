import * as React from "react";

import { Textarea } from "@/components/ui/input";
import { catalogueInputFor } from "@/data/inputCatalogue";
import { bodySegments, profileTokens } from "@/lib/formatTemplates";
import { stableScrollbarGutterClass, textareaFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

const PROFILE_TOKENS = new Set(profileTokens.map((token) => token.token));

/**
 * A textarea cannot style parts of its own text — it paints one run of plain
 * text — so the body editor's `{{tokens}}` are picked out by a second, identical
 * copy of the text drawn underneath it.
 *
 * The mirror sits at the textarea's exact box (same padding, font, line-height
 * and wrapping) and carries the real text; the textarea above it keeps the
 * caret, the selection and the scrolling, with its own glyphs made transparent
 * so the coloured copy is what is seen. The two must stay in step, so they share
 * one class string and one scroll position — anything added to one belongs on
 * the other.
 */
export const TokenTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
	function TokenTextarea({ className, value, onScroll, ...props }, ref) {
		const mirrorRef = React.useRef<HTMLDivElement | null>(null);
		const text = typeof value === "string" ? value : "";

		// A trailing newline keeps the mirror at least as tall as the textarea's
		// own text, so scrolling to the end of a body does not run past it.
		const segments = React.useMemo(() => [...bodySegments(text), { text: "\n" }], [text]);

		const syncScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
			const mirror = mirrorRef.current;
			if (mirror) {
				mirror.scrollTop = event.currentTarget.scrollTop;
				mirror.scrollLeft = event.currentTarget.scrollLeft;
			}
			onScroll?.(event);
		};

		return (
			<div className="relative">
				<div
					ref={mirrorRef}
					aria-hidden="true"
					className={cn(
						textareaFieldClass,
						stableScrollbarGutterClass,
						"pointer-events-none absolute inset-0 overflow-hidden whitespace-pre-wrap break-words select-none",
						className,
					)}
				>
					{segments.map((segment, index) =>
						segment.token ? (
							<span
								key={index}
								className={cn(
									"rounded-[4px]",
									// A token nothing answers — a typo, or a field since deleted —
									// is called out in the warning colour, matching the notes below.
									PROFILE_TOKENS.has(segment.token) || catalogueInputFor(segment.token)
										? "bg-brand-soft text-brand"
										: "bg-warning-soft text-warning",
								)}
							>
								{segment.text}
							</span>
						) : (
							<React.Fragment key={index}>{segment.text}</React.Fragment>
						),
					)}
				</div>

				<Textarea
					ref={ref}
					value={value}
					onScroll={syncScroll}
					// Transparent glyphs and a coloured caret: the mirror behind draws the
					// text, this element draws where the typing goes. `block` keeps its box
					// from sitting on a text baseline, which would leave the wrapper — and so
					// the mirror stretched over it — a few pixels taller than the textarea.
					className={cn(
						className,
						"relative block bg-transparent caret-brand text-transparent",
						stableScrollbarGutterClass,
					)}
					{...props}
				/>
			</div>
		);
	},
);
