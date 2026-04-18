module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
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
    "*.mjs"
  ],
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};