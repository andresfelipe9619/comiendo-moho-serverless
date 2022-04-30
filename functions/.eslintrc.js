module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [".eslintrc.js",     "/lib/**/*", // Ignore built files.
],
  extends: [ 
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
    project: ["serverless/functions/tsconfig.json", "serverless/functions/tsconfig.dev.json"],
      sourceType: "module",
    },
    plugins: [
      "@typescript-eslint",
      "import",
    ],
    rules: {
      "quotes": ["error", "double"],
      "import/no-unresolved": 0,
    },
  };