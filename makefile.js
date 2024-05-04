#!/usr/bin/env node

import {mkdir, writeFile} from "node:fs/promises"
import {dirname, join} from "node:path"
import {argv} from "node:process"
import {URL, fileURLToPath} from "node:url"
import sade from "sade"
import * as docs from "./docs/docs.js"
import {dark, light} from "./extension/main.js"
import pkg from "./package.json" with {type: "json"}

main()

/**
 * @returns {void}
 */
function main() {
  sade("./makefile.js")
    .command("build")
    .action(build)
    .command("build-docs")
    .action(buildDocs)
    .parse(argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  const m = pkg.contributes.themes[0]
  const d = dirname(m.path)
  await mkdir(d, {recursive: true})

  const [t] = light()
  const c = JSON.stringify(t, null, 2)
  await writeFile(m.path, c)
}

/**
 * @returns {Promise<void>}
 */
async function buildDocs() {
  const u = new URL(".", import.meta.url)
  let d = fileURLToPath(u)
  d = join(d, "docs/dist")
  await mkdir(d, {recursive: true})
  await docs.build(d)
}
