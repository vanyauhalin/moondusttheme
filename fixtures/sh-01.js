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
  const p0 = w(c.plain[0])
  const p1 = w(c.plain[1])
  const s0 = w(c.string[0])
  const s1 = w(c.string[1])

  return r(
    s0('"'), s1("s"), p0("$("), p1("fn"), p0(")"), s0('"'),
    p1("echo"), s0('"'), s1("s"), p0("$("), p1("fn"), p0(")"), s0('"')
  )
}
