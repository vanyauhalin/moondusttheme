/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../main.test.js").ColorTheme} ColorTheme
 */

import {r, w} from "../main.test.js"

/**
 * @param {ColorTheme} c
 * @returns {Root}
 */
export function f(c) {
  const c0 = w(c.comment[0])
  const p0 = w(c.plain[0])
  const p1 = w(c.plain[1])
  const s0 = w(c.string[0])
  const s1 = w(c.string[1])

  return r(
    c0("# comment"),

    p1("s"),
    p0("$"), p1("s"),
    p0("$"), p1("argv"),

    s0('"'), s1("s"), p0("$"), p1("s"), p0("$"), p1("argv"), s0('"'),
    s0("'"), s1("s"), s0("'"),

    p0("function"),
    p0("while"),
    p0("if"),
    p0("else"),
    p0("switch"),
    p0("case"),
    p0("for"),
    p0("in"),
    p0("begin"),
    p0("end"),
    p0("continue"),
    p0("break"),
    p0("return"),
    p0("source"),
    p0("exit"),
    p0("wait"),
    p0("and"),
    p0("or"),
    p0("not")
  )
}
