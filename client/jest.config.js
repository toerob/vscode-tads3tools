/* eslint-disable no-undef */

module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  testMatch: ["**/*.spec.ts"],
  modulePathIgnorePatterns: ["src/e2e-test"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js"],
};
