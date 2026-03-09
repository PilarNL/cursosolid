const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const prettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  // Ignorar arquivos de config
  {
    ignores: ["eslint.config.js", "node_modules/**"],
  },

  // Base JS
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },

  // TypeScript
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',   // adjust if your config has a different name
    tsconfigRootDir: __dirname,   // this file’s folder – avoids ambiguity
  },

  configPrettier,
];
