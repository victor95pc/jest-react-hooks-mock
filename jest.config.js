module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },

  testMatch: ['**/?(*.)test.js?(x)', '**/?(*.)test.ts?(x)'],
  collectCoverageFrom: [
    '**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/__dumb__/**',
    '!<rootDir>/jest.config.js',
    '!**/coverage/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],
  coverageReporters: ['json-summary', 'lcov'],
  coverageDirectory: 'coverage'
}