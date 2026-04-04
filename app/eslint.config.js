// eslint.config.cjs
const { FlatCompat } = require('@eslint/eslintrc');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true, // ⚠️ obrigatório
});

module.exports = [
  // parser e regras para TS
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'always'],
    },
  },

  // estende configs recomendadas antigas com FlatCompat
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
];