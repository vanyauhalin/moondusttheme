/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

import {jsx} from "../jsx/jsx.js"
import {port} from "../syntax.js"

/**
 * @returns {Syntax}
 */
export function tsx() {
  const p = jsx()
  return {
    title: "TSX",
    name: "tsx",
    scope: "source.tsx",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json/"],
    example: {
      author: {
        name: "The Washington Post",
        url: "https://github.com/washingtonpost/"
      },
      source: {
        name: "WPDS's UI Kit",
        url: "https://github.com/washingtonpost/wpds-ui-kit/blob/v1.23.1/ui/popover/src/play.stories.tsx/"
      }
    },
    tokenColors(s) {
      const c = p.tokenColors(s)
      return port(c, ".js.jsx", ".tsx")
    }
  }
}
