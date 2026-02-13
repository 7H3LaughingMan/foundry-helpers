import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["dist/*"]),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: {
            js
        },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules: {
            "@typescript-eslint/no-this-alias": [
                "error",
                {
                    allowedNames: ["self"]
                }
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true
                }
            ]
        }
    },
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended
]);
