/**
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("hastscript").Child} Child
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("./main.js").ColorTheme} ColorTheme
 * @typedef {import("./main.js").EditorTheme} EditorTheme
 * @typedef {import("./main.js").Syntax} Syntax
 */

import {mkdir, readFile, readdir, rm, writeFile} from "node:fs/promises"
import {existsSync} from "node:fs"
import * as path from "node:path"
import process from "node:process"
import {URL, fileURLToPath} from "node:url"
import es from "es-main"
import {h} from "hastscript"
import sade from "sade"
import {createHighlighter} from "shiki"
import {is} from "uvu/assert"
import {test as uvu} from "uvu"
import * as ex from "./main.js"

/**
 * @returns {Promise<void>}
 */
async function main() {
  sade("main.js")
    .command("build")
    .action(build)
    .command("pull")
    .action(pull)
    .command("test")
    .action(test)
    .parse(process.argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  let d = "dist"
  if (existsSync(d)) {
    await rm(d, {recursive: true})
  }
  await mkdir(d)

  let n = "light.json"
  let f = path.join(d, n)
  let t = ex.lightTheme()
  let c = JSON.stringify(t, null, 2)
  await writeFile(f, c)

  n = "dark.json"
  f = path.join(d, n)
  t = ex.darkTheme()
  c = JSON.stringify(t, null, 2)
  await writeFile(f, c)
}

/**
 * @returns {Promise<void>}
 */
async function pull() {
  let d = "vendor"
  if (existsSync(d)) {
    await rm(d, {recursive: true})
  }
  await mkdir(d)

  /** @type {Promise<void>[]} */
  let a = []

  for (let m of Object.values(ex.syntaxes())) {
    let s = m()

    for (let i = 0; i < s.vscode.files.length; i += 1) {
      let u = s.vscode.files[i]
      let p = pullGrammar(d, u)
      a.push(p)
    }

    let u = s.example.source.file
    let p = pullExample(d, u)
    a.push(p)
  }

  await Promise.all(a)
}

/**
 * @param {string} d
 * @param {string} u
 * @returns {Promise<void>}
 */
async function pullGrammar(d, u) {
  let [o, p, r, f] = statRaw(u)
  let g = await fetchGrammar(u)

  d = path.join(d, o, p, r)
  await mkdir(d, {recursive: true})

  f = path.join(d, f)
  let c = JSON.stringify(g, null, 2)
  await writeFile(f, c)
}

/**
 * @param {string} d
 * @param {string} u
 * @returns {Promise<void>}
 */
async function pullExample(d, u) {
  let [o, p, r, f] = statRaw(u)
  let c = await fetchExample(u)

  d = path.join(d, o, p, r)
  await mkdir(d, {recursive: true})

  f = path.join(d, f)
  await writeFile(f, c)
}

/**
 * @param {string} u
 * @returns {[string, string, string, string]}
 */
function statRaw(u) {
  let o = new URL(".", u)
  let a = o.pathname.split("/")
  return [a[1], a[2], a.slice(4, a.length - 2).join("/"), a[a.length - 2]]
}

/**
 * @typedef {any} Grammar
 */

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function fetchGrammar(u) {
  let r = await fetchRaw(u)

  let g = await r.json()
  if (g === undefined) {
    return
  }

  let n = g.scopeName
  if (n === undefined) {
    return
  }

  g.name = n

  return g
}

/**
 * @param {string} u
 * @returns {Promise<string>}
 */
async function fetchExample(u) {
  let r = await fetchRaw(u)
  return await r.text()
}

/**
 * @param {string} u
 * @returns {Promise<Response>}
 */
async function fetchRaw(u) {
  u = u.replace("/blob/", "/raw/")
  return await fetch(u, {redirect: "follow"})
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
export async function readGrammar(u) {
  let [o, p, r, f] = statRaw(u)
  f = path.join("vendor", o, p, r, f)
  let c = await readFile(f, "utf8")
  return JSON.parse(c)
}

/**
 * @param {string} u
 * @returns {Promise<string>}
 */
export async function readExample(u) {
  let [o, p, r, f] = statRaw(u)
  f = path.join("vendor", o, p, r, f)
  return await readFile(f, "utf8")
}

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
async function test() {
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

  for (let m of ex.syntaxes()) {
    let s = m()

    let id = s.id
    if (s.extends) {
      /** @type {Record<string, Syntax>} */
      let t = {}
      for (let m of ex.syntaxes()) {
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

    let ct = ex.lightPallette()
    let et = ex.lightTheme()
    et.tokenColors = ex.tokenColors(ct, s)

    for (let [n, [i, o]] of Object.entries(r)) {
      let t = uvu
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

  uvu.run()
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
