# cw-website
Website for Code Wizardry, my personal website.

## Formatting and linting

- **Linting**: `npm run lint` (or `npm run lint:fix` to auto-fix where possible) uses ESLint with TypeScript, React, accessibility, and Prettier integration.
- **Formatting**: `npm run format` formats all TypeScript/TSX files under `src/` using Prettier. Use `npm run format:check` in CI to ensure files are already formatted.
- **Editor setup**: Configure your editor to use Prettier as the default formatter for this workspace and enable “Format on Save” for the best experience.

