import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AdminPage from "./AdminPage.tsx";
import App from "./App.tsx";

// Lightweight routing: /admin opens the format manager, everything else the tool.
const path = window.location.pathname.replace(/\/+$/, "");
const isAdmin = path === "/admin";

createRoot(document.getElementById("root")!).render(
	<StrictMode>{isAdmin ? <AdminPage /> : <App />}</StrictMode>
);
