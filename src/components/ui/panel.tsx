import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="panel"
			className={cn(
				"animate-rise rounded-panel border border-subtle bg-surface shadow-card",
				className
			)}
			{...props}
		/>
	);
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="panel-header"
			className={cn(
				"flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-subtle px-5 py-4 sm:px-6",
				className
			)}
			{...props}
		/>
	);
}

function PanelHeading({
	step,
	icon: Icon,
	title,
	description,
	children,
	className,
}: {
	step?: number | string;
	icon?: LucideIcon;
	title: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex min-w-0 flex-wrap items-start gap-x-3 gap-y-2", className)}>
			{step !== undefined ? (
				<span
					aria-hidden
					className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-accent/12 text-[12px] font-semibold text-accent ring-1 ring-inset ring-accent/20"
				>
					{step}
				</span>
			) : Icon ? (
				<span
					aria-hidden
					className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-accent/12 text-accent ring-1 ring-inset ring-accent/20"
				>
					<Icon className="size-4" />
				</span>
			) : null}

			<div className="min-w-[11rem] flex-1 space-y-0.5">
				<h2 className="text-[15px] leading-6 font-semibold text-ink">{title}</h2>
				{description ? (
					<p className="text-[12.5px] leading-relaxed text-ink-muted">{description}</p>
				) : null}
			</div>

			{children ? <div className="ml-auto flex shrink-0 items-center gap-2">{children}</div> : null}
		</div>
	);
}

function PanelBody({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("px-5 py-5 sm:px-6", className)} {...props} />;
}

function PanelFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-wrap items-center gap-3 border-t border-subtle px-5 py-4 sm:px-6", className)}
			{...props}
		/>
	);
}

function PanelEmpty({
	icon: Icon,
	title,
	description,
	children,
	className,
	size = "md",
}: {
	icon: LucideIcon;
	title: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	size?: "sm" | "md";
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center rounded-2xl border border-dashed border-strong/70 bg-surface-2/50 px-6 text-center",
				size === "sm" ? "gap-2.5 py-7" : "gap-3 py-10",
				className
			)}
		>
			<span className="flex size-11 items-center justify-center rounded-2xl bg-surface-3 text-ink-faint">
				<Icon className="size-5" />
			</span>
			<div className="space-y-1">
				<p className={cn("font-medium text-ink", size === "sm" ? "text-[13px]" : "text-sm")}>{title}</p>
				{description ? (
					<p className="mx-auto max-w-sm text-[12.5px] leading-relaxed text-ink-muted">{description}</p>
				) : null}
			</div>
			{children}
		</div>
	);
}

export { Panel, PanelHeader, PanelHeading, PanelBody, PanelFooter, PanelEmpty };
