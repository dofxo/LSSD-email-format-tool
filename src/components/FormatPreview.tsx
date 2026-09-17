import { useMemo, useState } from "react";
import { AlertTriangle, Check, Code2, Copy, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelEmpty, PanelFooter, PanelHeader, PanelHeading } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { useCopy } from "@/hooks/useCopy";
import { countWords, toReadableText } from "@/lib/preview";
import { cn } from "@/lib/utils";

interface FormatPreviewProps {
	text: string;
	formatLabel: string;
}

export function FormatPreview({ text, formatLabel }: FormatPreviewProps) {
	const [mode, setMode] = useState<"raw" | "readable">("raw");
	const { copy, isCopied } = useCopy();
	const copied = isCopied("preview");

	const readableText = useMemo(() => toReadableText(text), [text]);
	const body = mode === "raw" ? text : readableText;
	// Templates render empty fields as the string "undefined", so call that out.
	const placeholderCount = useMemo(() => (text.match(/undefined/g) ?? []).length, [text]);

	return (
		<Panel style={{ animationDelay: "80ms" }}>
			<PanelHeader>
				<PanelHeading
					icon={Code2}
					title="Generated output"
					description={formatLabel || "Choose a format to generate a body"}
				>
					{text ? (
						<Segmented
							size="sm"
							ariaLabel="Preview mode"
							value={mode}
							onChange={setMode}
							options={[
								{ value: "raw", label: "BBCode" },
								{ value: "readable", label: "Readable" },
							]}
						/>
					) : null}
				</PanelHeading>
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
						aria-label={mode === "raw" ? "Generated BBCode body" : "Generated body with tags removed"}
						className={cn(
							"thin-scroll max-h-[380px] overflow-auto rounded-2xl border border-subtle bg-surface-2 p-3.5 whitespace-pre-wrap break-words",
							mode === "raw"
								? "font-mono text-[11.5px] leading-[1.75] text-ink-muted"
								: "font-sans text-[12.5px] leading-relaxed text-ink"
						)}
					>
						{body}
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
						{mode === "readable" ? " · tags hidden for reading" : ""}
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
