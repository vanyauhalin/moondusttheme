import config from "@vanyauhalin/eslint-config"

export default [
	...config,
	{
		files: ["fixtures/*.js"],
		rules: {
			"github/unescaped-html-literal": "off",
			"stylistic/max-statements-per-line": "off",
		},
	},
	{
		files: ["fixtures/*.js", "lib/*.js"],
		// todo: these rules must be a part of the eslint-config package
		rules: {
			"stylistic/quotes": ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}],
			"typescript/ban-ts-comment": "off",
		},
	},
]
