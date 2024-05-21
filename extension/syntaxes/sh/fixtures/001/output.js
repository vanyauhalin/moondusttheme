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
  const s0 = w(s.string[0])
  const s1 = w(s.string[1])

  return r(
    s0('"'), s1("s"), p0("$("), p1("fn"), p0(")"), s0('"'),
    p1("echo"), s0('"'), s1("s"), p0("$("), p1("fn"), p0(")"), s0('"')
  )
}
