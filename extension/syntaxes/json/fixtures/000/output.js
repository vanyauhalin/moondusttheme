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
    p0("{"),
      c0("// c"),
      p0('"'), p1("s"), p0('":'), s0('"'), s1("v"), s0('"'), p0(","),
      p0('"'), p1("a"), p0('": ['), s1("1"), p0(","), s1("2"), p0("],"),
      p0('"'), p1("o"), p0('": {'),
        p0('"'), p1("b"), p0('":'), s1("true"), p0(","),
        p0('"'), p1("n"), p0('":'), s1("null"),
      p0("}"),
    p0("}"),
  )
}
