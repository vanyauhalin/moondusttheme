/**
 * @import {Element, ElementContent, Root} from "hast"
 * @import {ShikiTransformer} from "shiki"
 * @import {S5} from "./shared.js"
 * @import {SyntaxTheme} from "./syntax.js"
 */

import {readFile, readdir} from "node:fs/promises"
import * as path from "node:path"
import {h} from "hastscript"
import {createHighlighter} from "shiki"
import {is} from "uvu/assert"
import {test} from "uvu"
import * as grammar from "./grammar.js"
import * as theme from "./main.js"

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function run(ta) {
  let ga = await grammar.list()
  let ah = [theme.light(), theme.dark()]
  let ac = configs()
  let at = await setup(ac)

  let hp = {langs: ga, themes: structuredClone(ah)}
  let ht = await createHighlighter(hp)

  for (let th of ah) {
    let st = restore(th)

    for (let [id, s, n, a, e] of at) {
      if (ta.length !== 0 && !ta.includes(id)) {
        continue
      }

      let t = test

      if (!e) {
        // @ts-ignore
        t = t.skip
      }

      t(`${id} #${n} (${th.name})`, async () => {
        let ac = await readFile(a, "utf8")
        let ap = {lang: s, theme: th.name, transformers: [transformer()]}
        let ar = ht.codeToHast(ac, ap)
        let as = simplify(st, ar)

        let ec = await readFile(e, "utf8")
        let er = evaluate(st, ec)
        let es = simplify(st, er)

        is(as, es)
      })
    }
  }

  test.run()
}

/**
 * @typedef {Object} TestConfig
 * @property {string} id
 * @property {string} [extends]
 * @property {string} scope
 */

/**
 * @returns {TestConfig[]}
 */
function configs() {
  return [
    {
      id: "c",
      scope: "source.c",
    },
    {
      id: "css",
      scope: "source.css"
    },
    {
      id: "dockerfile",
      scope: "source.dockerfile",
    },
    {
      id: "fish",
      scope: "source.fish",
    },
    {
      id: "go",
      scope: "source.go",
    },
    {
      id: "go.mod",
      scope: "go.mod",
    },
    {
      id: "go.sum",
      scope: "go.sum",
    },
    {
      id: "html",
      scope: "text.html.basic",
    },
    {
      id: "ini",
      scope: "source.ini",
    },
    {
      id: "js",
      scope: "source.js",
    },
    {
      id: "json",
      scope: "source.json",
    },
    {
      id: "jsonc",
      extends: "json",
      scope: "source.json.comments",
    },
    {
      id: "jsonl",
      extends: "json",
      scope: "source.json.lines",
    },
    {
      id: "jsx",
      extends: "js",
      scope: "source.js.jsx",
    },
    {
      id: "makefile",
      scope: "source.makefile",
    },
    {
      id: "py",
      scope: "source.python",
    },
    {
      id: "rb",
      scope: "source.ruby",
    },
    {
      id: "rs",
      scope: "source.rust",
    },
    {
      id: "sh",
      scope: "source.shell",
    },
    {
      id: "sql",
      scope: "source.sql",
    },
    {
      id: "swift",
      scope: "source.swift",
    },
    {
      id: "toml",
      scope: "source.toml",
    },
    {
      id: "ts",
      extends: "js",
      scope: "source.ts",
    },
    {
      id: "tsx",
      extends: "jsx",
      scope: "source.tsx",
    },
    {
      id: "yaml",
      scope: "source.yaml",
    },
  ]
}

/**
 * @param {theme.Theme} th
 * @returns {SyntaxTheme}
 */
function restore(th) {
  /** @type {SyntaxTheme} */
  let st = {
    comment: [""],
    plain: ["", ""],
    string: ["", ""],
  }

  for (let tc of th.tokenColors) {
    let c0 = ""
    let p0 = ""
    let p1 = ""
    let s0 = ""
    let s1 = ""

    for (let s of tc.scope) {
      if (s === "comment.block.js") {
        c0 = tc.settings.foreground
        continue
      }

      if (s === "keyword.control.js") {
        p0 = tc.settings.foreground
        continue
      }

      if (s === "source.js") {
        p1 = tc.settings.foreground
        continue
      }

      if (s === "punctuation.definition.string.begin.js") {
        s0 = tc.settings.foreground
        continue
      }

      if (s === "string.quoted.double.js") {
        s1 = tc.settings.foreground
        continue
      }
    }

    if (c0) {
      st.comment[0] = c0
    }

    if (p0) {
      st.plain[0] = p0
    }

    if (p1) {
      st.plain[1] = p1
    }

    if (s0) {
      st.string[0] = s0
    }

    if (s1) {
      st.string[1] = s1
    }

    if (c0 && p0 && p1 && s0 && s1) {
      break
    }
  }

  let c0 = st.comment[0]
  let p0 = st.plain[0]
  let p1 = st.plain[1]
  let s0 = st.string[0]
  let s1 = st.string[1]

  if (!c0 || !p0 || !p1 || !s0 || !s1) {
    throw new Error("Could not restore the syntax theme")
  }

  return st
}

/**
 * @param {TestConfig[]} ac
 * @returns {Promise<S5[]>}
 */
