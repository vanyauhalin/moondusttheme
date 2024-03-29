#!/usr/bin/env node

import {mkdir, writeFile} from "node:fs/promises"
import {dirname} from "node:path"
import {argv} from "node:process"
import sade from "sade"
import * as examples from "./examples/examples.js"
import {light} from "./extension/themes.js"
import pkg from "./package.json" with {type: "json"}

main()

/**
 * @returns {void}
 */
function main() {
  sade("./makefile.js")
    .command("build")
    .action(build)
    .command("build-examples")
    .action(buildExamples)
    .parse(argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  const m = pkg.contributes.themes[0]
  const d = dirname(m.path)
  await mkdir(d, {recursive: true})

  const t = light()
  t.name = m.label
  const c = JSON.stringify(t, null, 2)
  await writeFile(m.path, c)
}

async function buildExamples() {
  await examples.build("./examples/dist")
}
