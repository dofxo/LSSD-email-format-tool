import { Check, Download, Puzzle, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** The packaged extension served from the app's public folder. */
export const EXTENSION_DOWNLOAD_URL = "/lssd-format-tool.zip";

const STEPS = [
	"Download the extension and unzip it somewhere you will keep.",
	"Open chrome://extensions and turn on Developer mode (top right).",
	"Click “Load unpacked” and choose the unzipped lssd-format-tool folder.",
	"That's it — press “Open in government website” and the title and post are already filled in.",
];

/**
 * A one-line nudge shown after the first copy or gov-link click, pointing at the
 * extension download. Dismissing it keeps it away for good.
 */
export function ExtensionBanner({
	onOpen,
	onDismiss,
	className,
}: {
	onOpen: () => void;
	onDismiss: () => void;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"animate-rise flex flex-wrap items-center gap-x-3 gap-y-2 rounded-panel border border-accent/25 bg-accent/8 px-4 py-3",
				className
			)}
		>
			<span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
				<Sparkles className="size-4" />
			</span>
			<div className="min-w-[12rem] flex-1">
				<p className="text-[13px] font-medium text-ink">
					Skip the copy-paste: fill the government post in one click.
				</p>
				<p className="text-[12px] text-ink-muted">
					Add the free extension and the title and body land in the form by themselves — no copying or
					pasting.
				</p>
			</div>
			<div className="flex shrink-0 items-center gap-1.5">
				<Button variant="soft" size="sm" onClick={onOpen}>
					<Puzzle />
					Get the extension
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					onClick={onDismiss}
					aria-label="Dismiss the extension suggestion"
					title="Don’t show this again"
				>
					<X />
				</Button>
			</div>
		</div>
	);
}

/** Install instructions for the browser extension. */
export function ExtensionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[520px]">
				<DialogHeader>
					<span className="mb-1 flex size-10 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-inset ring-accent/20">
						<Puzzle className="size-5" />
					</span>
					<DialogTitle>LSSD Format Tool extension</DialogTitle>
					<DialogDescription>
						A small Chrome/Edge extension that fills the topic title and the post body on the government
						website for you. It reads them from the link this tool opens — the content stays in your browser
						and is never sent to the forum's server or anywhere else.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3 rounded-2xl border border-subtle bg-surface-2 px-4 py-3.5">
					<p className="text-[12px] font-semibold tracking-[0.08em] text-ink-faint uppercase">
						Install in about a minute
					</p>
					<ol className="flex flex-col gap-2.5">
						{STEPS.map((step, index) => (
							<li key={step} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-muted">
								<span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-md bg-surface-3 text-[11px] font-semibold text-ink">
									{index + 1}
								</span>
								<span>{step}</span>
							</li>
						))}
					</ol>

					<p className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-faint">
						<Check className="mt-px size-3.5 shrink-0 text-success" />
						It works on the department’s government site (gov.eclipse-rp.net) only, and only on posting
						pages.
					</p>

					<p className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-faint">
						<Check className="mt-px size-3.5 shrink-0 text-success" />
						The download link stays available from the puzzle icon at the top of the page.
					</p>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost" size="md">
							Later
						</Button>
					</DialogClose>
					<Button variant="primary" size="md" asChild>
						<a href={EXTENSION_DOWNLOAD_URL} download>
							<Download />
							Download extension
						</a>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
