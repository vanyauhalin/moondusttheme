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
  const s1 = w(c.string[1])

  return r(
    c0("#: p"),
    c0("# c"),
    p0("["), p1("t"), p0("]"),
    p1("s"), p0("="), s1('"s"'),
    p1("m"), p0("="), s1('"""m"""'),
    p1("k"), p0("="), s1("'''k'''"),
    p1("r"), p0("="), s1("'<\\s>'"),
    p1("b"), p0("="), s1("true"),
    p1("i"), p0("="), s1("+inf"),
    p1("n"), p0("="), s1("-nan"),
    p1("d"), p0("="), s1("1980-01-01"),
    p1("l"), p0("="), s1("1980-01-01T00:00:00"),
    p1("z"), p0("="), s1("1980-01-01T00:00:00Z"),
    p1("a"), p0("= ["), s1("0"), p0(","), s1('"s"'), p0("]"),
    p1("o"), p0("= {"), p1("s"), p0("="), s1('"s"'), p0("}"),
    p0("[["), p1("t"), p0("."), p1("t"), p0("]]"),
    p1("i"), p0("="), s1("0"),
    p1("f"), p0("="), s1("1.0_0"),
    p1("t"), p0("="), s1("00:00:00"),
    p1("h"), p0("="), s1("0xDEADBEEF"),
    p1("o"), p0("="), s1("0o755"),
    p1("b"), p0("="), s1("0b11010110")
  )
}
