<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend conventions

This app is a Next.js App Router frontend. It is a **presentation + data-fetching client**: it
owns no business rules of record. Validation, authorization, and every other rule of record live in
the backend service; this app renders backend data, drives mutations through it, and enforces
access only as a UX convenience on top of the backend's own checks.

The conventions below describe how to structure and style that client. They are adapted from the
`nusapala-things/frontend` reference implementation — when a path or helper named here does not yet
exist in this repo, create it following that reference rather than inventing a new shape. This
document is intentionally free of this project's specific routes, permissions, and domain
vocabulary; those get documented once the product surface settles.

Read this file, and any scoped `AGENTS.md` along the path to the files you will change, before
writing code. Verify version-specific behavior against the bundled Next.js docs at
`node_modules/next/dist/docs/`.

## Directory structure & colocation

- Shared code lives directly under `src/` — `src/assets/`, `src/components/`, `src/hooks/`,
  `src/lib/`, `src/config/`, `src/types/` — with no `shared/` wrapper folder. Something moves here
  the moment more than one route needs it.
- Route-private code lives inside its route segment folder in non-routable subfolders prefixed with
  `_`: `the-page/_components`, `_hooks`, `_lib`, `_assets`. The leading underscore is a Next.js
  convention that guarantees the folder is excluded from routing, so anything can live inside it.
- Keep the split shallow and honest: a single-file concern stays one file; when it outgrows that,
  give it its own folder using the same `_components`/`_hooks`/`_lib` split one level down rather
  than piling unrelated concerns together.
- Standard routing files — `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`,
  `route.ts`, `template.tsx` — sit directly in the route segment, never inside a private `_`
  folder. Use route groups `(group-name)` to share a layout or organize routes without changing
  the URL.
- `src/lib/api/` is the only place the app talks to the backend, one file per backend resource
  area, re-exported through a barrel (`src/lib/api/index.ts`). Feature mutations live beside their
  route in `_lib/actions.ts`. Keep transport wrappers (`src/lib/api/*`) and Server Actions
  (`_lib/actions.ts`) as separate layers.
- `src/lib/` holds cross-cutting framework helpers (query parsing, session, permissions,
  navigation). `src/config/` holds static configuration (`app.ts`, `env.ts`, `navigation.ts`);
  environment values are read only there.
- Import through the `@/*` alias (mapped to `./src/*` in `tsconfig.json`); avoid deep relative
  chains that climb out of a feature.

## Naming

- Folders and `.ts` files: `kebab-case` (`node-status.ts`, `use-node-list.ts`).
- React `.tsx` component files: `PascalCase` (`NodeStatusBadge.tsx`) matching the default export.
- Primitive UI components in `src/components/ui/` (buttons, inputs, dialogs — the small reusable
  building blocks, not features) are named lowercase (`button.tsx`, `dialog.tsx`) while still
  default-exporting a `PascalCase` component.
- One default-exported component per `.tsx` file; the filename matches the export. Use named
  exports for non-component modules and hooks.

## Server and Client Components

App Router components are **Server Components by default**. Add `'use client'` only when the
component genuinely needs React state/effects, an event handler, a browser-only API, or a custom
hook that needs one of those. Push the directive as far down the tree as possible — wrap the
interactive leaf, not the whole page — so most of the tree stays server-rendered.

Do data fetching, cookie reads, and token handling server-side, then pass plain serializable data
down as props. Never pass a token, a `fetch` function, or a non-serializable object (e.g. a `Set`)
across the server/client boundary; convert it to a plain array or serializable shape first.

## Data fetching & mutations

- Reads happen in Server Components (or in a `src/lib/api/*` function they call), so data loads
  before any JS ships. Run independent reads through `Promise.all`, and issue a read only when the
  caller is permitted to perform it — never fire a forbidden background request just to hide the
  result.
- `fetch` is **not cached by default** in this Next.js version; every request re-runs unless you
  opt in per call with `{ cache: "force-cache" }` or `{ next: { revalidate: <seconds> } }`. Only
  cache reads that are safe to serve stale — live/operational data never is.
- Mutations use Server Actions (`'use server'`), normally in the owning route's `_lib/actions.ts`,
  invoked from a `<form action={...}>` or a Client Component handler. A Server Action is a public
  POST endpoint regardless of which UI calls it, so it must **re-verify the session and permission
  itself** before calling the backend.
- Call `revalidatePath`/`revalidateTag` only after a mutation that actually changes a cached read —
  never speculatively.
- Use local `loading.tsx` / `error.tsx` / `not-found.tsx` boundaries for meaningful transitions and
  recoverable failures; map backend 404 responses to `notFound()` on detail pages.
