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

/**
 * @param {Syntax} s
 * @returns {Promise<string>}
 */
export async function fetchExample(s) {
  const r = await fetchRaw(s.example.source.url)
  return await r.text()
}

/**
 * @param {Syntax} s
 * @returns {Promise<any>}
 */
export async function fetchGrammars(s) {
  /** @type {Promise<any>[]} */
  const a = []
  for (const g of s.grammars) {
    const p = inner(g)
    a.push(p)
  }
  return await Promise.all(a)

  /**
   * @param {string} u
   * @returns {Promise<any>}
   */
  async function inner(u) {
    const r = await fetchRaw(u)

    const g = await r.json()
    if (g === undefined) {
      return
    }

    /** @type {string | undefined} */
    let scopeName = g.scopeName
    if (scopeName === undefined) {
      return
    }

    g.name = scopeName

    return g
  }
}

/**
 * @param {string} u
 * @returns {Promise<Response>}
 */
async function fetchRaw(u) {
  u = u.replace("/blob/", "/raw/")
  return await fetch(u, {redirect: "follow"})
}
