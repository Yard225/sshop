module.exports = function (wallaby) {
  return {
    files: ['services/**/src/**/*.ts'],
    tests: ['services/**/src/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
  };
};
