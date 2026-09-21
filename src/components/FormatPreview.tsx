import { useMemo } from "react";
import { AlertTriangle, Check, Code2, Copy, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelEmpty, PanelFooter, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { useCopy } from "@/hooks/useCopy";
import { countWords } from "@/lib/preview";

interface FormatPreviewProps {
	text: string;
	formatLabel: string;
}

export function FormatPreview({ text, formatLabel }: FormatPreviewProps) {
	const { copy, isCopied } = useCopy();
	const copied = isCopied("preview");

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
