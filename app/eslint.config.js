const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const jest = require("eslint-plugin-jest");

module.exports = [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json"
      }
    },

    plugins: {
      jest
    },

    rules: {
      "no-console": "off",

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },

  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];