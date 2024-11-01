/**
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("hastscript").Child} Child
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("./main.js").ColorTheme} ColorTheme
 * @typedef {import("./main.js").EditorTheme} EditorTheme
 * @typedef {import("./main.js").Syntax} Syntax
 * @typedef {import("./makefile.js").Grammar} Grammar
 */

import {readFile, readdir} from "node:fs/promises"
import path from "node:path"
import {URL, fileURLToPath} from "node:url"
import es from "es-main"
import {h} from "hastscript"
import {createHighlighter} from "shiki"
import {is} from "uvu/assert"
import {test} from "uvu"
import {lightPallette, lightTheme, syntaxes, tokenColors} from "./main.js"
import {readGrammar} from "./makefile.js"

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
 * @returns {Promise<void>}
 */
async function main() {
  /** @type {Record<string, Record<string, [string, string]>>} */
  let t = {}

  let d = fixturesDir()
  let a = await readdir(d)

  for (let f of a) {
    let m = f.match(/(\S+)-(\d\d)(\.js)?/)
    if (!m) {
      throw new Error("Unknown fixture file name format")
    }

    let [_, s, n, o] = m

    let r = t[s]
    if (!r) {
      r = {}
      t[s] = r
    }

    let c = r[n]
    if (!c) {
      c = ["", ""]
      r[n] = c
    }

    let i = 0
    if (o) {
      i = 1
    }

    c[i] = path.join(d, f)
  }

  for (let m of syntaxes()) {
    let s = m()

    let id = s.id
    if (s.extends) {
      /** @type {Record<string, Syntax>} */
      let t = {}
      for (let m of syntaxes()) {
        let s = m()
        t[s.id] = s
      }

      let c = s
      while (c.extends) {
        c = t[c.extends]
      }

      id = c.id
    }

    let r = t[id]
    if (!r) {
      throw new Error(`No fixtures for '${s.id}'`)
    }

    let ct = lightPallette()
    let et = lightTheme()
    et.tokenColors = tokenColors(ct, s)

    for (let [n, [i, o]] of Object.entries(r)) {
      let t = test
      if (!o) {
        // @ts-ignore
        t = t.skip
      }

      t(`${s.id} #${n} (${et.name})`, async () => {
        /** @type {Promise<Grammar>[]} */
        let g = []
        for (let f of s.vscode.files) {
          let p = readGrammar(f)
          g.push(p)
        }
        await Promise.all(g)

        let h = await createHighlighter({langs: g, themes: [et]})

        try {
          let c = await readFile(i, "utf8")
          let x = h.codeToHast(c, {
            lang: s.vscode.scope,
            theme: et.name,
            transformers: [transformer()]
          })
          let a = simplify(ct, x)

          let {f} = await import(o)
          let y = f(ct)
          let e = simplify(ct, y)

          is(a, e)
        } catch (e) {
          throw e
        } finally {
          h.dispose()
        }
      })
    }
  }

  test.run()
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

/**
 * @param {ColorTheme} ct
 * @param {Root} r
 * @returns {string}
 */
function simplify(ct, r) {
  /** @type {string} */
  let t = ""

  let m = {
    [ct.comment[0]]: "c0",
    [ct.plain[0]]: "p0",
    [ct.plain[1]]: "p1",
    [ct.string[0]]: "s0",
    [ct.string[1]]: "s1",
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


/**
 * @returns {string}
 */
function fixturesDir() {
  return path.join(rootDir(), "fixtures")
}

/**
 * @returns {string}
 */
function rootDir() {
  let u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}

if (es(import.meta)) {
  await main()
}
