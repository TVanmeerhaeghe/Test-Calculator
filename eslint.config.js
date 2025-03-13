import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  js.configs.recommended,
  ...vue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": "off"
    }
  },
  {
    files: ["tests/**/*.spec.{js,ts}", "tests/**/*.test.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];