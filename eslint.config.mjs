import nextConfig from "eslint-config-next";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const eslintConfig = [
  ...nextConfig,
  eslintPluginPrettier,
  {
    rules: {
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
