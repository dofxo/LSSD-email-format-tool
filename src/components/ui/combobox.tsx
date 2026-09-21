import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
	value: string;
	label: string;
	hint?: string;
}

interface ComboboxProps {
	value: string;
	onChange: (value: string) => void;
	options: ComboboxOption[];
	id?: string;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	/** Options below this count render without a search field. */
	searchThreshold?: number;
	disabled?: boolean;
	className?: string;
	ariaLabel?: string;
}

/** Accessible single-select with type-to-search, modeled on the shadcn combobox. */
export function Combobox({
	value,
	onChange,
	options,
	id,
	placeholder = "Select an option",
	searchPlaceholder = "Search…",
	emptyMessage = "No matches found.",
	searchThreshold = 7,
	disabled,
	className,
	ariaLabel,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const selected = options.find((option) => option.value === value);
	const listId = React.useId();
	const showSearch = options.length > searchThreshold;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					id={id}
					role="combobox"
					aria-label={ariaLabel}
					aria-expanded={open}
					aria-controls={listId}
					disabled={disabled}
					className={cn(
						controlFieldClass,
						"flex h-11 cursor-pointer items-center justify-between gap-2 px-3.5 text-left disabled:cursor-not-allowed",
						className
					)}
				>
					<span
						title={selected ? selected.label : placeholder}
						className={cn("truncate", !selected && "text-ink-faint")}
					>
						{selected ? selected.label : placeholder}
					</span>
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
				sideOffset={6}
				className="w-[max(var(--radix-popover-trigger-width),16rem)] overflow-hidden p-0"
			>
				<Command>
					{showSearch ? (
						<CommandInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
					) : null}
					<CommandList id={listId} className="thin-scroll max-h-72">
						<CommandEmpty className="px-3 py-6 text-center text-[12.5px] text-ink-muted">
							{emptyMessage}
						</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = option.value === value;
								return (
									<CommandItem
										key={option.value}
										value={option.label}
										onSelect={() => {
											onChange(option.value);
											setOpen(false);
										}}
										className={cn(
											"w-full min-w-0 justify-between gap-3",
											isSelected && "font-medium text-ink"
										)}
									>
										<span title={option.label} className="truncate">
											{option.label}
										</span>
										{option.hint ? (
											<span className="shrink-0 text-[11px] text-ink-faint">{option.hint}</span>
										) : null}
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
	);
}
