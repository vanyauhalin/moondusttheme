import config from "@vanyauhalin/eslint-config"

export default [
	...config,
	{
		files: ["langs/*/test.js"],
		rules: {
			"github/unescaped-html-literal": "off",
			"stylistic/max-len": "off",
			"stylistic/max-statements-per-line": "off",
		},
	},
	{
		files: ["cli.js"],
		rules: {
			"github/unescaped-html-literal": "off",
			"typescript/no-dynamic-delete": "off",
			"unicorn/import-style": "off",
		},
	},
	{
		files: ["lang-sample.d.ts"],
		rules: {
			"no-var": "off",
			"prefer-let/prefer-let": "off",
		},
	},
	{
		files: ["package.json"],
		rules: {
			"jsonc/array-bracket-newline": "off",
		},
	},
]
