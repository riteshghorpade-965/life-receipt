# Life Receipt — Your Life, In Receipts

An interactive, frontend-only data story built from the organizer-provided receipt datasets.

## Experience
**Raw Data → Insights → Connections → Story**

- Life Pulse — visualizes music activity by year.
- Receipt Explorer — searchable and filterable prepared receipt index.
- Connect the Dots — explores calendar-date relationships across datasets.
- Pattern Lab — surfaces computed cross-dataset signals.
- Life Chapters — turns data patterns into descriptive story chapters.

## Data
Prepared from:
- Spotify listening history: 149,860 records
- Daily Household Transactions: 2,461 records
- India transaction dataset: 10,267 records

Sensitive fields such as card numbers, customer IDs, and unnecessary personal details are not shipped to the UI.

## Architecture
`components/` contains reusable UI, `utils/` contains testable data logic, and `public/data/` contains browser-ready aggregated data.

## Performance
The full raw datasets are not rendered into the DOM. The browser receives a small prepared insight/index file and renders a bounded receipt set.

## Accessibility
Semantic controls, keyboard-focus states, labels, responsive layout, and reduced-motion support are included.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deployment
Deploy the generated Vite app to Vercel, Netlify, GitHub Pages, or another static hosting provider.
