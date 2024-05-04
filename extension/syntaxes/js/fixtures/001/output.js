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
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])

  return r(
    p1("a"), p0("= {"),
      p1("a"), p0("() {"),
        p0("const"), p1("b"), p0("="), p1("c"),
        p0("let"), p1("c"), p0("="), p1("b"),
      p0("}"),
    p0("}")
  )
}
