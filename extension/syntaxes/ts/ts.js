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
    name: "ts",
    scope: "source.ts",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json"]
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
