import { useEffect, useState } from "react";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/input";
import { controlFieldClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface PasswordGateProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: React.ReactNode;
	/** False when no password is configured for this deployment. */
	configured: boolean;
	/** Returns true when the password matches. */
	onSubmit: (password: string) => boolean;
}

/** Modal that blocks a page until the matching password is entered. */
export function PasswordGate({
	open,
	onOpenChange,
	title,
	description,
	configured,
	onSubmit,
}: PasswordGateProps) {
	const [password, setPassword] = useState("");
	const [revealed, setRevealed] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		if (!open) {
			setPassword("");
			setRevealed(false);
			setError(null);
		}
	}, [open]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!configured) return;

		if (onSubmit(password)) {
			onOpenChange(false);
			return;
		}

		setError("That password doesn't match. Try again.");
		setAttempt((value) => value + 1);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-inset ring-accent/20">
							<ShieldAlert className="size-5" />
						</span>
						<DialogTitle>{title}</DialogTitle>
					</div>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col gap-1.5" key={attempt}>
						<Label htmlFor="admin-password">Password</Label>
						<div className="relative">
							<input
								id="admin-password"
								type={revealed ? "text" : "password"}
								autoFocus
								autoComplete="current-password"
								value={password}
								aria-invalid={Boolean(error)}
								aria-describedby={error ? "admin-password-error" : undefined}
								onChange={(event) => {
									setPassword(event.target.value);
									if (error) setError(null);
								}}
								placeholder="Enter password"
								className={cn(controlFieldClass, "h-11 pr-11 pl-3.5", error && "animate-shake border-danger")}
							/>
							<button
								type="button"
								onClick={() => setRevealed((value) => !value)}
								aria-label={revealed ? "Hide password" : "Show password"}
								className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-faint transition-colors duration-150 hover:bg-surface-3 hover:text-ink"
							>
								{revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
							</button>
						</div>
					</div>

					{error ? (
						<p
							id="admin-password-error"
							role="alert"
							className="flex items-start gap-2 rounded-xl border border-danger/25 bg-danger-soft px-3 py-2 text-[12.5px] text-danger"
						>
							<ShieldAlert className="mt-px size-3.5 shrink-0" />
							{error}
						</p>
					) : null}

					{!configured ? (
						<p className="flex items-start gap-2 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2 text-[12.5px] text-warning">
							<ShieldAlert className="mt-px size-3.5 shrink-0" />
							No admin password is set for this deployment, so this page cannot be unlocked.
						</p>
					) : null}

					<DialogFooter className="mt-1">
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" variant="primary" disabled={!configured || password.length === 0}>
							Unlock
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
