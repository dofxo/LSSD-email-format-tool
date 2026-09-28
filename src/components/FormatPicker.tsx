import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown, FileText, Folder } from "lucide-react";

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

/**
 * Primary control of the tool: pick the response format to generate.
 *
 * A division can carry forty-odd formats, so the list is walked in two steps:
 * the categories first, then the formats inside the one that was opened, with a
 * back row to return. The search works on whichever list is on screen — the
 * categories at the top, a category's own formats once it is open — so you
 * search for the folder first and the format inside it second, rather than a
 * query reaching across every category at once.
 */
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

	/** The category being looked at, or null for the category list itself. */
	const [openHeading, setOpenHeading] = useState<string | null>(null);
	const [query, setQuery] = useState("");

	// Every visit starts at the top of the list, with nothing typed in.
	useEffect(() => {
		if (open) return;
		setOpenHeading(null);
		setQuery("");
	}, [open]);

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

	// A division with a single heading has nothing to choose between, so it opens
	// straight into it rather than making one click mean nothing.
	const alone = groups.length === 1;
	const current = alone ? groups[0] : (groups.find((group) => group.heading === openHeading) ?? null);
	const backToCategories = () => {
		setOpenHeading(null);
		setQuery("");
	};
	const openCategory = (heading: string) => {
		setOpenHeading(heading);
		setQuery("");
	};

	const renderFormat = (option: FormatOption, heading: string) => {
		const isSelected = option.id === formatId;
		return (
			<CommandItem
				key={option.id}
				value={option.label}
				keywords={[option.id, heading]}
				onSelect={() => {
					onSelect(option.id);
					onOpenChange(false);
				}}
				className="w-full min-w-0 justify-between gap-3 py-2.5"
			>
				<span title={option.label} className={cn("truncate", isSelected && "font-medium")}>
					{option.label}
				</span>
				<Check
					className={cn("size-4 shrink-0 text-accent transition-opacity", isSelected ? "opacity-100" : "opacity-0")}
				/>
			</CommandItem>
		);
	};

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
				>						<Command>
							<CommandInput
								value={query}
								onValueChange={setQuery}
								placeholder={current ? "Search these formats…" : "Search the categories…"}
								aria-label={current ? "Search formats" : "Search categories"}
							/>

							{/* Where you are, and the way back out of a category. */}
							{current ? (
							<div className="flex items-center gap-2 border-b border-subtle bg-surface-2/40 px-2.5 py-2">
								{alone ? (
									<span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-subtle bg-surface text-ink-muted">
										<Folder className="size-3.5" />
									</span>
								) : (
									<button
										type="button"
										onClick={backToCategories}
										title="Back to the categories"
										aria-label="Back to the categories"
										className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-subtle bg-surface text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
									>
										<ChevronLeft className="size-3.5" />
									</button>
								)}
								<span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink">
									{current.heading}
								</span>
								<span className="shrink-0 rounded-md border border-subtle bg-surface px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-ink-muted">
									{current.items.length}
								</span>
							</div>
						) : null}							<CommandList className="thin-scroll max-h-[22rem]">
								<CommandEmpty className="px-3 py-8 text-center text-[12.5px] text-ink-muted">
									{current ? "No formats in this category match your search." : "No categories match your search."}
								</CommandEmpty>

								{current ? (
									<CommandGroup>{current.items.map((option) => renderFormat(option, current.heading))}</CommandGroup>
								) : (
								groups.map((group) => {
									const holdsSelection = Boolean(selected && group.items.some((item) => item.id === selected.id));
									return (
										<CommandGroup key={group.heading}>
											<CommandItem
												value={group.heading}
												onSelect={() => openCategory(group.heading)}
												className="w-full min-w-0 justify-between gap-3 py-2.5"
											>
												<span className="flex min-w-0 flex-1 items-center gap-2.5">
													<span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-subtle bg-surface-2 text-ink-muted">
														<Folder className="size-3.5" />
													</span>
													<span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
														{group.heading}
													</span>
												</span>
												<span className="flex shrink-0 items-center gap-2">
													{holdsSelection ? (
														<Check className="size-3.5 text-accent" aria-label="Your current format is in here" />
													) : null}
													<span className="rounded-md border border-subtle bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-ink-muted">
														{group.items.length}
													</span>
													<ChevronRight className="size-4 text-ink-faint" />
												</span>
											</CommandItem>
										</CommandGroup>
									);
								})
							)}
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
						Open a category to see its formats — the search looks at whichever list is on screen:
						the categories here, the formats once one is open. Type “Written” to find the folder,
						then “denied” inside it for the format.
					</span>
				)}
			</p>
		</div>
	);
}
