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
  const s1 = w(c.string[1])

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
