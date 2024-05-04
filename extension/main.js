/**
 * @typedef {import("./colors/schemes.js").ColorScheme} ColorScheme
 * @typedef {import("./colors/themes.js").ColorTheme} ColorTheme
 * @typedef {import("./editor/themes.js").EditorTheme} EditorTheme
 * @typedef {import("./syntaxes/syntax.js").Syntax} Syntax
 */

import * as colorSchemas from "./colors/schemes.js"
import * as colorThemes from "./colors/themes.js"
import * as editorThemes from "./editor/themes.js"
import * as syntaxes from "./syntaxes/all.js"

/**
 * @returns {[EditorTheme, ColorTheme, ColorScheme, Syntax[]]}
 */
export function light() {
  const cs = colorSchemas.lightScheme()
  const ct = colorThemes.lightTheme(cs)
  const as = expand(syntaxes)
  return [editorThemes.lightTheme(ct, as), ct, cs, as]
}

/**
 * @returns {[EditorTheme, ColorTheme, ColorScheme, Syntax[]]}
 */
export function dark() {
  const cs = colorSchemas.darkScheme()
  const ct = colorThemes.darkTheme(cs)
  const as = expand(syntaxes)
  return [editorThemes.darkTheme(ct, as), ct, cs, as]
}

/**
 * @param {typeof syntaxes} o
 * @returns {Syntax[]}
 */
function expand(o) {
  /** @type {Syntax[]} */
  const as = []
  for (const m of Object.values(o)) {
    const s = m()
    as.push(s)
  }
  return as
}
