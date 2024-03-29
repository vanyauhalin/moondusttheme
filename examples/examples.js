/**
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").Root} Root
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("../extension/colors/themes.js").Syntax} ColorSyntax
 * @typedef {import("../shared/meta.js").Author} Author
 * @typedef {import("../shared/meta.js").Source} Source
 */

import {mkdir, writeFile} from "node:fs/promises"
import {existsSync} from "node:fs"
import {join} from "node:path"
import {transformerRenderWhitespace} from "@shikijs/transformers"
import htmlMinifier from "html-minifier-terser"
import * as lightningcss from "lightningcss"
import {getHighlighter} from "shiki"
import * as colorThemes from "../extension/colors/themes.js"
import * as syntaxes from "../extension/syntaxes/syntaxes.js"
import * as editorThemes from "../extension/themes.js"
import {fetchExample, fetchGrammar} from "../shared/utils.js"
import pack from "../package.json" with {type: "json"}

/**
 * @typedef {Object} Context
 * @property {string} title
 * @property {string} syntax
 * @property {string} styles
 * @property {string} html
 * @property {Author} author
 * @property {Source} source
 */

/**
 * @param {string} to
 * @returns {Promise<void>}
 */
export async function build(to) {
  const all = Object.values(syntaxes)

  /** @type {any[]} */
  const langs = []
  await Promise.all(all.map(async (s) => {
    const m = s.meta()
    const g = await Promise.all(m.grammars.map(fetchGrammar))
    langs.push(...g)
  }))

  /** @type {any[]} */
  const themes = []
  themes[0] = editorThemes.light()
  themes[0].name = "light"

  const h = await getHighlighter({langs, themes})

  await Promise.all(all.map(async (s) => {
    const m = s.meta()
    if (m.example === undefined) {
      return
    }

    const d = join(to, m.name)
    if (!existsSync(d)) {
      await mkdir(d)
    }

    const e = await fetchExample(m.example.source.url)

    let t = template({
      title: m.title,
      syntax: m.name,
      styles: lightningcss
        .transform({
          filename: "",
          code: Buffer.from(mainStyles() + themeStyles()),
          minify: true
        })
        .code
        .toString(),
      html: h.codeToHtml(e, {
        lang: m.scope,
        theme: "light",
        transformers: [
          transformerRenderWhitespace(),
          transformer(colorThemes.light.syntax)
        ]
      }),
      author: m.example.author,
      source: m.example.source
    })
    t = await htmlMinifier.minify(t, {
      collapseWhitespace: true,
      decodeEntities: true,
      removeAttributeQuotes: true,
      sortAttributes: true
    })

    const f = join(d, "index.html")
    await writeFile(f, t)
  }))
}

/**
 * @param {ColorSyntax} cs
 * @returns {ShikiTransformer}
 */
