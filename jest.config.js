module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.{js,ts}'],
  collectCoverageFrom: [
    'lib/**/*.{js,ts}',
    '!lib/**/*.d.ts',
  ],
}