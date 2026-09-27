import { useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Plus, Search, TriangleAlert } from "lucide-react";

import { NewInputForm } from "@/components/admin/NewInputForm";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { catalogueFieldNames, catalogueInputFor } from "@/data/inputCatalogue";
import { FIELD_TYPES, TYPE_LABELS, type CatalogueInput, type FieldType } from "@/lib/inputDefinitions";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface FieldPickerProps {
	/** Fields already in play here: ticked in the list, still selectable. */
	used: string[];
	/** Called with the catalogue field that was chosen. */
	onPick: (name: string) => void;
	/** Creates a brand-new catalogue field; the picker then picks it. */
	onCreate: (input: CatalogueInput) => void;
}

/**
 * The one way a field is added, wherever fields are added.
 *
 * It offers the field *types* — Date picker, Single line text, Repeating list
 * and the rest — and then the wording those types carry, never the token names
 * behind them. Choosing a type filters the list, so nothing has to be searched
 * by a name nobody should have to remember.
 */
export function FieldPicker({ used, onPick, onCreate }: FieldPickerProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [type, setType] = useState<FieldType | null>(null);
	const [creating, setCreating] = useState(false);
	const searchRef = useRef(search);
	searchRef.current = search;

	const usedSet = useMemo(() => new Set(used), [used]);

	// Every catalogue field, typed, with a flag for wording that repeats.
	const entries = useMemo(() => {
		const names = catalogueFieldNames();
		const byLabel = new Map<string, number>();
		for (const name of names) {
			const definition = catalogueInputFor(name)!;
			const key = `${definition.type}:${definition.label.trim().toLowerCase()}`;
			byLabel.set(key, (byLabel.get(key) ?? 0) + 1);
		}
		return names.map((name) => {
			const definition = catalogueInputFor(name)!;
			const key = `${definition.type}:${definition.label.trim().toLowerCase()}`;
			return { name, definition, duplicate: (byLabel.get(key) ?? 0) > 1 };
		});
	}, []);

	const shown = type ? entries.filter((entry) => entry.definition.type === type) : entries;

	const create = (input: CatalogueInput) => {
		onCreate(input);
		onPick(input.name);
		setCreating(false);
		setSearch("");
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					role="combobox"
					aria-expanded={open}
					aria-label="Add a field"
					className={cn(
						controlFieldClass,
						"flex h-9 w-full cursor-pointer items-center justify-between gap-2 px-3 text-left",
					)}
				>
					<span className="flex min-w-0 items-center gap-2 text-ink-faint">
						<Search className="size-3.5 shrink-0" />
						<span className="truncate">Add a field…</span>
					</span>
					<ChevronsUpDown className="size-3.5 shrink-0 text-ink-faint" />
				</button>
			</PopoverTrigger>

			<PopoverContent align="start" sideOffset={6} className="w-[27rem] overflow-hidden p-0">
				<div className="flex flex-wrap gap-1 border-b border-subtle px-2.5 py-2">
					<button
						type="button"
						onClick={() => setType(null)}
						className={cn(typeChipClass, type === null && typeChipActive)}
					>
						All types
					</button>
					{FIELD_TYPES.map((option) => (
						<button
							key={option}
							type="button"
							onClick={() => setType(type === option ? null : option)}
							className={cn(typeChipClass, type === option && typeChipActive)}
						>
							{TYPE_LABELS[option]}
						</button>
					))}
				</div>

				<Command shouldFilter>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={`Search ${shown.length} fields by wording…`}
						aria-label="Search fields"
					/>
					<CommandList className="thin-scroll h-72">
						{creating ? (
							<NewInputForm
								existingNames={new Set(catalogueFieldNames())}
								initialType={type ?? "text"}
								onCreate={create}
								onCancel={() => setCreating(false)}
							/>
						) : null}
						<CommandEmpty className="px-3 py-6 text-center text-[12.5px] text-ink-muted">
							Nothing matches “{searchRef.current}”.
						</CommandEmpty>
						<CommandGroup>
							{shown.map(({ name, definition, duplicate }) => {
								const inUse = usedSet.has(name);
								return (
									<CommandItem
										key={name}
										value={`${definition.label} ${TYPE_LABELS[definition.type]}`}
										onSelect={() => {
											onPick(name);
											setSearch("");
										}}
									>
										<span title={definition.label} className="min-w-0 flex-1 truncate text-ink">
											{definition.label}
										</span>
										{duplicate ? (
											<span
												className="flex shrink-0"
												title="Another field carries this same wording and type"
											>
												<TriangleAlert className="size-3.5 text-warning" />
											</span>
										) : null}
										<span className="shrink-0 rounded-full border border-subtle bg-surface-2 px-1.5 py-0.5 text-[10.5px] text-ink-faint">
											{TYPE_LABELS[definition.type]}
										</span>
										{inUse ? <Check className="size-3.5 shrink-0 text-success" /> : null}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
					<div className="border-t border-subtle p-2">
						<Button
							size="sm"
							variant="secondary"
							className="w-full"
							onClick={() => setCreating((value) => !value)}
						>
							<Plus />
							{creating ? "Close form" : `New ${type ? TYPE_LABELS[type].toLowerCase() : "field"}…`}
						</Button>
					</div>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

const typeChipClass =
	"cursor-pointer rounded-full border border-subtle bg-surface-2 px-2 py-0.5 text-[11px] text-ink-muted transition-colors duration-150 hover:border-accent/40 hover:text-ink";

const typeChipActive = "border-accent/45 bg-accent-soft text-accent";
