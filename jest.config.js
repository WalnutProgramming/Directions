module.exports = {
  // preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  preset: "vite-jest",
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)", "**/__tests__/*.[jt]s?(x)"],
  testEnvironment: "jsdom",
};
