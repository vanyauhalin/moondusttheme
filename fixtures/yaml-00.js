/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../makefile.js").ColorTheme} ColorTheme
 */

import {r, w} from "../makefile.js"

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
    p0("%YAML 1.2"),
    p0("%TAG !t! t"),
    p0("---"),
    c0("# c"),
    p1("a"), p0(":"), s1("s"),
    p1("b"), p0(":"), s0('"'), s1("s"), s0('"'),
    p1("c"), p0(":"), s0("'"), s1("s"), s0("'"),
    p1("d"), p0(": ["), s1("0"), p0(","), s1("0.0"), p0("]"),
    p1("e"), p0(": {"),
      p0("?:"), s1("s"), p0(","),
      p1("a"), p0(":"), s1("s"),
    p0("}"),
    p1("f"), p0(":"),
      p0("-"), p1("k"), p0(":"), s1("v"),
    p1("g"), p0(":"), s1("2001-12-15T02:59:43.1Z"),
    p1("h"), p0(": &"), s1("a"),
    p1("i"), p0(": *"), s1("a"),
    p1("j"), p0(":"), s1("false"),
    p1("k"), p0(":"), s1("null"),
    p1("l"), p0(": <<"),
    p1("m"), p0(": |"),
    p1("o"), p0(": >+"),
    p0("...")
  )
}
