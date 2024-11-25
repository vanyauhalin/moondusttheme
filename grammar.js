import {mkdir, readFile, writeFile} from "node:fs/promises"
import * as path from "node:path"
import {URL} from "node:url"

/**
 * @typedef {any} Grammar
 */

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function grep(ta) {
  /** @type {string[]} */
  let a = [...ta]

  if (a.length === 0) {
    for (let c of Object.values(configs())) {
      a.push(c.id)
    }
  }

  /** @type {Promise<Grammar>[]} */
  let b = []

  for (let id of a) {
    for (let c of Object.values(configs())) {
      if (c.id === id) {
        for (let f of c.files) {
          let p = readGrammar(f)
          b.push(p)
        }
      }
    }
  }

  /** @type {string[]} */
  let c = []

  for (let g of await Promise.all(b)) {
    collect(g)
  }

  for (let n of [...new Set(c)].sort()) {
    console.log(n)
  }

  return

  /**
   * @param {unknown} v
   * @returns {void}
   */
  function collect(v) {
    if (Array.isArray(v)) {
      for (let e of v) {
        collect(e)
      }

      return
    }

    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      for (let k in v) {
        // @ts-ignore
        let u = v[k]

        if (k === "name" && typeof u === "string") {
          c.push(u)
          continue
        }

        collect(u)
      }

      return
    }
  }
}

/**
 * @param {string[]} ta
 * @returns {Promise<void>}
 */
export async function pull(ta) {
  /** @type {string[]} */
  let a = [...ta]

  if (a.length === 0) {
    for (let c of Object.values(configs())) {
      a.push(c.id)
    }
  }

  /** @type {Promise<void>[]} */
  let b = []

  for (let id of a) {
    for (let c of Object.values(configs())) {
      if (c.id === id) {
        for (let f of c.files) {
          let g = pullGrammar(f)
          b.push(g)
        }
      }
    }
  }

  await Promise.all(b)
}

/**
 * @returns {Promise<Grammar[]>}
 */
export async function list() {
  /** @type {Promise<Grammar>[]} */
  let a = []

  for (let c of Object.values(configs())) {
    for (let f of c.files) {
      let p = readGrammar(f)
      a.push(p)
    }
  }

  return await Promise.all(a)
}

/**
 * @typedef {Object} GrammarConfig
 * @property {string} id
 * @property {string[]} files
 */

/**
 * @returns {GrammarConfig[]}
 */
function configs() {
  return [
    {
      id: "c",
      files: [
        "https://github.com/microsoft/vscode/blob/1.93.1/extensions/cpp/syntaxes/c.tmLanguage.json/",
      ],
    },
    {
      id: "css",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/css/syntaxes/css.tmLanguage.json/",
      ],
    },
    {
      id: "dockerfile",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/docker/syntaxes/docker.tmLanguage.json/",
      ],
    },
    {
      id: "fish",
      files: [
        "https://github.com/bmalehorn/vscode-fish/blob/2bdcfbea62cadc2a977eace3189d25b31df71e72/syntaxes/fish.tmLanguage.json/",
      ],
    },
    {
      id: "go",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/go/syntaxes/go.tmLanguage.json/",
      ],
    },
    {
      id: "go.mod",
      files: [
        "https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.mod.tmGrammar.json/",
      ],
    },
    {
      id: "go.sum",
      files: [
        "https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.sum.tmGrammar.json/",
      ],
    },
    {
      id: "html",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html-derivative.tmLanguage.json/",
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html.tmLanguage.json/",
      ],
    },
    {
      id: "ini",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/ini/syntaxes/ini.tmLanguage.json/",
      ],
    },
    {
      id: "js",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScript.tmLanguage.json/",
      ],
    },
    {
      id: "json",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSON.tmLanguage.json/",
      ],
    },
    {
      id: "jsonc",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONC.tmLanguage.json/",
      ],
    },
    {
      id: "jsonl",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONL.tmLanguage.json/",
      ],
    },
    {
      id: "jsx",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json/",
      ],
    },
    {
      id: "makefile",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/make/syntaxes/make.tmLanguage.json/",
      ],
    },
    {
      id: "py",
      files: [
        "https://github.com/microsoft/vscode/blob/1.95.1/extensions/python/syntaxes/MagicPython.tmLanguage.json/",
      ],
    },
    {
      id: "rb",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/ruby/syntaxes/ruby.tmLanguage.json/",
      ],
    },
    {
      id: "rs",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/rust/syntaxes/rust.tmLanguage.json/",
      ],
    },
    {
      id: "sh",
      files: [
        "https://github.com/microsoft/vscode/blob/1.89.0/extensions/shellscript/syntaxes/shell-unix-bash.tmLanguage.json/",
      ],
    },
    {
      id: "sql",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/sql/syntaxes/sql.tmLanguage.json/",
      ],
    },
    {
      id: "swift",
      files: [
        "https://github.com/microsoft/vscode/blob/1.90.2/extensions/swift/syntaxes/swift.tmLanguage.json/",
      ],
    },
    {
      id: "toml",
      files: [
        "https://github.com/tamasfe/taplo/blob/release-even-better-toml-0.20.0/editors/vscode/toml.tmLanguage.json/",
      ],
    },
    {
      id: "ts",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json/",
      ],
    },
    {
      id: "tsx",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json/",
      ],
    },
    {
      id: "yaml",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/yaml/syntaxes/yaml.tmLanguage.json/",
      ],
    },
  ]
}

/**
 * @param {string} u
 * @returns {Promise<void>}
 */
async function pullGrammar(u) {
  let [o, p, r, f] = statRaw(u)
  let g = await fetchGrammar(u)

  let d = path.join("vendor", o, p, r)
  await mkdir(d, {recursive: true})

  f = path.join(d, f)
  let c = JSON.stringify(g, null, 2)
  await writeFile(f, c)
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function fetchGrammar(u) {
  let r = await fetchRaw(u)

  let g = await r.json()
  if (g === undefined) {
    throw new Error("Grammar could not be parsed")
  }

  let n = g.scopeName
  if (n === undefined) {
    throw new Error("Grammar scope name is missing")
  }

  g.name = n

  return g
}

/**
 * @param {string} u
 * @returns {Promise<Response>}
 */
async function fetchRaw(u) {
  u = u.replace("/blob/", "/raw/")
  return await fetch(u, {redirect: "follow"})
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function readGrammar(u) {
  let [o, p, r, f] = statRaw(u)
  f = path.join("vendor", o, p, r, f)
  let c = await readFile(f, "utf8")
  return JSON.parse(c)
}

/**
 * @param {string} u
 * @returns {[string, string, string, string]}
 */
function statRaw(u) {
  let o = new URL(".", u)
  let a = o.pathname.split("/")
  return [a[1], a[2], a.slice(4, a.length - 2).join("/"), a[a.length - 2]]
}