- URL search params own collection state (page, limit, filters, search). Parse them through the
  shared helpers (`src/lib/collection-query.ts`, `src/lib/query.ts`): validate to positive safe
  integers, ignore unknown enum values, and redirect an out-of-range page while preserving the
  other filters.

## API boundary (`src/lib/api/`)

- One file per backend resource area, mirroring the backend's own resource grouping. Components
  never call `fetch` directly against the backend.
- A single low-level client owns authorization headers, JSON encoding, redirect handling, and error
  normalization. It throws a typed error (status + title + message) on non-2xx and is marked
  `import "server-only"` so the backend address and credentials can never reach the client bundle.
- Collection wrappers accept typed query objects and return the backend's paginated envelope. For
  "fetch everything" selectors, use the shared page-walk helper — it dedupes by an explicit key and
  has a hard page ceiling that throws rather than looping forever. Never hand-roll a page loop or
  silently cap results per caller.
- Optional lookups (e.g. resolving a filter id to a display name) go through a helper that maps a
  backend `404` to `null` but rethrows everything else — never `.catch(() => null)`, which would
  swallow a transient `5xx` as "not found".
- Keep backend request/response shapes in one typed source colocated with the wrapper; don't
  redeclare the same shape across components.

## Collections, filters, and records

- Resource collections are **card-first** and responsive. Avoid a desktop-only table unless the
  data is inherently tabular (dense records, time-series, secret lists), and even then keep a
  usable small-screen representation. Distinguish a truly empty collection from "no results match
  these filters" — different copy, different recovery actions.
- Filter forms share one shell: a `<form>` with a responsive grid of fields and a footer holding a
  Clear link and an Apply button, always visible (no hidden mobile filter drawer). Entity-reference
  filters use a searchable combobox backed by a server-side search action, not a `<select>`
  populated from a full list fetch. Enum filters use the shared UI `select`, not a raw `<select>`.
- Secret-bearing values (API keys, tokens) are shown in full exactly once, immediately after
  creation, next to a copy control; every later list/table view shows only a masked suffix. Follow
  this show-once pattern for any future credential-like resource.
- Destructive and result-bearing dialogs share a single action-dialog hook for the
  open/reset/remount-on-reopen lifecycle instead of hand-rolling `[open, setOpen]` plus a remount
  key. It defaults to closing (and resetting) on success; opt out for dialogs that must stay open
  to show a one-time result. Destructive actions require explicit confirmation, stay open while
  pending, surface backend failures, and cannot repeat from stale success state. Keep dialogs
  mounted and control `open` so focus restoration works.
- Checklist/assignment UIs (permissions to a role, actions to a node class) reconcile optimistic
  checkbox state against the authoritative server set through a shared hook. It keys off the
  authoritative `Set`'s reference identity — memoize the `Set` you pass it.
- Record-heavy pages (logs, telemetry, history) share bounded time-range controls, JSON inspection,
  and scoped deletion, and use visibility-aware refresh that pauses while the tab is hidden.

## Forms

- Model form state as a discriminated result (`idle | error | success`) that Server Actions return.
  Surface field-level and form-level errors distinctly, keep submitted values on error, and disable
  the submit control while pending.
- Validate direct-call input inside the Server Action (it is a public endpoint), and treat the
  backend as the final authority for value rules.

## TypeScript

- `strict` mode is on (`tsconfig.json`) — keep it. No `any`; use `unknown` and narrow, or define a
  proper type/interface.
- Give exported functions and component props explicit types; let local inference do the rest.
- Import shared backend shapes from their single typed source instead of redeclaring them.

## Images, fonts, and environment

- Always use `next/image`, never a raw `<img>`, and give every image real `alt` text (`alt=""` only
  for genuinely decorative images).
- Load every font through `next/font/local` or `next/font/google` and expose it as a CSS/Tailwind
  font token — never a `<link>` or `@import` to a font CDN. Self-hosting is required for privacy and
  layout stability.
- Read environment values only through `src/config/env.ts`. Prefix a variable `NEXT_PUBLIC_` only
  when its value is genuinely safe to ship to the browser — never a secret, token, or anything
  auth-related. Keep local secrets in an untracked `.env.local`.

## Accessibility

- Use semantic HTML (`<button>`, `<nav>`, ordered headings) over clickable `<div>`s; give icon-only
  controls an `aria-label`; keep everything keyboard-reachable with a visible focus ring (don't
  strip default focus styles without replacing them).
- Preserve shell behaviors: a skip link, modal focus containment/restoration, and Escape/overlay
  close that is ignored while a mutation is pending.
