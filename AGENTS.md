# cw-website

Ash Crockett's portfolio: a React 19 + TypeScript SPA styled with Chakra UI 3 (Emotion), routed with react-router-dom 7, bundled by webpack 5, deployed to Netlify.

## Commands

- `npm run start`: dev server on http://localhost:3000. `npm run build`: production bundle in `dist/`.
- `npm run lint` / `lint:fix` (ESLint 9 flat config), `npm run format` / `format:check` (Prettier), `npm run typecheck`, `npm test`.
- Use npm (`package-lock.json`); don't add another lockfile.

## Conventions

- Components are named arrow-function exports (`export const NavBar = () => ...`); ESLint forbids default exports.
- Style with Chakra primitives, style props, and tokens in `src/theme.ts`. Don't add CSS files; the webpack CSS rule is unused.
- Import images as modules; add a type in `src/assets.d.ts` for any new extension (only `*.svg` and `*.jpg` exist).
- Pages live in `src/pages/` and are lazy-loaded in `src/App.tsx`. Shared components go in `src/components/`; page-specific sections in `src/components/<page>/` (e.g. `home/`).
- Netlify reads `netlify.toml`: `npm run build`, publish `dist`, Node 24, and a `/* -> /index.html` SPA redirect.

## Decisions

Read the relevant records in `docs/adr/` before changing tooling or structure. Add a new ADR (copy `docs/adr/0000-template.md`) for any significant decision, and mark ones it replaces as Superseded.

## Project checks and UI tests

Use Node 24 and npm with the checked-in lockfile. Node 24.13.1 with npm 11.8.0 is a verified local pairing; CI and Netlify use Node 24.

```sh
npm ci
npm run check
```

`check` runs `npm run lint`, `npm run format:check`, `npm run typecheck` (app and test programs), `npm run test:coverage`, and `npm run build` in that order. `npm test` runs tests once without coverage. `npm run test:watch` reruns affected tests during edits.

## Add a test

- Put the test beside its source: `NavBar.tsx` → `NavBar.test.tsx`, or use `*.test.ts` when no JSX is needed. Import Vitest APIs explicitly.
- Render a component with `renderWithProviders` from `src/testing/render.tsx`. It supplies the real Chakra system, a MemoryRouter, and a fresh user-event instance. For `App`, call Testing Library's `render` directly: App owns its own Chakra provider and BrowserRouter.
- Assert what users can observe. Prefer role and accessible name, then label, then visible text. Use a test ID only when there is no suitable user-facing query, and explain why.
- Await user-event interactions. Use `findBy` or `waitFor` only when the behavior is asynchronous. Don't use arbitrary delays, blanket snapshots, provider/router/component mocks, CSS assertions, live network calls, or external navigation.
- Run the new file with npm argument forwarding: `npm test -- src/components/NavBar.test.tsx`.

## Coverage and reuse

Each production TypeScript file under `src/` must reach 80% statements, branches, functions, and lines, even if no test imports it. Only the browser bootstrap (`src/index.tsx`), type declarations (`src/**/*.d.ts`), colocated tests (`src/**/*.test.{ts,tsx}`), and test infrastructure (`src/testing/**`) are excluded because they are not production UI or supporting logic under test. Cover the theme, icons, and project data through the real UI. Never lower a threshold or exclude production code to make a check pass.

Run `npm run test:coverage` for the whole gate and open `coverage/index.html` for file-level details. The runner config in `.devin/`, DOM setup, and test conventions can be copied. Adapt the Chakra system and router wrapper for the destination project; no shared package is needed.

## Site metadata and SITE_URL

- `public/index.html` holds the static SEO and Open Graph tags (title, description, `og:*`) so crawlers read them without JavaScript. Every SPA route shares this site-level metadata; don't add a runtime head manager for it.
- `SITE_URL` is an optional build variable read in `webpack.config.js`. It must be a public HTTPS origin with a dotted domain name (no IP address, localhost, path, query, fragment, or credentials); a trailing slash is stripped and invalid values fail the build. When set, the template adds `canonical`, `og:url`, `og:image` (the hashed `src/assets/mt-taranaki.jpg`, resolved via `require` in the template), and `og:image:alt`. When unset (local and CI builds), those URL tags are omitted.
- Netlify sets `SITE_URL` in `netlify.toml` (currently `https://ashcrockett.netlify.app`). Update it there when the custom domain is confirmed; a value in `netlify.toml` overrides one set in the Netlify UI.
- Test locally with a clearly fake origin, e.g. `SITE_URL=https://preview-test.example.com npm run build`, and check `dist/index.html`'s `og:image` names a JPG in `dist/`. Don't commit that output. `src/metadata.test.ts` covers the template and URL validation.
- After deploying, fetch the public HTML and the `og:image` URL with `curl -sI`; the image must return `content-type: image/jpeg`, not the SPA fallback HTML. Then run the URL through LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) to refresh LinkedIn's cache and check the card.
