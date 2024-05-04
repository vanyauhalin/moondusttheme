/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function css() {
  return {
    title: "CSS",
    name: "css",
    scope: "source.css",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/css/syntaxes/css.tmLanguage.json/"],
    example: {
      author: {
        name: "Julia Miocene",
        url: "https://github.com/Miocene/"
      },
      source: {
        name: "Portraits Pure CSS Animation",
        url: "https://github.com/Miocene/animations/blob/d83b89b38a0f286b374344e210ecd2a61fe6a671/2023_05_portraits/style.css/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.block.css": c0,
        "entity.name.function.namespace-prefix.css": p0,
        "keyword.control.at-rule.annotation.css": p0,
        "keyword.control.at-rule.character-variant.css": p0,
        "keyword.control.at-rule.charset.css": p0,
        "keyword.control.at-rule.counter-style.css": p0,
        "keyword.control.at-rule.css": p0,
        "keyword.control.at-rule.document.css": p0,
        "keyword.control.at-rule.font-face.css": p0,
        "keyword.control.at-rule.font-feature-values.css": p0,
        "keyword.control.at-rule.import.css": p0,
        "keyword.control.at-rule.keyframes.css": p0,
        "keyword.control.at-rule.media.css": p0,
        "keyword.control.at-rule.namespace.css": p0,
        "keyword.control.at-rule.ornaments.css": p0,
        "keyword.control.at-rule.page.css": p0,
        "keyword.control.at-rule.styleset.css": p0,
        "keyword.control.at-rule.stylistic.css": p0,
        "keyword.control.at-rule.supports.css": p0,
        "keyword.control.at-rule.swash.css": p0,
        "keyword.control.at-rule.viewport.css": p0,
        "keyword.operator.combinator.css": p0,
        "keyword.operator.comparison.css": p0,
        "keyword.operator.logical.and.media.css": p0,
        "keyword.operator.logical.not.media.css": p0,
        "keyword.operator.logical.only.media.css": p0,
        "keyword.operator.pattern.css": p0,
        "keyword.other.important.css": p0,
        "meta.at-rule.import.css punctuation.definition.string.begin.css": p0,
        "meta.at-rule.import.css punctuation.definition.string.end.css": p0,
        "meta.at-rule.import.css string.quoted.double.css": p1,
        "meta.at-rule.import.css string.quoted.single.css": p1,
        "meta.property-value.css punctuation.definition.string.begin.css": s1,
        "meta.property-value.css punctuation.definition.string.end.css": s1,
        "meta.property-value.css punctuation.section.function.begin.bracket.round.css": s1,
        "meta.property-value.css punctuation.section.function.end.bracket.round.css": s1,
        "meta.property-value.css punctuation.separator.list.comma.css": s1,
        "meta.property-value.css string.quoted.double.css": s1,
        "meta.property-value.css string.quoted.single.css": s1,
        "meta.property-value.css string.unquoted.attribute-value.css": s1,
        "meta.property-value.css": s1,
        "punctuation.definition.condition.begin.bracket.round.css": p0,
        "punctuation.definition.condition.end.bracket.round.css": p0,
        "punctuation.definition.entity.begin.bracket.square.css": p0,
        "punctuation.definition.entity.css": p0,
        "punctuation.definition.entity.end.bracket.square.css": p0,
        "punctuation.definition.parameters.begin.bracket.round.css": p0,
        "punctuation.definition.parameters.end.bracket.round.css": p0,
        "punctuation.definition.string.begin.css": s0,
        "punctuation.definition.string.end.css": s0,
        "punctuation.section.begin.bracket.curly.css": p0,
        "punctuation.section.document.begin.bracket.curly.css": p0,
        "punctuation.section.document.end.bracket.curly.css": p0,
        "punctuation.section.end.bracket.curly.css": p0,
        "punctuation.section.function.begin.bracket.round.css": p0,
        "punctuation.section.function.end.bracket.round.css": p0,
        "punctuation.section.keyframes.begin.bracket.curly.css": p0,
        "punctuation.section.keyframes.end.bracket.curly.css": p0,
        "punctuation.section.media.begin.bracket.curly.css": p0,
        "punctuation.section.media.end.bracket.curly.css": p0,
        "punctuation.section.property-list.begin.bracket.curly.css": p0,
        "punctuation.section.property-list.end.bracket.curly.css": p0,
        "punctuation.section.supports.begin.bracket.curly.css": p0,
        "punctuation.section.supports.end.bracket.curly.css": p0,
        "punctuation.separator.key-value.css": p0,
        "punctuation.separator.list.comma.css": p0,
        "punctuation.terminator.rule.css": p0,
        "source.css": p1,
        "string.quoted.double.css": s1,
        "string.quoted.single.css": s1,
        "string.unquoted.attribute-value.css": s1,
        "support.constant.media.css": p0,
        "variable.parameter.url.css": s1
      }
    }
  }
}
