module.exports = {
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    './coverage/*',
    './jest.config.js',
    './dist/*',
    './tests/*',
  ],
}
