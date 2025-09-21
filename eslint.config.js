// ESLint v9 flat config for React + TypeScript + Testing Library
// See: https://eslint.org/docs/latest/use/configure/ 

/* eslint-env node */

const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const testingLibrary = require('eslint-plugin-testing-library');
const jestDom = require('eslint-plugin-jest-dom');
const a11y = require('eslint-plugin-jsx-a11y');

module.exports = [
  // Global language options: browser + node globals for all source files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        // Browser
        window: 'readonly',
        document: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        Navigator: 'readonly',
        performance: 'readonly',
        fetch: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        React: 'readonly',
        // Node (useful for configs and tooling)
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Enable if you want type-aware linting:
        // project: ['./tsconfig.json'],
        // tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Start from the plugin's recommended rule set
      ...(tsPlugin.configs.recommended && tsPlugin.configs.recommended.rules ? tsPlugin.configs.recommended.rules : {}),

      // Project preferences
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  },

  // React + React Hooks
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': a11y,
    },
    rules: {
      ...(reactPlugin.configs.recommended && reactPlugin.configs.recommended.rules ? reactPlugin.configs.recommended.rules : {}),
      ...(reactHooks.configs.recommended && reactHooks.configs.recommended.rules ? reactHooks.configs.recommended.rules : {}),

      // Accessibility best practices
      ...(a11y.configs.recommended && a11y.configs.recommended.rules ? a11y.configs.recommended.rules : {}),

      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/prop-types': 'off', // Using TypeScript types instead of PropTypes
    },
  },

  // Testing rules (optional, non-fatal if plugin doesn't expose flat configs)
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly', // vitest compat if used
        jest: 'readonly',
      },
    },
    plugins: {
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      // Common Testing Library and jest-dom best practices (ensure rules exist in installed versions)
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/prefer-screen-queries': 'warn',
      'jest-dom/prefer-enabled-disabled': 'warn',
      'jest-dom/prefer-checked': 'warn',
      'jest-dom/prefer-to-have-attribute': 'warn',
    },
  },

  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
