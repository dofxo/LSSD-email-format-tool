import { Check, PenLine, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { titlePrompts } from "@/lib/formatTitles";
import { cn } from "@/lib/utils";

interface TopicTitleFieldProps {
	/** The title as the format defines it, before any edit here. */
	suggested: string;
	/** The deputy's own title, once they have touched the field. */
	edited?: string;
	onChange: (value: string) => void;
	onReset: () => void;
}

/**
 * The topic title shown for formats that post to the government website.
 *
 * Anything the format put in square brackets is a part the person filling it in
 * has to replace themselves — "Promotion notice [deputy name]" — so those are
 * listed until they are gone, and the title is only considered ready after that.
 */
export function TopicTitleField({ suggested, edited, onChange, onReset }: TopicTitleFieldProps) {
	// Undefined means the deputy has not touched the field yet, so the suggestion
	// stands. Anything else — including an empty string — is theirs, and must not
	// be replaced by the suggestion the moment they clear the box.
	const isEdited = edited !== undefined;
	const value = isEdited ? edited : suggested;
	const prompts = titlePrompts(value);
	const needsReplacing = prompts.length > 0;
	const cleared = isEdited && !value.trim();

	return (
		<Field
			label="Topic title"
			htmlFor="topicTitle"
			hint="Shown as the post title on the government website — change it if you like."
			wide
			meta={
				needsReplacing ? (
					<span className="font-medium text-warning">
						{prompts.length} to replace
					</span>
				) : cleared ? (
					<span className="font-medium text-warning">Cleared — no title will be posted</span>
				) : value.trim() ? (
					<span className="flex items-center gap-1.5">
						<Check className="size-3.5 text-success" />
						{isEdited ? "Edited" : "Ready"}
					</span>
				) : null
			}
		>
			<div className="flex flex-col gap-2">
				<div className="flex flex-wrap items-center gap-2">
					<Input
						id="topicTitle"
						name="topicTitle"
						value={value}
						placeholder="Post title…"
						aria-invalid={needsReplacing}
						onChange={(event) => onChange(event.target.value)}
						className={cn(
							"min-w-[220px] flex-1",
							isEdited && "border-accent/40",
							needsReplacing && "border-warning/50",
						)}
					/>

					{isEdited ? (
						<Button variant="ghost" size="sm" onClick={onReset} className="shrink-0">
							<RotateCcw />
							Use suggestion
						</Button>
					) : (
						<span className="flex shrink-0 items-center gap-1.5 text-[11.5px] text-ink-faint">
							<PenLine className="size-3.5" />
							Edit before posting
						</span>
					)}
				</div>

				{needsReplacing ? (
					<div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2 text-[12px] leading-relaxed text-warning">
						<span className="font-medium">Replace:</span>
						{prompts.map((prompt) => (
							<span
								key={prompt}
								className="rounded-md border border-warning/30 bg-surface/40 px-1.5 py-0.5 font-medium"
							>
								{prompt}
							</span>
						))}
					</div>
				) : null}
			</div>
		</Field>
	);
}
