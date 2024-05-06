module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {},
  plugins: ["prettier", "vue"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120 }],
    "no-unused-vars": ["error", { args: "after-used" }],
    "vue/valid-template-root": "error",
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
  },
  overrides: [],
};
