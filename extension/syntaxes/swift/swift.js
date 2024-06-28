/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function swift() {
  return {
    title: "Swift",
    name: "swift",
    scope: "source.swift",
    grammars: ["https://github.com/microsoft/vscode/blob/1.90.2/extensions/swift/syntaxes/swift.tmLanguage.json/"],
    example: {
      author: {
        name: "Alin Panaitiu",
        url: "https://github.com/alin23/"
      },
      source: {
        name: "Lunar",
        url: "https://github.com/alin23/Lunar/blob/v6.7.13/Lunar/Controllers/ControlChoiceViewController.swift/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.block.swift": c0,
        "comment.line.double-slash.swift": c0,
        "comment.line.triple-slash.documentation.swift": c0,
        "constant.language.boolean.swift": p1,
        "constant.language.nil.swift": p1,
        "constant.numeric.float.decimal.swift": p1,
        "constant.numeric.float.hexadecimal.swift": p1,
        "constant.numeric.integer.binary.swift": p1,
        "constant.numeric.integer.decimal.swift": p1,
        "constant.numeric.integer.hexadecimal.swift": p1,
        "constant.numeric.integer.octal.swift": p1,
        "constant.numeric.integer.swift": p1,
        "constant.numeric.swift": p1,
        "keyword.control.await.swift": p0,
        "keyword.control.branch.swift": p0,
        "keyword.control.consume.swift": p0,
        "keyword.control.copy.swift": p0,
        "keyword.control.defer.swift": p0,
        "keyword.control.exception.swift": p0,
        "keyword.control.import.preprocessor.conditional.swift": p0,
        "keyword.control.import.swift": p0,
        "keyword.control.loop.swift": p0,
        "keyword.control.transfer.swift": p0,
        "keyword.operator.assignment.swift": p0,
        "keyword.operator.custom.infix.dot.swift": p0,
        "keyword.operator.custom.infix.swift": p0,
        "keyword.operator.custom.postfix.swift": p0,
        "keyword.operator.custom.prefix.swift": p0,
        "keyword.operator.function-result.swift": p0,
        "keyword.operator.ternary.swift": p0,
        "keyword.operator.type-casting.swift": p0,
        "keyword.operator.type.optional.swift": p0,
        "keyword.other.capture-specifier.swift": p0,
        "keyword.other.declaration-specifier.accessibility.swift": p0,
        "keyword.other.declaration-specifier.swift": p0,
        "keyword.other.platform.all.swift": p0,
        "keyword.other.platform.os.swift": p0,
        "meta.attribute.available.swift": p0,
        "meta.definition.type.body.swift support.type.swift": p0,
        "meta.definition.typealias.swift entity.name.type.typealias.swift": p1,
        "meta.definition.typealias.swift": p0,
        "meta.function-result.swift support.type.swift": p0,
        "meta.function-result.swift": p0,
        "meta.generic-argument-clause.swift": p0,
        "meta.generic-parameter-clause.swift": p0,
        "meta.inheritance-clause.swift": p0,
        "meta.parameter-clause.swift support.type.swift": p0,
        "meta.parameter-clause.swift": p0,
        "punctuation.definition.arguments.begin.swift": p0,
        "punctuation.definition.arguments.end.swift": p0,
        "punctuation.definition.parameters.begin.swift": p0,
        "punctuation.definition.parameters.end.swift": p0,
        "punctuation.definition.preprocessor.swift": p0,
        "punctuation.definition.string.begin.raw.swift": s0,
        "punctuation.definition.string.begin.swift": s0,
        "punctuation.definition.string.end.raw.swift": s0,
        "punctuation.definition.string.end.swift": s0,
        "punctuation.definition.type.begin.swift": p0,
        "punctuation.definition.type.end.swift": p0,
        "punctuation.section.collection-type.begin.swift": p0,
        "punctuation.section.collection-type.end.swift": p0,
        "punctuation.section.embedded.begin.swift": p0,
        "punctuation.section.embedded.end.swift source.swift": p0,
        "punctuation.section.embedded.end.swift": p0,
        "punctuation.section.function.begin.swift": p0,
        "punctuation.section.function.end.swift": p0,
        "punctuation.section.scope.begin.swift": p0,
        "punctuation.section.scope.end.swift": p0,
        "punctuation.section.tuple-type.begin.swift": p0,
        "punctuation.section.tuple-type.end.swift": p0,
        "punctuation.section.tuple.begin.swift": p0,
        "punctuation.section.tuple.end.swift": p0,
        "punctuation.separator.argument-label.swift": p0,
        "punctuation.separator.generic-argument-clause.begin.swift": p0,
        "punctuation.separator.generic-argument-clause.end.swift": p0,
        "punctuation.separator.generic-parameter-clause.begin.swift": p0,
        "punctuation.separator.generic-parameter-clause.end.swift": p0,
        "punctuation.separator.generic-parameters.swift": p0,
        "punctuation.separator.inheritance-clause.swift": p0,
        "punctuation.separator.key-value.swift": p0,
        "source.swift": p1,
        "storage.modifier.async.swift": p0,
        "storage.modifier.attribute.swift": p0,
        "storage.modifier.exception.swift": p0,
        "storage.modifier.swift": p0,
        "storage.type.class.swift": p0,
        "storage.type.enum.case.swift": p0,
        "storage.type.enum.swift": p0,
        "storage.type.extension.swift": p0,
        "storage.type.function.swift": p0,
        "storage.type.protocol.swift": p0,
        "storage.type.struct.swift": p0,
        "string.quoted.double.block.swift": s1,
        "string.quoted.double.single-line.raw.swift": s1,
        "string.quoted.double.single-line.swift": s1,
        "support.variable.discard-value.swift": p0,
        "variable.parameter.function.swift": p1,
      }
    }
  }
}
