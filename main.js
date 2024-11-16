import * as editor from "./editor.js"
import * as syntax from "./syntax.js"

/**
 * @typedef {Object} Theme
 * @property {string} name
 * @property {editor.EditorColors} colors
 * @property {syntax.TokenColor[]} tokenColors
 * @property {boolean} semanticHighlighting
 */

/**
 * @returns {Theme}
 */
export function light() {
  let ef = editor.light()
  let sf = syntax.light()

  return {
    name: "Moondust: Near Side of the Moon",
    colors: ef.colors,
    tokenColors: sf.tokenColors,
    semanticHighlighting: true,
  }
}

/**
 * @returns {Theme}
 */
export function dark() {
  let ef = editor.dark()
  let sf = syntax.dark()

  return {
    name: "Moondust: Far Side of the Moon",
    colors: ef.colors,
    tokenColors: sf.tokenColors,
    semanticHighlighting: true,
  }
}
