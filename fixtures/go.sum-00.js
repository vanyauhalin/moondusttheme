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
  const p1 = w(c.plain[1])
  const s1 = w(c.string[1])

  return r(
    p1("a"), s1("v0.0.0"), p1("b")
  )
}
