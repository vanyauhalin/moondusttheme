/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

import {port} from "../../utils.js"
import * as json from "../json/json.js"

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    name: "jsonl",
    scope: "source.json.lines",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/json/syntaxes/JSONL.tmLanguage.json"]
  }
}

/**
 * @param {Syntax} s
 * @returns {Record<string, string>}
 */
export function tokenColors(s) {
  const c = json.tokenColors(s)
  return port(c, ".json", ".json.lines")
}
