import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronsUpDown, FileText } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { FormatOption } from "@/lib/formats";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { divisionsType } from "@/types";

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

interface FormatPickerProps {
	division: divisionsType;
	formatId: string;
	onSelect: (formatId: string) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	options: FormatOption[];
	fieldCount: number;
}

/** Primary control of the tool: pick the response format to generate. */
export function FormatPicker({
	division,
	formatId,
	onSelect,
	open,
	onOpenChange,
	options,
	fieldCount,
}: FormatPickerProps) {
	const selected = options.find((option) => option.id === formatId);
	const isEmpty = options.length === 0;

	// Category groups fold like the admin accordions: the heading toggles its
	// group, and searching always expands everything so matches stay visible.
	const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
	const [query, setQuery] = useState("");
	const searching = query.trim().length > 0;
	const isExpanded = (heading: string) => searching || !collapsed.has(heading);
	const toggleGroup = (heading: string) =>
		setCollapsed((prev) => {
			const next = new Set(prev);
			if (next.has(heading)) next.delete(heading);
			else next.add(heading);
			return next;
		});

	// Options keep their order, gathered under their category. Formats without a
	// category share one heading, so an uncategorised division is unchanged.
	const groups = useMemo(() => {
		const byHeading = new Map<string, FormatOption[]>();
		for (const option of options) {
			const heading = option.category ?? `${division} formats`;
			const bucket = byHeading.get(heading);
			if (bucket) bucket.push(option);
			else byHeading.set(heading, [option]);
		}
		return [...byHeading.entries()].map(([heading, items]) => ({ heading, items }));
	}, [options, division]);

	return (
		<div className="flex flex-col gap-2.5">
			<Popover open={open} onOpenChange={onOpenChange}>
				<PopoverTrigger asChild>
					<button
						type="button"
						role="combobox"
						aria-expanded={open}
						aria-label="Response format"
						disabled={isEmpty}
						className={cn(
							controlFieldClass,
							"flex h-14 cursor-pointer items-center gap-3 px-3.5 text-left disabled:cursor-not-allowed"
						)}
					>
						<span
							className={cn(
								"flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
								selected ? "bg-accent/12 text-accent" : "bg-surface-3 text-ink-faint"
							)}
						>
							<FileText className="size-4" />
						</span>

						<span className="min-w-0 flex-1">
							<span className="block text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
								Response format
							</span>
							<span
								title={isEmpty ? undefined : selected?.label}
								className={cn(
									"block truncate text-[14px] font-medium",
									selected ? "text-ink" : "text-ink-muted"
								)}
							>
								{isEmpty ? "No formats available" : (selected?.label ?? "Select a format…")}
							</span>
						</span>

						{!isEmpty && !selected ? (
							<kbd className="hidden shrink-0 rounded-md border border-subtle bg-surface-2 px-1.5 py-0.5 font-sans text-[10.5px] font-medium text-ink-faint sm:block">
								{shortcutLabel}
							</kbd>
						) : null}

						<ChevronsUpDown
							className={cn(
								"size-4 shrink-0 text-ink-faint transition-transform duration-200",
								open && "rotate-180"
							)}
						/>
					</button>
				</PopoverTrigger>

				<PopoverContent
					align="start"
					sideOffset={8}
					className="w-[max(var(--radix-popover-trigger-width),20rem)] overflow-hidden p-0"
				>
					<Command>
						<CommandInput
							placeholder="Search formats…"
							aria-label="Search formats"
							onInput={(event) => setQuery(event.currentTarget.value)}
						/>
						<CommandList className="thin-scroll max-h-[22rem]">
							<CommandEmpty className="px-3 py-8 text-center text-[12.5px] text-ink-muted">
								No formats match your search.
							</CommandEmpty>
								{groups.map((group) => {
									const expanded = isExpanded(group.heading);
									return (
										<CommandGroup
											key={group.heading}
											heading={
											<button
												type="button"
												aria-expanded={expanded}
												onClick={() => toggleGroup(group.heading)}
												className="group -mx-2.5 flex w-[calc(100%+1.25rem)] cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors hover:bg-surface-3/70"
											>
												<span
													className={cn(
													"flex size-5 shrink-0 items-center justify-center rounded-md border border-subtle bg-surface-2 transition-colors group-hover:border-accent/30 group-hover:text-accent",
														expanded ? "text-ink-muted" : "text-ink-faint"
													)}
												>
													<ChevronDown
														className={cn(
															"size-3 transition-transform duration-200",
															!expanded && "-rotate-90"
														)}
													/>
												</span>
												<span className="min-w-0 flex-1 truncate text-[10.5px] font-semibold tracking-[0.08em] uppercase">
													{group.heading}
												</span>
												<span className="shrink-0 rounded-md border border-subtle bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-ink-muted transition-colors group-hover:border-accent/30 group-hover:text-accent">
													{group.items.length}
												</span>
											</button>
											}
										>
											{group.items.map((option) => {
												const isSelected = option.id === formatId;
												return (
													<CommandItem
														key={option.id}
														value={option.label}
														keywords={[option.id]}
														onSelect={() => {
															onSelect(option.id);
															onOpenChange(false);
														}}
														disabled={!expanded}
														className={cn(
															"w-full min-w-0 justify-between gap-3 py-2.5",
															!expanded && "hidden"
														)}
													>
												<span title={option.label} className={cn("truncate", isSelected && "font-medium")}>
													{option.label}
												</span>													<Check
														className={cn(
															"size-4 shrink-0 text-accent transition-opacity",
															isSelected ? "opacity-100" : "opacity-0"
														)}
													/>
												</CommandItem>
											);
										})}
										</CommandGroup>
									);
								})}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			<p className="flex flex-wrap items-center gap-x-1.5 text-[12px] text-ink-muted">
				{isEmpty ? (
					<span>This division has no response formats yet.</span>
				) : selected ? (
					<>
						{fieldCount === 0 ? (
							<span>No extra details needed. This format is ready to copy.</span>
						) : (
							<>
								<span className="font-medium text-ink">
									{fieldCount} {fieldCount === 1 ? "detail" : "details"}
								</span>
								<span>to fill in below.</span>
							</>
						)}
					</>
				) : (
					<span>
						Search {options.length} formats by stage, for example “denied”, “interview” or “promotion”.
					</span>
				)}
			</p>
		</div>
	);
}
