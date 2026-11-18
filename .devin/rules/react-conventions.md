---
trigger: glob
globs: "src/**/*.tsx"
---

# React component conventions

- Write components as named arrow-function exports: `export const SkillsSection = () => { ... }`. No default exports (ESLint `import/no-default-export`); type props with a `type XProps = { ... }` alias.
- Use the automatic JSX runtime: don't import `React` just for JSX. Import hooks and types by name (`import { ReactNode } from 'react'`).
- Build UI from Chakra UI 3 primitives (`Box`, `Flex`, `Stack`, `SimpleGrid`, `Container`, `Heading`, `Text`, `Image`, `Link`) with style props and responsive objects (`{ base: 1, md: 2 }`). Use Chakra v3 APIs (`gap`, not `spacing`). Use theme tokens from `src/theme.ts` (`primary.500`, `secondary.*`, `highlight.*`) over raw hex values. No CSS files, `className` styling, or inline `style`.
- Use semantic elements via `as` (`as="section"`, `as="main"`, `as="h2"`) and give images meaningful `alt` text; jsx-a11y is enforced.
- Placement: route-level pages in `src/pages/` (lazy-loaded from `src/App.tsx`); components reused across pages in `src/components/`; sections used by one page in `src/components/<page>/` (e.g. `src/components/home/HeroSection.tsx`).
- `Layout` renders a bare `<Box as="main">`. Each page or section owns its own `Container maxW="6xl"` padding so full-bleed sections (like the home hero) stay possible.
- Static content arrays (e.g. `src/data/projects.ts`) live in `src/data/`, not inline in components, when a page maps over them.
- Import images as modules (`import heroImage from '../../assets/mt-taranaki.jpg'`) and declare any new extension in `src/assets.d.ts`.
- Every new or changed `.tsx` file needs a colocated `*.test.tsx`; see the testing section in `AGENTS.md`.
