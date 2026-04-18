

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

  collectCoverage: true, // ativar cobertura

  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      functions: 1,
      lines: 1,
    },
  },

  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.test.ts",
    "!**/*.spec.ts",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
  ],

  coveragePathIgnorePatterns: [
    "<rootDir>/__tests__/utils/localRunner.ts",
  ],

  testPathIgnorePatterns: [
    "<rootDir>/__tests__/mocks",
    "<rootDir>/__tests__/utils/localRunner.ts",
  ],

  testMatch: [
    "**/__test__/**/*.(ts|tsx|js|jsx)?",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
};
