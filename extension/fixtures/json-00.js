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
  const s0 = w(c.string[0])
  const s1 = w(c.string[1])

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
