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
    c0("/* c */"),

    p0('@import "'), p1("s"), p0('";'),
    p0("@import '"), p1("s"), p0("';"),

    p0("@annotation {}"),
    p0("@body {}"),
    p0("@character-variant {}"),
    p0("@charset {}"),
    p0("@counter-style {}"),
    p0("@css {}"),
    p0("@document {}"),
    p0("@font-face {}"),
    p0("@font-feature-values {}"),
    p0("@keyframes {}"),
    p0("@media {}"),
    p0("@namespace {}"),
    p0("@ornaments {}"),
    p0("@page {}"),
    p0("@styleset {}"),
    p0("@stylistic {}"),
    p0("@supports {}"),
    p0("@swash {}"),
    p0("@viewport {}"),

    p0("@media and not only (>=) {}"),
    p0("@supports ("), p1("display"), p0(":"), s1("flex"), p0(") {}"),
    p0("@document"), p1("url"), p0("("), s1("s"), p0(") {}"),
    p0("@document"), p1("url"), p0("("), s0("'"), s1("s"), s0("'"), p0(") {}"),
    p0("@document"), p1("url"), p0("("), s0('"'), s1("s"), s0('"'), p0(") {}"),

    p1("*"), p0("~"), p1("b"), p0("#"), p1("c"), p0("."), p1("c"),
    p0(":"), p1("root"), p0("::"), p1("before"),
    p0("["), p1("a"), p0("="), s1("s"), p0("]"),
    p0("["), p1("a"), p0("="), s0('"'), s1("s"), s0('"'), p0("]"),
    p0("["), p1("a"), p0("="), s0("'"), s1("s"), s0("'"), p0("]"),
    p0(":"), p1("has"), p0("() {"),
      p1("--v"), p0(":"), s1("var(--v, none)"), p0(";"),
      p1("-moz-any"), p0(":"), s1("red"), p0(";"),
      p1("color"), p0(":"), s1('"red"'), p0(";"),
      p1("color"), p0(":"), s1("#c0ffee"), p0(";"),
      p1("color"), p0(":"), s1("calc(1px + 2%)"), p0(";"),
      p1("color"), p0(":"), s1("linear-gradient(to red)"), p0(";"),
      p1("color"), p0(": !important;"),
    p0("}")
  )
}
