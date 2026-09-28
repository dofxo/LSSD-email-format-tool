import { useState } from "react";
import { Gavel, Square, SquareCheck, X } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { chargeLine, chargesByCategory } from "@/data/penalCode";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface ChargesPickerProps {
	id?: string;
	/** The picked charges, as penal code codes ("VC01"). */
	value: string[];
	onChange: (value: string[]) => void;
	ariaLabel?: string;
	/** Wording under the trigger, e.g. "No charges picked yet." */
	emptyHint?: string;
	className?: string;
}

/**
 * Picks charges out of the penal code: the sections down the list, the charges
 * inside them, and every charge written the way a report quotes it — "VC01 -
 * Speeding 1st Degree". Several are picked at once, each one toggling on the
 * spot, and what is picked is listed under the trigger so it can be read back
 * and removed without reopening the list.
 */
export function ChargesPicker({ id, value, onChange, ariaLabel, emptyHint, className }: ChargesPickerProps) {
	const [open, setOpen] = useState(false);
	const picked = new Set(value);
	const sections = chargesByCategory();

	const toggle = (code: string) =>
		onChange(picked.has(code) ? value.filter((entry) => entry !== code) : [...value, code]);

	return (
		<div className="flex min-w-0 flex-col gap-1.5">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button
						type="button"
						id={id}
						aria-label={ariaLabel}
						aria-expanded={open}
						className={cn(
							controlFieldClass,
							"flex h-11 cursor-pointer items-center justify-between gap-2 px-3.5 text-left",
							className,
						)}
					>
						<span className={cn("truncate", !value.length && "text-ink-faint")}>
							{value.length
								? `${value.length} charge${value.length === 1 ? "" : "s"} picked`
								: "Pick charges from the penal code…"}
						</span>
						<Gavel className="size-4 shrink-0 text-ink-faint" />
					</button>
				</PopoverTrigger>

				<PopoverContent
					align="start"
					sideOffset={6}
					className="w-[max(var(--radix-popover-trigger-width),24rem)] overflow-hidden p-0"
				>
					<Command>
						<CommandInput placeholder="Search the penal code…" aria-label="Search the penal code" />
						<CommandList className="thin-scroll max-h-80">
							<CommandEmpty className="px-3 py-6 text-center text-[12.5px] text-ink-muted">
								No charge matches that.
							</CommandEmpty>
							{sections.map((section) => (
								<CommandGroup key={section.category} heading={section.category}>
									{section.charges.map((charge) => {
										const isPicked = picked.has(charge.code);
										return (
											<CommandItem
												key={charge.code}
												// The code is what is searched and shown; the name is searchable too.
												value={`${charge.code} ${charge.name}`}
												onSelect={() => toggle(charge.code)}
												className={cn("gap-2.5", isPicked && "bg-accent-soft")}
											>
												{isPicked ? (
													<SquareCheck className="size-4 shrink-0 text-accent" />
												) : (
													<Square className="size-4 shrink-0 text-ink-faint" />
												)}
												<span className="shrink-0 font-mono text-[11px] text-ink-faint">{charge.code}</span>
												<span className="min-w-0 truncate" title={charge.name}>
													{charge.name}
												</span>
											</CommandItem>
										);
									})}
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{value.length ? (
				<ul className="flex flex-wrap gap-1.5">
					{value.map((code) => (
						<li key={code}>
							<button
								type="button"
								onClick={() => toggle(code)}
								title={`Remove ${chargeLine(code)}`}
								aria-label={`Remove ${chargeLine(code)}`}
								className="flex cursor-pointer items-center gap-1.5 rounded-full border border-subtle bg-surface-2 py-1 pr-1.5 pl-2.5 text-[11.5px] text-ink-muted transition-colors duration-150 hover:border-danger/40 hover:text-danger"
							>
								<span className="font-mono text-[10.5px]">{code}</span>
								<span className="max-w-[22rem] truncate">{chargeLine(code).replace(`${code} - `, "")}</span>
								<X className="size-3 shrink-0" />
							</button>
						</li>
					))}
				</ul>
			) : emptyHint ? (
				<p className="text-[11px] text-ink-faint">{emptyHint}</p>
			) : null}
		</div>
	);
}
