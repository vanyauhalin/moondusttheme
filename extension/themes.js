/**
 * @typedef {import("./colors/themes.js").Theme} ColorTheme
 * @typedef {import("./utils.js").TokenColor} TokenColor
 */

import * as colors from "./colors/themes.js"
import * as syntaxes from "./syntaxes/syntaxes.js"
import * as editor from "./editor.js"
import {toTokenColors} from "./utils.js"

/**
 * @typedef {Object} EditorTheme
 * @property {string} name
 * @property {Partial<Record<string, string>>} colors
 * @property {TokenColor[]} tokenColors
 * @property {boolean} semanticHighlighting
 */

/**
 * @returns {EditorTheme}
 */
export function light() {
  const t = editorTheme()
  populate(t, colors.light)
  return t
}

// /**
//  * @returns {EditorTheme}
//  */
// export function dark() {
//   const t = editorTheme()
//   populate(t, colors.dark)
//   return t
// }

/**
 * @param {EditorTheme} e
 * @param {ColorTheme} c
 * @returns {void}
 */
function populate(e, c) {
  e.colors = editor.colors(c.editor)
  Object.values(syntaxes).forEach((s) => {
    const r = s.tokenColors(c.syntax)
    const t = toTokenColors(r)
    e.tokenColors.push(...t)
  })
}

/**
 * @returns {EditorTheme}
 */
function editorTheme() {
  return {
    name: "",
    colors: {},
    tokenColors: [],
    semanticHighlighting: true
  }
}
