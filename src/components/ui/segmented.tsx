import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
	value: T;
	label: string;
}

/** Compact segmented control for two-to-four mutually exclusive choices. */
export function Segmented<T extends string>({
	value,
	onChange,
	options,
	ariaLabel,
	size = "md",
	className,
}: {
	value: T;
	onChange: (value: T) => void;
	options: SegmentedOption<T>[];
	ariaLabel: string;
	size?: "sm" | "md";
	className?: string;
}) {
	return (
		<div
			role="radiogroup"
			aria-label={ariaLabel}
			className={cn(
				"inline-flex items-center gap-0.5 rounded-control border border-subtle bg-surface-2 p-0.5",
				className
			)}
		>
			{options.map((option) => {
				const isActive = option.value === value;
				return (
					<button
						key={option.value}
						type="button"
						role="radio"
						aria-checked={isActive}
						onClick={() => onChange(option.value)}
						className={cn(
							"rounded-[9px] font-medium whitespace-nowrap transition-colors duration-150",
							size === "sm" ? "h-7 px-2.5 text-[11.5px]" : "h-9 px-3 text-[12.5px]",
							isActive
								? "bg-surface text-ink shadow-xs ring-1 ring-subtle"
								: "text-ink-muted hover:text-ink"
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
