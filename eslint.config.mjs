import nextPlugin from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'public/**', 'src/**/_old/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooksPlugin,
      'next': nextPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'never'],
      '@typescript-eslint/no-unused-vars': ['warn', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'indent': ['warn', 2],
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'warn',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    },
  },
]
