/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../../../../colors/themes.js").Syntax} Syntax
 */

import {r, w} from "../../../../../shared/test.js"

/**
 * @param {Syntax} s
 * @returns {Root}
 */
export function fn(s) {
  const c0 = w(s.comment[0])
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])
  const s0 = w(s.string[0])
  const s1 = w(s.string[1])

  return r(
    c0("# c"),
    c0("; c"),
    p0("["), p1("t"), p0("]"),
    p1("k"), p0("="), s1("v"),
    p1("s"), p0("="), s0('"'), s1("v"), s0('"')
  )
}
