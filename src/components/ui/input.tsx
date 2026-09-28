import * as React from "react";

import { labelParts } from "@/lib/labelText";
import { controlFieldClass, textareaFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
	return <input data-slot="input" className={cn(controlFieldClass, "h-11 px-3.5", className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return <textarea data-slot="textarea" className={cn(textareaFieldClass, className)} {...props} />;
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			// `pre-line` so a label written over several lines (a question and its
			// qualifier, say) keeps those breaks instead of collapsing into one run.
			className={cn("text-[12.5px] font-medium whitespace-pre-line text-ink-muted", className)}
			{...props}
		/>
	);
}

/**
 * A field's wording with any picture it asks for: an admin writes
 * `{img=https://…}` in a label and the image is shown with the question, so a
 * form can carry a diagram or a signature banner. Used for the labels the
 * person filling the form reads, never for the ones naming a control.
 *
 * `ordinal` numbers the question as the form asks it — a long certification has
 * a dozen of them, and the count is worth seeing while filling it in. The number
 * is decoration around the wording, so it is drawn here rather than written into
 * the label itself.
 */
function LabelContent({ text, ordinal, className }: { text: string; ordinal?: number; className?: string }) {
	const parts = labelParts(text);
	// Nothing else to say for a picture alone, and nothing worth repeating for one
	// shown alongside wording that is read out anyway.
	const standalone = !parts.some((part) => part.text.trim());

	return (
		<span className={cn("whitespace-pre-line", className)}>
			{ordinal ? <span className="text-ink-faint tabular-nums">{ordinal}.</span> : null}
			{ordinal ? " " : null}
			{parts.map((part, index) =>
				part.image ? (
					<img
						key={index}
						src={part.image}
						alt={standalone ? "Image" : ""}
						title={part.image}
						className="my-1 block max-h-64 w-auto max-w-full rounded-control border border-subtle bg-surface object-contain"
					/>
				) : (
					<React.Fragment key={index}>{part.text}</React.Fragment>
				),
			)}
		</span>
	);
}

/**
 * Single-line controls all share one column width, so form rows line up and a
 * hint beside a control starts at the same x on every row. Multi-line controls
 * set `wide` and take the whole row instead.
 */
const controlColumnClass = "w-full min-w-0 sm:max-w-[30rem]";

function Field({
	label,
	hint,
	htmlFor,
	meta,
	className,
	wide = false,
	children,
}: {
	label: React.ReactNode;
	hint?: React.ReactNode;
	htmlFor?: string;
	meta?: React.ReactNode;
	className?: string;
	/** Lets the control fill the row. For textareas, checklists and other multi-line controls. */
	wide?: boolean;
	children: React.ReactNode;
}) {
	// Hints sit beside the control when the field is wide enough for both, and
	// drop underneath when it is not, rather than squeezing the control.
	const inlineHint = !wide && Boolean(hint);
	const hintNode = hint ? (
		<p className="min-w-0 text-[12px] leading-relaxed whitespace-pre-line text-ink-faint">{hint}</p>
	) : null;

	return (
		<div className={cn("flex min-w-0 flex-col gap-1.5", inlineHint && "@container", className)}>
			<div className={cn("flex items-baseline justify-between gap-3", !wide && controlColumnClass)}>
				<Label htmlFor={htmlFor}>{label}</Label>
				{meta ? <span className="shrink-0 text-[11.5px] text-ink-faint">{meta}</span> : null}
			</div>

			{wide ? (
				<>
					{children}
					{hintNode}
				</>
			) : (
				<div className="flex min-w-0 flex-col gap-1.5 @2xl:flex-row @2xl:items-center @2xl:gap-x-3">
					<div className={controlColumnClass}>{children}</div>
					{hintNode}
				</div>
			)}
		</div>
	);
}

export { Input, Textarea, Label, Field, LabelContent };
