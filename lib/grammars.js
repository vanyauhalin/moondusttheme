import * as yaml from "js-yaml"
import * as vendor from "./vendor.js"

/**
 * @typedef {any} Grammar
 */

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function grep(ta) {
	/** @type {string[]} */
	let a = [...ta]

	if (a.length === 0) {
		for (let c of Object.values(configs())) {
			a.push(c.id)
		}
	}

	/** @type {Promise<Grammar>[]} */
	let b = []

	for (let id of a) {
		for (let c of Object.values(configs())) {
			if (c.id === id) {
				for (let f of c.files) {
					let p = readGrammar(f)
					b.push(p)
				}
			}
		}
	}

	/** @type {string[]} */
	let c = []

	for (let g of await Promise.all(b)) {
		collect(g)
	}

	for (let n of [...new Set(c)].sort()) {
		console.log(n)
	}

	/**
	 * @param {unknown} v
	 * @returns {void}
	 */
	function collect(v) {
		if (Array.isArray(v)) {
			for (let e of v) {
				collect(e)
			}

			return
		}

		if (typeof v === "object" && v !== null && !Array.isArray(v)) {
			for (let k in v) {
				// @ts-ignore
				let u = v[k]

				if (k === "name" && typeof u === "string") {
					c.push(u)
					continue
				}

				collect(u)
			}

			return
		}
	}
}

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function pull(ta) {
	/** @type {string[]} */
	let a = [...ta]

	if (a.length === 0) {
		for (let c of Object.values(configs())) {
			a.push(c.id)
		}
	}

	/** @type {Promise<void>[]} */
	let b = []

	for (let id of a) {
		for (let c of Object.values(configs())) {
			if (c.id === id) {
				for (let f of c.files) {
					let g = pullGrammar(f)
					b.push(g)
				}
			}
		}
	}

	await Promise.all(b)
}

/**
 * @returns {Promise<Grammar[]>}
 */
export async function list() {
	/** @type {Promise<Grammar>[]} */
	let a = []

	for (let c of Object.values(configs())) {
		for (let f of c.files) {
			let p = readGrammar(f)
			a.push(p)
		}
	}

	return await Promise.all(a)
}

/**
 * @param {string} id
 * @returns {string}
 * @throws {Error}
 */
export function scope(id) {
	for (let c of Object.values(configs())) {
		if (c.id === id) {
			return c.scope
		}
	}

	throw new Error("Grammar scope not found")
}

/**
 * @typedef {object} GrammarConfig
 * @property {string} id
 * @property {string} scope
 * @property {string[]} files
 */

/**
 * @returns {GrammarConfig[]}
 */
