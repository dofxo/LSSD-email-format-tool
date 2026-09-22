import { Lock, Moon, ShieldCheck, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Theme } from "@/hooks/useTheme";

export function AppHeader({
	theme,
	onToggleTheme,
	unlocked,
	onLock,
}: {
	theme: Theme;
	onToggleTheme: () => void;
	unlocked: boolean;
	onLock: () => void;
}) {
	return (
		<header className="sticky top-0 z-40 border-b border-subtle bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
			<div className="mx-auto flex h-16 w-full max-w-[1680px] items-center gap-3 px-4 sm:px-6 lg:px-8 2xl:px-12">
				<div className="flex min-w-0 items-center gap-3">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-subtle bg-surface shadow-xs">
						<img src="/images/logo.webp" alt="" className="size-7 object-contain" />
					</span>
					<div className="min-w-0">
						<h1 className="truncate text-[15px] leading-tight font-semibold text-ink">
							LSSD Email Format Tool
						</h1>
						<p className="hidden truncate text-[11.5px] text-ink-muted sm:block">
							Los Santos County Sheriff&apos;s Department
						</p>
					</div>
				</div>

				<div className="ml-auto flex items-center gap-1.5">
					{unlocked ? (
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={onLock}
							title="Lock supervisory formats"
							aria-label="Lock supervisory formats"
						>
							<Lock />
						</Button>
					) : null}

					<Button
						variant="secondary"
						size="icon-sm"
						onClick={onToggleTheme}
						title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
						aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
					>
						{theme === "dark" ? <Sun /> : <Moon />}
					</Button>

					<span
						className="hidden items-center gap-1.5 text-[11.5px] font-medium text-ink-faint lg:flex"
						aria-hidden={!unlocked}
					>
						{unlocked ? <ShieldCheck className="size-3.5 text-accent" /> : null}
						{unlocked ? "Supervisory unlocked" : null}
					</span>
				</div>
			</div>
		</header>
	);
}
