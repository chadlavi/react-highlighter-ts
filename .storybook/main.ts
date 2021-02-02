module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars",
  ],
  reactDocgenTypescriptOptions: {
    shouldExtractLiteralValuesFromEnum: true,
  }
}