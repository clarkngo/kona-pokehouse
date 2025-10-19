# Changelog

All notable changes to this project are documented here. Timestamps use ISO 8601 with timezone offsets.

Note: Entries below summarize the intent behind each commit for traceability.

## 2025-10-19

- 2025-10-19T01:43:12-07:00 — e2127cfa — change title
	- Why: Align the document/app title with the project name for clarity in browsers and bookmarks.

- 2025-10-19T01:41:27-07:00 — a4d51878 — chore: add GEMINI.md and update Checklist.jsx and dist build
	- Why: Add project notes/documentation and iterate on the checklist behavior; refresh the production build artifacts for deployment.

- 2025-10-19 — Branding and PWA groundwork
	- Why: Rebrand the app from the Vite template to “Kona Pokehouse” and lay the groundwork for Progressive Web App (PWA) support so the app can be installed and feel native on mobile/desktop.
	- Changes made:
		- Set the HTML document title to “Kona Pokehouse”.
		- Removed the default Vite favicon reference to prepare for custom app icons required by PWA manifests.
		- Updated README with project-specific details and usage.
	- What’s needed to complete PWA support (next steps):
		- Add a Web App Manifest at `public/manifest.webmanifest` with fields like `name`, `short_name`, `start_url`, `display`, `background_color`, `theme_color`, and `icons` (including 192×192, 512×512, and maskable variants).
		- Reference the manifest in `index.html` via `<link rel="manifest" href="/manifest.webmanifest" />` and include `<meta name="theme-color" content="#XXXXXX" />` to color the browser UI.
		- Provide platform icons: `favicon.ico`, `apple-touch-icon` (180×180), and Android/Chrome icons referenced in the manifest.
		- Register a service worker (e.g., using `vite-plugin-pwa` or a custom `sw.js`) from `src/main.jsx` to cache the app shell and enable offline/“Add to Home Screen”.
		- Ensure the app is served over HTTPS and that the manifest `scope` and `start_url` reflect the deployed base path (GitHub Pages base `/kona-pokehouse/`).

## 2025-10-15

- 2025-10-15T16:14:05-07:00 — 50c03fc8 — refactor: Improve touch-friendliness of checklist
	- Why: Enhance mobile usability with larger tap targets and better spacing for touch devices.

- 2025-10-15T16:07:22-07:00 — d073b356 — feat: Add data management and reporting features
	- Why: Enable saving/loading checklist state, copying checked/missing items, and generating a timestamped inventory report to streamline shift handoffs.

- 2025-10-15T15:36:37-07:00 — 177524d9 — Update artifact upload path in static.yml
	- Why: Correct the CI artifact path to ensure the built assets are available to deployment and previews.

- 2025-10-15T15:35:58-07:00 — 58bd08c5 — feat: Add dist directory for GitHub Pages deployment
	- Why: Commit the generated static site for GitHub Pages hosting and simpler distribution.

- 2025-10-15T15:23:16-07:00 — ddc97d56 — feat: Create mobile-friendly checklist component
	- Why: Introduce the primary UI for the poke ingredient inventory with a layout optimized for phones.

## 2025-10-14

- 2025-10-14T13:09:08-07:00 — 00c46f4b — Initial commit
	- Why: Scaffold the project structure (React + Vite) to bootstrap development.
