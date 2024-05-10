#!/usr/bin/env node

import {argv} from "node:process"
import sade from "sade"
import * as docs from "./docs/makefile.js"
import * as extension from "./extension/makefile.js"
import * as vendor from "./vendor/main.js"

main()

/**
 * @returns {void}
 */
function main() {
  sade("./makefile.js")
    .command("build")
    .action(build)
    .command("vendor clean")
    .action(vendor.clean)
    .command("vendor pull")
    .action(vendor.pull)
    .parse(argv)
}

/**
 * @typedef {Object} BuildOptions
 * @property {string[]} _
 */

/**
 * @param {BuildOptions} opts
 * @returns {Promise<void>}
 */
async function build(opts) {
  /** @type {Promise<any>[]} */
  const a = []
  for (const o of opts._) {
    if (o === "docs") {
      const p = docs.build()
      a.push(p)
      continue
    }
    if (o === "extension") {
      const p = extension.build()
      a.push(p)
      continue
    }
    throw new Error(`Unknown target: ${o}`)
  }
  await Promise.all(a)
}
