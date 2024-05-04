/**
 * @typedef {import("../colors/themes.js").ColorTheme} ColorTheme
 * @typedef {import("../syntaxes/syntax.js").Syntax} Syntax
 */

import {colors} from "./colors.js"

/**
 * @typedef {Object} EditorTheme
 * @property {string} name
 * @property {Record<string, string>} colors
 * @property {TokenColor[]} tokenColors
 * @property {boolean} semanticHighlighting
 */

/**
 * @typedef {Object} TokenColor
 * @property {string[]} scope
 * @property {ColorSettings} settings
 */

/**
 * @typedef {Object} ColorSettings
 * @property {string} foreground
 */

/**
 * @param {ColorTheme} ct
 * @param {Syntax[]} as
 * @returns {EditorTheme}
 */
export function lightTheme(ct, as) {
  const t = editorTheme()
  t.name = "Moondust: Near Side of the Moon"
  populate(t, ct, as)
  return t
}

/**
 * @param {ColorTheme} ct
 * @param {Syntax[]} as
 * @returns {EditorTheme}
 */
export function darkTheme(ct, as) {
  // todo: add dark variant.
  const t = editorTheme()
  t.name = "Moondust: Far Side of the Moon"
  populate(t, ct, as)
  return t
}

/**
 * @param {EditorTheme} et
 * @param {ColorTheme} ct
 * @param {Syntax[]} as
 * @returns {void}
 */
function populate(et, ct, as) {
  et.colors = colors(ct.editor)

  for (const s of as) {
    const o = s.tokenColors(ct.syntax)
    const t = remap(o)
    et.tokenColors.push(...t)
  }
}

/**
 * @param {Record<string, string>} o
 * @returns {TokenColor[]}
 */
function remap(o) {
  /** @type {Record<string, TokenColor>} */
  const t = {}

  for (const [s, c] of Object.entries(o)) {
    let tc = t[c]
    if (tc === undefined) {
      tc = tokenColor()
      tc.settings.foreground = c
      t[c] = tc
    }

    tc.scope.push(s)
  }

  return Object.values(t)
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

/**
 * @returns {TokenColor}
 */
function tokenColor() {
  return {
    scope: [],
    settings: {
      foreground: ""
    }
  }
}
