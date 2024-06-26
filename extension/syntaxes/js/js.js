/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function js() {
  return {
    title: "JavaScript",
    name: "js",
    scope: "source.js",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScript.tmLanguage.json/"],
    example: {
      author: {
        name: "Luke Edwards",
        url: "https://github.com/lukeed/"
      },
      source: {
        name: "uvu",
        url: "https://github.com/lukeed/uvu/blob/v0.5.6/src/assert.js/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.block.documentation.js": c0,
        "comment.block.js": c0,
        "comment.line.double-slash.js": c0,
        "comment.line.shebang.js": c0,
        "comment.line.triple-slash.directive.js keyword.operator.assignment.js": c0,
        "comment.line.triple-slash.directive.js punctuation.definition.string.begin.js": c0,
        "comment.line.triple-slash.directive.js punctuation.definition.string.end.js": c0,
        "comment.line.triple-slash.directive.js string.quoted.double.js": c0,
        "comment.line.triple-slash.directive.js string.quoted.single.js": c0,
        "comment.line.triple-slash.directive.js": c0,
        "entity.other.attribute-name.directive.js": c0,
        "keyword.control.as.js": p0,
        "keyword.control.assert.js": p0,
        "keyword.control.conditional.js": p0,
        "keyword.control.default.js": p0,
        "keyword.control.export.js": p0,
        "keyword.control.flow.js": p0,
        "keyword.control.from.js": p0,
        "keyword.control.js": p0,
        "keyword.control.loop.js": p0,
        "keyword.control.satisfies.js": p0,
        "keyword.control.switch.js": p0,
        "keyword.control.trycatch.js": p0,
        "keyword.control.type.js": p0,
        "keyword.control.with.js": p0,
        "keyword.generator.asterisk.js": p0,
        "keyword.operator.arithmetic.js": p0,
        "keyword.operator.assignment.compound.bitwise.js": p0,
        "keyword.operator.assignment.compound.js": p0,
        "keyword.operator.assignment.js": p0,
        "keyword.operator.bitwise.js": p0,
        "keyword.operator.bitwise.shift.js": p0,
        "keyword.operator.comparison.js": p0,
        "keyword.operator.decrement.js": p0,
        "keyword.operator.definiteassignment.js": p0,
        "keyword.operator.expression.delete.js": p0,
        "keyword.operator.expression.in.js": p0,
        "keyword.operator.expression.infer.js": p0,
        "keyword.operator.expression.instanceof.js": p0,
        "keyword.operator.expression.is.js": p0,
        "keyword.operator.expression.keyof.js": p0,
        "keyword.operator.expression.of.js": p0,
        "keyword.operator.expression.typeof.js": p0,
        "keyword.operator.expression.void.js": p0,
        "keyword.operator.increment.js": p0,
        "keyword.operator.logical.js": p0,
        "keyword.operator.new.js": p0,
        "keyword.operator.optional.js": p0,
        "keyword.operator.relational.js": p0,
        "keyword.operator.rest.js": p0,
        "keyword.operator.spread.js": p0,
        "keyword.operator.ternary.js": p0,
        "keyword.operator.type.annotation.js": p0,
        "keyword.other.debugger.js": p0,
        "meta.brace.round.js": p0,
        "meta.brace.square.js": p0,
        "meta.delimiter.decimal.period.js": p0,
        "meta.embedded.line.js": p1,
        "meta.export.js punctuation.definition.string.begin.js": p0,
        "meta.export.js punctuation.definition.string.end.js": p0,
        "meta.export.js string.quoted.double.js": p1,
        "meta.export.js string.quoted.single.js": p1,
        "meta.import-equals.external.js keyword.control.import.js": p0,
        "meta.import-equals.internal.js keyword.control.import.js": p0,
        "meta.import.js keyword.control.import.js": p0,
        "meta.import.js punctuation.definition.string.begin.js": p0,
        "meta.import.js punctuation.definition.string.end.js": p0,
        "meta.import.js string.quoted.double.js": p1,
        "meta.import.js string.quoted.single.js": p1,
        "meta.return.type.arrow.js punctuation.definition.string.begin.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.end.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.template.begin.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.template.end.js": p0,
        "meta.return.type.arrow.js string.quoted.double.js": p0,
        "meta.return.type.arrow.js string.quoted.single.js": p0,
        "meta.return.type.arrow.js string.template.js": p0,
        "meta.return.type.arrow.js": p0,
        "meta.return.type.js punctuation.definition.string.begin.js": p0,
        "meta.return.type.js punctuation.definition.string.end.js": p0,
        "meta.return.type.js punctuation.definition.string.template.begin.js": p0,
        "meta.return.type.js punctuation.definition.string.template.end.js": p0,
        "meta.return.type.js string.quoted.double.js": p0,
        "meta.return.type.js string.quoted.single.js": p0,
        "meta.return.type.js string.template.js": p0,
        "meta.return.type.js": p0,
        "meta.type.annotation.js punctuation.definition.string.begin.js": p0,
        "meta.type.annotation.js punctuation.definition.string.end.js": p0,
        "meta.type.annotation.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.annotation.js punctuation.definition.string.template.end.js": p0,
        "meta.type.annotation.js string.quoted.double.js": p0,
        "meta.type.annotation.js string.quoted.single.js": p0,
        "meta.type.annotation.js string.template.js": p0,
        "meta.type.annotation.js": p0,
        "meta.type.declaration.js entity.name.type.alias.js": p1,
        "meta.type.declaration.js meta.definition.property.js variable.object.property.js": p1,
        "meta.type.declaration.js meta.method.declaration.js entity.name.function.js": p1,
        "meta.type.declaration.js meta.method.declaration.js meta.parameters.js variable.parameter.js": p1,
        "meta.type.declaration.js punctuation.definition.string.begin.js": p0,
        "meta.type.declaration.js punctuation.definition.string.end.js": p0,
        "meta.type.declaration.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.declaration.js punctuation.definition.string.template.end.js": p0,
        "meta.type.declaration.js string.quoted.double.js": p0,
        "meta.type.declaration.js string.quoted.single.js": p0,
        "meta.type.declaration.js string.template.js": p0,
        "meta.type.declaration.js": p0,
        "meta.type.parameters.js punctuation.definition.string.begin.js": p0,
        "meta.type.parameters.js punctuation.definition.string.end.js": p0,
        "meta.type.parameters.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.parameters.js punctuation.definition.string.template.end.js": p0,
        "meta.type.parameters.js string.quoted.double.js": p0,
        "meta.type.parameters.js string.quoted.single.js": p0,
        "meta.type.parameters.js string.template.js": p0,
        "meta.type.parameters.js": p0,
        "punctuation.accessor.js": p0,
        "punctuation.accessor.optional.js": p0,
        "punctuation.decorator.js": p0,
        "punctuation.definition.binding-pattern.array.js": p0,
        "punctuation.definition.binding-pattern.object.js": p0,
        "punctuation.definition.block.js": p0,
        "punctuation.definition.parameters.begin.js": p0,
        "punctuation.definition.parameters.end.js": p0,
        "punctuation.definition.section.case-statement.js": p0,
        "punctuation.definition.string.begin.js": s0,
        "punctuation.definition.string.end.js": s0,
        "punctuation.definition.string.template.begin.js": s0,
        "punctuation.definition.string.template.end.js": s0,
        "punctuation.definition.tag.begin.js": p0,
        "punctuation.definition.tag.end.js": p0,
        "punctuation.definition.template-expression.begin.js": p0,
        "punctuation.definition.template-expression.end.js": p0,
        "punctuation.definition.typeparameters.begin.js": p0,
        "punctuation.definition.typeparameters.end.js": p0,
        "punctuation.section.embedded.begin.js": p0,
        "punctuation.section.embedded.end.js": p0,
        "punctuation.separator.comma.js": p0,
        "punctuation.separator.key-value.js": p0,
        "punctuation.separator.label.js": p0,
        "punctuation.separator.parameter.js": p0,
        "punctuation.terminator.statement.js": p0,
        "source.js": p1,
        "storage.modifier.async.js": p0,
        "storage.modifier.js": p0,
        "storage.type.class.js": p0,
        "storage.type.enum.js": p0,
        "storage.type.function.arrow.js": p0,
        "storage.type.function.js": p0,
        "storage.type.interface.js": p0,
        "storage.type.js": p0,
        "storage.type.namespace.js": p0,
        "storage.type.property.js": p0,
        "storage.type.type.js": p0,
        "string.quoted.double.js": s1,
        "string.quoted.single.js": s1,
        "string.regexp.js keyword.other.js": p0,
        "string.regexp.js": s1,
        "string.template.js": s1,
        "support.type.builtin.js": p0,
        "support.type.primitive.js": p0
      }
    }
  }
}
