import * as React from "react";

import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
	return <input data-slot="input" className={cn(controlFieldClass, "h-11 px-3.5", className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				controlFieldClass,
				"thin-scroll min-h-[104px] resize-y px-3.5 py-2.5 leading-relaxed",
				className
			)}
			{...props}
		/>
	);
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn("text-[12.5px] font-medium text-ink-muted", className)}
			{...props}
		/>
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
		<p className="min-w-0 text-[12px] leading-relaxed text-ink-faint">{hint}</p>
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

export { Input, Textarea, Label, Field };
