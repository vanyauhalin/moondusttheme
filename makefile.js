import {mkdir, writeFile} from "node:fs/promises"
import path from "node:path"
import sade from "sade"
import * as grammars from "./lib/grammars.js"
import * as test from "./lib/test.js"
import * as themes from "./lib/themes.js"
import pack from "./package.json" with {type: "json"}

/**
 * @returns {void}
 */
function main() {
	sade("makefile.js").
		command("build").
		describe("Build themes.").
		action(build).

		command("grep").
		describe("List TextMate scopes for all syntaxes or a specific one.").
		example("grep").
		example("grep html").
		example("grep css js").
		action(async(p) => {
			await grammars.grep(p._)
		}).

		command("pull").
		describe("Download TextMate grammars for all syntaxes or a specific one.").
		example("pull").
		example("pull html").
		example("pull css js").
		action(async(p) => {
			await grammars.pull(p._)
		}).

		command("test").
		describe("Run tests for all syntaxes or a specific one.").
		example("test").
		example("test html").
		example("test css js").
		action(async(p) => {
			await test.run(p._)
		}).

		parse(process.argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
	let ah = [themes.light(), themes.dark()]

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
