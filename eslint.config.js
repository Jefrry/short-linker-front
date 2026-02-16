import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

const airbnbConfigs = compat.extends('airbnb', 'airbnb-typescript', 'prettier');

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', '.eslintrc.cjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...airbnbConfigs.map(config => {
    const newConfig = { ...config };
    if (newConfig.plugins) {
      const { '@typescript-eslint': _, ...restPlugins } = newConfig.plugins;
      newConfig.plugins = restPlugins;
      if (Object.keys(newConfig.plugins).length === 0) {
        delete newConfig.plugins;
      }
    }
    if (newConfig.rules) {
      const newRules = { ...newConfig.rules };
      for (const rule in newRules) {
        if (rule.startsWith('@typescript-eslint/')) {
          delete newRules[rule];
        }
      }
      newConfig.rules = newRules;
    }
    return newConfig;
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'no-restricted-syntax': 'off',
      'no-continue': 'off',
      'no-plusplus': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-param-reassign': 'off',
      'no-console': 'off',
      'object-curly-spacing': ['error', 'always'],
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'error',
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['globals.css$'],
            ['^\\u0000'],
            ['^react'],
            ['^@?\\w'],
            ['^@/app'],
            ['^@/views'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared'],
            ['(([^/]+)/){4,}'],
            ['^'],
            ['^\\.(?!.*\\.css).*$'],
            ['^\\..*\\.css$'],
          ],
        },
      ],
      'import/no-duplicates': 'error',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
      'react/jsx-newline': ['error', { prevent: false }],
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../../*', '@/*/*/*/*'],
              message: 'Please shorten the path.',
            },
          ],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          '': 'never',
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-sort-props': [
        1,
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: false,
        },
      ],
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-new': 'off',
      'no-nested-ternary': 'off',
      'react/jsx-no-constructed-context-values': 'off',
      'react/button-has-type': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-unresolved': 'off',
      'no-underscore-dangle': 'off',
      'no-restricted-syntax': 'off',
    },
  },
);
