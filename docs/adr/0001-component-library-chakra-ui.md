# 0001. Use Chakra UI 3 with Emotion for components and styling

- Status: Accepted
- Date: 2026-02-24 (recorded retrospectively on 2026-11-18)

## Context

The site is a small single-page React portfolio maintained largely by one person and by AI agents. It needs responsive layouts, accessible interactive components, and a consistent brand palette without a separate design system or CSS build pipeline. Chakra UI has been the styling approach since the initial commit; this record documents that status quo.

## Decision

Build all UI from Chakra UI 3 (`@chakra-ui/react`) primitives, styled through style props and responsive object syntax (`{ base, md }`). Emotion (`@emotion/react`, `@emotion/styled`) is Chakra's styling engine and is not used directly.

- Theme tokens (brand `primary`, `secondary`, `highlight` colour scales) live in `src/theme.ts`, created with `createSystem(defaultConfig, defineConfig(...))`.
- `App` wraps the tree in `ChakraProvider value={system}`; tests use the same system through `renderWithProviders`.
- No standalone CSS or CSS modules. The webpack `style-loader`/`css-loader` rule is kept but unused.
- Brand icons are local `createIcon` components in `src/components/icons.tsx`; `@chakra-ui/icons` is installed but unused.

## Consequences

- Layout and styling stay colocated with markup, with no class-name or stylesheet management.
- Theme changes go through tokens, so colours stay consistent across pages.
- The site depends on Chakra's v3 API (e.g. `gap` rather than `spacing`, `createSystem` instead of `extendTheme`); v2 examples and docs don't apply.
- Chakra and Emotion add bundle weight; webpack's existing bundle-size warnings partly reflect this.
- Replacing Chakra would touch every component and needs a superseding ADR.
