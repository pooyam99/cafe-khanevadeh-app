module.exports = {
  root: true,
  extends: [
    "expo",
    "eslint:recommended",
    "universe/native",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: ["tailwindcss", "prettier"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "prettier/prettier": "warn",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.js",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
