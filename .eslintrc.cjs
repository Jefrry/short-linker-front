module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['simple-import-sort', 'prettier', 'react-hooks'],
  extends: ['airbnb', 'airbnb-typescript', 'prettier', 'plugin:tailwindcss/recommended'],
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
          // side effect imports.
          ['^\\u0000'],
          ['^react'],
          // rest vendor packages.
          ['^@?\\w'],
          // fsd.
          ['^@/app'],
          ['^@/views'],
          ['^@/widgets'],
          ['^@/features'],
          ['^@/entities'],
          ['^@/shared'],
          // long imports, worth shortening.
          ['(([^/]+)/){4,}'],
          // the rest
          ['^'],
          // relative imports.
          // any relative not css import.
          ['^\\.(?!.*\\.css).*$'],
          // relative css imports.
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
  },
};