function configs() {
	return [
		{
			id: "astro",
			scope: "source.astro",
			files: [
				"https://github.com/withastro/language-tools/blob/astro-vscode%402.15.4/packages/vscode/syntaxes/astro.tmLanguage.src.yaml/",
			],
		},
		{
			id: "c",
			scope: "source.c",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/cpp/syntaxes/c.tmLanguage.json/",
			],
		},
		{
			id: "css",
			scope: "source.css",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/css/syntaxes/css.tmLanguage.json/",
			],
		},
		{
			id: "dockerfile",
			scope: "source.dockerfile",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/docker/syntaxes/docker.tmLanguage.json/",
			],
		},
		{
			id: "fish",
			scope: "source.fish",
			files: [
				"https://github.com/bmalehorn/vscode-fish/blob/2bdcfbea62cadc2a977eace3189d25b31df71e72/syntaxes/fish.tmLanguage.json/",
			],
		},
		{
			id: "go",
			scope: "source.go",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/go/syntaxes/go.tmLanguage.json/",
			],
		},
		{
			id: "go.mod",
			scope: "go.mod",
			files: [
				"https://github.com/golang/vscode-go/blob/v0.47.0/extension/syntaxes/go.mod.tmGrammar.json/",
			],
		},
		{
			id: "go.sum",
			scope: "go.sum",
			files: [
				"https://github.com/golang/vscode-go/blob/v0.47.0/extension/syntaxes/go.sum.tmGrammar.json/",
			],
		},
		{
			id: "html",
			scope: "text.html.basic",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/html/syntaxes/html-derivative.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/html/syntaxes/html.tmLanguage.json/",
			],
		},
		{
			id: "ini",
			scope: "source.ini",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/ini/syntaxes/ini.tmLanguage.json/",
			],
		},
		{
			id: "js",
			scope: "source.js",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/javascript/syntaxes/JavaScript.tmLanguage.json/",
			],
		},
		{
			id: "json",
			scope: "source.json",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/json/syntaxes/JSON.tmLanguage.json/",
			],
		},
		{
			id: "jsonc",
			scope: "source.json.comments",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/json/syntaxes/JSONC.tmLanguage.json/",
			],
		},
		{
			id: "jsonl",
			scope: "source.json.lines",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/json/syntaxes/JSONL.tmLanguage.json/",
			],
		},
		{
			id: "jsx",
			scope: "source.js.jsx",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json/",
			],
		},
		{
			id: "lua",
			scope: "source.lua",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/lua/syntaxes/lua.tmLanguage.json/",
			],
		},
		{
			id: "makefile",
			scope: "source.makefile",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/make/syntaxes/make.tmLanguage.json/",
			],
		},
		{
			id: "php",
			scope: "text.html.php",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/php/syntaxes/html.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/php/syntaxes/php.tmLanguage.json/",
			],
		},
		{
			id: "py",
			scope: "source.python",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/python/syntaxes/MagicPython.tmLanguage.json/",
			],
		},
		{
			id: "rb",
			scope: "source.ruby",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/ruby/syntaxes/ruby.tmLanguage.json/",
			],
		},
		{
			id: "rs",
			scope: "source.rust",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/rust/syntaxes/rust.tmLanguage.json/",
			],
		},
		{
			id: "sh",
			scope: "source.shell",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/shellscript/syntaxes/shell-unix-bash.tmLanguage.json/",
			],
		},
		{
			id: "sql",
			scope: "source.sql",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/sql/syntaxes/sql.tmLanguage.json/",
			],
		},
		{
			id: "svelte",
			scope: "source.svelte",
			files: [
				"https://github.com/sveltejs/language-tools/blob/extensions-109.6.0/packages/svelte-vscode/syntaxes/postcss.src.yaml/",
				"https://github.com/sveltejs/language-tools/blob/extensions-109.6.0/packages/svelte-vscode/syntaxes/svelte.tmLanguage.src.yaml/",
			],
		},
		{
			id: "swift",
			scope: "source.swift",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/swift/syntaxes/swift.tmLanguage.json/",
			],
		},
		{
			id: "toml",
			scope: "source.toml",
			files: [
				"https://github.com/tamasfe/taplo/blob/release-even-better-toml-0.21.2/editors/vscode/toml.tmLanguage.json/",
			],
		},
		{
			id: "ts",
			scope: "source.ts",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json/",
			],
		},
		{
			id: "tsx",
			scope: "source.tsx",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json/",
			],
		},
		{
			id: "vue",
			scope: "source.vue",
			files: [
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/markdown-vue.json/",
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/mdx-vue.json/",
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/vue-directives.json/",
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/vue-interpolations.json/",
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/vue-sfc-style-variable-injection.json/",
				"https://github.com/vuejs/language-tools/blob/v2.2.6/extensions/vscode/syntaxes/vue.tmLanguage.json/",
			],
		},
		{
			id: "yaml",
			scope: "source.yaml",
			files: [
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml-1.0.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml-1.1.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml-1.2.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml-1.3.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml-embedded.tmLanguage.json/",
				"https://github.com/microsoft/vscode/blob/1.97.2/extensions/yaml/syntaxes/yaml.tmLanguage.json/",
			],
		},
		{
			id: "zig",
			scope: "source.zig",
			files: [
				"https://github.com/ziglang/vscode-zig/blob/0.6.8/syntaxes/zig.tmLanguage.json/",
			],
		},
	]
}

/**
 * @param {string} u
 * @returns {Promise<void>}
 */
async function pullGrammar(u) {
	let r = await vendor.fetch(u)

	let t = await r.text()

	/** @type {any} */
	let g

	switch (true) {
	case u.endsWith(".yaml/"):
		g = yaml.load(t)
		break

	case u.endsWith(".json/"):
		g = JSON.parse(t)
		break

	default:
		throw new Error("Unsupported grammar format")
	}

	let n = g.scopeName
	if (n === undefined) {
		throw new Error("Grammar scope name is missing")
	}

	g.name = n

	let c = JSON.stringify(g, null, 2)
	await vendor.write(u, c)
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function readGrammar(u) {
	let s = await vendor.read(u)
	return JSON.parse(s)
}
