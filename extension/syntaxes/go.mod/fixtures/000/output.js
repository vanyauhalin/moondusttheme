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
  const s1 = w(s.string[1])

  return r(
    c0("// c"),
    p0("module"), p1("m"),
    p0("go"), p1("1"),
    p0("require"), p1("("),
    p1("m"), s1("v0.0.0"),
    p0('"'), p1("m"), p0('%p"'), s1("v0.0.0"),
    p1(")"),
    p0("replace"), p1("m"), p0("=>"), p1("m"),
    p0("exclude"), p1("m"), s1("v0.0.0")
  )
}
