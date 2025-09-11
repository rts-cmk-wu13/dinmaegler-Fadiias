import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";

export default [
    {
        ignores: ["**/dist", "**/.eslintrc.cjs"],
    },
    js.configs.recommended,
    {
        plugins: {
            "react-refresh": reactRefresh,
            "react-hooks": fixupPluginRules(reactHooks),
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
        },
        rules: {
            "react-refresh/only-export-components": ["warn", {
                allowConstantExport: true,
            }],
        },
    },
];
