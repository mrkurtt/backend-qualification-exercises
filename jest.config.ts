/* eslint-disable */
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]s$': [
        'ts-jest',
        {
          tsconfig: '<rootDir>/tsconfig.json',
        },
      ],
    },
    moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  };
  