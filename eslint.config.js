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
]