function transformer(cs) {
  return {root}

  /**
   * @param {Root} r
   * @returns {Root}
   */
  function root(r) {
    // <></>
    const e = r.children[0]
    if (e.type === "element") {
      r.children[0] = pre(e)
    }
    return r
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function pre(e) {
    // <pre></pre>
    const c = e.children[0]
    if (c.type === "element") {
      e.children[0] = code(c)
    }
    delete e.properties.class
    delete e.properties.style
    delete e.properties.tabindex
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function code(e) {
    // <code></code>
    e.children = e.children.flatMap((c) => {
      if (c.type === "element" && c.properties.class === "line") {
        return c.children.map((c) => {
          if (c.type === "element") {
            return span(c)
          }
          return c
        })
      }
      return c
    })
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function span(e) {
    // <span style="color:#"></span>
    if ("style" in e.properties) {
      const s = String(e.properties.style)
      delete e.properties.style
      e.properties.class = cls(s)
    }
    return e
  }

  /**
   * @param {string} s
   * @returns {string}
   */
  function cls(s) {
    s = s.replace("color:", "")
    switch (s) {
    case cs.comment[0]:
      return "c0"
    case cs.plain[0]:
      return "p0"
    case cs.plain[1]:
      return "p1"
    case cs.string[0]:
      return "s0"
    case cs.string[1]:
      return "s1"
    default:
      throw new Error(`Unknown color: ${s}`)
    }
  }
}

/**
 * @param {Context} ctx
 * @returns {string}
 */
function template(ctx) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${ctx.title} Syntax | ${pack.displayName}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="view-transition" content="same-origin">
        <meta name="author" content="${pack.author.name} <${pack.author.email}> (${pack.author.url})">
        <meta name="description" content="Demonstration of how the Moondust Theme highlights ${ctx.title} syntax">
        <meta name="generator" content="JavaScript Template Strings">
        <meta name="keywords" content="${[...pack.keywords, ctx.syntax].join(", ")}">
        <link rel="author" href="mailto:${pack.author.email}">
        <link rel="me" href="mailto:${pack.author.email}">
        <link rel="license" href="${pack.license.url}">
        <style>${ctx.styles}</style>
      </head>
      <body>
        <figure>
          ${ctx.html}
          <figcaption>
            <p><a href="${pack.homepage}">Star ${pack.displayName} on GitHub</a></p>
            <p>${ctx.title} syntax of <a href="${ctx.source.url}">${ctx.source.name}</a>, by <a href="${ctx.author.url}">${ctx.author.name}</a></p>
          </figcaption>
        </figure>
      </body>
    </html>
  `
}

function mainStyles() {
  return css`
    html {
      background-color: var(--bg);
      color: var(--fg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 18px;
      line-height: 1.5;
    }

    body {
      font-size: .9em;
      margin: 0;
      min-height: 100vh;
    }

    figure {
      box-sizing: border-box;
      display: grid;
      grid-template-rows: 1fr min-content;
      height: 100%;
      margin: 0;
    }

    figcaption {
      background-color: var(--bg);
      bottom: 0;
      padding: 1.6rem 4rem;
      position: sticky;
      text-align: end;
    }

    pre {
      margin-bottom: 0;
      margin-top: 0;
      overflow: scroll;
      padding: 2rem 4rem;
    }

    p {
      margin-bottom: 0;
      margin-top: 0;
    }

    a {
      color: inherit;
    }

    .space {
      color: var(--wg);
      position: relative;
    }

    .space::before {
      content: "·";
      position: absolute;
    }

    .tab {
      color: var(--wg);
      position: relative;
      tab-size: 2;
    }

    .tab::before {
      content: "⇥";
      position: absolute;
    }

    .c0 {
      color: var(--c0);
    }

    .p0 {
      color: var(--p0);
    }

    .p1 {
      color: var(--p1);
    }

    .s0 {
      color: var(--s0);
    }

    .s1 {
      color: var(--s1);
    }
  `
}

function themeStyles() {
  return css`
    :root {
      --bg: ${editorThemes.light().colors["editor.background"] || "transparent"};
      --fg: ${editorThemes.light().colors["editor.foreground"] || "transparent"};
      --wg: ${editorThemes.light().colors["editorWhitespace.foreground"] || "transparent"};
      --c0: ${colorThemes.light.syntax.comment[0]};
      --p0: ${colorThemes.light.syntax.plain[0]};
      --p1: ${colorThemes.light.syntax.plain[1]};
      --s0: ${colorThemes.light.syntax.string[0]};
      --s1: ${colorThemes.light.syntax.string[1]};
    }
  `
}

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
function html(strings, ...values) {
  return h(strings, ...values)
}

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
function css(strings, ...values) {
  return h(strings, ...values)
}

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
function h(strings, ...values) {
  let s = ""
  strings.forEach((string, i) => {
    s += string
    const v = values[i]
    if (v === undefined) {
      return
    }
    s += String(v)
  })
  return s
}
