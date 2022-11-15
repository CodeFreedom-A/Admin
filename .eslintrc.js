const { defineConfig } = require("eslint-define-config");
module.exports = defineConfig({
    root: true,
    // ignorePatterns: ["public/**/**"],
    env: { browser: true, node: true, es6: true, es2020: true, es2021: true },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 7,
        sourceType: "module",
        jsxPragma: "React",
        ecmaFeatures: { jsx: true }
    },
    plugins: ["prettier"],
    extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
    rules: {
        "vue/first-attribute-linebreak": [
            "error",
            {
                singleline: "beside",
                multiline: "below"
            }
        ],
        "prettier/prettier": ["error", {}, { usePrettierrc: true, parser: "flow" }],
        "vue/script-setup-uses-vars": "error",
        "vue/v-on-event-hyphenation": 0,
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-empty-function": "off",
        "vue/custom-event-name-casing": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
                allowedNames: ["self"] // Allow `const self = this`; `[]` by default
            }
        ],
        "space-before-function-paren": "off",
        "vue/attributes-order": "off",
        "vue/one-component-per-file": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/max-attributes-per-line": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/attribute-hyphenation": "off",
        "vue/require-default-prop": "off",
        "vue/require-explicit-emits": "off",
        "prefer-const": "off",
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "always",
                    component: "always"
                },
                svg: "always",
                math: "always"
            }
        ],
        "vue/multi-word-component-names": "off",
        semi: "off",
        "function-call-argument-newline": ["error", "consistent"]
        // "multiline-ternary": ["error", "always-multiline"]
    }
});
