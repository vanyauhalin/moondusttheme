/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../../../../colors/themes.js").Syntax} Syntax
 */

import {r, w} from "../../../../../shared/test.js"

/**
 * @param {Syntax} s
 * @returns {Root}
 */
export function fn(s) {
  const c0 = w(s.comment[0])
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])
  const s0 = w(s.string[0])
  const s1 = w(s.string[1])

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
