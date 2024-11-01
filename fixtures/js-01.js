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
  const p0 = w(c.plain[0])
  const p1 = w(c.plain[1])

  return r(
    p1("a"), p0("= {"),
      p1("a"), p0("() {"),
        p0("const"), p1("b"), p0("="), p1("c"),
        p0("let"), p1("c"), p0("="), p1("b"),
      p0("}"),
    p0("}")
  )
}
