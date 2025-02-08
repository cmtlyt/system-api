import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'lib',
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  eslint.configs.recommended,
  tseslint.config({
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'ts/explicit-function-return-type': 'off',
    },
  },
);
