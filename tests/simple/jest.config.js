/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov'
  ],
  testMatch: [
    '**/test/**/*.test.js'
  ]
};

module.exports = config;
