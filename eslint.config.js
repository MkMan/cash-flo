import pluginJs from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import solid from "eslint-plugin-solid/configs/typescript.js";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },

  // TS config
  ...tsEslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js"],
    ...pluginJs.configs.recommended,
    ...tsEslint.configs.disableTypeChecked,
  },

  // SolidJS
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },

  // Eslint - perfectionist
  perfectionist.configs["recommended-alphabetical"],

  // Eslint - prettier
  eslintConfigPrettier,
];
