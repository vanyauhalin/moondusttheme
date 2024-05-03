/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "Go",
    name: "go",
    scope: "source.go",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/go/syntaxes/go.tmLanguage.json/"],
    example: {
      author: {
        name: "Alec Thomas",
        url: "https://github.com/alecthomas/"
      },
      source: {
        name: "Kong",
        url: "https://github.com/alecthomas/kong/blob/v0.9.0/kong.go/"
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
    "comment.block.go": c0,
    "comment.line.double-slash.go": c0,
    "constant.numeric.decimal.point.go": p0,
    "constant.other.placeholder.go": p0,
    "keyword.channel.go": p0,
    "keyword.const.go": p0,
    "keyword.control.go": p0,
    "keyword.control.import.go": p0,
    "keyword.function.go": p0,
    "keyword.interface.go": p0,
    "keyword.map.go": p0,
    "keyword.operator.address.go": p0,
    "keyword.operator.arithmetic.bitwise.go": p0,
    "keyword.operator.arithmetic.go": p0,
    "keyword.operator.assignment.go": p0,
    "keyword.operator.channel.go": p0,
    "keyword.operator.comparison.go": p0,
    "keyword.operator.decrement.go": p0,
    "keyword.operator.ellipsis.go": p0,
    "keyword.operator.increment.go": p0,
    "keyword.operator.logical.go": p0,
    "keyword.package.go": p0,
    "keyword.struct.go": p0,
    "keyword.type.go": p0,
    "keyword.var.go": p0,
    "punctuation.definition.begin.bracket.curly.go": p0,
    "punctuation.definition.begin.bracket.round.go": p0,
    "punctuation.definition.begin.bracket.square.go": p0,
    "punctuation.definition.end.bracket.curly.go": p0,
    "punctuation.definition.end.bracket.round.go": p0,
    "punctuation.definition.end.bracket.square.go": p0,
    "punctuation.definition.imports.begin.bracket.round.go": p0,
    "punctuation.definition.imports.end.bracket.round.go": p0,
    "punctuation.definition.string.begin.go": s0,
    "punctuation.definition.string.end.go": s0,
    "punctuation.other.colon.go": p0,
    "punctuation.other.comma.go": p0,
    "punctuation.other.period.go": p0,
    "punctuation.separator.constant.numeric.go": p0,
    "punctuation.terminator.go": p0,
    "source.go": p1,
    "storage.type.boolean.go": p0,
    "storage.type.byte.go": p0,
    "storage.type.error.go": p0,
    "storage.type.numeric.go": p0,
    "storage.type.rune.go": p0,
    "storage.type.string.go": p0,
    "storage.type.uintptr.go": p0,
    "string.quoted.double.go": s1,
    "string.quoted.raw.go": s1,
    "string.quoted.rune.go": s1
  }
}
