module.exports = {
  root: true,

  env: {
    node: true,
    jest: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },

  plugins: ["@typescript-eslint", "jest"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  ignorePatterns: [
    "dist",
    "coverage",
    "node_modules",
    "*.js",
    "*.cjs",
    "*.mjs",
  ],

  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",

    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/consistent-type-imports": "error",

    // 🔥 mantém warning no código normal
    "@typescript-eslint/no-explicit-any": "warn",
  },

  // 🔥 AQUI está a correção importante
  overrides: [
  {
    files: [
      "**/__tests__/**/*.ts",
      "**/__tests__/**/*.tsx",
      "**/*.test.ts",
      "**/*.spec.ts",
      "app/__tests__/**/*.ts"
    ],

    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-var": "off",
      "no-unused-vars": "off",
    },
  },
],
};