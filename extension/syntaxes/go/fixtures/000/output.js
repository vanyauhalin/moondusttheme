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
    c0("/* c */"),
    c0("// c"),

    p0("import ("), p1("f"), s0('"'), s1("f"), s0('"'), p0(")"),

    p1("nil"),

    s0("'"), s1("⌘"), s0("'"),
    s0('"'), s1("s"), p0("%p"), s0('"'),
    s0("`"), s1("s"), s0("`"),

    p1("0b0"),
    p1("0"), p0("."), p1("0i"),
    p1("0e0"),
    p1("0x0"),
    p1("0o0"),
    p1("1"), p0("_"), p1("000"),

    p0("*&"), p1("a"),
    p0("&"),
    p0("+-*/"),
    p0(":= ="),
    p0("<-"),
    p0("<> =="),
    p0("--"),
    p0("..."),
    p0("++"),
    p0("&&||"),

    p0(":,.;"),
    p0("[](){}"),

    p0("package"), p1("p"),
    p0("const"), p1("a"),
    p0("chan"), p1("A"),
    p0("for {}"),
    p0("func"), p1("a"), p0("("), p1("a"), p0("int)"),
    p0("map["), p1("A"), p0("]"),
    p0("type"), p1("A"), p0("struct {}"),
    p0("type"), p1("A"), p0("interface {}"),
    p0("var"), p1("a"), p0("*"), p1("A"),

    p0("bool"),
    p0("byte"),
    p0("error"),
    p0("int"),
    p0("rune"),
    p0("string"),
    p0("uintptr"),

    p1("panic"), p0("()"),
    p1("fn"), p0("()"),
    p1("x"), p0(":")
  )
}
