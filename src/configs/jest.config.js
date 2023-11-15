module.exports = {
    // Specifies the test environment
    testEnvironment: 'node',

    // Specifies the root directories for Jest to look for tests
    roots: ['../tests/'],

    // Enables coverage collection during tests
    collectCoverage: true,
    coverageThreshold: {
        global: 90,
    },
    // Specifies the directory where coverage reports will be generated
    coverageDirectory: '../coverage',
    // Ignores specified directories from transformation during testing
    transformIgnorePatterns: ['/node_modules/'],

    // Sets the timeout for each test to 30 seconds
    testTimeout: 20000,

    // Specifies the transformation applied to certain file types (e.g., using Babel)
    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    // Specifies the patterns for Jest to look for test files
    testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    globals: {},
};
