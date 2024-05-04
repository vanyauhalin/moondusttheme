/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function gomod() {
  return {
    title: "Go Module",
    name: "go.mod",
    scope: "go.mod",
    grammars: ["https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.mod.tmGrammar.json/"],
    example: {
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/"
      },
      source: {
        name: "Invoice",
        url: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.mod/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s1 = s.string[1]

      return {
        "comment.line.double-slash.go.mod": c0,
        "constant.language.go.mod": s1,
        "constant.other.placeholder.go.mod": p0,
        "keyword.go.mod": p0,
        "operator.go.mod": p0,
        "punctuation.definition.string.begin.go.mod": p0,
        "punctuation.definition.string.end.go.mod": p0,
        "go.mod": p1
      }
    }
  }
}
