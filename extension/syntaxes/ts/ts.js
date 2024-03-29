/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

import {port} from "../../utils.js"
import * as js from "../js/js.js"

/**
 * @returns {Meta}
 */
export function meta() {
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
    }
  }
}

/**
 * @param {Syntax} s
 * @returns {Record<string, string>}
 */
export function tokenColors(s) {
  const c = js.tokenColors(s)
  return port(c, ".js", ".ts")
}
