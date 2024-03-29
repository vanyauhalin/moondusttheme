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
    title: "JSX",
    name: "jsx",
    scope: "source.js.jsx",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json/"],
    example: {
      author: {
        name: "Semantic",
        url: "https://github.com/Semantic-Org/"
      },
      source: {
        name: "Semantic UI React",
        url: "https://github.com/Semantic-Org/Semantic-UI-React/blob/v2.1.5/docs/src/components/ComponentDoc/ComponentDoc.js/"
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
  return port(c, ".js", ".js.jsx")
}
