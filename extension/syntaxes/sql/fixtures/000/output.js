/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../../../../colors/themes.js").ThemeSyntax} ThemeSyntax
 */

import {r, w} from "../../../../test.js"

/**
 * @param {ThemeSyntax} s
 * @returns {Root}
 */
export function fn(s) {
  const c0 = w(s.comment[0])
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])
  const s0 = w(s.string[0])
  const s1 = w(s.string[1])

  return r(
    c0("-- comment"),
    c0("/* comment */"),

    p0("CREATE TABLE"), p1("a {}"),
    p0("INSERT INTO"), p1("a"), p0("()"),
    p0("VALUES"), p1("a"), p0("()"),
    p0("SELECT"), p1("*"),
    p0("FROM"), p1("accounts;"),
    p0("BIGINT"),
    p0("NOT NULL"),
    p0("PRIMARY KEY"),
    p0("GRANT"),
    p0("AS"),
    p0("DESC"),
    p0("ASC"),
    p0("IN"),
    p0("BEGIN"),

    s0('"'), s1("s"), s0('"'),
    s0("'"), s1("s"), s0("'"),

    p1("a"), p0(">"), p1("b"),
    p1("a"), p0("-"), p1("b"),
    p1("a"), p0("||"), p1("b")
  )
}
