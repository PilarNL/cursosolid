import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  // Ignorar arquivos de config
  {
    ignores: ['eslint.config.js', 'node_modules/**'],
  },

  // Base JS
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
  },

  // TypeScript
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  configPrettier,
];
