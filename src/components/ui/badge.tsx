import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex shrink-0 items-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:shrink-0",
	{
		variants: {
			tone: {
				neutral: "border-subtle bg-surface-2 text-ink-muted",
				brand: "border-brand/25 bg-brand/12 text-brand-ink",
				accent: "border-accent/25 bg-accent/12 text-accent",
				success: "border-success/25 bg-success-soft text-success",
				warning: "border-warning/25 bg-warning-soft text-warning",
				danger: "border-danger/25 bg-danger-soft text-danger",
				info: "border-info/25 bg-info-soft text-info",
			},
			size: {
				sm: "h-6 gap-1 px-2 text-[11px] [&_svg]:size-3",
				md: "h-7 gap-1.5 px-2.5 text-[11.5px] [&_svg]:size-3.5",
			},
		},
		defaultVariants: {
			tone: "neutral",
			size: "sm",
		},
	}
);

function Badge({ className, tone, size, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return <span data-slot="badge" className={cn(badgeVariants({ tone, size, className }))} {...props} />;
}

export { Badge, badgeVariants };
