/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function sql() {
  return {
    title: "SQL",
    name: "sql",
    scope: "source.sql",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/sql/syntaxes/sql.tmLanguage.json/"],
    example: {
      author: {
        name: "launchbadge",
        url: "https://github.com/launchbadge/"
      },
      source: {
        name: "SQLx",
        url: "https://github.com/launchbadge/sqlx/blob/v0.7.4/tests/sqlite/setup.sql/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.line.double-dash.sql": c0,
        "keyword.operator.comparison.sql": p0,
        "keyword.operator.concatenator.sql": p0,
        "keyword.operator.math.sql": p0,
        "keyword.other.alias.sql": p0,
        "keyword.other.authorization.sql": p0,
        "keyword.other.create.sql": p0,
        "keyword.other.data-integrity.sql": p0,
        "keyword.other.DDL.create.II.sql": p0,
        "keyword.other.DML.II.sql": p0,
        "keyword.other.DML.sql": p0,
        "keyword.other.LUW.sql": p0,
        "keyword.other.order.sql": p0,
        "keyword.other.sql": p0,
        "punctuation.definition.string.begin.sql": s0,
        "punctuation.definition.string.end.sql": s0,
        "punctuation.section.scope.begin.sql": p0,
        "punctuation.section.scope.end.sql": p0,
        "source.sql comment.block": c0,
        "source.sql": p1,
        "storage.modifier.sql": p0,
        "storage.type.sql": p0,
        "string.quoted.double.sql": s1,
        "string.quoted.single.sql": s1
      }
    }
  }
}
