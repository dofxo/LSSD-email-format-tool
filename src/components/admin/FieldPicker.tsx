import { useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Pencil, Plus, Search, Trash2, TriangleAlert } from "lucide-react";

import { NewInputForm } from "@/components/admin/NewInputForm";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	catalogueFieldNames,
	catalogueInputFor,
	catalogueRevision,
} from "@/data/inputCatalogue";
import { FIELD_TYPES, TYPE_LABELS, type CatalogueInput, type FieldType } from "@/lib/inputDefinitions";
import { cn } from "@/lib/utils";

interface FieldPickerProps {
	/** Fields already in play here: ticked in the list, still selectable. */
	used: string[];
	/** Called with the catalogue field that was chosen. */
	onPick: (name: string) => void;
	/**
	 * Creates a brand-new catalogue field. Creating is not picking: the field is
	 * made, and whether that also puts it on a format or drops it into a body is
	 * for the caller to decide — nothing is written into the words on screen.
	 */
	onCreate: (input: CatalogueInput) => void;
	/**
	 * Deletes an admin-created field from the catalogue. Left out, nothing in the
	 * list can be deleted — used everywhere except /admin.
	 */
	onDelete?: (input: CatalogueInput) => void;
	/** Which fields are deletable here, with the reason when they are not. */
	deleteGuard?: (name: string) => { ok: boolean; reason?: string };
	/**
	 * Rewrites an admin-created field (its type, wording and choices). Left out,
	 * no row offers editing — used everywhere except /admin.
	 */
	onEdit?: (input: CatalogueInput) => void;
	/**
	 * Which fields can be edited here. A row only shows its pencil when this says
	 * yes, so built-in fields — whose definitions ship with the tool — do not offer
	 * a change that could not be kept.
	 */
	editGuard?: (name: string) => { ok: boolean; reason?: string };
}

/**
 * How many rows the list draws at once. The catalogue runs to a couple of
 * hundred fields, and rendering every one of them on each keystroke is what made
 * this picker stutter; the matches are what matters, and a search or a type chip
 * is how you reach them. “Show all” is there for the rare browse.
 */
const PAGE = 12;

/**
 * The one way a field is added, wherever fields are added.
 *
 * It offers the field *types* — Date picker, Single line text, Repeating list
 * and the rest — and then the wording those types carry, never the token names
 * behind them. Choosing a type filters the list, so nothing has to be searched
 * by a name nobody should have to remember.
 */
