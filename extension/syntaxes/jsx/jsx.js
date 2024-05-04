/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

import {js} from "../js/js.js"
import {port} from "../syntax.js"

/**
 * @returns {Syntax}
 */
export function jsx() {
  const p = js()
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
    },
    tokenColors(s) {
      const c = p.tokenColors(s)
      return port(c, ".js", ".js.jsx")
    }
  }
}
