import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { divisions } from "@/lib/divisions";
import { formatsForDivision } from "@/lib/formats";
import type { divisionsType } from "@/types";

interface DivisionSwitcherProps {
	value: divisionsType;
	onChange: (division: divisionsType) => void;
	/** True when the supervisory password has not been entered. */
	locked: boolean;
	className?: string;
}

export function DivisionSwitcher({ value, onChange, locked, className }: DivisionSwitcherProps) {
	const [focusedIndex, setFocusedIndex] = useState(() => divisions.findIndex((d) => d.id === value));
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const stripRef = useRef<HTMLDivElement>(null);

	// Keep the active division visible on small screens. The strip is scrolled
	// directly so the page itself never jumps.
	useEffect(() => {
		const index = divisions.findIndex((division) => division.id === value);
		setFocusedIndex(index);

		const strip = stripRef.current;
		const tab = tabRefs.current[index];
		if (!strip || !tab) return;

		const stripBox = strip.getBoundingClientRect();
		const tabBox = tab.getBoundingClientRect();
		const delta = tabBox.left - stripBox.left - (stripBox.width - tabBox.width) / 2;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		strip.scrollTo({ left: strip.scrollLeft + delta, behavior: reducedMotion ? "auto" : "smooth" });
	}, [value]);

	const moveFocus = (index: number, direction: number) => {
		const next = (index + direction + divisions.length) % divisions.length;
		setFocusedIndex(next);
		tabRefs.current[next]?.focus();
	};

	return (
		<div
			ref={stripRef}
			className={cn(
				"no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0",
				className
			)}
			role="tablist"
			aria-label="Division"
		>
			{divisions.map((division, index) => {
				const Icon = division.icon;
				const isActive = division.id === value;
				const isLocked = Boolean(division.restricted) && locked;
				const count = formatsForDivision(division.id).length;

				return (
					<button
						key={division.id}
						ref={(node) => {
							tabRefs.current[index] = node;
						}}
						type="button"
						role="tab"
						aria-selected={isActive}
						tabIndex={isActive || focusedIndex === index ? 0 : -1}
						onFocus={() => setFocusedIndex(index)}
						onClick={() => onChange(division.id)}
						onKeyDown={(event) => {
							if (event.key === "ArrowRight") moveFocus(index, 1);
							else if (event.key === "ArrowLeft") moveFocus(index, -1);
							else if (event.key === "Home") moveFocus(0, 0);
							else if (event.key === "End") moveFocus(divisions.length - 1, 0);
						}}
						className={cn(
							"group flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[13px] font-medium transition-[background-color,border-color,box-shadow,color] duration-150",
							isActive
								? "border-accent/30 bg-surface text-ink shadow-raised"
								: "border-transparent bg-surface/55 text-ink-muted hover:border-subtle hover:bg-surface hover:text-ink"
						)}
					>
						<Icon
							className={cn(
								"size-4 transition-colors",
								isActive ? "text-accent" : "text-ink-faint group-hover:text-ink-muted"
							)}
						/>
						<span>{division.label}</span>
						{isLocked ? (
							<Lock aria-label="Password required" className="size-3 text-ink-faint" />
						) : null}
						<span
							className={cn(
								"rounded-full px-1.5 text-[10.5px] font-semibold tabular-nums transition-colors",
								isActive ? "bg-accent/12 text-accent" : "bg-surface-3 text-ink-faint"
							)}
						>
							{count}
						</span>
					</button>
				);
			})}
		</div>
	);
}
