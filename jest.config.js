// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test/test-setup.js"],
  clearMocks: true,
  coverageProvider: "v8",
};
