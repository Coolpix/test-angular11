module.exports = {
  rootDir: './',
  restoreMocks: true,
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testMatch: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec).[jt]s'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
