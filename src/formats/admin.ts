// This file backs the /admin page. Formats added or edited at /admin are saved
// here so they live in the repo beside the built-in formats.
//
// Prefer editing through /admin: the JSON between the ADMIN_DATA markers below
// is regenerated on every save. Hand edits are fine too, as long as the block
// stays valid JSON.
import type { AdminFormatStore } from "./adminTypes";

export const adminFormatStore: AdminFormatStore = /* ADMIN_DATA */ {
	"overrides": {},
	"custom": []
} /* /ADMIN_DATA */;
