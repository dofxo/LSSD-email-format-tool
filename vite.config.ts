import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

import { adminFormatsPlugin } from "./scripts/adminPlugin";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), adminFormatsPlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server:{
		port:3000
	},
	base: "/",
});