export function FieldPicker({ used, onPick, onCreate, onDelete, deleteGuard, onEdit, editGuard }: FieldPickerProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [type, setType] = useState<FieldType | null>(null);
	const [creating, setCreating] = useState(false);
	const [editing, setEditing] = useState<CatalogueInput | null>(null);
	const [showAll, setShowAll] = useState(false);

	const searchRef = useRef(search);
	searchRef.current = search;

	const usedSet = useMemo(() => new Set(used), [used]);

	// Every catalogue field, typed, with a flag for wording that repeats. Rebuilt
	// only when the catalogue itself changes — it is a live registry rather than
	// React state, so a create or delete made anywhere (this picker included)
	// bumps this revision and the rows follow at once.
	const revision = catalogueRevision();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps -- the revision is the catalogue's identity
	}, [revision]);

	// The type chips filter first, then the search box, and only then is the list
	// cut down: matching has to run over the whole catalogue, but drawing has to
	// stop early, so the filtering is done here rather than by the command list.
	const byType = type ? entries.filter((entry) => entry.definition.type === type) : entries;
	const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
	const matches = words.length
		? byType.filter((entry) => {
				const haystack = `${entry.definition.label} ${TYPE_LABELS[entry.definition.type]} ${entry.name}`.toLowerCase();
				return words.every((word) => haystack.includes(word));
			})
		: byType;
	const visible = showAll ? matches : matches.slice(0, PAGE);

	// Deletion is a catalogue-level action, so a row's guard is recomputed on
	// every render — a save elsewhere can make a field deletable mid-session.
	const guardFor = (name: string) =>
		deleteGuard ? deleteGuard(name) : { ok: false, reason: "" };

	const create = (input: CatalogueInput) => {
		onCreate(input);
		setCreating(false);
		setSearch("");
	};

	// An edit leaves the format alone: the field already exists, and where it is
	// used is not this popover's business.
	const edit = (input: CatalogueInput) => {
		onEdit?.(input);
		setEditing(null);
	};

	return (
		<Popover
			open={open}
			onOpenChange={(value) => {
				setOpen(value);
				// Closing clears the half-finished forms, so reopening starts on the list.
				if (!value) {
					setCreating(false);
					setEditing(null);
				}
			}}
		>
			<PopoverTrigger asChild>
				{/* Dressed as a primary button: adding a field is the main thing to do
				    in this panel, so it leads rather than blending into a form control. */}
				<button
					type="button"
					role="combobox"
					aria-expanded={open}
					aria-label="Add a field"
					className={cn(
						buttonVariants({ variant: "primary", size: "sm" }),
						"h-9 w-full cursor-pointer justify-between px-3 text-left text-[13.5px]",
					)}
				>
					<span className="flex min-w-0 items-center gap-2">
						<Search className="size-3.5 shrink-0 opacity-80" />
						<span className="truncate">Add a field…</span>
					</span>
					<ChevronsUpDown className="size-3.5 shrink-0 opacity-80" />
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

				<Command shouldFilter={false}>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={`Search ${entries.length} fields by wording or token…`}
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
						) : editing ? (
							<NewInputForm
								existingNames={new Set(catalogueFieldNames())}
								initial={editing}
								onCreate={create}
								onSave={edit}
								onCancel={() => setEditing(null)}
							/>
						) : null}
						<CommandEmpty className="px-3 py-6 text-center text-[12.5px] text-ink-muted">
							Nothing matches “{searchRef.current}”.
						</CommandEmpty>
						<CommandGroup>
							{visible.map(({ name, definition, duplicate }) => {
								const inUse = usedSet.has(name);
								// Asked once per row: the guard walks the whole store, and the row
								// reads it two or three times.
								const guard = guardFor(name);
								const editVerdict = editGuard ? editGuard(name) : { ok: true };
								return (
									<CommandItem
										key={name}
										value={`${definition.label} ${TYPE_LABELS[definition.type]} ${name}`}
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
									{inUse ? <Check className="size-3.5 shrink-0 text-success" /> : null}										{onEdit ? (
											editVerdict.ok ? (
												<button
													type="button"
													className={pencilClass}
													title={`Edit the ${TYPE_LABELS[definition.type].toLowerCase()} “${definition.label}” — its type, wording and choices`}
													aria-label={`Edit field ${definition.label}`}
													onMouseDown={(event) => event.stopPropagation()}
								onClick={(event) => {
									event.stopPropagation();
									setCreating(false);
									setEditing({ name, ...definition });
								}}
												>
													<Pencil className="size-3.5" />
												</button>
											) : editVerdict.reason ? (
												<span className="flex shrink-0" title={editVerdict.reason}>
													<Pencil className="size-3.5 text-ink-faint/40" />
												</span>
											) : null
										) : null}
										{onDelete ? (
											guard.ok ? (
											<button
												type="button"
												className={trashClass}
												title={`Delete the ${TYPE_LABELS[definition.type].toLowerCase()} "${definition.label}" from the catalogue`}
												aria-label={`Delete field ${definition.label}`}
												onMouseDown={(event) => event.stopPropagation()}
												onClick={(event) => {
													event.stopPropagation();
													onDelete({ name, ...definition });
												}}
											>
												<Trash2 className="size-3.5" />
											</button>											) : guard.reason ? (
												<span
													className="flex shrink-0"
													title={guard.reason}
											>
												<Trash2 className="size-3.5 text-ink-faint/40" />
											</span>
										) : null
									) : null}
								</CommandItem>
								);
							})}
						</CommandGroup>
						{matches.length > PAGE ? (
							<div className="flex items-center justify-between gap-2 border-t border-subtle px-3 py-1.5 text-[11.5px] text-ink-faint">
								<span>
									{showAll ? `All ${matches.length} fields` : `${visible.length} of ${matches.length} fields`}
								</span>
								<button
									type="button"
									onClick={() => setShowAll((value) => !value)}
									className="cursor-pointer rounded-full border border-subtle bg-surface-2 px-2 py-0.5 transition-colors duration-150 hover:border-accent/40 hover:text-accent"
								>
									{showAll ? "Show fewer" : "Show all"}
								</button>
							</div>
						) : null}
					</CommandList>
					<div className="border-t border-subtle p-2">
						<Button
							size="sm"
							variant="secondary"
							className="w-full"
							onClick={() => {
								setCreating((value) => !value);
								setEditing(null);
							}}
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

/** A quiet trash button that stops the row's select from firing. */
const trashClass =
	"flex shrink-0 cursor-pointer rounded-md p-1 text-ink-faint transition-colors duration-150 hover:bg-danger/10 hover:text-danger";

/** The matching button that opens a field's own definition. */
const pencilClass =
	"flex shrink-0 cursor-pointer rounded-md p-1 text-ink-faint transition-colors duration-150 hover:bg-accent-soft hover:text-accent";

const typeChipActive = "border-accent/45 bg-accent-soft text-accent";
