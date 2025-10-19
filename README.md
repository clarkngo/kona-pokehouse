# Kona Pokehouse

Kona Pokehouse is a lightweight React app for managing a poke ingredient inventory checklist. It lets you track items by station, persist your progress locally, and export/import checklist state.

## Features

- Organized checklist by station with quick search via sections
- Auto-save to localStorage
- Export/import checklist state as JSON
- Copy checked items or missing items as formatted text
- Generate a timestamped inventory report
- One-click clear for a new shift

## Getting started

Prerequisites: Node.js 18+ recommended.

- Install dependencies
	- npm install

- Run locally (HMR)
	- npm run dev

- Build for production
	- npm run build

- Preview the production build
	- npm run preview

Note: The preview script uses a base of `/kona-pokehouse/` for GitHub Pages compatibility.

## Project layout

- `src/Checklist.jsx` — main checklist UI and logic
- `src/App.jsx` — app composition
- `index.html` — app shell (title set to "Kona Pokehouse")
## License

MIT © 2025
