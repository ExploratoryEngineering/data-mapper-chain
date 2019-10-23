module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  coverageReporters: ["json", "lcov", "text", "html"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
