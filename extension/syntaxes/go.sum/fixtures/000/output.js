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
  const p1 = w(s.plain[1])
  const s1 = w(s.string[1])

  return r(
    p1("a"), s1("v0.0.0"), p1("b")
  )
}
