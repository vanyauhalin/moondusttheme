/**
 * @typedef {import("hast").Element} Element
 * @typedef {import("hast").ElementContent} ElementContent
 * @typedef {import("hast").Root} Root
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 * @typedef {import("../extension/main.js").ColorTheme} ColorTheme
 * @typedef {import("../extension/main.js").EditorTheme} EditorTheme
 * @typedef {import("../extension/main.js").Grammar} Grammar
 * @typedef {import("../extension/main.js").Syntax} Syntax
 */

import {transformerRenderWhitespace} from "@shikijs/transformers"
import {createHighlighter} from "shiki"
import {lightPallette, lightTheme, readExample, readGrammar, syntaxes} from "../extension/main.js"
import pack from "../extension/package.json" with {type: "json"}

let ct = lightPallette()
let et = lightTheme()
let hg = await highlighter([et])

/**
 * @returns {any}
 */
export function data() {
  /** @type {string[]} */
  let items = ["home"]
  for (let m of syntaxes()) {
    let s = m()
    items.push(s.id)
  }

  return {
    /**
     * @param {any} d
     * @returns {string}
     */
    permalink(d) {
      let id = d.pagination.items[0]
      if (id === "home") {
        return "/index.html"
      }
      return `/syntaxes/${id}/index.html`
    },

    items,
    pagination: {
      data: "items",
      size: 1,
    },
  }
}

/**
 * @param {any} c
 * @returns {Promise<string>}
 */
export async function render(c) {
  let id = c.pagination.items[0]
  if (id === "home") {
    return page({
      url: c.page.url,
      title: "Moondust Theme",
      description: pack.description,
      generator: c.eleventy.generator,
      css: c.css
    }, await home())
  }

  /** @type {Syntax=} */
  let un
  for (let m of syntaxes()) {
    let s = m()
    if (s.id === id) {
      un = s
      break
    }
  }
  if (!un) {
    throw new Error(`Syntax not found: ${id}`)
  }


  return page({
    url: c.page.url,
    title: `Showcase of ${un.name} syntax highlighting — Moondust Theme`,
    description: pack.description,
    generator: c.eleventy.generator,
    css: c.css
  }, await syntax(un))
}

/**
 * @param {Object} p
 * @param {string} p.css
 * @param {string} p.description
 * @param {string} p.generator
 * @param {string} p.title
 * @param {string} p.url
 * @param {string} c
 * @returns {string}
 */
function page(p, c) {
  return html`<html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${p.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="view-transition" content="same-origin">
      <meta name="description" content="${p.description}">
      <meta name="generator" content="${p.generator}">
      <meta name="theme-color" content="#24292D">
      <meta property="og:type" content="website">
      <meta property="og:title" content="${p.title}">
      <meta property="og:description" content="${p.description}">
      <meta property="og:url" content="https://moodustthe.me/">
      <link rel="icon" href="/favicon.ico" sizes="any">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml">
      <link rel="apple-touch-icon" href="/favicon.png">
      <link rel="canonical" href="https://moodustthe.me${p.url}">
      <link rel="me" href="https://vanyauhalin.me/">
      <link rel="preload" href="/Questrial-Regular.woff2" crossorigin="" as="font" type="font/woff2">
      <style>${p.css}</style>
    </head>
    <body>
      ${c}
    </body>
  </html>`
}

/**
 * @returns {Promise<string>}
 */
