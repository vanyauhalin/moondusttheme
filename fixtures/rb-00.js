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
    c0("# c"),
    c0("=begin"),
    c0("=end"),

    s0('"'), s1("s"), s0('"'),
    s0('"'), s1("s"), p0("#{"), p1("v"), p0("}#{$"), p1("v"), p0("}"), s0('"'),
    s0("'"), s1("s"), s0("'"),
    s0("`"), s1("s"), s0("`"),
    s0("%!"), s1("s"), s0("!"),
    s0("%("), s1("s"), s0(")"),
    s0("%{"), s1("s"), s0("}"),

    s0("/"), s1("r"), s0("/i"),
    s0("/"), s1("r"), p0("#{"), p1("v"), p0("}#{$"), p1("v"), p0("}"), s0("/"),
    s0("%r|"), s1("r"), s0("|"),

    p1("1"),
    p0("-"), p1("1"),
    p1("1_0"),
    p1("1.0"),
    p1("0xf"),
    p1("0b0"),
    p1("0o3"),
    p1("?a"),
    p0(":"), p1("symbol"),

    p0("$"), p1("v"),
    p0("@"), p1("v"),
    p1("V"),

    p1("A"), p0("::"), p1("B"),

    p1("self"),
    p1("nil"),
    p1("true"),
    p1("false"),
    p1("__FILE__"),
    p1("__LINE__"),

    p0("["), p1("0"), p0(","), p1("1"), p0("]"),
    // Does not look good.
    p0("%"), p1("w"), p0("("), p1("0 1"), p0(")"),

    p0("{"), p1("0"), p0("=>"), p1("v"), p0(","), p1("1"), p0("=>"), p1("v"), p0("}"),
    p0("{:"), p1("k"), p0("=>"), p1("v"), p0("}"),
    p0("{"), p1("k"), p0(":"), p1("v"), p0("}"),

    p1("a"), p0("."), p1("b"), p0("()"),
    p1("a"), p0("(*[])"),

    p0("="),
    p0("+="),
    p0("+"),

    p0("if elsif else end"),
    p0("unless then end"),
    p0("case when end"),

    p0("&&"),
    p0("and"),
    p0("||"),
    p0("or"),
    p0("not"),
    p0("!"),
    p0("!="),

    p0("while do end"),
    p0("until end"),

    p0("[]."), p1("each"), p0("do |"), p1("i"), p0("| end"),
    p0("[]."), p1("each"), p0("{|"), p1("i"), p0("|}"),

    p0("for in end"),

    p0("yield"),
    p0("raise"),
    p0("begin rescue end"),
    p0("retry"),
    p0("return"),
    p0("break"),
    p0("next"),
    p0("redo"),

    p0("BEGIN"),
    p0("END"),

    p0("class"), p1("A"), p0("<"), p1("B"), p0("; end"),
    p0("class <<"), p1("B"), p0("; end"),
    p0("module"), p1("A"), p0("; end"),
    p0("def"), p1("a"), p0("(); end"),

    p0("alias"),
    p0("undef"),
    p0("defined?"),

    p0('require "'), p1("m"), p0('"'),

    p0("-> {}"),
    p1("lambda"), p0("{}")
  )
}
