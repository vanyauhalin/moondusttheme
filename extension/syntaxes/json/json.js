/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function json() {
  return {
    title: "JSON",
    name: "json",
    scope: "source.json",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSON.tmLanguage.json/"],
    example: {
      author: {
        name: "typicode",
        url: "https://github.com/typicode/"
      },
      source: {
        name: "JSON Server",
        url: "https://github.com/typicode/json-server/blob/v0.17.4/package.json/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.line.double-slash.js": c0,

        "comment.block.documentation.json": c0,
        "comment.block.json": c0,
        "meta.structure.dictionary.value.json punctuation.definition.string.begin.json": s0,
        "meta.structure.dictionary.value.json punctuation.definition.string.end.json": s0,
        "punctuation.definition.array.begin.json": p0,
        "punctuation.definition.array.end.json": p0,
        "punctuation.definition.dictionary.begin.json": p0,
        "punctuation.definition.dictionary.end.json": p0,
        "punctuation.definition.string.begin.json": p0,
        "punctuation.definition.string.end.json": p0,
        "punctuation.separator.array.json": p0,
        "punctuation.separator.dictionary.key-value.json": p0,
        "punctuation.separator.dictionary.pair.json": p0,
        "punctuation.support.type.property-name.begin.json": p0,
        "punctuation.support.type.property-name.end.json": p0,
        "source.json": s1,
        "string.json support.type.property-name.json": p1
      }
    }
  }
}
