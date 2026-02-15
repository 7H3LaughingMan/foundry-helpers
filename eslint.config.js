import eslint from "@eslint/js";
import json from "@eslint/json";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
    { plugins: { prettier, json } },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
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
    {
        files: ["**/*.json"],
        ignores: ["package-lock.json"],
        language: "json/json",
        rules: json.configs.recommended.rules
    }
]);
