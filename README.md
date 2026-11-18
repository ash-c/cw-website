# cw-website

Personal portfolio website for Ash Crockett, full-stack software engineer. Built with React 19, TypeScript, Chakra UI 3, and react-router-dom 7, bundled with webpack 5.

## Getting started

Requires Node 24 and npm.

```sh
npm ci
npm run start   # dev server at http://localhost:3000
npm run build   # production bundle in dist/
```

## Checks

- **All checks**: `npm run check` runs lint, format check, typecheck, tests with coverage, and the production build. GitHub Actions runs it on every pull request and on pushes to `main`.
- **Linting**: `npm run lint` (or `npm run lint:fix` to auto-fix where possible) uses ESLint with TypeScript, React, accessibility, and Prettier integration.
- **Formatting**: `npm run format` formats the TypeScript/TSX files under `src/` and the test config in `.devin/` with Prettier. `npm run format:check` verifies formatting without writing.
- **Type checking**: `npm run typecheck` checks both the app and the test TypeScript projects.
- **Tests**: `npm test` runs the Vitest UI tests once, `npm run test:watch` reruns them during edits, and `npm run test:coverage` enforces 80% per-file coverage. See `AGENTS.md` for test conventions.
- **Editor setup**: Set Prettier as this workspace's default formatter and turn on "Format on Save".

## Deployment

Netlify builds from `netlify.toml`: it runs `npm run build` on Node 24, publishes `dist/`, and redirects every route to `index.html` so client-side routing works.

## Project knowledge

- `AGENTS.md`: project conventions for contributors and AI agents.
- `docs/adr/`: architecture decision records.
- `.devin/rules/`: rules scoped to specific file types.
