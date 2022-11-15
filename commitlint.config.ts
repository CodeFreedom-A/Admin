import type { UserConfig } from "@commitlint/types";

// https://juejin.cn/post/6979054290526535717

const Configuration: UserConfig = {
    /*
     * Resolve and load @commitlint/config-conventional from node_modules.
     * Referenced packages must be installed
     */
    extends: ["@commitlint/config-conventional"],
    /*
     * Resolve and load conventional-changelog-atom from node_modules.
     * Referenced packages must be installed
     */
    // parserPreset: "conventional-changelog-atom",
    parserPreset: "conventional-changelog-conventionalcommits",
    /*
     * Resolve and load @commitlint/format from node_modules.
     * Referenced package must be installed
     */
    formatter: "@commitlint/format",
    /*
     * Any rules defined here will override rules from @commitlint/config-conventional
     */
    rules: {
        // "type-enum": [2, "always", ["foo"]]
        "type-enum": [2, "always", ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]]
    },
    /*
     * Functions that return true if commitlint should ignore the given message.
     */
    ignores: [commit => commit === ""],
    /*
     * Whether commitlint uses the default ignore rules.
     */
    defaultIgnores: true,
    /*
     * Custom URL to show upon failure
     */
    helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
    /*
     * Custom prompt configs
     * https://commitlint.js.org/#/reference-prompt?id=questions
     */
    prompt: {
        settings: {},
        messages: {
            skip: ":回车可忽略",
            max: "上限 %d 字符",
            min: "%d chars at least",
            emptyWarning: "can not be empty",
            upperLimitWarning: "over limit",
            lowerLimitWarning: "below limit"
        },
        questions: {
            type: {
                description: "选择你的类型 😁",
                enum: {
                    feat: {
                        description: "A new feature",
                        title: "Features",
                        emoji: "✨"
                    },
                    fix: {
                        description: "A bug fix",
                        title: "Bug Fixes",
                        emoji: "🐛"
                    },
                    docs: {
                        description: "Documentation only changes",
                        title: "Documentation",
                        emoji: "📚"
                    },
                    style: {
                        description: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
                        title: "Styles",
                        emoji: "💎"
                    },
                    refactor: {
                        description: "A code change that neither fixes a bug nor adds a feature",
                        title: "Code Refactoring",
                        emoji: "📦"
                    },
                    perf: {
                        description: "A code change that improves performance",
                        title: "Performance Improvements",
                        emoji: "🚀"
                    },
                    test: {
                        description: "Adding missing tests or correcting existing tests",
                        title: "Tests",
                        emoji: "🚨"
                    },
                    build: {
                        description: "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
                        title: "Builds",
                        emoji: "🛠"
                    },
                    ci: {
                        description: "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
                        title: "Continuous Integrations",
                        emoji: "⚙️"
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: "Chores",
                        emoji: "♻️"
                    },
                    revert: {
                        description: "Reverts a previous commit",
                        title: "Reverts",
                        emoji: "🗑"
                    }
                }
            },
            scope: {
                description: "请输入标题"
            },
            subject: {
                description: "请输入简单描述"
            },
            body: {
                description: "Provide a longer description of the change"
            },
            // isBreaking: {
            //     description: "Are there any breaking changes?"
            // },
            breakingBody: {
                description: "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself"
            },
            breaking: {
                description: "Describe the breaking changes"
            }
            // isIssueAffected: {
            //     description: "Does this change affect any open issues?"
            // },
            // issuesBody: {
            //     description: "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself"
            // },
            // issues: {
            //     description: 'Add issue references (e.g. "fix #123", "re #123".)'
            // }
        }
    }
};

module.exports = Configuration;
