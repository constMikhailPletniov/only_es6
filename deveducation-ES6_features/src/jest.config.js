/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.[jt]s?(x)"],
  coverageDirectory: ".coverage",
  verbose: true,
  projects: [
    {
      displayName: "Browser",
      testEnvironment: "jsdom",
      rootDir: "./",
      testMatch: ["<rootDir>/__tests__/**/*.[jt]s"],
      testURL: "http://localhost",
    },
    {
      displayName: "Node.js",
      testEnvironment: "node",
      rootDir: "./",
      testMatch: ["<rootDir>/tests/**/*.[jt]s"],
    },
  ],
};
