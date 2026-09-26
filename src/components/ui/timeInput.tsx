import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Hours 00-23, always in 24-hour time. */
const HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, "0"));
/** Minutes in 5-minute steps, "00" through "55". */
const MINUTES = Array.from({ length: 12 }, (_, minute) => String(minute * 5).padStart(2, "0"));

/** Adds `delta` minutes to a "HH:mm" value, wrapping around midnight. */
const shiftTime = (value: string, delta: number): string => {
	const match = TIME_PATTERN.exec(value);
	const total = match ? Number(match[1]) * 60 + Number(match[2]) + delta : delta > 0 ? 0 : 24 * 60 - 5;
	const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
	const hour = String(Math.floor(wrapped / 60)).padStart(2, "0");
	const minute = String(wrapped % 60).padStart(2, "0");
	return `${hour}:${minute}`;
};

const optionClass = (isSelected: boolean) =>
	cn(
		"flex h-8 w-full items-center justify-center rounded-lg font-mono text-[13px] transition-colors duration-100",
		isSelected ? "bg-accent-soft font-semibold text-accent" : "text-ink-muted hover:bg-surface-3 hover:text-ink",
	);

/**
 * 24-hour time picker, styled like the app's other controls. The trigger shows
 * the value as "HH:mm" (never AM/PM) and opens two scrollable columns: hours
 * 00-23 and minutes in 5-minute steps. Picking a value keeps the picker open so
 * both segments can be adjusted; close it with Done, an outside click, or
 * Escape. Keyboard on the trigger: Up/Down step 5 minutes, Home/End jump to
 * 00:00/23:55, Backspace/Delete clear.
 */
export function TimeInput({
	id,
	value,
	onChange,
	ariaLabel,
	className,
}: {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	ariaLabel?: string;
	className?: string;
}) {
	const [open, setOpen] = useState(false);
	const [hourRef, setHourRef] = useState<HTMLButtonElement | null>(null);
	const [minuteRef, setMinuteRef] = useState<HTMLButtonElement | null>(null);

	const match = TIME_PATTERN.exec(value);
	const selectedHour = match?.[1];
	const selectedMinute = match?.[2];

	// Keep the chosen segments visible when the picker opens.
	useEffect(() => {
		if (!open) return;
		hourRef?.scrollIntoView({ block: "nearest" });
		minuteRef?.scrollIntoView({ block: "nearest" });
	}, [open, hourRef, minuteRef]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (open) return; // the list handles its own keys
		if (event.key === "ArrowUp") {
			event.preventDefault();
			onChange(shiftTime(value, -5));
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			onChange(shiftTime(value, 5));
		} else if (event.key === "Home") {
			event.preventDefault();
			onChange("00:00");
		} else if (event.key === "End") {
			event.preventDefault();
			onChange("23:55");
		} else if ((event.key === "Backspace" || event.key === "Delete") && value) {
			event.preventDefault();
			onChange("");
		}
	};

	const pickHour = (hour: string) => onChange(`${hour}:${selectedMinute ?? "00"}`);
	const pickMinute = (minute: string) => onChange(`${selectedHour ?? "00"}:${minute}`);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					id={id}
					role="combobox"
					aria-expanded={open}
					aria-haspopup="listbox"
					aria-label={ariaLabel}
					onKeyDown={handleKeyDown}
					className={cn(
						"control-ring flex h-11 w-[130px] shrink-0 items-center justify-between rounded-control border border-subtle bg-surface-2 px-3.5 text-[14px] shadow-[inset_0_1px_1px_rgba(16,24,40,0.03)] transition-[border-color,box-shadow,background-color] duration-150 hover:border-strong",
						className
					)}
				>
					<span className={cn("font-mono", value ? "text-ink" : "text-ink-faint")}>{value || "--:--"}</span>
					<Clock className="size-4 text-ink-faint" />
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-2" onOpenAutoFocus={(event) => event.preventDefault()}>
				<div className="flex gap-1.5">
					<div role="listbox" aria-label={`${ariaLabel ?? "Time"} hour`} className="thin-scroll max-h-[248px] overflow-y-auto">
						<p className="px-1 pt-0.5 pb-1 text-center text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
							Hour
						</p>
						{HOURS.map((hour) => (
							<button
								key={hour}
								ref={hour === selectedHour ? setHourRef : undefined}
								type="button"
								role="option"
								aria-selected={hour === selectedHour}
								onClick={() => pickHour(hour)}
								className={cn(optionClass(hour === selectedHour), "w-14")}
							>
								{hour}
							</button>
						))}
					</div>

					<div role="listbox" aria-label={`${ariaLabel ?? "Time"} minute`} className="thin-scroll max-h-[248px] overflow-y-auto">
						<p className="px-1 pt-0.5 pb-1 text-center text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
							Min
						</p>
						{MINUTES.map((minute) => (
							<button
								key={minute}
								ref={minute === selectedMinute ? setMinuteRef : undefined}
								type="button"
								role="option"
								aria-selected={minute === selectedMinute}
								onClick={() => pickMinute(minute)}
								className={cn(optionClass(minute === selectedMinute), "w-14")}
							>
								{minute}
							</button>
						))}
					</div>
				</div>

				<div className="mt-2 flex items-center justify-between gap-1.5 border-t border-subtle pt-2">
					{value ? (
						<Button variant="ghost" size="sm" onClick={() => onChange("")}>
							Clear
						</Button>
					) : null}
					<Button variant="secondary" size="sm" className={cn(!value && "flex-1")} onClick={() => setOpen(false)}>
						Done
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
