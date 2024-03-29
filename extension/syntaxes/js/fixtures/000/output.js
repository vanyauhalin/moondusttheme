/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../../../../colors/themes.js").Syntax} Syntax
 */

import {r, w} from "../../../../../shared/test.js"

/**
 * @param {Syntax} s
 * @returns {Root}
 */
export function fn(s) {
  const c0 = w(s.comment[0])
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])
  const s0 = w(s.string[0])
  const s1 = w(s.string[1])

  return r(
    c0("#!"),
    c0("// c"),
    c0("/* c */"),
    c0("/** c */"),
    c0('/// <reference path="" />'),

    p0("import type"), p1("a"), p0('from "'), p1("m"), p0('"'),
    p0("import"), p1("a"), p0('from "'), p1("m"), p0('"'),
    p0("import"), p1("*"), p0("as"), p1("a"), p0('from "'), p1("m"), p0('" with {}'),
    p0("import {"), p1("a"), p0('} from "'), p1("m"), p0('" assert {}'),
    p0("import {default as"), p1("a"), p0('} from "'), p1("m"), p0('"'),
    p0('import "'), p1("m"), p0('"'),
    p0("import"), p1("a"), p0("=;"),

    p1("import"), p0("."), p1("meta"), p0("."), p1("url"),

    p0("export default"), p1("a"),
    p0("export type"), p1("a"), p0(";"),
    p0("export"), p1("*"), p0("as"), p1("a"), p0('from "'), p1("m"), p0('"'),
    p0("export {"), p1("a"), p0('} from "'), p1("m"), p0('"'),

    p1("a"), p0(": if ("), p1("0"), p0(") {} else {}"),
    p0("for (;"), p1("0"), p0(";) {continue}"),
    p0("while ("), p1("0"), p0(") {return}"),
    p0("switch ("), p1("0"), p0(") {case"), p1("0"), p0(": break; default:}"),
    p0("try {} catch {goto}"),

    p0("@"), p1("d"),
    p0("async function *"), p1("a"), p0("() {yield"), p1("1"), p0("}"),
    p0("await"), p1("a"),
    p0("var"), p1("a"),
    p0("const"), p1("a"),
    p0("let"), p1("a"),
    p0("class extends {}"),
    p0("enum"), p1("a"), p0("{}"),
    p0("interface"), p1("a"), p0("{}"),
    p0("namespace"), p1("a"), p0("{}"),
    p0("module"), p1("a"), p0("{}"),
    p0("type"), p1("a"), p0("= {}"),
    p0("() => {};"),

    s0('"'), s1("s"), s0('"'),
    s0("'"), s1("s"), s0("'"),
    s0("`"), s1("s"), p0("${"), p1("a"), p0("}"), s0("`"),
    s0("/"), s1("s"), s0("/"), p0("g"),

    p1("true"),
    p1("false"),
    p1("infinity"),
    p1("NaN"),
    p1("null"),
    p1("undefined"),
    p1("0b0"),
    p1("0x0"),
    p1("0o0"),
    p1("1"), p0("."), p1("000"),

    p1("a"), p0("+"), p1("a"),
    p1("a"), p0("+="), p1("a"),
    p1("a"), p0("<<"), p1("a"),
    p1("a"), p0("<<="), p1("a"),
    p1("a"), p0("~"), p1("a"),
    p1("a"), p0("=="), p1("a"),
    p1("a"), p0("++"),
    p1("a"), p0("--"),
    p1("a"), p0(">"), p1("a"),
    p1("a"), p0("??"), p1("a"),
    p1("a"), p0("."), p1("a"),
    p1("a"), p0("?."), p1("a"),
    p1("a"), p0("={"), p1("a"), p0(":"), p1("0"), p0("}"),
    p0("["), p1("a"), p0(","), p1("a"), p0("]"),
    p1("a"), p0("("), p1("a"), p0(","), p1("a"), p0(")"),
    p0("..."), p1("a"),
    p0("?"), p1("a"), p0(":"), p1("a"),

    p0("package"),
    p0("declare"),
    p0("debugger"),
    p0("delete"), p1("a"),
    p0("in"), p1("a"),
    p0("instanceof"), p1("a"),
    p0("of"), p1("a"),
    p0("typeof"), p1("a"),
    p0("void"), p1("a"),
    p0("new"), p1("a"),

    p0("type"), p1("a"), p0(`= s|"s"|'s'|\`s\`|0|string|this`),
    p0("function"), p1("a"), p0("(..."), p1("a"), p0(","), p1("a"), p0('?:string|"",['),
      p1("a"), p0("],{"), p1("a"), p0(`}:{a:string}):s|"s"|'s'|\`s\`|0|string|this {`), p1("a"), p0("}"),
    p0(`():s|"s"|'s'|\`s\`|0|string|this|{a:string}=>{}`),

    p0("namespace"), p1("a"), p0("{"),
      p0("export type"), p1("a"), p0("= {"),
        p1("a"), p0(`: s|"s"|'s'|\`s\`|0|string|this`),
        p1("b"), p0("("), p1("a"), p0(`:s): s|"s"|'s'|\`s\`|0|string|this`),
      p0("}"),
      p0("export class"), p1("a"), p0("{"),
        p1("a"), p0(`: s|"s"|'s'|\`s\`|0|string|this`),
        p1("b"), p0("("), p1("a"), p0(`:s): s|"s"|'s'|\`s\`|0|string|this`),
      p0("}"),
      p0("export interface"), p1("a"), p0("{"),
        p1("a"), p0(`: s|"s"|'s'|\`s\`|0|string|this`),
        p1("b"), p0("("), p1("a"), p0(`:s): s|"s"|'s'|\`s\`|0|string|this`),
      p0("}"),
    p0("}"),

    p0("class {"),
      p1("constructor"), p0("(){}"),
      p1("#a"), p0("="), p1("import"), p0("("), s0('""'), p0(")"),
      p1("a"), p0("="), p1("this"), p0("."), p1("#a"),
      p1("a"), p0("!:a;"),
      p0("get"), p1("s"), p0("(){}"),
      p0("static"), p1("s"), p0("(){}"),
      p0("["), p1("a"), p0("](){}"),
    p0("}"),

    p0("interface"), p1("a"), p0("<A,B extends C> {} as"), p1("a"), p0(`<string,keyof infer a, "s", 's', \`s\`>`),
    p0("function (): is a{}"),

    p0("<"), p1("div"),
      p1("a"), p0("="), s0('"'), s1("s"), s0('"'),
      p1("a"), p0("="), s0("'"), s1("s"), s0("'"),
      p1("a"), p0("={"), p1("a"), p0("}"),
    p0(">{"), p1("a"), p0("}</"), p1("div"), p0(">")
  )
}
