/**
 * @typedef {import("./schemes.js").ColorScheme} ColorScheme
 */

/**
 * @typedef {Object} ColorTheme
 * @property {ThemeEditor} editor
 * @property {ThemeSyntax} syntax
 */

/**
 * @typedef {any} ThemeEditor
 */

/**
 * @typedef {Object} ThemeSyntax
 * @property {[string]} comment
 * @property {[string, string]} plain
 * @property {[string, string]} string
 */

/**
 * @param {ColorScheme} s
 * @returns {ColorTheme}
 */
export function lightTheme(s) {
  const te = themeEditor()
  te.background = s.white
  te.foreground = s.gray[7]
  te.neutral = s.gray
  te.primary = s.blue
  te.log.error[0] ="#B35900"
  te.log.info[0] = s.gray[4]
  te.log.warning[0] ="#7D4E00"

  const ts = themeSyntax()
  ts.comment[0] = s.gray[4]
  ts.plain[0] = s.gray[5]
  ts.plain[1] = s.gray[7]
  ts.string[0] = s.blue[5]
  ts.string[1] = s.blue[7]

  return colorTheme(te, ts)
}

/**
 * @param {ColorScheme} s
 * @returns {ColorTheme}
 */
export function darkTheme(s) {
  // todo: add dark variant.
  const te = themeEditor()
  const ts = themeSyntax()
  return colorTheme(te, ts)
}

/**
 * @param {ThemeEditor} e
 * @param {ThemeSyntax} s
 * @returns {ColorTheme}
 */
function colorTheme(e, s) {
  return {
    editor: e,
    syntax: s
  }
}

/**
 * @returns {ThemeEditor}
 */
function themeEditor() {
  return {
    background: "",
    foreground: "",
    neutral: "",
    primary: "",
    log: {
      error: [""],
      info: [""],
      warning: [""]
    }
    // todo?: diff.added/deleted/modified
  }
}

/**
 * @returns {ThemeSyntax}
 */
function themeSyntax() {
  return {
    comment: [""],
    plain: ["", ""],
    string: ["", ""]
  }
}
