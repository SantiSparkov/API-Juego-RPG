/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts' // arranque del server
  ],
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      branches: 100,
      functions: 100
    }
  }
};


