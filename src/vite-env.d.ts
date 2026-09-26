/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SUPERVISORY_PASSWORD: string;
	readonly VITE_ADMIN_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
