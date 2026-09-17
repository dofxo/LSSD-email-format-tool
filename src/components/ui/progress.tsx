import { cn } from "@/lib/utils";

function Progress({
	value,
	tone = "accent",
	className,
}: {
	value: number;
	tone?: "accent" | "success" | "warning";
	className?: string;
}) {
	const clamped = Math.max(0, Math.min(100, Math.round(value)));

	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clamped}
			className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-3", className)}
		>
			<div
				className={cn(
					"h-full rounded-full transition-[width,background-color] duration-500 ease-out",
					tone === "success" && "bg-success",
					tone === "warning" && "bg-warning",
					tone === "accent" && "bg-accent"
				)}
				style={{ width: `${clamped}%` }}
			/>
		</div>
	);
}

export { Progress };
