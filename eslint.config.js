const js = require('@eslint/js');
const globals = require('globals');
const typescriptEslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');
const eslintPluginImport = require('eslint-plugin-import');

module.exports = [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin,
      import: eslintPluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'error',
      'import/no-default-export': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.config.js'],
  },
];