async function setup(ac) {
  /** @type {Record<string, Record<string, [string, string]>>} */
  let t = {}

  let d = "fixtures"

  for (let f of await readdir(d)) {
    let m = f.match(/(\S+)-(\d\d)(\.js)?/)
    if (!m) {
      throw new Error("Unknown fixture file name format")
    }

    let [_, id, n, o] = m

    let r = t[id]
    if (!r) {
      r = {}
      t[id] = r
    }

    let c = r[n]
    if (!c) {
      c = ["", ""]
      r[n] = c
    }

    let i = 0
    if (o) {
      i = 1
    }

    c[i] = path.join(d, f)
  }

  for (let c of ac) {
    let id = c.id

    if (c.extends) {
      let r = c

      while (r.extends) {
        for (let c of ac) {
          if (c.id === r.extends) {
            r = c
            break
          }
        }
      }

      id = r.id
    }

    let x = t[id]

    if (!x) {
      throw new Error(`No fixtures for '${c.id}'`)
    }

    let y = t[c.id]

    if (!y) {
      t[c.id] = x
    }
  }

  /** @type {S5[]} */
  let r = []

  for (let [id, o] of Object.entries(t)) {
    let s = ""

    for (let c of ac) {
      if (c.id === id) {
        s = c.scope
        break
      }
    }

    if (!s) {
      throw new Error(`No scope for '${id}'`)
    }

    for (let [n, [a, e]] of Object.entries(o)) {
      r.push([id, s, n, a, e])
    }
  }

  r = r.sort(([a], [b]) => a.localeCompare(b))

  return r
}

/**
 * @returns {ShikiTransformer}
 */
function transformer() {
  return {root}

  /**
   * @param {Root} r
   * @returns {Root}
   */
  function root(r) {
    // <></>
    let [rc] = r.children
    if (rc.type !== "element") {
      return r
    }
    let p = pre(rc)
    r.children = p.children
    return r
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function pre(e) {
    // <pre></pre>
    let [ec] = e.children
    if (ec.type !== "element") {
      return e
    }
    let c = code(ec)
    e.children = c.children
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function code(e) {
    // <code></code>
    /** @type {ElementContent[]} */
    let a = []
    for (let ec of e.children) {
      if (ec.type !== "element") {
        continue
      }
      let e = line(ec)
      a.push(...e.children)
      continue
    }
    e.children = a
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function line(e) {
    // <span class="line"></span>
    if (e.properties.class !== "line") {
      return e
    }

    /** @type {Element[]} */
    let a = []

    let j = 0

    for (let i = 0; i < e.children.length; i += 1) {
      let ec = e.children[i]
      if (ec.type !== "element") {
        continue
      }

      let [c] = ec.children
      if (c.type !== "text") {
        continue
      }

      j = i
      a.push(ec)
      break
    }

    for (let i = j + 1; i < e.children.length; i += 1) {
      let y = e.children[i]
      if (y.type !== "element") {
        continue
      }

      let [d] = y.children
      if (d.type !== "text") {
        continue
      }

      let x = a[a.length - 1]
      if (x.properties.style !== y.properties.style) {
        a.push(y)
        continue
      }

      let [c] = x.children
      if (c.type !== "text") {
        continue
      }

      c.value += d.value
    }

    for (let e of a) {
      let [ec] = e.children
      if (ec.type !== "text") {
        continue
      }
      ec.value = ec.value.trim()
    }

    e.children = a

    return e
  }
}

/**
 * @param {SyntaxTheme} st
 * @param {string} c
 * @returns {Root}
 */
function evaluate(st, c) {
  let r = h(null)

  let c0 = w.bind(undefined, st.comment[0])
  let p0 = w.bind(undefined, st.plain[0])
  let p1 = w.bind(undefined, st.plain[1])
  let s0 = w.bind(undefined, st.string[0])
  let s1 = w.bind(undefined, st.string[1])

  let f = new Function("c0", "p0", "p1", "s0", "s1", c)
  f(c0, p0, p1, s0, s1)

  return r

  /**
   * @param {string} c
   * @param {string} t
   * @returns {void}
   */
  function w(c, t) {
    let e = h("span", {style: `color:${c}`}, t)
    r.children.push(e)
  }
}

/**
 * @param {SyntaxTheme} st
 * @param {Root} r
 * @returns {string}
 */
function simplify(st, r) {
  /** @type {string} */
  let t = ""

  /** @type {Record<string, string>} */
  let m = {
    [st.comment[0]]: "c0",
    [st.plain[0]]: "p0",
    [st.plain[1]]: "p1",
    [st.string[0]]: "s0",
    [st.string[1]]: "s1",
  }

  for (let e of r.children) {
    if (e.type !== "element") {
      throw new Error("Each child should be an element")
    }

    let [c] = e.children

    if (!c || c.type !== "text") {
      throw new Error("Each element should have a text child")
    }

    let s = String(e.properties.style)
    s = s.replace("color:", "")
    s = m[s]

    if (!s) {
      throw new Error(`Unknown color: ${s}`)
    }

    t += `${s}: ${c.value}\n`
  }

  t = t.slice(0, -1)

  return t
}
