/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  verbose: true,
  testEnvironment: "node",

  roots: ["<rootDir>/src", "<rootDir>/__tests__"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverage: true,

  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },

  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.test.ts",
    "!**/*.spec.ts",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",

    // 🔥 ADIÇÕES IMPORTANTES
    "!**/index.ts",
    "!**/*.d.ts",
  ],

  coveragePathIgnorePatterns: [
    "<rootDir>/__tests__/utils/localRunner.ts",
  ],

  testPathIgnorePatterns: [
    "<rootDir>/__tests__/mocks",
    "<rootDir>/__tests__/utils/localRunner.ts",
  ],

  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)?",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
};