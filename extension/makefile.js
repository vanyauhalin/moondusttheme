import {mkdir, rm, writeFile} from "node:fs/promises"
import {existsSync} from "node:fs"
import {join} from "node:path"
import {URL, fileURLToPath} from "node:url"
import {dark, light} from "./main.js"

/**
 * @returns {Promise<void>}
 */
export async function build() {
  const rd = rootDir()
  const dd = distDir(rd)
  if (existsSync(dd)) {
    await rm(dd, {recursive: true})
  }
  await mkdir(dd)

  const n = "light.json"
  const f = join(dd, n)
  const [t] = light()
  const c = JSON.stringify(t, null, 2)
  await writeFile(f, c)
}

/**
 * @returns {string}
 */
function rootDir() {
  const u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}

/**
 * @param {string} d
 * @returns {string}
 */
function distDir(d) {
  return join(d, "dist")
}
