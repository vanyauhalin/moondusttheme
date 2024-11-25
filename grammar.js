import * as vendor from "./vendor.js"

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
 * @param {string} id
 * @returns {string}
 */
export function scope(id) {
  for (let c of Object.values(configs())) {
    if (c.id === id) {
      return c.scope
    }
  }

  throw new Error("Grammar scope not found")
}

/**
 * @typedef {Object} GrammarConfig
 * @property {string} id
 * @property {string} scope
 * @property {string[]} files
 */

/**
 * @returns {GrammarConfig[]}
 */
function configs() {
  return [
    {
      id: "c",
      scope: "source.c",
      files: [
        "https://github.com/microsoft/vscode/blob/1.93.1/extensions/cpp/syntaxes/c.tmLanguage.json/",
      ],
    },
    {
      id: "css",
      scope: "source.css",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/css/syntaxes/css.tmLanguage.json/",
      ],
    },
    {
      id: "dockerfile",
      scope: "source.dockerfile",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/docker/syntaxes/docker.tmLanguage.json/",
      ],
    },
    {
      id: "fish",
      scope: "source.fish",
      files: [
        "https://github.com/bmalehorn/vscode-fish/blob/2bdcfbea62cadc2a977eace3189d25b31df71e72/syntaxes/fish.tmLanguage.json/",
      ],
    },
    {
      id: "go",
      scope: "source.go",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/go/syntaxes/go.tmLanguage.json/",
      ],
    },
    {
      id: "go.mod",
      scope: "go.mod",
      files: [
        "https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.mod.tmGrammar.json/",
      ],
    },
    {
      id: "go.sum",
      scope: "go.sum",
      files: [
        "https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.sum.tmGrammar.json/",
      ],
    },
    {
      id: "html",
      scope: "text.html.basic",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html-derivative.tmLanguage.json/",
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html.tmLanguage.json/",
      ],
    },
    {
      id: "ini",
      scope: "source.ini",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/ini/syntaxes/ini.tmLanguage.json/",
      ],
    },
    {
      id: "js",
      scope: "source.js",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScript.tmLanguage.json/",
      ],
    },
    {
      id: "json",
      scope: "source.json",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSON.tmLanguage.json/",
      ],
    },
    {
      id: "jsonc",
      scope: "source.json.comments",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONC.tmLanguage.json/",
      ],
    },
    {
      id: "jsonl",
      scope: "source.json.lines",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONL.tmLanguage.json/",
      ],
    },
    {
      id: "jsx",
      scope: "source.js.jsx",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json/",
      ],
    },
    {
      id: "makefile",
      scope: "source.makefile",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/make/syntaxes/make.tmLanguage.json/",
      ],
    },
    {
      id: "py",
      scope: "source.python",
      files: [
        "https://github.com/microsoft/vscode/blob/1.95.1/extensions/python/syntaxes/MagicPython.tmLanguage.json/",
      ],
    },
    {
      id: "rb",
      scope: "source.ruby",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/ruby/syntaxes/ruby.tmLanguage.json/",
      ],
    },
    {
      id: "rs",
      scope: "source.rust",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/rust/syntaxes/rust.tmLanguage.json/",
      ],
    },
    {
      id: "sh",
      scope: "source.shell",
      files: [
        "https://github.com/microsoft/vscode/blob/1.89.0/extensions/shellscript/syntaxes/shell-unix-bash.tmLanguage.json/",
      ],
    },
    {
      id: "sql",
      scope: "source.sql",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/sql/syntaxes/sql.tmLanguage.json/",
      ],
    },
    {
      id: "swift",
      scope: "source.swift",
      files: [
        "https://github.com/microsoft/vscode/blob/1.90.2/extensions/swift/syntaxes/swift.tmLanguage.json/",
      ],
    },
    {
      id: "toml",
      scope: "source.toml",
      files: [
        "https://github.com/tamasfe/taplo/blob/release-even-better-toml-0.20.0/editors/vscode/toml.tmLanguage.json/",
      ],
    },
    {
      id: "ts",
      scope: "source.ts",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json/",
      ],
    },
    {
      id: "tsx",
      scope: "source.tsx",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json/",
      ],
    },
    {
      id: "yaml",
      scope: "source.yaml",
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
  let r = await vendor.fetch(u)

  let g = await r.json()
  if (g === undefined) {
    throw new Error("Grammar could not be parsed")
  }

  let n = g.scopeName
  if (n === undefined) {
    throw new Error("Grammar scope name is missing")
  }

  g.name = n

  let c = JSON.stringify(g, null, 2)
  await vendor.write(u, c)
}

/**
 * @param {string} u
 * @returns {Promise<Grammar>}
 */
async function readGrammar(u) {
  let s = await vendor.read(u)
  return JSON.parse(s)
}
