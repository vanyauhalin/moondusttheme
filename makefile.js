import {mkdir, readFile, rm, writeFile} from "node:fs/promises"
import {existsSync} from "node:fs"
import * as path from "node:path"
import process from "node:process"
import {URL} from "node:url"
import es from "es-main"
import sade from "sade"
import {lightTheme, syntaxes} from "./main.js"

/**
 * @returns {Promise<void>}
 */
async function main() {
  sade("main.js")
    .command("build")
    .action(build)
    .command("pull")
    .action(pull)
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
  let t = lightTheme()
  let c = JSON.stringify(t, null, 2)
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

  for (let m of Object.values(syntaxes())) {
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

if (es(import.meta)) {
  await main()
}
