/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "TOML",
    name: "toml",
    scope: "source.toml",
    grammars: ["https://github.com/tamasfe/taplo/blob/release-even-better-toml-0.20.0/editors/vscode/toml.tmLanguage.json"],
    example: {
      author: {
        name: "jdx",
        url: "https://github.com/jdx/"
      },
      source: {
        name: "mise",
        url: "https://github.com/jdx/mise/blob/main/Cargo.toml"
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
  const s1 = s.string[1]

  return {
    "comment.line.number-sign.toml": c0,
    "meta.preprocessor.toml": c0,
    "punctuation.definition.array.table.toml": p0,
    "punctuation.definition.array.toml": p0,
    "punctuation.definition.table.inline.toml": p0,
    "punctuation.definition.table.toml": p0,
    "punctuation.eq.toml": p0,
    "punctuation.separator.array.toml": p0,
    "punctuation.separator.dot.toml": p0,
    "punctuation.separator.table.inline.toml": p0,
    "source.toml": s1,
    "support.type.property-name.array.toml": p1,
    "support.type.property-name.table.toml": p1,
    "support.type.property-name.toml": p1
  }
}
