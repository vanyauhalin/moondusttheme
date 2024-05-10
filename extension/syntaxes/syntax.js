/**
 * @typedef {import("../colors/themes.js").ThemeSyntax} ThemeSyntax
 */

/**
 * @typedef {Object} Syntax
 * @property {string} title
 * @property {string} name
 * @property {string} scope
 * @property {string[]} grammars
 * @property {MetaExample} example
 * @property {(s: ThemeSyntax) => Record<string, string>} tokenColors
 */

/**
 * @typedef {Object} MetaExample
 * @property {ExampleAuthor} author
 * @property {ExampleSource} source
 */

/**
 * @typedef {Object} ExampleAuthor
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} ExampleSource
 * @property {string} name
 * @property {string} url
 */

/**
 * @param {Record<string, string>} t
 * @param {string} from
 * @param {string} to
 * @returns {Record<string, string>}
 */
export function port(t, from, to) {
  /** @type {Record<string, string>} */
  const r = {}

  for (let [s, c] of Object.entries(t)) {
    const p = new RegExp(`(${from})(\\s+|$)`, "g")
    s = s.replace(p, `${to}$2`)
    r[s] = c
  }

  return r
}
