import { useMemo } from "react";
import { AlertTriangle, Check, Code2, Copy, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelEmpty, PanelFooter, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { useCopy } from "@/hooks/useCopy";
import { titlePrompts } from "@/lib/formatTitles";
import { countWords } from "@/lib/preview";

interface FormatPreviewProps {
	text: string;
	formatLabel: string;
	/** Topic title for formats that post to the government website. */
	title?: string;
}

export function FormatPreview({ text, formatLabel, title }: FormatPreviewProps) {
	const { copy, isCopied } = useCopy();
	const copied = isCopied("preview");
	const titleCopied = isCopied("preview-title");
	// Parts the title still asks the person to replace, e.g. "[deputy name]".
	const titlePromptsLeft = useMemo(() => titlePrompts(title ?? ""), [title]);

	// Templates render empty fields as the string "undefined", so call that out.
	const placeholderCount = useMemo(() => (text.match(/undefined/g) ?? []).length, [text]);

	return (
		<Panel style={{ animationDelay: "80ms" }}>
			<PanelHeader>
				<PanelHeading
					icon={Code2}
					title="Generated output"
					description={formatLabel || "Choose a format to generate a body"}
				/>
			</PanelHeader>

			<PanelBody className="flex flex-col gap-3 py-4">
				{text && placeholderCount > 0 ? (
					<p className="flex items-start gap-2 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2 text-[12px] leading-relaxed text-warning">
						<AlertTriangle className="mt-px size-3.5 shrink-0" />
						<span>
							<span className="font-medium">
								{placeholderCount} {placeholderCount === 1 ? "detail is" : "details are"} still blank.
							</span>{" "}
							Fill in the remaining fields, otherwise the copied body says “undefined”.
						</span>
					</p>
				) : null}

				{title !== undefined ? (
					<div className="rounded-2xl border border-subtle bg-surface-2 px-3.5 py-3">
						<div className="flex items-center justify-between gap-3">
							<p className="text-[10.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
								Topic title
							</p>
							<Button
								variant="ghost"
								size="sm"
								disabled={!title.trim()}
								onClick={() => copy(title, "preview-title")}
							>
								{titleCopied ? <Check className="text-success" /> : <Copy />}
								{titleCopied ? "Copied" : "Copy title"}
							</Button>
						</div>
						<p className="mt-1 text-[13px] leading-relaxed font-medium break-words text-ink">
							{title.trim() || <span className="text-ink-faint">Fill in the details to build a title.</span>}
						</p>
						{titlePromptsLeft.length > 0 ? (
							<p className="mt-1.5 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-warning">
								<AlertTriangle className="mt-px size-3.5 shrink-0" />
								<span>
									Replace {titlePromptsLeft.map((p) => `“${p}”`).join(", ")} in the title above before
									posting.
								</span>
							</p>
						) : null}
					</div>
				) : null}

				{text ? (
					<pre
						tabIndex={0}
						aria-label="Generated BBCode body"
						className="thin-scroll max-h-[380px] overflow-auto rounded-2xl border border-subtle bg-surface-2 p-3.5 whitespace-pre-wrap break-words font-mono text-[11.5px] leading-[1.75] text-ink-muted"
					>
						{text}
					</pre>
				) : (
					<PanelEmpty
						size="sm"
						icon={FileQuestion}
						title="Nothing to preview yet"
						description="Once you pick a format, the email body appears here exactly as it will be copied."
					/>
				)}
			</PanelBody>

			{text ? (
				<PanelFooter className="justify-between">
					<p className="text-[11.5px] text-ink-faint">
						{text.length.toLocaleString()} characters · {countWords(text).toLocaleString()} words
					</p>
					<Button variant="secondary" size="sm" onClick={() => copy(text, "preview")}>
						{copied ? <Check className="text-success" /> : <Copy />}
						{copied ? "Copied" : "Copy output"}
					</Button>
				</PanelFooter>
			) : null}
		</Panel>
	);
}
