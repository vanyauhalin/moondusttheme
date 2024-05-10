/**
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("../extension/colors/themes.js").ColorTheme} ColorTheme
 * @typedef {import("../extension/colors/themes.js").ThemeSyntax} ThemeSyntax
 * @typedef {import("../extension/editor/themes.js").EditorTheme} EditorTheme
 * @typedef {import("../extension/syntaxes/syntax.js").Syntax} Syntax
 * @typedef {import("../extension/syntaxes/syntax.js").ExampleAuthor} ExampleAuthor
 * @typedef {import("../extension/syntaxes/syntax.js").ExampleSource} ExampleSource
 */

import {mkdir, rm, writeFile} from "node:fs/promises"
import {existsSync} from "node:fs"
import {join} from "node:path"
import {URL, fileURLToPath} from "node:url"
import {transformerRenderWhitespace} from "@shikijs/transformers"
import {minify} from "html-minifier-terser"
import {transform} from "lightningcss"
import {getHighlighter} from "shiki"
import {dark, light} from "../extension/main.js"
import {readExample, readGrammars, vendorDir} from "../vendor/main.js"
import pack from "../package.json" with {type: "json"}

/**
 * @returns {Promise<void>}
 */
export async function build() {
  const vd = vendorDir()

  const [lt, ect, _, as] = light()
  const [dt] = dark()
  const g = await grammars(as)
  const h = await getHighlighter({langs: g, themes: [lt]})

  const rd = rootDir()
  const dd = distDir(rd)
  if (existsSync(dd)) {
    await rm(dd, {recursive: true})
  }
  await mkdir(dd)

  /** @type {Promise<void>[]} */
  const a = []
  for (const s of as) {
    const p = write(s)
    a.push(p)
  }
  await Promise.all(a)

  /**
   * @param {Syntax[]} as
   * @returns {Promise<any[]>}
   */
  async function grammars(as) {
    /** @type {Promise<any>[]} */
    const a = []
    for (const s of as) {
      const p = readGrammars(vd, s.grammars)
      a.push(p)
    }
    return await Promise.all(a)
  }

  /**
   * @param {Syntax} s
   * @param {string} c
   * @returns {Promise<string>}
   */
  async function render(s, c) {
    const ctx = context()
    ctx.title = s.title
    ctx.syntax = s.name
    ctx.author = s.example.author
    ctx.source = s.example.source

    const r = transform({
      filename: "",
      code: Buffer.from(baseStyles() + themeStyles(lt, ect)),
      minify: true
    })
    ctx.styles = r.code.toString()

    ctx.html = h.codeToHtml(c, {
      lang: s.scope,
      theme: lt.name,
      transformers: [
        transformerRenderWhitespace(),
        transformer(ect.syntax)
      ]
    })

    let t = template(ctx)
    t = await minify(t, {
      collapseWhitespace: true,
      decodeEntities: true,
      removeAttributeQuotes: true,
      sortAttributes: true
    })

    return t
  }

  /**
   * @param {Syntax} s
   * @returns {Promise<void>}
   */
  async function write(s) {
    const d = join(dd, s.name)
    if (!existsSync(d)) {
      await mkdir(d)
    }
    const e = await readExample(vd, s.example)
    const c = await render(s, e)
    const f = join(d, "index.html")
    await writeFile(f, c)
  }
}

/**
 * @returns {string}
 */
function rootDir() {
  const u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}

/**
 * @param {string} d
 * @returns {string}
 */
function distDir(d) {
  return join(d, "dist")
}

/**
 * @param {ThemeSyntax} cs
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
    /** @type {ElementContent[]} */
    const a = []
    for (const ec of e.children) {
      if (ec.type === "element") {
        const e = line(ec)
        a.push(...e.children)
        continue
      }
      a.push(ec)
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
    if ("class" in e.properties && e.properties.class === "line") {
      /** @type {ElementContent[]} */
      const a = []
      for (const ec of e.children) {
        if (ec.type === "element") {
          const e = color(ec)
          a.push(e)
          continue
        }
        a.push(ec)
      }
      e.children = a
    }
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function color(e) {
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

/**
 * @returns {string}
 */
function baseStyles() {
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

/**
 * @param {EditorTheme} et
 * @param {ColorTheme} ct
 * @returns {string}
 */
function themeStyles(et, ct) {
  return css`
    :root {
      --bg: ${et.colors["editor.background"] || "transparent"};
      --fg: ${et.colors["editor.foreground"] || "transparent"};
      --wg: ${et.colors["editorWhitespace.foreground"] || "transparent"};
      --c0: ${ct.syntax.comment[0]};
      --p0: ${ct.syntax.plain[0]};
      --p1: ${ct.syntax.plain[1]};
      --s0: ${ct.syntax.string[0]};
      --s1: ${ct.syntax.string[1]};
    }
  `
}

/**
 * @typedef {Object} Context
 * @property {string} title
 * @property {string} syntax
 * @property {string} styles
 * @property {string} html
 * @property {ExampleAuthor} author
 * @property {ExampleSource} source
 */

/**
 * @returns {Context}
 */
function context() {
  return {
    title: "",
    syntax: "",
    styles: "",
    html: "",
    author: {
      name: "",
      url: ""
    },
    source: {
      name: "",
      url: ""
    }
  }
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
