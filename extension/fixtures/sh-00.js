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
    c0("#!/bin/sh"),

    s0('"'), s1("s"), s0('"'),
    s0("'"), s1("s"), s0("'"),
    s0("`"), p1("s"), s0("`"),
    p1("a"), p0("="), s0('$"'), s1("a"), s0('"'),
    p1("a"), p0("="), s0("$'"), s1("a"), s0("'"),
    p1("a"), p0("=(*"), p1(".txt"), p0(")"),
    s0("<("), p1("a"), s0(")"),
    p0("<<<"), s0('""'),
    p0("<<<"), s0("''"),
    p0("<<<"), s0("``"),

    p0("$"), p1("v"), s0('"'), p0("$"), p1("v"), s0('"'),
    p0("$"), p1("1"), s0('"'), p0("$"), p1("1"), s0('"'),
    p0("$"), p1("@"), s0('"'), p0("$"), p1("@"), s0('"'),

    p1("cat"), p0('<< "EOF"'),
    s1("s"),
    p0("EOF"),

    p1("cat"), p0("<< 'EOF'"),
    s1("s"),
    p0("EOF"),

    p1("echo"), p0("\\"),
      p1("-e"), s0('"'), s1("hi"), s0('"'),


    p0("break"),
    p0("continue"),
    p0("return"),

    p0("if ["), p1("0"), p0("-eq"), p1("0"), p0("]; then"),
    p0("elif [["), p1("0"), p0("=~"), p1("0"), p0("]]; then"),
    p0("elif [] && []; then"),
    p0("else; fi"),

    p0("for"), p1("i"), p0("in"), p1("0"), p0("; do; done"),
    p0("while ["), p1("1"), p0("-eq"), p1("1"), p0("]; do; done"),

    p0("case"), s0('""'), p0("in"),
      s0('"'), s1("a"), s0('"'), p0(");;"),
      s1("-a"), p0(");;"),
      p0("*);;"),
    p0("esac"),

    p0("declare"),
    p0("export"),
    p0("local"),
    p0("readonly"),
    p0("typeset"),

    p1("a"), p0("|"), p1("b"),
    p0("~"), p1("a"),
    p1("a"), p0("=$()"),
    p1("a"), p0("+=${}"),
    p0("${"), p1("a"), p0(":-}"),
    p0("${"), p1("a"), p0("[*]}"),
    p0("${"), p1("a"), p0("##*/}"),
    p1("a"), p0("0>"),
    p1("a"), p0("1>"),
    p1("a"), p0("2>"),
    p1("a"), p0("3>"),
    p1("a"), p0("4>"),
    p1("a"), p0("5>"),
    p1("a"), p0("6>"),
    p1("a"), p0("7>"),
    p1("a"), p0("8>"),
    p1("a"), p0("9>"),
    p1("a"), p0(">>"),

    p0("alias"), p1("a"), p0("="), p1("b"),
    p0("function"), p1("f"), p0("{}"),
    p1("f"), p0("(){}")
  )
}
