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
    title: "JSON with Comments",
    name: "jsonc",
    scope: "source.json.comments",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/json/syntaxes/JSONC.tmLanguage.json"],
    example: json.meta().example
  }
}

/**
 * @param {Syntax} s
 * @returns {Record<string, string>}
 */
export function tokenColors(s) {
  const c = json.tokenColors(s)
  return port(c, ".json", ".json.comments")
}
