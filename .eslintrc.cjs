module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: [
    "react-hooks",
    "react-refresh",
    "unused-imports",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    // Turn off TS unused vars, handled by unused-imports
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",

    // Remove unused imports automatically
    "unused-imports/no-unused-imports": "error",

    // Warn about unused variables
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"]
}
