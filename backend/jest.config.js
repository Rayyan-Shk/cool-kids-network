module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'], // Ensures tests are only in the src folder
    transform: {
        '^.+\\.ts$': 'ts-jest', // Handles TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'], // Support for TypeScript and JavaScript imports
};
