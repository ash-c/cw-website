# Project checks and UI tests

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