- Respect `prefers-reduced-motion` for non-essential animation.

## Linting, formatting & verification

- Before considering a change done, all of these must pass:

  ```sh
  pnpm typecheck
  pnpm lint
  pnpm build
  ```

- Formatting is owned by Prettier (`pnpm format` / `pnpm format:check`); ESLint stays free of
  stylistic rules via `eslint-config-prettier`. Keep Tailwind class order deterministic with
  `prettier-plugin-tailwindcss`, declared in `.prettierrc`.
- Verify auth, shell, responsive behavior, and focus against a running production build when those
  areas change.

# Design rules

Direction: simple, friendly, and professional — soft rounded shapes and a warm pastel palette,
without skeuomorphism, gratuitous animation, or playful iconography that undercuts an operations
tool. Derived from the brand assets in `src/assets/`.

## Color palette & tokens

Brand palette: `#603f26`, `#c49a6c`, `#fedbb5`, `#ffeac5`, plus pure black `#000000` and white
`#FFFFFF` neutrals (and, where an outline needs to read softer than pure black, a near-black ink
tone). Ordered by lightness, the warm tones form a natural ramp — use this ordering when deriving
shades in-between rather than picking arbitrary hex values:

| Token       | Hex       | Role                                             |
| ----------- | --------- | ------------------------------------------------ |
| `primary`   | `#603f26` | Dark brown — primary ink/fill on light surfaces  |
| `accent`    | `#c49a6c` | Mid tan — secondary accents, borders, muted text |
| `highlight` | `#fedbb5` | Soft peach — highlights, hover/active tints      |
| `surface`   | `#ffeac5` | Pale cream — card/badge backgrounds              |

Define these as Tailwind v4 `@theme` tokens in `src/app/globals.css` with **semantic** names (e.g.
`--color-primary`, `--color-surface`), then reference them as utilities (`bg-primary`,
`text-primary`) — never scatter raw hex values through component `className` strings. Keep the
palette to this warm family; expand only with tints/shades derived from it.

## Dark & light mode

Define every semantic token for both modes — a light value in `:root` and a dark override inside
`@media (prefers-color-scheme: dark)`. Never hardcode a hex in a component. For dark mode, don't
simply invert: darken `surface`/`background` toward near-black, keep `primary` legible against it
(lighten it if the dark brown reads muddy), and stay in the same warm hue family so it still reads
as the brand. There is no manual theme toggle — `prefers-color-scheme` only. No component is done
until it has been checked in both modes: text contrast, border visibility, and that flat SVG
icons/illustrations don't vanish against a flipped background.

## Mood & shape language

- **Rounded, friendly shapes.** Prefer generously rounded corners on cards, buttons, and inputs
  (`rounded-xl`/`rounded-2xl`), with thick, consistent stroke weights and rounded terminals on
  icons/illustrations. Flat SVG fills should read as part of the same warm family.
- **Simplicity over ornamentation.** Flat fills, minimal-to-no drop shadows, generous whitespace.
  Character comes from shape and palette, not decoration.

## Typography

- **Coolvetica is the brand-name face — use it for nothing else.** The self-hosted Coolvetica
  display face (`--font-display`, from `src/assets/fonts/coolvetica/`) is reserved **exclusively**
  for the literal brand text `MATE` / `LockMATE` — the wordmark, and any place the product name is
  set as text. It must not appear anywhere else: not page titles or section headings, not buttons
  or CTAs, not stats/numerics, not table cells, labels, or body copy. (The wordmark rendered from
  `public/*.svg` / `LockmateWordmark.tsx` already has its letterforms outlined, so it needs no
  webfont at all.) If a non-brand element wants emphasis, carry it with weight, scale, or colour —
  never by reaching for Coolvetica.
- **Body face — everything else.** All other text (headings, UI, numerics, controls, labels) uses
  the theme body face (`--font-sans`, Plus Jakarta Sans), which stays the default `font-family` on
  `<body>`. Load faces via `next/font` and reference them only through their tokens.
- **Outlier**: Geist Mono (`--font-mono`) for IDs, counts, and key labels only.

## Responsiveness

Build **mobile-first**: unprefixed Tailwind classes are the small-screen baseline; layer
`sm:`/`md:`/`lg:`/`xl:` on top for wider viewports. Data-dense elements need an explicit
small-screen plan (card/list fallback, hide secondary metadata, or reserve horizontal scroll for
genuinely tabular content). Never hardcode pixel widths/heights that break at breakpoints — use
relative units and the breakpoint scale. Keep touch targets comfortably tappable at mobile widths.
No component is done until it has been checked at mobile, tablet, and desktop widths.
