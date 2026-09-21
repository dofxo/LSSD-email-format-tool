import { Check, ChevronsUpDown, FileText } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
	options: { id: string; label: string }[];
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
						<CommandInput placeholder="Search formats…" aria-label="Search formats" />
						<CommandList className="thin-scroll max-h-[22rem]">
							<CommandEmpty className="px-3 py-8 text-center text-[12.5px] text-ink-muted">
								No formats match your search.
							</CommandEmpty>
							<CommandGroup heading={`${division} formats`}>
								{options.map((option) => {
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
											className="w-full min-w-0 justify-between gap-3 py-2.5"
										>
											<span title={option.label} className={cn("truncate", isSelected && "font-medium")}>
												{option.label}
											</span>
											<Check
												className={cn(
													"size-4 shrink-0 text-accent transition-opacity",
													isSelected ? "opacity-100" : "opacity-0"
												)}
											/>
										</CommandItem>
									);
								})}
							</CommandGroup>
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
