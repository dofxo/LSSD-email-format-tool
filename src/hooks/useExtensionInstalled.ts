import { useEffect, useState } from "react";

import { detectExtension } from "@/lib/extensionStatus";

/**
 * Whether the browser extension is already installed.
 *
 * Checked once per page load. It starts as false, so the suggestion is only
 * ever shown until — or unless — the extension answers.
 */
export function useExtensionInstalled(): boolean {
	const [installed, setInstalled] = useState(false);

	useEffect(() => {
		let active = true;
		void detectExtension().then((found) => {
			if (active) setInstalled(found);
		});
		return () => {
			active = false;
		};
	}, []);

	return installed;
}
