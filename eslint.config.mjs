import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Constitution Principle VIII: Code Quality Standards
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Best practices
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',

      // Accessibility (supports WCAG 2.1 AA compliance)
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="setTimeout"][arguments.length!=2]',
          message: 'setTimeout must always be invoked with two arguments.',
        },
      ],
    },
  },
  {
    // Ignore patterns
    ignores: [
      'node_modules/',
      'dist/',
      '.astro/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '.env*',
    ],
  },
];
