import { Fragment, useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown, FileText, Folder, SearchX, X } from "lucide-react";

import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { FormatOption } from "@/lib/formats";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { divisionsType } from "@/types";

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

/** Escapes a query so it can be dropped into a regular expression safely. */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Text with every occurrence of the query picked out, so matches read at a glance. */
const Highlighted = ({ text, query }: { text: string; query: string }) => {
	const needle = query.trim();
	if (!needle) return <>{text}</>;
	const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, "ig"));
	return (
		<>
			{parts.map((part, index) =>
				index % 2 === 1 ? (
					<mark key={index} className="rounded-sm bg-accent/15 px-0.5 font-medium text-ink">
						{part}
					</mark>
				) : (
					<Fragment key={index}>{part}</Fragment>
				)
			)}
		</>
	);
};

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
 * Browsing walks the division in two steps — the categories first, then the
 * formats inside the one that was opened, with a back row to return. The
 * search cuts across all of that: one query matches format titles and folder
 * names at once, formats selectable straight from the results and folders
 * openable, so a known format never needs its folder found first.
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
	const trimmedQuery = query.trim();
	const searching = trimmedQuery.length > 0;

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

	// One query reaches across the whole division: format titles and folder
	// names both match, and the two result groups print side by side.
	const matches = useMemo(() => {
		if (!searching) return { folders: [] as typeof groups, formats: [] as FormatOption[] };
		const needle = trimmedQuery.toLowerCase();
		return {
			folders: groups.filter((group) => group.heading.toLowerCase().includes(needle)),
			formats: options.filter((option) => option.label.toLowerCase().includes(needle)),
		};
	}, [groups, options, searching, trimmedQuery]);
	const totalMatches = matches.folders.length + matches.formats.length;

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

	/** A search hit that can be picked right away, with the folder it lives in. */
	const renderSearchFormat = (option: FormatOption) => {
		const isSelected = option.id === formatId;
		return (
			<CommandItem
				key={option.id}
				value={`format-${option.id}`}
				onSelect={() => {
					onSelect(option.id);
					onOpenChange(false);
				}}
				className="w-full min-w-0 justify-between gap-3 py-2.5"
			>
				<span className="min-w-0 flex-1">
					<span title={option.label} className={cn("block truncate text-[13px]", isSelected && "font-medium")}>
						<Highlighted text={option.label} query={query} />
					</span>
				</span>
				<span className="flex shrink-0 items-center gap-2">
					{option.category ? (
						<span
							title={`Filed under ${option.category}`}
							className="max-w-40 truncate rounded-md border border-subtle bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium leading-none text-ink-muted"
						>
							{option.category}
						</span>
					) : null}
					<Check
						className={cn("size-4 shrink-0 text-accent transition-opacity", isSelected ? "opacity-100" : "opacity-0")}
					/>
				</span>
			</CommandItem>
		);
	};

	/** A search hit that opens the folder instead of picking anything. */
	const renderSearchFolder = (group: { heading: string; items: FormatOption[] }) => (
		<CommandItem
			key={group.heading}
			value={`folder-${group.heading}`}
			onSelect={() => openCategory(group.heading)}
			className="w-full min-w-0 justify-between gap-3 py-2.5"
		>
			<span className="flex min-w-0 flex-1 items-center gap-2.5">
				<span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-subtle bg-surface-2 text-ink-muted">
					<Folder className="size-3.5" />
				</span>
				<span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
					<Highlighted text={group.heading} query={query} />
				</span>
			</span>
			<span className="flex shrink-0 items-center gap-2">
				<span className="rounded-md border border-subtle bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-ink-muted">
					{group.items.length}
				</span>
				<ChevronRight className="size-4 text-ink-faint" />
			</span>
		</CommandItem>
	);

	const formatCountLabel = `${matches.formats.length} ${matches.formats.length === 1 ? "format" : "formats"}`;
	const folderCountLabel = `${matches.folders.length} ${matches.folders.length === 1 ? "folder" : "folders"}`;

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
					// Searching? Escape empties the search first and only closes on a second press.
					onEscapeKeyDown={(event) => {
						if (searching) {
							event.preventDefault();
							setQuery("");
						}
					}}
				>
					<Command shouldFilter={false}>
						<CommandInput
							value={query}
							onValueChange={setQuery}
							placeholder="Search formats and folders…"
							aria-label="Search formats and folders"
						/>

						{searching ? (
							<div className="flex items-center gap-2 border-b border-subtle bg-surface-2/40 px-2.5 py-2">
								<span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-muted">
									<span className="font-semibold tabular-nums text-ink">{matches.formats.length}</span>
									<span> {matches.formats.length === 1 ? "format" : "formats"}</span>
									<span className="px-1 text-ink-faint">·</span>
									<span className="font-semibold tabular-nums text-ink">{matches.folders.length}</span>
									<span> {matches.folders.length === 1 ? "folder" : "folders"}</span>
								</span>
								<button
									type="button"
									onClick={() => setQuery("")}
									title="Clear search (Esc)"
									aria-label="Clear search"
									className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-subtle bg-surface text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
								>
									<X className="size-3.5" />
								</button>
							</div>
						) : current ? (
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
						) : null}

						<CommandList className="thin-scroll max-h-[22rem]">
							{searching ? (
								totalMatches > 0 ? (
									<>
										{matches.formats.length > 0 ? (
											<CommandGroup heading={formatCountLabel}>
												{matches.formats.map(renderSearchFormat)}
											</CommandGroup>
										) : null}
										{matches.formats.length > 0 && matches.folders.length > 0 ? <CommandSeparator /> : null}
										{matches.folders.length > 0 ? (
											<CommandGroup heading={folderCountLabel}>
												{matches.folders.map(renderSearchFolder)}
											</CommandGroup>
										) : null}
									</>
								) : (
									<div className="flex flex-col items-center gap-1.5 px-6 py-8 text-center">
										<span className="flex size-9 items-center justify-center rounded-xl border border-subtle bg-surface-2 text-ink-faint">
											<SearchX className="size-4" />
										</span>
										<p className="text-[13px] font-medium text-ink">No matches for “{trimmedQuery}”</p>
										<p className="text-[12px] text-ink-muted">
											Formats and folders both count — try a shorter or different word.
										</p>
										<button
											type="button"
											onClick={() => setQuery("")}
											className="mt-1.5 cursor-pointer rounded-lg border border-subtle bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-accent"
										>
											Clear search
										</button>
									</div>
								)
							) : groups.length === 0 ? (
								<div className="px-3 py-8 text-center text-[12.5px] text-ink-muted">
									This division has no formats yet.
								</div>
							) : current ? (
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
						Search matches formats and folders at once, across every category — pick a format straight from
						the results, or open a folder to browse what’s inside.
					</span>
				)}
			</p>
		</div>
	);
}
