// todo: refactor it, cache the fetch result, simplify the comparison.

/**
 * @typedef {import("node:fs").Dirent} Dirent
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("hastscript").Child} Child
 * @typedef {import("uvu").Test} Test
 * @typedef {import("../extension/syntaxes/syntaxes.js").Syntax} Syntax
 */

import {readFile, readdir} from "node:fs/promises"
import {existsSync} from "node:fs"
import {join} from "node:path"
import {URL, fileURLToPath} from "node:url"
import {h} from "hastscript"
import {getHighlighter} from "shiki"
import {equal} from "uvu/assert"
import {test} from "uvu"
import {light} from "../extension/colors/themes.js"
import {toTokenColors} from "../extension/utils.js"
import {fetchGrammar} from "./meta.js"

/**
 * @param {...Child} children
 * @returns {Root}
 */
export function r(...children) {
  return h(null, ...children)
}

/**
 * @param {string} c
 * @returns {(t: string) => Element}
 */
export function w(c) {
  /**
   * @param {string} t
   * @returns {Element}
   */
  return function (t) {
    return h("span", {style: `color:${c}`}, t)
  }
}

/**
 * @param {Syntax} s
 * @param {string} u
 * @returns {Promise<void>}
 */
export async function t(s, u) {
  await populate(test, u)
  test.run()
  return

  /**
   * @param {Test} t
   * @param {string} u
   * @returns {Promise<void>}
   */
  async function populate(t, u) {
    const m = s.meta()
    const h = await getHighlighter({
      langs: await Promise.all(m.grammars.map(fetchGrammar)),
      themes: themes()
    })

    const f = await fixtures(u)
    await Promise.all(f.map(async ([p, i, o]) => {
      let c = t
      if (i === "" || o === "") {
        c = t.skip
      }

      c(`renders #${p} with the light syntax`, async () => {
        const c = await readFile(i, "utf8")
        const a = h.codeToHast(c, {
          lang: m.scope,
          theme: "light"
        })
        simplify(a)
        const {fn} = await import(o)
        const e = fn(light.syntax)
        equal(a, e)
      })
    }))
  }

  /**
   * @returns {any[]}
   */
  function themes() {
    const t = []

    // let r = tokenColors(light.dark)
    // let c = toTokenColors(r)
    // t.push({
    //   name: "dark",
    //   tokenColors: c
    // })

    const r = s.tokenColors(light.syntax)
    const c = toTokenColors(r)
    t.push({
      name: "light",
      tokenColors: c
    })

    return t
  }

  /**
   * @param {string} u
   * @returns {Promise<[string, string, string][]>}
   */
  async function fixtures(u) {
    const d = dir(u)
    if (!existsSync(d)) {
      return []
    }
    const c = await collect(d)
    return Object
      .entries(c)
      .map(([n, o]) => {
        // @ts-ignore
        return [n, o[0], o[1]]
      })
  }

  /**
   * @param {string} u
   * @returns {string}
   */
  function dir(u) {
    const s = new URL(".", u)
    const r = fileURLToPath(s)
    return join(r, "fixtures")
  }

  /**
   * @param {string} d
   * @returns {Promise<Partial<Record<string, [string, string]>>>}
   */
  async function collect(d) {
    const l = await readdir(d, {withFileTypes: true})

    /** @type {Partial<Record<string, [string, string]>>} */
    const c = {}

    for (const a of l) {
      if (!a.isDirectory()) {
        continue
      }

      const d = join(a.path, a.name)
      const l = await readdir(d, {withFileTypes: true})

      for (const b of l) {
        if (!b.isFile()) {
          continue
        }

        let e = c[a.name]
        if (e === undefined) {
          e = ["", ""]
          c[a.name] = e
        }

        let i = 0
        if (b.name === "output.js") {
          i = 1
        }
        e[i] = join(b.path, b.name)
      }
    }

    return c
  }

  /**
   * @param {Root} r
   * @returns {void}
   */
  function simplify(r) {
    // <pre></pre>
    let e = r.children[0]
    if ("children" in e) {
      // <code></code>
      e = e.children[0]
      if ("children" in e) {
        r.children = e.children
          .flatMap((e) => {
            if ("properties" in e) {
              // <span class="line"></span>
              if (e.properties.class === "line") {
                /** @type {ElementContent[]} */
                const a = []
                for (let i = 0; i < e.children.length; i += 1) {
                  const c = e.children[i]
                  if (
                    c.type === "element" &&
                    c.children[0] !== undefined &&
                    c.children[0].type === "text"
                  ) {
                    const l = a[a.length - 1]
                    if (
                      l !== undefined &&
                      l.type === "element" &&
                      l.children[0] !== undefined &&
                      l.children[0].type === "text" &&
                      l.properties.style == c.properties.style
                    ) {
                      l.children[0].value += c.children[0].value
                      continue
                    }
                  }
                  a.push(c)
                }
                return a
              }
            }
            return e
          })
          .filter((e) => {
            if (e.type === "text" && e.value === "\n") {
              return
            }
            return e
          })
          .map((e) => {
            if (
              e.type === "element" &&
              e.children[0] !== undefined &&
              e.children[0].type === "text"
            ) {
              e.children[0].value = e.children[0].value.trim()
            }
            return e
          })
      }
    }
  }
}
