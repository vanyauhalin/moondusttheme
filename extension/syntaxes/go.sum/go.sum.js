/**
 * @typedef {import("../../../shared/meta.js").Meta} Meta
 * @typedef {import("../../colors/themes.js").Syntax} Syntax
 */

/**
 * @returns {Meta}
 */
export function meta() {
  return {
    title: "Go Sum",
    name: "go.sum",
    scope: "go.sum",
    grammars: ["https://github.com/golang/vscode-go/tree/v0.41.2/extension/syntaxes/go.sum.tmGrammar.json"],
    example: {
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/"
      },
      source: {
        name: "Invoice",
        url: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.sum"
      }
    }
  }
}

/**
 * @param {Syntax} s
 * @returns {Record<string, string>}
 */
export function tokenColors(s) {
  const p1 = s.plain[1]
  const s1 = s.string[1]

  return {
    "constant.language.go.sum": s1,
    "go.sum": p1
  }
}
