import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium outline-none transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-150 focus-visible:ring-4 focus-visible:ring-[var(--brand-ring)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				primary:
					"bg-brand-solid text-brand-solid-ink shadow-[0_1px_2px_rgba(16,24,40,0.14)] hover:bg-brand-solid-hover hover:shadow-raised",
				secondary:
					"border border-subtle bg-surface text-ink shadow-xs hover:border-strong hover:bg-surface-2",
				soft: "bg-accent/12 text-accent hover:bg-accent/20",
				ghost: "text-ink-muted hover:bg-surface-3 hover:text-ink",
				danger: "bg-danger text-white shadow-[0_1px_2px_rgba(16,24,40,0.14)] hover:brightness-110",
				link: "text-accent underline-offset-4 hover:underline",
			},
			size: {
				sm: "h-9 gap-1.5 px-3.5 text-[13px]",
				md: "h-11 px-4.5 text-sm",
				lg: "h-12 px-6 text-[15px]",
				icon: "size-10",
				"icon-sm": "size-9",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "md",
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
	);
}

export { Button, buttonVariants };
