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
    c0("# c"),

    c0('"s"'),
    c0("'s'"),
    c0('"""s"""'),
    c0('r"s"'),
    c0('r"""s"""'),

    p0("="), s0('"'), s1("s"), s0('"'),
    p0("="), s0("'"), s1("s"), s0("'"),
    p0("="), s0('"""'), s1("s"), s0('"""'),
    p0("="), s0('r"'), s1("s"), s0('"'),
    p0("="), s0('r"""'), s1("s"), s0('"""'),

    s0('f"'), s1("s"), p0("{"), p1("a"), p0(":.2f}"), s0('"'),
    s0('f"""'), s1("s"), s0('"""'),
    s0('b"'), s1("s"), s0('"'),
    s0('b"""'), s1("s"), s0('"""'),

    p1("0"),
    p1("0.0"),
    p1("0xf"),
    p1("0b0"),
    p1("0o3"),

    p1("True"),
    p1("False"),

    p0("["), p1("0"), p0(","), p1("0"), p0("]"),
    p0("{"), p1("a"), p0(":"), p1("0"), p0(","), p1("a"), p0(":"), p1("0"), p0("}"),
    p0("("), p1("a"), p0(","), p1("a"), p0(")"),

    p1("a"), p0("["), p1("0"), p0(":"), p1("0"), p0(":"), p1("0"), p0(",...]"),

    p0("\\"),

    p0("+"),
    p0("="),
    p0("&"),

    p0("and"),
    p0("!="),

    p0("if"),
    p0("elif"),
    p0("else"),

    p0("match"),
    p0("case"),

    p0("while"),
    p0("for"), p1("a"), p0("in"), p1("a"), p0(":"),
    p0("break"),
    p0("continue"),
    p0("yield"),
    p0("return"),
    p0("pass"),

    p0("try"),
    p0("with"),
    p0("except"),
    p0("finally"),

    p0("from"), p1("a"), p0("import"), p1("a"),
    p1("a"), p0("as"), p1("a"),

    p0("async"),
    p0("await"),

    p0("@"), p1("a"),

    p0("async def"), p1("a"), p0("("),
      p1("a"), p0("="), p1("a"), p0(","),
      p1("a"), p0(":"), p1("a"),
      p0(", *"), p1("a"), p0(":"), p1("a"),
      p0(", **"), p1("a"), p0(":"), p1("a"),
    p0(") ->"), p1("a"), p0(":"),
    p0("lambda"), p1("a"), p0(":"), p1("a"),

    p1("a"), p0("."), p1("a"), p0("(*"), p1("a"), p0(", **"), p1("a"), p0(")"),

    p0("class"), p1("a"), p0("("), p1("a"), p0(","), p1("a"), p0("):"),
  )
}