async function home() {
  /** @type {Syntax=} */
  let js
  for (let m of syntaxes()) {
    let s = m()
    if (s.id === "js") {
      js = s
      break
    }
  }
  if (!js) {
    throw new Error("JavaScript syntax not found")
  }

  let e = await readExample(js.example.source.file)
  e = e.split("\n").slice(0, 26).join("\n")
  let t = hg.codeToHtml(e, {
    lang: js.vscode.scope,
    theme: et.name,
    transformers: [
      transformerRenderWhitespace({classSpace: "ws", classTab: "wt"}),
      transformer(ct),
    ],
  })

  return html`<div class="home">
    <div class="home__inner">
      ${brand()}
      <div class="home__content">
        ${content(html`
          <p>${pack.description}.</p>
          ${preview({name: js.name, details: "/syntaxes/js/"}, t)}
          <p>Moondust is available on the <a href="https://marketplace.visualstudio.com/items?itemName=vanyauhalin.moondusttheme">VSCode Marketplace</a>, <a href="https://open-vsx.org/extension/vanyauhalin/moondusttheme/">Open VSX Registry</a>, and <a href="https://github.com/vanyauhalin/moondusttheme/releases/">GitHub Releases</a>.</p>
          <nav>
            <h2 id="contents">Contents</h2>
            <a href="#motivation">Motivation</a>
            <a href="#discussions">Discussions</a>
            <a href="#syntax">Syntaxes</a>
            <a href="#acknowledgments">Acknowledgments</a>
          </nav>
          <h2 id="motivation">Motivation</h2>
          <p>Early on in my programming journey, syntax highlighting aided my understanding the coding. However, as I gained more experience, I found myself relying less on it. Eventually, I realized that the abundance of colors was very straining on my eyes and made it difficult to focus and concentrate.</p>
          <p>Moondust is crafted to reduce eye strain, allowing to focus on code. It challenges the conventional approach of highlighting keywords and typical structures. Instead of drawing excessive attention to them, this theme brings business logic to the forefront. Avoiding a vibrant color palette further helps maintain the focus.</p>
          <h2 id="discussions">Discussions</h2>
          <p>For a more in-depth discussion on the issues associated with the current approach to syntax highlighting, recommend reading the articles <a href="https://www.linusakesson.net/programming/syntaxhighlighting/">A case against syntax highlighting</a> and <a href="https://buttondown.email/hillelwayne/archive/syntax-highlighting-is-a-waste-of-an-information/">Syntax highlighting is a waste of an information channel</a>.</p>
          <h2 id="syntaxes">Syntaxes</h2>
          <p>Moondust is tailored for each syntax individually. At present, it supports ${(() => {
            let l = syntaxes()
            let c = ""
            for (let i = 0; i < l.length; i += 1) {
              let s = l[i]()
              c += html`<a href="${`/syntaxes/${s.id}/`}">${s.name}</a>`
              if (i < l.length - 2) {
                c += ", "
              } else if (i === l.length - 2) {
                c += ", and "
              }
            }
            return c
          })()}. For a detailed demonstration of syntax highlighting, feel free to navigate to the respective syntax.</p>
          <h2 id="acknowledgments">Acknowledgments</h2>
          <p>In the <a href="https://github.com/primer/github-vscode-theme/discussions/341/">initial phase</a>, Moondust was primarily a modification of the <a href="https://github.com/primer/github-vscode-theme/">GitHub Theme</a>. I owe a great deal of gratitude to the Primer team for their work.</p>
          <p>A special shout-out goes to the entire community that focuses on creating minimalistic, two-color, monochrome themes, particularly <a href="https://github.com/anotherglitchinthematrix/monochrome/">Monochrome</a>. It was a delight for me to delve into your work, and it is heartening to realize that our aesthetic preferences align closely.</p>
        `)}
      </div>
      <div class="home__postscript">
        <p><a href="https://github.com/vanyauhalin/moondusttheme/">Give a star</a>, <a href="https://github.com/vanyauhalin/moondusttheme/issues/new/">leave a comment</a></p>
        <p>Copyright © 2024 <a href="https://vanyauhalin.me/">Ivan Uhalin</a></p>
      </div>
    </div>
  </div>`
}

/**
 * @param {Syntax} s
 * @returns {Promise<string>}
 */
async function syntax(s) {
  return html`<div class="syntax">
    <div class="syntax__brand">
      ${brand()}
    </div>
    <nav class="syntax__navigation">
      ${(() => {
        let c = ""
        for (let m of syntaxes()) {
          let t = m()
          c += html`<a href="${`/syntaxes/${t.id}/`}" ${(() => {
            if (t.id === s.id) {
              return 'aria-current="page"'
            }
            return ""
          })()}>${t.name}</a>`
        }
        return c
      })()}
    </nav>
    <div class="syntax__preview">
      ${preview({name: s.name}, await example(s))}
    </div>
    <div class="syntax__container">
      <div class="syntax__details">
        <p>Source code of <a href="${s.example.source.file}">${s.example.source.name}</a>, by <a href="${s.example.author.url}">${s.example.author.name}</a></p>
        <p>Is powered by <a href="${s.vscode.url}">${s.vscode.name}</a> for VSCode</p>
      </div>
      <div class="syntax__postscript">
        <p><a href="https://github.com/vanyauhalin/moondusttheme/">Give a star</a>, <a href="https://github.com/vanyauhalin/moondusttheme/issues/new/">leave a comment</a></p>
        <p>Copyright © 2024 <a href="https://vanyauhalin.me/">Ivan Uhalin</a></p>
      </div>
    </div>
  </div>`
}

