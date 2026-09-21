import { useCallback, useEffect, useMemo, useState } from "react";

import type { FormatData } from "@/types";

/** One saved session: which format it belongs to and everything typed into it. */
interface StoredSession {
	key: string;
	data: FormatData;
}

/** Single localStorage key: an array of saved session objects. */
const STORAGE_KEY = "formatDataSessions";

const loadSessions = (): StoredSession[] => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return [];
		const parsed = JSON.parse(saved) as unknown;
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(
			(item): item is StoredSession =>
				!!item &&
				typeof item === "object" &&
				typeof (item as StoredSession).key === "string" &&
				!!(item as StoredSession).data &&
				typeof (item as StoredSession).data === "object",
		);
	} catch {
		return [];
	}
};

const isEmptyData = (data: FormatData) =>
	Object.values(data).every(
		(value) =>
			value === undefined ||
			value === "" ||
			(Array.isArray(value) && value.length === 0),
	);

/**
 * Keeps every format's inputs, saved under one localStorage key as an array of
 * objects keyed by "division/formatId". Each session (format) holds its own
 * data, so filling one report never touches another and nothing is lost on
 * reload. Pass a different key (e.g. when the division changes) to isolate
 * sessions from each other.
 */
export function useFormatData(sessionKey: string) {
	const [sessions, setSessions] = useState<StoredSession[]>(loadSessions);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
		} catch {
			/* storage may be full or unavailable, so the app keeps working in memory */
		}
	}, [sessions]);

	const formatData = useMemo<FormatData>(
		() => sessions.find((session) => session.key === sessionKey)?.data ?? {},
		[sessions, sessionKey],
	);

	const setFormatData = useCallback(
		(updater: React.SetStateAction<FormatData>) => {
			if (!sessionKey) return;
			setSessions((prev) => {
				const current = prev.find((session) => session.key === sessionKey)?.data ?? {};
				const nextData =
					typeof updater === "function"
						? (updater as (previous: FormatData) => FormatData)(current)
						: updater;

				const exists = prev.some((session) => session.key === sessionKey);
				if (isEmptyData(nextData)) {
					return exists ? prev.filter((session) => session.key !== sessionKey) : prev;
				}
				if (exists) {
					return prev.map((session) =>
						session.key === sessionKey ? { key: sessionKey, data: nextData } : session,
					);
				}
				return [...prev, { key: sessionKey, data: nextData }];
			});
		},
		[sessionKey],
	);

	/** Clears the inputs saved for the current session (Reset button). */
	const clearFormat = useCallback(() => {
		if (!sessionKey) return;
		setSessions((prev) => prev.filter((session) => session.key !== sessionKey));
	}, [sessionKey]);

	return { formatData, setFormatData, clearFormat };
}
