// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);


import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "logs/**",
            "coverage/**",
        ],
    },

    {
        files: ["**/*.ts"],

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
        ],

        languageOptions: {
            globals: globals.node,
        },

        rules: {
            "prefer-const": "error",

            "no-var": "error",

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/no-explicit-any": "error",

            "no-console": "off",
        },
    },
]);