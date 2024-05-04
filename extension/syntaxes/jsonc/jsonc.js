/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

import {json} from "../json/json.js"
import {port} from "../syntax.js"

/**
 * @returns {Syntax}
 */
export function jsonc() {
  const p = json()
  return {
    title: "JSON with Comments",
    name: "jsonc",
    scope: "source.json.comments",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONC.tmLanguage.json/"],
    example: p.example,
    tokenColors(s) {
      const c = p.tokenColors(s)
      return port(c, ".json", ".json.comments")
    }
  }
}
