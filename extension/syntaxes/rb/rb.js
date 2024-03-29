/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "Ruby",
    name: "rb",
    scope: "source.ruby",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/ruby/syntaxes/ruby.tmLanguage.json"],
    example: {
      author: {
        name: "Ruby",
        url: "https://github.com/ruby/"
      },
      source: {
        name: "OpenURI",
        url: "https://github.com/ruby/open-uri/blob/v0.4.1/lib/open-uri.rb"
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
    "source.ruby punctuation.separator.key-value": p0,
    "punctuation.section.embedded.end.ruby source.ruby": p0,

    "comment.block.documentation.ruby": c0,
    "comment.line.number-sign.ruby": c0,
    "keyword.control.class.ruby": p0,
    "keyword.control.def.ruby": p0,
    "keyword.control.module.ruby": p0,
    "keyword.control.pseudo-method.ruby": p0,
    "keyword.control.ruby": p0,
    "keyword.control.start-block.ruby": p0,
    "keyword.operator.arithmetic.ruby": p0,
    "keyword.operator.assignment.augmented.ruby": p0,
    "keyword.operator.assignment.ruby": p0,
    "keyword.operator.comparison.ruby": p0,
    "keyword.operator.logical.ruby": p0,
    "keyword.operator.other.ruby": p0,
    "keyword.other.special-method.ruby": p0,
    "meta.require.ruby punctuation.definition.string.begin.ruby": p0,
    "meta.require.ruby punctuation.definition.string.end.ruby": p0,
    "meta.require.ruby string.quoted.double.ruby": p1,
    "punctuation.definition.constant.ruby": p0,
    "punctuation.definition.parameters.ruby": p0,
    "punctuation.definition.string.begin.ruby": s0,
    "punctuation.definition.string.end.ruby": s0,
    "punctuation.definition.string.ruby": s0,
    "punctuation.definition.variable.ruby": p0,
    "punctuation.section.array.begin.ruby": p0,
    "punctuation.section.array.end.ruby": p0,
    "punctuation.section.embedded.begin.ruby": p0,
    "punctuation.section.embedded.end.ruby": p0,
    "punctuation.section.function.begin.ruby": p0,
    "punctuation.section.function.end.ruby": p0,
    "punctuation.section.function.ruby": p0,
    "punctuation.section.scope.begin.ruby": p0,
    "punctuation.section.scope.end.ruby": p0,
    "punctuation.separator.arguments.ruby": p0,
    "punctuation.separator.method.ruby": p0,
    "punctuation.separator.namespace.ruby": p0,
    "punctuation.separator.object.ruby": p0,
    "punctuation.separator.statement.ruby": p0,
    "source.ruby": p1,
    "string.interpolated.ruby": s1,
    "string.quoted.double.ruby": s1,
    "string.quoted.other.interpolated.ruby": s1,
    "string.quoted.single.ruby": s1,
    "string.regexp.classic.ruby": s1,
    "string.regexp.percent.ruby": s1,
    "support.function.kernel.lambda.ruby": p0
  }
}
