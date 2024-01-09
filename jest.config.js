// eslint-disable-next-line @typescript-eslint/no-var-requires
const coverageThreshold = require('./jest.config.base.js');

module.exports = {
  collectCoverageFrom: [
    'src/pair/application/**/*.(t|j)s',
    'src/pair/domain/**/*.(t|j)s',
  ],
  coverageDirectory: 'reports/coverage-result/unit',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@pair/application/(.*)': '<rootDir>/src/pair/application/$1',
    '@pair/domain/(.*)': '<rootDir>/src/pair/domain/$1',
    '@pair/infrastructure/(.*)': '<rootDir>/src/pair/infrastructure/$1',
    '@pair/interfaces/(.*)': '<rootDir>/src/pair/interfaces/$1',
    '#node-web-compat': './node-web-compat-node.js',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  reporters: [
    'default',
    [
      'jest-stare',
      {
        log: false,
        resultDir: 'reports/test-result/unit',
        reportSummary: false,
        reportTitle: 'Unit Testing Results',
        reportHeadline: 'Unit Testing Results',
        additionalResultsProcessors: ['jest-junit'],
        coverageLink: '../../coverage-result/unit/lcov-report/index.html',
        jestStareConfigJson: 'jest-stare.json',
        jestGlobalConfigJson: 'globalStuff.json',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'reports/test-result/junit',
        outputName: 'unit.xml',
      },
    ],
    [
      'jest-sonar',
      {
        outputDirectory: 'reports/test-result/jest-sonar',
        outputName: 'unit.xml',
      },
    ],
  ],
  rootDir: './',
  coverageThreshold: coverageThreshold,
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  verbose: true,
  testEnvironment: 'node',
};
