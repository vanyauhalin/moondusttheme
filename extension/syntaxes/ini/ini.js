/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "INI",
    name: "ini",
    scope: "source.ini",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/ini/syntaxes/ini.tmLanguage.json/"],
    example: {
      author: {
        name: "Nushell",
        url: "https://github.com/nushell/"
      },
      source: {
        name: "Nushell",
        url: "https://github.com/nushell/nushell/blob/0.91.0/tests/fixtures/formats/sample.ini/"
      }
    }
  }
}

/**
 * @param {Syntax} s
 * @returns {Record<string, string>}
 */
export function tokenColors(s) {
  const c0 = s.comment[0]
  const p0 = s.plain[0]
  const p1 = s.plain[1]
  const s0 = s.string[0]
  const s1 = s.string[1]

  return {
    "comment.line.number-sign.ini": c0,
    "comment.line.semicolon.ini": c0,
    "entity.name.section.group-title.ini": p1,
    "keyword.other.definition.ini": p1,
    "punctuation.definition.entity.ini": p0,
    "punctuation.definition.string.begin.ini": s0,
    "punctuation.definition.string.end.ini": s0,
    "punctuation.separator.key-value.ini": p0,
    "source.ini": s1
  }
}
