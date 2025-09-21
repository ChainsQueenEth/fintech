# VeroVault — Next-gen Fintech Web App

[![CI](https://github.com/ChainsQueenEth/fintech/actions/workflows/ci.yml/badge.svg)](https://github.com/ChainsQueenEth/fintech/actions/workflows/ci.yml)

VeroVault is a modern, mobile-first fintech experience inspired by best-in-class digital banks. It blends React 18, TypeScript, Tailwind CSS, Framer Motion, and React Query into a cohesive design system and developer workflow. The stack is wired together with Webpack 5, Babel, and PostCSS for a fully configurable build pipeline.

## Highlights
- Responsive, adaptive UI composed with Tailwind utilities and Framer Motion
- Strong debugging ergonomics via a toggleable runtime console and structured logging helpers
- Query caching and mock data orchestration powered by React Query and browser APIs
- Robust tooling: ESLint, Prettier, Jest, Testing Library, and strict TypeScript configuration
- Webpack foundation with PostCSS + Tailwind pipeline and production-ready optimisations

## Tech Stack
- **Languages:** TypeScript (ESNext), modern JavaScript
- **Framework:** React 18 with Suspense, React Query 5
- **Styling:** Tailwind CSS 3, utility-first with custom tokens via Tailwind config
- **Animation:** Framer Motion 11
- **Tooling:** Webpack 5, Babel 7, PostCSS, Autoprefixer, ts-jest
- **Testing:** Jest 29, @testing-library/react, user-event, jsdom
- **Quality:** ESLint (React, Testing Library, TypeScript rules) + Prettier formatting

## Project Structure
```
src/
  App.tsx                 # App shell with Suspense and layout
  AppProviders.tsx        # React Query + Debug providers
  components/             # UI building blocks and motion-enhanced sections
  services/insightsService.ts # Mocked data service leveraging browser APIs
  styles/                 # (Removed) Previously held styled-components theme and globals
  utils/debug.tsx         # Debug context, logging utilities, test helpers
  views/HomeView.tsx      # Home experience composed of feature sections
```

## Available Scripts
| Command            | Description |
| ------------------ | ----------- |
| `pnpm dev`         | Start the Webpack dev server with HMR at `http://localhost:3000` |
| `pnpm build`       | Create an optimised production build in `dist/` |
| `pnpm lint`        | Run ESLint across `.ts`/`.tsx` source files |
| `pnpm test`        | Execute the Jest test suite once |
| `pnpm test:watch`  | Watch mode for the Jest suite |
| `pnpm typecheck`   | Verify TypeScript types without emitting output |
| `pnpm analyze`     | Build with bundle analyzer to inspect bundle size |

## Testing Approach
- **Jest + Testing Library:** Component-driven assertions and accessible queries
- **Custom render helper:** `src/utils/test-utils.tsx` wraps with React Query providers (no theme provider needed)
- **Sample coverage:** Hero CTA rendering and DebugConsole state toggling to guard key flows
- **Configuration:** jsdom environment, CSS modules mocked, coverage collection ready for CI

## Unit Tests

Component test files are located in `src/components/__tests__/`:

- `src/components/__tests__/AppLayout.test.tsx`
- `src/components/__tests__/DebugConsole.test.tsx`
- `src/components/__tests__/FeatureHighlights.test.tsx`
- `src/components/__tests__/Footer.test.tsx`
- `src/components/__tests__/Header.test.tsx`
- `src/components/__tests__/HeroSection.test.tsx`
- `src/components/__tests__/InsightsSection.test.tsx`
- `src/components/__tests__/MotionCardDeck.test.tsx`
- `src/components/__tests__/PricingSection.test.tsx`

Run all tests:

```bash
pnpm test
```

## Debugging & Observability
- `DebugProvider` persists state via `localStorage` and `URLSearchParams` for quick toggling
- Runtime console surfaces locale, timezone, connection, memory, and session uptime data
- Calls to `useDebug().log` emit styled console messages gated by debug mode
- DOM receives `data-debug` attribute when active, allowing CSS-based layout tracing

## UI/UX Principles
- Mobile-first layout with fluid typography (`clamp`) and stacked sections
- Accessible colour contrast, focusable controls, and semantic markup
- Motion used sparingly with Framer Motion, respecting reduced motion preferences
- Tailwind utilities with custom tokens (configured in `tailwind.config.js`); no styled-components

## Next Steps
1. Connect to real financial APIs (banking aggregates, FX rates, insights)
2. Expand authentication + onboarding surfaces
3. Layer in visual regression snapshots (e.g., Storybook with Chromatic)
4. Automate CI pipeline (lint, test, typecheck) with GitHub Actions

---
Crafted to showcase a modern fintech experience and a maintainable front-end foundation.

## Environment Configuration

- Create a `.env` file (see `.env.example`) to set `API_BASE_URL` used by the frontend. When `API_BASE_URL` is not set, the app will fall back to local mock data for insights.
- The dev server port can be customized with `PORT`.

The value of `API_BASE_URL` is injected at build time via Webpack's `DefinePlugin` and `dotenv-webpack`.

## CI

GitHub Actions workflow is provided at `.github/workflows/ci.yml` to run lint, typecheck, tests, and build on pushes and PRs to `main`/`master`.

## Bundle Analysis

Run `pnpm analyze` to build the app with `webpack-bundle-analyzer` enabled and inspect the output bundle composition.
