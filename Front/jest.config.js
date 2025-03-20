module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageDirectory: 'coverage/jest',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
