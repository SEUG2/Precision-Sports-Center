# Precision Sports Center · Copilot Instructions

## Project Snapshot
- Vite + React 19 frontend lives in `Precision_Sports_Center/Frontend`; Backend and Database folders are placeholders with empty files.
- Routing handled in `src/App.jsx` via `react-router-dom`; every page renders inside `components/layout/AppLayout.jsx` for shared header/footer/mobile nav.
- UI components under `src/components/ui` are simplified shadcn-inspired primitives (mostly JS/TSX) and expect Tailwind-style utility classes defined across `styles/global.css` and page-specific CSS.

## Run & Build Workflows
- From `Precision_Sports_Center/Frontend`: `npm install` then `npm run dev` (Vite dev server on 5173). Use `npm run build` for production bundles and `npm run preview` to sanity check the build.
- `npm run lint` runs eslint with configs in `eslint.config.js`; lint ignores `dist` by default.
- No automated tests or backend processes exist; mock API interactions client-side for now.

## State & Data Flow
- `context/CartContext.jsx` is the only global store. It normalizes product payloads (id/title/price/image) and derives `subtotal`/`totalItems`; always call `addItem` with those fields populated.
- Page data (hero tiles, product catalogs, testimonials) is static in each page module (e.g. `Pages/Home.jsx`, `Pages/Shop.jsx`). Update those arrays to change content; no shared fetching layer yet.
- `ShopContext.jsx` exposes demo product/cart state but is unused in the current tree—prefer `CartContext` unless new feature demands otherwise.

## UI & Styling Patterns
- Reusable cards/buttons/etc come from `components/ui`; they expect the `@/` alias configured in `vite.config.js` and `jsconfig.json`. Prefer importing via `@/components/ui/button` instead of relative paths.
- Product rendering pipelines reuse `components/ProductCard.jsx` (Swiper rails in Home, grid/list in Shop). Maintain parity between product objects and the props consumed there (price/originalPrice/inStock flags).
- CSS lives beside pages (`Pages/Home.css`, etc.) with global tokens in `styles/global.css`. When creating new sections, follow existing BEM-like naming and reuse CSS variables (`--tile-accent`, etc.).

## Supporting Utilities & Integrations
- Currency formatting centralized in `lib/formatCurrency.js` (`formatGHS`). Use it for all price displays to keep Ghana Cedi formatting consistent.
- `hooks/use-toast.ts` and `components/ui/toast.tsx` mirror shadcn toast behavior with a global singleton queue (limit 1). Use `const { toast } = useToast()` from components and ensure toast IDs remain unique.
- Carousel interactions rely on `swiper` modules, and icons come from `lucide-react` plus Font Awesome; verify related CSS imports (`swiper/css`) when adding new sliders.

## Implementation Tips
- Keep any async stubs client-side until the backend is implemented; guard new API calls behind environment checks or mock adapters.
- When adding pages, register routes in `App.jsx` and ensure layout slots render under `AppLayout` to keep navigation consistent.
- Static assets live in `src/img`; import via ES modules to benefit from Vite bundling. For external URLs, supply descriptive `alt` text to match existing accessibility patterns.
- If you introduce TypeScript files, ensure JSX uses `.tsx` and extend eslint config accordingly—current setup only targets `.js`/`.jsx`.
