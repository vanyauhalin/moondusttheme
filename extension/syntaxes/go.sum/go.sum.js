/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function gosum() {
  return {
    title: "Go Sum",
    name: "go.sum",
    scope: "go.sum",
    grammars: ["https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.sum.tmGrammar.json/"],
    example: {
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/"
      },
      source: {
        name: "Invoice",
        url: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.sum/"
      }
    },
    tokenColors(s) {
      const p1 = s.plain[1]
      const s1 = s.string[1]

      return {
        "constant.language.go.sum": s1,
        "go.sum": p1
      }
    }
  }
}