/**
 * @returns {string}
 */
function brand() {
  return html`<div class="brand">
    <a class="brand__link" href="/">${logo({class: "brand__logo"})}</a>
    <h1 class="brand__name">Moondust</h1>
  </div>`
}

/**
 * @param {Object} p
 * @param {string} p.class
 * @returns {string}
 */
function logo(p) {
  return html`<svg class="${p.class}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" />
    <path fill-rule="evenodd" d="M23.6335 14.9571C22.3164 20.1545 17.6076 24 12.0006 24 6.19946 24 1.35976 19.8835.243164 14.4123c1.520906-.2375 3.059286-.2857 4.384226.0455 1.45612.3641 2.69025.8928 3.85114 1.3901 2.52757 1.0829 4.70807 2.0171 8.07657.7786 3.8808-1.4267 6.252-1.642 7.0784-1.6694Z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M11.971 24.0001c-4.53159-.0105-8.47317-2.5328-10.50616-6.2484 3.3261 1.6484 6.6156 1.8587 12.19736-.844 5.1421-2.4899 8.3589-1.5348 9.6507-.8977-1.6471 4.6472-6.0765 7.9781-11.2855 7.9901h-.0564Z" clip-rule="evenodd" />
  </svg>`
}

/**
 * @param {string} c
 */
function content(c) {
  return html`<div class="content">${c}</div>`
}

/**
 * @param {Object} p
 * @param {string} p.name
 * @param {string=} p.details
 * @param {string} c
 * @returns {string}
 */
function preview(p, c) {
  return html`<div class="preview">
    <div class="preview__sh">${c}</div>
    ${p.details && html`<a class="preview__view" href="${p.details}">View details</a>`}
    <span class="preview__name">${p.name}</span>
  </div>`
}

/**
 * @param {Syntax} s
 * @returns {Promise<string>}
 */
async function example(s) {
  let e = await readExample(s.example.source.file)
  return hg.codeToHtml(e, {
    lang: s.vscode.scope,
    theme: et.name,
    transformers: [
      transformerRenderWhitespace({classSpace: "ws", classTab: "wt"}),
      transformer(ct),
    ],
  })
}

/**
 * @param {EditorTheme[]} et
 * @returns {ReturnType<typeof createHighlighter>}
 */
async function highlighter(et) {
  /** @type {Promise<Grammar>[]} */
  let g = []
  for (let m of syntaxes()) {
    let s = m()
    for (let f of s.vscode.files) {
      let p = readGrammar(f)
      g.push(p)
    }
  }
  await Promise.all(g)
  return await createHighlighter({langs: g, themes: et})
}

/**
 * @param {ColorTheme} cs
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
    let e = r.children[0]
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
    let c = e.children[0]
    if (c.type === "element") {
      e.children[0] = code(c)
    }
    e.properties.class = "sh"
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
    let a = []
    for (let ec of e.children) {
      if (ec.type === "element") {
        let e = line(ec)
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
      let a = []
      for (let ec of e.children) {
        if (ec.type === "element") {
          let e = color(ec)
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
      let s = String(e.properties.style)
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
 * @param {TemplateStringsArray} t
 * @param {any[]} a
 * @returns {string}
 */
function html(t, ...a) {
  return h(t, ...a)
}

/**
 * @param {TemplateStringsArray} t
 * @param {any[]} a
 * @returns {string}
 */
function h(t, ...a) {
  let s = ""
  for (let i = 0; i < t.length; i += 1) {
    s += t[i]
    let v = a[i]
    if (v === undefined) {
      continue
    }
    s += String(v)
  }
  return s
}
