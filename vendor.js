/**
 * @import {S4} from "./shared.js"
 */

import {mkdir, readFile, writeFile} from "node:fs/promises"
import * as path from "node:path"
import {URL} from "node:url"

/**
 * @param {string} u
 * @returns {Promise<Response>}
 */
export async function fetch(u) {
  u = u.replace("/blob/", "/raw/")
  return await global.fetch(u, {redirect: "follow"})
}

/**
 * @param {string} u
 * @param {string} c
 * @returns {Promise<void>}
 */
export async function write(u, c) {
  let [o, p, r, f] = stat(u)

  let d = path.join("vendor", o, p, r)
  await mkdir(d, {recursive: true})

  f = path.join(d, f)
  await writeFile(f, c)
}

/**
 * @param {string} u
 * @returns {Promise<string>}
 */
export async function read(u) {
  let [o, p, r, f] = stat(u)
  f = path.join("vendor", o, p, r, f)
  return await readFile(f, "utf8")
}

/**
 * @param {string} u
 * @returns {S4}
 */
function stat(u) {
  let o = new URL(".", u)
  let a = o.pathname.split("/")
  return [a[1], a[2], a.slice(4, a.length - 2).join("/"), a[a.length - 2]]
}
