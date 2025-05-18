/**
 * @import {Element, ElementContent, Root} from "hast"
 * @import {ShikiTransformer} from "shiki"
 * @import {S4} from "./shared.js"
 */

import {readFile, readdir} from "node:fs/promises"
import path from "node:path"
import {h} from "hastscript"
import {createHighlighter} from "shiki"
import {test} from "uvu"
import {is} from "uvu/assert"
import * as grammars from "./grammars.js"
import * as syntaxes from "./syntaxes.js"
import * as themes from "./themes.js"

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function run(ta) {
	let ga = await grammars.list()
	let ah = [themes.light(), themes.dark()]
	let ac = configs()
	let at = await setup(ac)
	let ht = await createHighlighter({
		langs: ga,
		themes: structuredClone(ah),
	})

	for (let th of ah) {
		let st = syntaxes.theme(th)

		for (let [id, a, _, e] of at) {
			if (ta.length !== 0 && !ta.includes(id)) {
				continue
			}

			let t = test

			for (let c of ac) {
				if (c.id === id && c.skip) {
					// todo: investigate shiki
					// @ts-ignore
					t = t.skip.bind(t)
					break
				}
			}

			t(`${id} (${th.name})`, async() => {
				let ac = await readFile(a, "utf8")
				let ar = ht.codeToHast(ac, {
					lang: grammars.scope(id),
					theme: th.name,
					transformers: [transformer()],
				})
				let as = simplify(st, ar)

				let ec = await readFile(e, "utf8")
				let er = evaluate(st, ec)
				let es = simplify(st, er)

				is(as, es)
			})
		}
	}

	test.run()
}

/**
 * @typedef {object} TestConfig
 * @property {string} id
 * @property {string} [extends]
 * @property {boolean} [skip]
 */

/**
 * @returns {TestConfig[]}
 */
function configs() {
	return [
		{
			id: "astro",
		},
		{
			id: "c",
		},
		{
			id: "css",
		},
		{
			id: "dockerfile",
		},
		{
			id: "fish",
		},
		{
			id: "go",
		},
		{
			id: "go.mod",
		},
		{
			id: "go.sum",
		},
		{
			id: "html",
		},
		{
			id: "ini",
		},
		{
			id: "js",
		},
		{
			id: "json",
		},
		{
			id: "jsonc",
			extends: "json",
		},
		{
			id: "jsonl",
			extends: "json",
		},
		{
			id: "jsx",
			extends: "js",
		},
		{
			id: "lua",
		},
		{
			id: "makefile",
		},
		{
			id: "php",
		},
		{
			id: "py",
		},
		{
			id: "rb",
		},
		{
			id: "rs",
		},
		{
			id: "sh",
		},
		{
			id: "sql",
		},
		{
			id: "svelte",
		},
		{
			id: "swift",
		},
		{
			id: "toml",
		},
		{
			id: "ts",
			extends: "js",
		},
		{
			id: "tsx",
			extends: "jsx",
		},
		{
			id: "vue",
			skip: true,
		},
		{
			id: "yaml",
			skip: true,
		},
		{
			id: "zig",
		},
	]
}

/**
 * @param {TestConfig[]} ac
 * @returns {Promise<S4[]>}
 */
async function setup(ac) {
	/** @type {Record<string, [string, string, string]>} */
	let t = {}

	let d = "fixtures"

	for (let f of await readdir(d)) {
		let e = path.extname(f)
		if (e !== ".js") {
			e = ""
		}

		let n = path.basename(f, e)

		let i = 0
		if (e) {
			i = 2
		} else if (n.endsWith("-")) {
			i = 1
			n = n.slice(0, -1)
		} else {
			i = 0
		}

		let r = t[n]
		if (!r) {
			r = ["", "", ""]
			t[n] = r
		}

		r[i] = path.join(d, f)
	}

	for (let c of ac) {
		let id = c.id

		if (c.extends) {
			let r = c

			while (r.extends) {
				for (let c of ac) {
					if (c.id === r.extends) {
						r = c
						break
					}
				}
			}

			id = r.id
		}

		let x = t[id]

		if (!x) {
			throw new Error(`No fixtures for '${c.id}'`)
		}

		let y = t[c.id]

		if (!y) {
			t[c.id] = x
		}
	}

	/** @type {S4[]} */
	let r = []

	for (let [id, [a, u, e]] of Object.entries(t)) {
		r.push([id, a, u, e])
	}

	r = r.sort(([a], [b]) => a.localeCompare(b))

	return r
}

