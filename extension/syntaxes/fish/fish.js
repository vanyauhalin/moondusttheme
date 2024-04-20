/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "fish",
    name: "fish",
    scope: "source.fish",
    grammars: ["https://github.com/bmalehorn/vscode-fish/blob/2bdcfbea62cadc2a977eace3189d25b31df71e72/syntaxes/fish.tmLanguage.json/"],
    example: {
      author: {
        name: "Jorge Bucaran",
        url: "https://github.com/jorgebucaran/"
      },
      source: {
        name: "A plugin manager for Fish",
        url: "https://github.com/jorgebucaran/fisher/blob/4.4.4/functions/fisher.fish/"
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
    "comment.line.number-sign.fish": c0,
    "keyword.control.fish": p0,
    "punctuation.definition.string.begin.fish": s0,
    "punctuation.definition.string.end.fish": s0,
    "punctuation.definition.variable.fish": p0,
    "source.fish": p1,
    "string.quoted.double.fish": s1,
    "string.quoted.single.fish": s1,
    "variable.language.fish": p1,
    "variable.other.normal.fish": p1
  }
}
