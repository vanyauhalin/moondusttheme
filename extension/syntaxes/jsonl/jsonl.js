/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

import {json} from "../json/json.js"
import {port} from "../syntax.js"

/**
 * @returns {Syntax}
 */
export function jsonl() {
  const p = json()
  return {
    title: "JSON Lines",
    name: "jsonl",
    scope: "source.json.lines",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONL.tmLanguage.json/"],
    example: p.example,
    tokenColors(s) {
      const c = p.tokenColors(s)
      return port(c, ".json", ".json.lines")
    }
  }
}
