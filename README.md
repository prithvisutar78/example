# Inventra IMS

Inventra is a modern, data-dense Inventory Management System (IMS) SPA built for B2B retail, warehousing, manufacturing, and e-commerce teams.

## Features

- KPI-rich dashboard with realtime stock, alerts, and activity feeds.
- Inventory management with list/grid views, advanced filters, batch/lot and expiry alerts.
- Product detail profiles with stock history, supplier cards, and document uploads.
- Purchase order lifecycle tracking with status pipelines.
- Reporting & analytics cards with export and scheduling affordances.
- RBAC user management with audit-ready activity logs.
- Global search (Cmd/Ctrl + K), dark mode toggle, and responsive sidebar.
- Mock API layer with MSW for realistic fetching.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn-inspired component styling
- Zustand state management
- Recharts for charts
- TanStack Table for inventory tables
- MSW for mock API responses

## Getting Started

```bash
npm install
npm run dev
```

## Roadmap

- Live barcode scanning with camera permissions
- Supplier portal (view-only access)
- Multi-currency exchange rate sync
- CSV/Excel import validation workflow
- Role-based onboarding wizard with guided tours

## Performance

- Lazy loaded routes and chart rendering
- Optimized image thumbnails with CDN sources
- Responsive layouts for desktop, tablet, and mobile
