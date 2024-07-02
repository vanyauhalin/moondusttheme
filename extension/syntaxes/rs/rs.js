/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function rs() {
  return {
    title: "Rust",
    name: "rs",
    scope: "source.rust",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/rust/syntaxes/rust.tmLanguage.json/"],
    example: {
      author: {
        name: "Rust",
        url: "https://github.com/rust-lang/"
      },
      source: {
        name: "Cargo",
        url: "https://github.com/rust-lang/cargo/blob/0.79.0/src/bin/cargo/main.rs/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.block.documentation.rust": c0,
        "comment.block.rust": c0,
        "comment.line.documentation.rust": c0,
        "comment.line.double-slash.rust": c0,
        "entity.name.type.numeric.rust": p0,
        "entity.name.type.primitive.rust": p0,
        "keyword.control.rust": p0,
        "keyword.declaration.enum.rust": p0,
        "keyword.declaration.struct.rust": p0,
        "keyword.declaration.trait.rust": p0,
        "keyword.declaration.type.rust": p0,
        "keyword.operator.access.dot.rust": p0,
        "keyword.operator.arrow.fat.rust": p0,
        "keyword.operator.arrow.skinny.rust": p0,
        "keyword.operator.assignment.equal.rust": p0,
        "keyword.operator.assignment.rust": p0,
        "keyword.operator.borrow.and.rust": p0,
        "keyword.operator.comparison.rust": p0,
        "keyword.operator.dereference.rust": p0,
        "keyword.operator.key-value.rust": p0,
        "keyword.operator.logical.rust": p0,
        "keyword.operator.macro.dollar.rust": p0,
        "keyword.operator.math.rust": p0,
        "keyword.operator.namespace.rust": p0,
        "keyword.operator.question.rust": p0,
        "keyword.operator.range.rust": p0,
        "keyword.operator.subpattern.rust": p0,
        "keyword.other.crate.rust": p0,
        "keyword.other.fn.rust": p0,
        "keyword.other.rust": p0,
        "meta.attribute.rust punctuation.definition.string.rust": p0,
        "meta.attribute.rust string.quoted.double.rust": p0,
        "meta.attribute.rust": p0,
        "meta.interpolation.rust": p1,
        "punctuation.brackets.angle.rust": p0,
        "punctuation.brackets.curly.rust": p0,
        "punctuation.brackets.round.rust": p0,
        "punctuation.brackets.square.rust": p0,
        "punctuation.comma.rust": p0,
        "punctuation.definition.char.rust": s0,
        "punctuation.definition.interpolation.rust": p0,
        "punctuation.definition.lifetime.rust": p0,
        "punctuation.definition.string.raw.rust": s0,
        "punctuation.definition.string.rust": s0,
        "punctuation.semi.rust": p0,
        "punctuation.separator.dot.decimal.rust": p0,
        "source.rust": p1,
        "storage.modifier.mut.rust": p0,
        "storage.modifier.rust": p0,
        "storage.type.rust": p0,
        "string.quoted.byte.raw.rust": p0,
        "string.quoted.double.rust": s1,
        "string.quoted.single.char.rust": s1,
      }
    }
  }
}
