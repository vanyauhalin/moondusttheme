/**
 * @typedef {import("../../shared/meta.js").Meta} Meta
 * @typedef {import("../colors/themes.js").Syntax} ColorSyntax
 */

/**
 * @typedef {Object} Syntax
 * @property {() => Meta} meta
 * @property {(s: ColorSyntax) => Record<string, string>} tokenColors
 */

import * as _css from "./css/css.js"
/** @type {Syntax} */
export const css = _css

import * as _dockerfile from "./dockerfile/dockerfile.js"
/** @type {Syntax} */
export const dockerfile = _dockerfile

import * as _go from "./go/go.js"
/** @type {Syntax} */
export const go = _go

import * as _gomod from "./go.mod/go.mod.js"
/** @type {Syntax} */
export const gomod = _gomod

import * as _gosum from "./go.sum/go.sum.js"
/** @type {Syntax} */
export const gosum = _gosum

import * as _html from "./html/html.js"
/** @type {Syntax} */
export const html = _html

import * as _ini from "./ini/ini.js"
/** @type {Syntax} */
export const ini = _ini

import * as _js from "./js/js.js"
/** @type {Syntax} */
export const js = _js

import * as _json from "./json/json.js"
/** @type {Syntax} */
export const json = _json

import * as _jsonc from "./jsonc/jsonc.js"
/** @type {Syntax} */
export const jsonc = _jsonc

import * as _jsonl from "./jsonl/jsonl.js"
/** @type {Syntax} */
export const jsonl = _jsonl

import * as _jsx from "./jsx/jsx.js"
/** @type {Syntax} */
export const jsx = _jsx

import * as _makefile from "./makefile/makefile.js"
/** @type {Syntax} */
export const makefile = _makefile

import * as _rb from "./rb/rb.js"
/** @type {Syntax} */
export const rb = _rb

import * as _toml from "./toml/toml.js"
/** @type {Syntax} */
export const toml = _toml

import * as _ts from "./ts/ts.js"
/** @type {Syntax} */
export const ts = _ts

import * as _tsx from "./tsx/tsx.js"
/** @type {Syntax} */
export const tsx = _tsx

import * as _yaml from "./yaml/yaml.js"
/** @type {Syntax} */
export const yaml = _yaml
