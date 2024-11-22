import {mkdir, writeFile} from "node:fs/promises"
import * as path from "node:path"
import process from "node:process"
import sade from "sade"
import * as grammar from "./grammar.js"
import * as theme from "./main.js"
import pack from "./package.json" with {type: "json"}
import * as test from "./test.js"

/**
 * @returns {void}
 */
function main() {
  sade("makefile.js")
    .command("build")
    .action(build)
    .command("grep")
    .describe("List TextMate scopes for all syntaxes or a specific one.")
    .example("grep")
    .example("grep html")
    .example("grep css js")
    .action((p) => grammar.grep(p._))
    .command("pull")
    .describe("Download TextMate grammars for all syntaxes or a specific one.")
    .example("pull")
    .example("pull html")
    .example("pull css js")
    .action((p) => grammar.pull(p._))
    .command("test")
    .describe("Run tests for all syntaxes or a specific one.")
    .example("test")
    .example("test html")
    .example("test css js")
    .action((p) => test.run(p._))
    .parse(process.argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  let ah = [theme.light(), theme.dark()]

  for (let th of ah) {
    let f = ""

    for (let t of pack.contributes.themes) {
      if (t.label === th.name) {
        f = t.path
        break
      }
    }

    if (!f) {
      throw new Error(`Missing theme path for: ${th.name}`)
    }

    let d = path.dirname(f)
    await mkdir(d, {recursive: true})

    let c = JSON.stringify(th, null, 2)
    await writeFile(f, c)
  }
}

main()
