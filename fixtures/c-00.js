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
    c0("// c"),
    c0("/// c"),
    c0("/* c */"),
    c0("/** c */"),

    p0("+"),
    p0("-"),
    p0("*"),
    p0("/"),
    p0("%"),

    p0("++"),
    p0("--"),

    p0("=="),
    p0("!="),
    p0("<"),
    p0(">"),
    p0("<="),
    p0(">="),

    p0("&&"),
    p0("||"),
    p0("!"),

    p0("&"),
    p0("|"),
    p0("^"),
    p0("~"),
    p0("<<"),
    p0(">>"),

    p0("="),
    p0("+="),
    p0("-="),
    p0("*="),
    p0("/="),
    p0("%="),
    p0("&="),
    p0("|="),
    p0("^="),
    p0("<<="),
    p0(">>="),

    p0("sizeof"),
    p0("&"),
    p0("*"),
    p0("->"),
    p0("?"),
    p0(":"),
    p0(","),
    p0(";"),

    p0("#include <"), p1("s"), p0(">"),
    p0('#include "'), p1("s"), p0('"'),

    p0("#define"), p1("A"), p0("()"), p1("A"), p0("()"),
    p0("#define"), p1("A"), p0("("), p1("a"), p0(")"), p1("A"), p0("("), p1("a"), p0(")"),
    p0("#undef"), p1("A"),

    p0("#if"),
    p0("#ifdef"),
    p0("#ifndef"),
    p0("#elif"),
    p0("#else"),
    p0("#endif"),

    p0("#pragma"),

    p0("int"),
    p0("char"),
    p0("float"),
    p0("double"),
    p0("void"),

    p0("signed int"),
    p0("unsigned int"),
    p0("short int"),
    p0("long int"),
    p0("long long int"),

    p0("const"),
    p0("volatile"),
    p0("restrict"),

    s0('"'), s1("s"), s0('"'),
    s0("'"), s1("s"), s0("'"),

    p1("true"),
    p1("false"),

    p1("0"),
    p1("0b0"),
    p1("0B0"),
    p1("0e0"),
    p1("0E0"),
    p1("0f"),
    p1("0F"),
    p1("0l"),
    p1("0L"),
    p1("0ll"),
    p1("0LL"),
    p1("0u"),
    p1("0U"),
    p1("0ull"),
    p1("0ULL"),
    p1("0x0"),
    p1("0X0"),
    p1("0"), p0("."), p1("0"),

    p0("int"), p1("a"), p0("["), p1("0"), p0("]"),
    p0("int *"), p1("a"),

    p0("typedef struct {"),
      p0("int"), p1("a"),
    p0("}"),

    p0("union {"),
      p0("int"), p1("a"),
    p0("}"),

    p0("enum {"),
      p1("A"),
    p0("}"),

    p0("if {}"),
    p0("else {}"),

    p0("switch () {"),
      p0("case"), p1("0"), p0(": ;"),
      p0("default: ;"),
    p0("}"),

    p0("for {}"),
    p0("while {}"),
    p0("do {} while {}"),

    p0("break"),
    p0("continue"),
    p0("return"),
    p0("goto"),

    p0("int"), p1("a"), p0("(int"), p1("a"), p0(", int *"), p1("argv"), p0("[]) {}"),

    p0("{"),
      p1("a"), p0("."), p1("a"),
      p1("a"), p0("->"), p1("a"), p0("()"),
    p0("}"),

    p1("__asm__"), p0("("), s0('"'), s1("s"), s0('"'), p0(")"),
  )
}
