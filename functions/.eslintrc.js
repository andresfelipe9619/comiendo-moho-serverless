const path = require('path');
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [
    ".eslintrc.js", 
    "/lib/**/*", // Ignore built files  .
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [ 
      path.join(__dirname, "tsconfig.json"),
      path.join(__dirname,  "tsconfig.dev.json")
    ],
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  rules: {
    "new-cap": 0,
    "require-jsdoc": 0,
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "prettier/prettier": "error",
  },
};