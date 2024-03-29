/**
 * @typedef {Object} TokenColor
 * @property {string[]} scope
 * @property {ColorSettings} settings
 */

/**
 * @typedef {Object} ColorSettings
 * @property {string} foreground
 */

/**
 * @param {Record<string, string>} o
 * @returns {TokenColor[]}
 */
export function toTokenColors(o) {
  /** @type {Partial<Record<string, TokenColor>>} */
  const t = {}
  Object.entries(o).forEach(([s, c]) => {
    let tc = t[c]
    if (tc === undefined) {
      tc = tokenColor()
      tc.settings.foreground = c
      t[c] = tc
    }
    tc.scope.push(s)
  })
  // @ts-ignore
  return Object.values(t)
}

/**
 * @returns {TokenColor}
 */
function tokenColor() {
  return {
    scope: [],
    settings: {
      foreground: ""
    }
  }
}

/**
 * @param {Record<string, string>} c
 * @param {string} from
 * @param {string} to
 * @returns {Record<string, string>}
 */
export function port(c, from, to) {
  /** @type {Record<string, string>} */
  const t = {}
  Object.entries(c).forEach(([s, c]) => {
    const r = new RegExp(`(${from})(\\s+|$)`, "g")
    const p = s.replace(r, `${to}$2`)
    t[p] = c
  })
  return t
}
