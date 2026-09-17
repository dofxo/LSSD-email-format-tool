import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "lssd-theme";

const readStoredTheme = (): Theme | null => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored === "light" || stored === "dark" ? stored : null;
	} catch {
		return null;
	}
};

const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

/** Theme state that stays in sync with the document, localStorage and the OS. */
export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? (prefersDark() ? "dark" : "light"));

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			/* storage can be unavailable in private mode, but the class still applies */
		}
	}, [theme]);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystemChange = () => {
			if (!readStoredTheme()) setTheme(media.matches ? "dark" : "light");
		};
		media.addEventListener("change", onSystemChange);
		return () => media.removeEventListener("change", onSystemChange);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((current) => (current === "dark" ? "light" : "dark"));
	}, []);

	return { theme, setTheme, toggleTheme };
}
