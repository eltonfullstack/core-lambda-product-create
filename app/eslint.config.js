const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = [
  // 🚫 IGNORAR tudo que não deve ser analisado
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "**/*.config.js",
      "**/*.config.cjs",
      ".eslintrc.js"
    ]
  },

  // 📦 Regras base JS + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 🟦 TYPE SCRIPT (SÓ src)
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "commonjs"
      },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },

  // 🟨 JS / CONFIG FILES (SEM TS PROJECT)
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off"
    }
  }
];