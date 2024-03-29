/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "YAML",
    name: "yaml",
    scope: "source.yaml",
    grammars: ["https://github.com/microsoft/vscode/tree/1.87.0/extensions/yaml/syntaxes/yaml.tmLanguage.json"],
    example: {
      author: {
        name: "Google",
        url: "https://github.com/google/"
      },
      source: {
        name: "Brotli",
        url: "https://github.com/google/brotli/blob/v1.1.0/.github/workflows/release.yaml"
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
    "comment.line.number-sign.yaml": c0,
    "constant.language.merge.yaml": p0,
    "entity.name.tag.yaml": p1,
    "entity.other.document.begin.yaml": p0,
    "entity.other.document.end.yaml": p0,
    "keyword.control.flow.alias.yaml": p0,
    "keyword.control.flow.block-scalar.folded.yaml": p0,
    "keyword.control.flow.block-scalar.literal.yaml": p0,
    "keyword.control.property.anchor.yaml": p0,
    "meta.directive.yaml": p0,
    "punctuation.definition.block.sequence.item.yaml": p0,
    "punctuation.definition.directive.begin.yaml": p0,
    "punctuation.definition.key-value.begin.yaml": p0,
    "punctuation.definition.mapping.begin.yaml": p0,
    "punctuation.definition.mapping.end.yaml": p0,
    "punctuation.definition.sequence.begin.yaml": p0,
    "punctuation.definition.sequence.end.yaml": p0,
    "punctuation.definition.string.begin.yaml": s0,
    "punctuation.definition.string.end.yaml": s0,
    "punctuation.separator.key-value.mapping.yaml": p0,
    "punctuation.separator.mapping.yaml": p0,
    "punctuation.separator.sequence.yaml": p0,
    "source.yaml": s1,
    "storage.modifier.chomping-indicator.yaml": p0
  }
}
