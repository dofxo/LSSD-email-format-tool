import { useCallback, useEffect, useRef, useState } from "react";

/** Synchronous copy fallback that works without clipboard permissions. */
const copyViaSelection = (text: string): void => {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.top = "0";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	textarea.select();

	try {
		const succeeded = document.execCommand("copy");
		if (!succeeded) throw new Error("Copy command was rejected");
	} finally {
		document.body.removeChild(textarea);
	}
};

/**
 * Copies text to the clipboard. Uses the async Clipboard API when available,
 * falls back to a hidden textarea, and gives up on a write that never settles
 * (which happens in embedded views where the permission prompt is suppressed).
 */
export async function copyText(text: string): Promise<void> {
	if (!navigator.clipboard?.writeText) {
		copyViaSelection(text);
		return;
	}

	try {
		await Promise.race([
			navigator.clipboard.writeText(text),
			new Promise<never>((_, reject) =>
				window.setTimeout(() => reject(new Error("Clipboard write timed out")), 700)
			),
		]);
		return;
	} catch {
		copyViaSelection(text);
	}
}

/**
 * Clipboard helper with a transient "copied" state so buttons can confirm the
 * action for a moment without extra bookkeeping in each component.
 */
export function useCopy(resetDelay = 2200) {
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const timer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const copy = useCallback(
		async (text: string, key = "default") => {
			try {
				await copyText(text);
				setCopiedKey(key);
				window.clearTimeout(timer.current);
				timer.current = window.setTimeout(() => setCopiedKey(null), resetDelay);
				return true;
			} catch {
				return false;
			}
		},
		[resetDelay]
	);

	const isCopied = useCallback((key = "default") => copiedKey === key, [copiedKey]);

	return { copy, isCopied, copiedKey };
}
