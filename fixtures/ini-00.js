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
    c0("# c"),
    c0("; c"),
    p0("["), p1("t"), p0("]"),
    p1("k"), p0("="), s1("v"),
    p1("s"), p0("="), s0('"'), s1("v"), s0('"')
  )
}
