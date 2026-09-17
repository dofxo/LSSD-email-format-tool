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

function Field({
	label,
	hint,
	htmlFor,
	meta,
	className,
	children,
}: {
	label: React.ReactNode;
	hint?: React.ReactNode;
	htmlFor?: string;
	meta?: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
			<div className="flex items-baseline justify-between gap-3">
				<Label htmlFor={htmlFor}>{label}</Label>
				{meta ? <span className="shrink-0 text-[11.5px] text-ink-faint">{meta}</span> : null}
			</div>
			{children}
			{hint ? <p className="text-[12px] leading-relaxed text-ink-faint">{hint}</p> : null}
		</div>
	);
}

export { Input, Textarea, Label, Field };
