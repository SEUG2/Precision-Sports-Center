export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testPathIgnorePatterns: ["/node_modules/", ".vscode"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  }
};