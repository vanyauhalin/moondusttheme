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
    title: "TSX",
    name: "tsx",
    scope: "source.tsx",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json"],
    example: {
      author: {
        name: "The Washington Post",
        url: "https://github.com/washingtonpost/"
      },
      source: {
        name: "WPDS's UI Kit",
        url: "https://github.com/washingtonpost/wpds-ui-kit/blob/v1.23.1/ui/popover/src/play.stories.tsx"
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
  return port(c, ".js", ".tsx")
}
