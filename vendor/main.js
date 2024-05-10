/**
 * @typedef {import("../extension/syntaxes/syntax.js").MetaExample} MetaExample
 * @typedef {import("../extension/syntaxes/syntax.js").Syntax} Syntax
 */

import {mkdir, readFile, readdir, rm, writeFile} from "node:fs/promises"
import {join} from "node:path"
import {URL, fileURLToPath} from "node:url"
import * as syntaxes from "../extension/syntaxes/all.js"

/**
 * @typedef {any} Grammar
 */

/**
 * @returns {Promise<void>}
 */
export async function clean() {
  const d = vendorDir()
  const l = await readdir(d)
  /** @type {Promise<void>[]} */
  const a = []
  for (const n of l) {
    if (n === "main.js") {
      continue
    }
    const f = join(d, n)
    const p = rm(f, {recursive: true})
    a.push(p)
  }
  await Promise.all(a)
}

/**
 * @returns {Promise<void>}
 */
export async function pull() {
  const d = vendorDir()
  /** @type {Promise<void>[]} */
  const a = []
  for (const s of Object.values(syntaxes)) {
    const m = s()
    let p = pullGrammars(d, m.grammars)
    a.push(p)
    p = pullExample(d, m.example)
    a.push(p)
  }
  await Promise.all(a)
}

/**
 * @param {string} d
 * @param {string[]} gr
 * @returns {Promise<Grammar[]>}
 */
export async function readGrammars(d, gr) {
  /** @type {Promise<Grammar>[]} */
  const a = []
  for (const g of gr) {
    const p = readGrammar(d, g)
    a.push(p)
  }
  return await Promise.all(a)
}

/**
 * @param {string} d
 * @param {string[]} gr
 * @returns {Promise<void>}
 */
async function pullGrammars(d, gr) {
  /** @type {Promise<void>[]} */
  const a = []
  for (const g of gr) {
    const p = pullGrammar(d, g)
    a.push(p)
  }
  await Promise.all(a)
}

/**
 * @param {string} d
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function readGrammar(d, u) {
  let [o, p, r, f] = statRaw(u)
  f = join(d, o, p, r, f)
  const c = await readFile(f, "utf8")
  return JSON.parse(c)
}

/**
 * @param {string} d
 * @param {string} u
 * @returns {Promise<void>}
 */
async function pullGrammar(d, u) {
  let [o, p, r, f] = statRaw(u)
  const g = await fetchGrammar(u)

  d = join(d, o, p, r)
  await mkdir(d, {recursive: true})

  f = join(d, f)
  const c = JSON.stringify(g, null, 2)
  await writeFile(f, c)
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function fetchGrammar(u) {
  const r = await fetchRaw(u)

  const g = await r.json()
  if (g === undefined) {
    return
  }

  /** @type {string | undefined} */
  let scopeName = g.scopeName
  if (scopeName === undefined) {
    return
  }

  g.name = scopeName

  return g
}

/**
 * @param {string} d
 * @param {MetaExample} e
 * @returns {Promise<string>}
 */
export async function readExample(d, e) {
  let [o, p, r, f] = statRaw(e.source.url)
  f = join(d, o, p, r, f)
  return await readFile(f, "utf8")
}

/**
 * @param {string} d
 * @param {MetaExample} e
 * @returns {Promise<void>}
 */
async function pullExample(d, e) {
  let [o, p, r, f] = statRaw(e.source.url)
  const c = await fetchExample(e)

  d = join(d, o, p, r)
  await mkdir(d, {recursive: true})

  f = join(d, f)
  await writeFile(f, c)
}

/**
 * @param {MetaExample} e
 * @returns {Promise<string>}
 */
async function fetchExample(e) {
  const r = await fetchRaw(e.source.url)
  return await r.text()
}

/**
 * @param {string} u
 * @returns {[string, string, string, string]}
 */
function statRaw(u) {
  const o = new URL(".", u)
  const a = o.pathname.split("/")
  return [a[1], a[2], a.slice(4, a.length - 2).join("/"), a[a.length - 2]]
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
 * @returns {string}
 */
export function vendorDir() {
  const u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}
