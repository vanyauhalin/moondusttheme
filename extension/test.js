/**
 * @typedef {import("node:fs").Dirent} Dirent
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("hastscript").Child} Child
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("uvu").Test} Test
 * @typedef {import("./colors/schemes.js").ColorScheme} ColorScheme
 * @typedef {import("./colors/themes.js").ColorTheme} ColorTheme
 * @typedef {import("./colors/themes.js").ThemeSyntax} ThemeSyntax
 * @typedef {import("./editor/themes.js").EditorTheme} EditorTheme
 * @typedef {import("./syntaxes/syntax.js").Syntax} Syntax
 */

import {readFile, readdir} from "node:fs/promises"
import {existsSync} from "node:fs"
import {join} from "node:path"
import {URL, fileURLToPath} from "node:url"
import {h} from "hastscript"
import {getHighlighter} from "shiki"
import {is} from "uvu/assert"
import {test} from "uvu"
import * as colorSchemas from "./colors/schemes.js"
import * as colorThemes from "./colors/themes.js"
import * as editorThemes from "./editor/themes.js"
import {readGrammars, vendorDir} from "../vendor/main.js"

/**
 * @param {...Child} children
 * @returns {Root}
 */
export function r(...children) {
  return h(null, ...children)
}

/**
 * @param {string} c
 * @returns {(t: string) => Element}
 */
export function w(c) {
  /**
   * @param {string} t
   * @returns {Element}
   */
  return function (t) {
    return h("span", {style: `color:${c}`}, t)
  }
}

/**
 * @param {() => Syntax} m
 * @param {string} u
 * @returns {Promise<void>}
 */
export async function t(m, u) {
  const s = m()
  await populate(test, s, u)
  test.run()
}

/**
 * @param {Test} t
 * @param {Syntax} s
 * @param {string} u
 * @returns {Promise<void>}
 */
async function populate(t, s, u) {
  const l = light(s)
  const d = dark(s)
  const vd = vendorDir()
  const g = await readGrammars(vd, s.grammars)
  const h = await getHighlighter({langs: g, themes: [l[0]]})
  const f = await fixtures(u)
  for (const e of Object.entries(f)) {
    const r = runner(t, e)
    cse(r, s, l, h, e)
  }
}

/**
 * @param {Syntax} s
 * @returns {[EditorTheme, ColorTheme]}
 */
function light(s) {
  const cs = colorSchemas.lightScheme()
  const ct = colorThemes.lightTheme(cs)
  const et = editorThemes.lightTheme(ct, [s])
  return [et, ct]
}

/**
 * @param {Syntax} s
 * @returns {[EditorTheme, ColorTheme]}
 */
function dark(s) {
  // todo: add dark variant.
  const cs = colorSchemas.darkScheme()
  const ct = colorThemes.darkTheme(cs)
  const et = editorThemes.darkTheme(ct, [s])
  return [et, ct]
}

/**
 * @param {string} u
 * @returns {Promise<Record<string, [string, string]>}
 */
async function fixtures(u) {
  /** @type {Record<string, [string, string]>} */
  const c = {}

  const s = new URL(".", u)
  const p = fileURLToPath(s)
  const d = join(p, "fixtures")
  if (!existsSync(d)) {
    return c
  }

  const l = await readdir(d, {withFileTypes: true})

  for (const a of l) {
    if (!a.isDirectory()) {
      continue
    }

    const d = join(a.path, a.name)
    const l = await readdir(d, {withFileTypes: true})

    for (const b of l) {
      if (!b.isFile()) {
        continue
      }

      let p = c[a.name]
      if (p === undefined) {
        p = ["", ""]
        c[a.name] = p
      }

      let i = 0
      if (b.name === "output.js") {
        i = 1
      }

      p[i] = join(b.path, b.name)
    }
  }

  return c
}

/**
 * @param {Test} t
 * @param {[string, [string, string]]} a1
 * @returns {Test}
 */
function runner(t, [n, [_, ep]]) {
  if (n === "" || ep === "") {
    // @ts-ignore
    t = t.skip
  }
  return t
}

/**
 * @param {Test} t
 * @param {Syntax} s
 * @param {[EditorTheme, ColorTheme]} a0
 * @param {Awaited<ReturnType<typeof getHighlighter>>} h
 * @param {[string, [string, string]]} a1
 * @returns {void}
 */
function cse(t, s, [et, ct], h, [n, [ap, ep]]) {
  t(`renders #${n} using '${et.name}'`, async () => {
    const c = await readFile(ap, "utf8")
    const ar = h.codeToHast(c, {
      lang: s.scope,
      theme: et.name,
      transformers: [transformer()]
    })
    const a = simplify(ct.syntax, ar)

    const {fn} = await import(ep)
    const er = fn(ct.syntax)
    const e = simplify(ct.syntax, er)

    is(a, e)
  })
}

/**
 * @returns {ShikiTransformer}
 */
function transformer() {
  return {root}
}

/**
 * @param {Root} r
 * @returns {Root}
 */
function root(r) {
  // <></>
  const [rc] = r.children
  if (rc.type !== "element") {
    return r
  }
  const p = pre(rc)
  r.children = p.children
  return r
}

/**
 * @param {Element} e
 * @returns {Element}
 */
function pre(e) {
  // <pre></pre>
  const [ec] = e.children
  if (ec.type !== "element") {
    return e
  }
  const c = code(ec)
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
  const a = []
  for (const ec of e.children) {
    if (ec.type !== "element") {
      continue
    }
    const e = line(ec)
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
  const a = []

  let j = 0

  for (let i = 0; i < e.children.length; i += 1) {
    const ec = e.children[i]
    if (ec.type !== "element") {
      continue
    }

    const [c] = ec.children
    if (c.type !== "text") {
      continue
    }

    j = i
    a.push(ec)
    break
  }

  for (let i = j + 1; i < e.children.length; i += 1) {
    const y = e.children[i]
    if (y.type !== "element") {
      continue
    }

    const [d] = y.children
    if (d.type !== "text") {
      continue
    }

    const x = a[a.length - 1]
    if (x.properties.style !== y.properties.style) {
      a.push(y)
      continue
    }

    const [c] = x.children
    if (c.type !== "text") {
      continue
    }

    c.value += d.value
  }

  for (const e of a) {
    const [ec] = e.children
    if (ec.type !== "text") {
      continue
    }
    ec.value = ec.value.trim()
  }

  e.children = a

  return e
}

/**
 * @param {ThemeSyntax} ts
 * @param {Root} r
 * @returns {string}
 */
function simplify(ts, r) {
  /** @type {string} */
  let t = ""

  for (const e of r.children) {
    if (e.type !== "element") {
      throw new Error("Each child should be an element")
    }

    const [c] = e.children
    if (!c || c.type !== "text") {
      throw new Error("Each element should have a text child")
    }

    let s = String(e.properties.style)
    s = variable(ts, s)

    t += `${s}: ${c.value}\n`
  }

  t = t.slice(0, -1)

  return t
}

/**
 * @param {ThemeSyntax} ts
 * @param {string} s
 * @returns {string}
 */
function variable(ts, s) {
  s = s.replace("color:", "")
  switch (s) {
  case ts.comment[0]:
    return `${s} c0`
  case ts.plain[0]:
    return `${s} p0`
  case ts.plain[1]:
    return `${s} p1`
  case ts.string[0]:
    return `${s} s0`
  case ts.string[1]:
    return `${s} s1`
  default:
    throw new Error(`Unknown color: ${s}`)
  }
}
