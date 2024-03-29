/**
 * @param {string} u
 * @returns {Promise<any>}
 */
export async function fetchGrammar(u) {
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

/**
 * @param {string} u
 * @returns {Promise<string>}
 */
export async function fetchExample(u) {
  const r = await fetchRaw(u)
  return await r.text()
}

/**
 * @param {string} u
 * @returns {Promise<Response>}
 */
export function fetchRaw(u) {
  u = u.replace("/blob/", "/raw/")
  return fetch(u, {redirect: "follow"})
}
