module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended", "plugin:react/jsx-runtime", "plugin:storybook/recommended"],
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      varsIgnorePattern: "^_"
    }]
  }
};