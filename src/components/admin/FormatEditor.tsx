import { useState } from "react";
import { ChevronDown, RotateCcw, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AdminFormatFields } from "@/formats/adminTypes";
import type { divisionsType } from "@/types";

interface FormatEditorProps {
	division: divisionsType;
	formatId: string;
	/** Added formats can be deleted; built-in ones can be reset to default. */
	custom: boolean;
	fields: AdminFormatFields;
	/** Builds the format's current output, used to seed the body editor. */
	getDefaultBody: () => string;
	onSave: (fields: AdminFormatFields) => void;
	onReset: () => void;
	onDelete: () => void;
}

/** One editable format: title, government link and an optional phpBBcode body. */
export function FormatEditor({
	division,
	formatId,
	custom,
	fields,
	getDefaultBody,
	onSave,
	onReset,
	onDelete,
}: FormatEditorProps) {
	const [title, setTitle] = useState(fields.title);
	const [govLink, setGovLink] = useState(fields.govLink);
	const [body, setBody] = useState(fields.body);
	const [bodyOpen, setBodyOpen] = useState(fields.body.trim().length > 0);
	const [bodyEdited, setBodyEdited] = useState(false);
	const [confirming, setConfirming] = useState(false);

	const hasOverride = fields.body.trim().length > 0;
	const dirty = title !== fields.title || govLink !== fields.govLink || bodyEdited;
	const fieldId = `${division}-${formatId}`;

	const toggleBody = () => {
		// First open of an untouched built-in format loads what it generates
		// today, so it can be edited in place without retyping it.
		if (!bodyOpen && !hasOverride && !bodyEdited) setBody(getDefaultBody());
		setBodyOpen((value) => !value);
	};

	return (
		<div className="rounded-2xl border border-subtle bg-surface-2/40 p-4">
			<header className="mb-3 flex flex-wrap items-center gap-2">
				<span className="rounded-md border border-subtle bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
					{formatId}
				</span>
				<span className="text-[12px] text-ink-faint">{custom ? "Added format" : "Built-in format"}</span>
				{dirty ? <span className="text-[12px] font-medium text-warning">Unsaved changes</span> : null}

				<div className="ml-auto flex items-center gap-2">
					{dirty ? (
						<Button
							size="sm"
							variant="primary"
							onClick={() => onSave({ title, body: bodyEdited ? body : fields.body, govLink })}
							aria-label={`Save ${title || formatId}`}
						>
							<Save />
							Save
						</Button>
					) : null}

					{confirming ? (
						<>
							<span className="text-[12px] text-ink-muted">
								{custom ? "Delete this format?" : "Reset to the built-in version?"}
							</span>
							<Button
								size="sm"
								variant="danger"
								onClick={() => {
									setConfirming(false);
									if (custom) onDelete();
									else onReset();
								}}
							>
								{custom ? "Delete" : "Reset"}
							</Button>
							<Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
								Cancel
							</Button>
						</>
					) : (
						<Button
							size="icon-sm"
							variant="ghost"
							title={custom ? "Delete this format" : "Reset to the built-in format"}
							aria-label={custom ? `Delete ${title || formatId}` : `Reset ${title || formatId}`}
							onClick={() => setConfirming(true)}
						>
							{custom ? <Trash2 /> : <RotateCcw />}
						</Button>
					)}
				</div>
			</header>

			<div className="flex flex-col gap-4">
				<Field label="Title" htmlFor={`title-${fieldId}`}>
					<Input
						id={`title-${fieldId}`}
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Shown in the format picker"
					/>
				</Field>

				<Field label="Government website link" htmlFor={`gov-${fieldId}`}>
					<Input
						id={`gov-${fieldId}`}
						value={govLink}
						onChange={(event) => setGovLink(event.target.value)}
						placeholder="https://gov.eclipse-rp.net/viewforum.php?f=..."
					/>
				</Field>

				<div>
					<button
						type="button"
						onClick={toggleBody}
						aria-expanded={bodyOpen}
						aria-controls={`body-${fieldId}`}
						className="flex items-center gap-2 text-[12.5px] font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
					>
						<ChevronDown
							className={cn("size-4 transition-transform duration-200", bodyOpen && "rotate-180")}
						/>
						{bodyOpen ? "Hide body" : "Show body"}
						<span className="font-normal text-ink-faint">
							{hasOverride || bodyEdited
								? "edited body saved"
								: custom
									? "nothing saved yet"
									: "loads what the format generates today"}
						</span>
					</button>

					{bodyOpen ? (
						<div className="mt-2 flex flex-col gap-2">
							<Textarea
								id={`body-${fieldId}`}
								value={body}
								onChange={(event) => {
									setBody(event.target.value);
									setBodyEdited(true);
								}}
								placeholder="[divbox=white]… hello {{name}} …[/divbox]"
								className="min-h-[220px] font-mono text-[12.5px]"
							/>

							<p className="text-[12px] leading-relaxed text-ink-faint">
								{hasOverride || bodyEdited ? (
									<>
										Saving replaces what this format normally generates. Keep{" "}
										<code className="font-mono">{"{{tokens}}"}</code> where form values belong.
									</>
								) : (
									<>
										This is the format's current output. Editing it freezes this text as the body — swap
										blanks for <code className="font-mono">{"{{tokens}}"}</code> to keep form values filling
										in, or reset to go back to the generated version.
									</>
								)}
							</p>

							<p className="text-[11.5px] text-ink-faint">{body.length} characters</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
