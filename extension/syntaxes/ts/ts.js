/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

import {js} from "../js/js.js"
import {port} from "../syntax.js"

/**
 * @returns {Syntax}
 */
export function ts() {
  const p = js()
  return {
    title: "TypeScript",
    name: "ts",
    scope: "source.ts",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json/"],
    example: {
      author: {
        name: "Vitest",
        url: "https://github.com/vitest-dev/"
      },
      source: {
        name: "Vitest",
        url: "https://github.com/vitest-dev/vitest/blob/v1.4.0/packages/vitest/src/typecheck/collect.ts/"
      }
    },
    tokenColors(s) {
      const c = p.tokenColors(s)
      return port(c, ".js", ".ts")
    }
  }
}