/**
 * @returns {ShikiTransformer}
 */
function transformer() {
	return {root}

	/**
	 * @param {Root} r
	 * @returns {Root}
	 */
	function root(r) {
		// <></>
		let [rc] = r.children
		if (rc.type !== "element") {
			return r
		}
		let p = pre(rc)
		r.children = p.children
		return r
	}

	/**
	 * @param {Element} e
	 * @returns {Element}
	 */
	function pre(e) {
		// <pre></pre>
		let [ec] = e.children
		if (ec.type !== "element") {
			return e
		}
		let c = code(ec)
		e.children = c.children
		return e
	}

	/**
	 * @param {Element} e
	 * @returns {Element}
	 */
	function code(e) {
		// <code></code>
		/** @type {ElementContent[]} */
		let a = []
		for (let ec of e.children) {
			if (ec.type !== "element") {
				continue
			}
			let e = line(ec)
			a.push(...e.children)
			continue
		}
		e.children = a
		return e
	}

	/**
	 * @param {Element} e
	 * @returns {Element}
	 */
	function line(e) {
		// <span class="line"></span>
		if (e.properties.class !== "line") {
			return e
		}

		/** @type {Element[]} */
		let a = []

		let j = 0

		for (let i = 0; i < e.children.length; i += 1) {
			let ec = e.children[i]
			if (ec.type !== "element") {
				continue
			}

			let [c] = ec.children
			if (c.type !== "text") {
				continue
			}

			j = i
			a.push(ec)
			break
		}

		for (let i = j + 1; i < e.children.length; i += 1) {
			let y = e.children[i]
			if (y.type !== "element") {
				continue
			}

			let [d] = y.children
			if (d.type !== "text") {
				continue
			}

			let x = a[a.length - 1]
			if (x.properties.style !== y.properties.style) {
				a.push(y)
				continue
			}

			let [c] = x.children
			if (c.type !== "text") {
				continue
			}

			c.value += d.value
		}

		for (let e of a) {
			let [ec] = e.children
			if (ec.type !== "text") {
				continue
			}
			ec.value = ec.value.trim()
		}

		e.children = a

		return e
	}
}

/**
 * @param {syntaxes.SyntaxTheme} st
 * @param {string} c
 * @returns {Root}
 */
function evaluate(st, c) {
	let r = h(null)

	let c0 = w.bind(undefined, st.comment[0])
	let p0 = w.bind(undefined, st.plain[0])
	let p1 = w.bind(undefined, st.plain[1])
	let s0 = w.bind(undefined, st.string[0])
	let s1 = w.bind(undefined, st.string[1])

	// eslint-disable-next-line no-new-func, typescript/no-implied-eval
	let f = new Function("c0", "p0", "p1", "s0", "s1", c)
	f(c0, p0, p1, s0, s1)

	return r

	/**
	 * @param {string} c
	 * @param {string} t
	 * @returns {void}
	 */
	function w(c, t) {
		let e = h("span", {style: `color:${c}`}, t)
		r.children.push(e)
	}
}

/**
 * @param {syntaxes.SyntaxTheme} st
 * @param {Root} r
 * @returns {string}
 * @throws {Error}
 */
function simplify(st, r) {
	/** @type {string} */
	let t = ""

	/** @type {Record<string, string>} */
	let m = {
		[st.comment[0]]: "c0",
		[st.plain[0]]: "p0",
		[st.plain[1]]: "p1",
		[st.string[0]]: "s0",
		[st.string[1]]: "s1",
	}

	for (let e of r.children) {
		if (e.type !== "element") {
			throw new Error("Each child should be an element")
		}

		let [c] = e.children

		if (!c || c.type !== "text") {
			throw new Error("Each element should have a text child")
		}

		let s = String(e.properties.style)
		s = s.replace("color:", "")
		s = m[s]

		if (!s) {
			throw new Error(`Unknown color: ${s}`)
		}

		t += `${s}: ${c.value}\n`
	}

	t = t.slice(0, -1)

	return t
}
