/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../main.test.js").ColorTheme} ColorTheme
 */

import {r, w} from "../main.test.js"

/**
 * @param {ColorTheme} c
 * @returns {Root}
 */
export function f(c) {
  const c0 = w(c.comment[0])
  const p0 = w(c.plain[0])
  const p1 = w(c.plain[1])
  const s0 = w(c.string[0])
  const s1 = w(c.string[1])

  return r(
    c0("// a"),
    c0("/// a"),
    c0("//! a"),
    c0("/* a */"),
    c0("/** a */"),
    c0("/*! a */"),

    p0("br"),s0('#"'),s1("a"),s0('"#'),
    p0("b"),s0("'"),s1("a"),s0("'"),
    p0("'"),p1("a"),
    s0('"'),p0("{"),p1("a:?"),p0("}"),s0('"'),

    p1("a!"),p0("();"),
    p0("!"),p1("a"),p0(";"),
    p1("a"),p0("!="),p1("b"),p0(";"),
    p1("a"),p0("%"),p1("b"),p0(";"),
    p1("a"),p0("%="),p1("b"),p0(";"),
    p0("&"),p1("a"),p0(";"),
    p0("&u8;"),
    p1("a"),p0("&"),p1("b"),p0(";"),
    p1("a"),p0("&="),p1("b"),p0(";"),
    p1("a"),p0("&&"),p1("b"),p0(";"),
    p1("a"),p0("*"),p1("b"),p0(";"),
    p1("a"),p0("*="),p1("b"),p0(";"),
    p0("*"),p1("a"),p0(";"),
    p1("a"),p0("+"),p1("b"),p0(";"),
    p1("a"),p0("+="),p1("b"),p0(";"),
    p1("a"),p0(","),p1("b"),p0(";"),
    p0("-"),p1("a"),p0(";"),
    p1("a"),p0("-"),p1("b"),p0(";"),
    p1("a"),p0("-="),p1("b"),p0(";"),
    p1("a"),p0("->"),p1("b"),p0(";"),
    p1("a"),p0("."),p1("b"),p0(";"),
    p0(".."),p1("a"),p0(";"),
    p1("a"),p0(".."),p1("b"),p0(";"),
    p1("a"),p0("..;"),
    p0("..="),p1("a"),p0(";"),
    p0("..."),p1("a"),p0(";"),
    p1("a"),p0("/"),p1("b"),p0(";"),
    p1("a"),p0("/="),p1("b"),p0(";"),
    p1("a"),p0(":"),p1("b"),p0(";"),
    p0("'"),p1("a"),p0(": loop {}"),
    p0("["),p1("a"),p0(";"),p1("8"),p0("];"),
    p1("a"),p0("<<"),p1("8"),p0(";"),
    p1("a"),p0("<<="),p1("8"),p0(";"),
    p1("a"),p0("="),p1("b"),p0(";"),
    p1("a"),p0("=="),p1("b"),p0(";"),
    p1("a"),p0("=>"),p1("b"),p0(";"),
    p1("a"),p0(">"),p1("b"),p0(";"),
    p1("a"),p0(">="),p1("b"),p0(";"),
    p1("a"),p0(">>"),p1("b"),p0(";"),
    p1("a"),p0(">>="),p1("b"),p0(";"),
    p1("a"),p0("@"),p1("b"),p0(";"),
    p1("a"),p0("^"),p1("b"),p0(";"),
    p1("a"),p0("^="),p1("b"),p0(";"),
    p1("a"),p0("|"),p1("b"),p0(";"),
    p1("a"),p0("|="),p1("b"),p0(";"),
    p1("a"),p0("||"),p1("b"),p0(";"),
    p1("a"),p0("?;"),
    p1("0"),p0("u8;"),
    p1("0"),p0("."),p1("0"),p0("f32;"),
    p1("a"),p0("()."),p1("b"),p0("();"),
    p1("a"),p0("::<"),p1("b"),p0("as"),p1("D"),p0("<"),p1("A"),p0(">>;"),
    p1("a"),p0(": ?"),p1("Sized"),p0(";"),
    p0("#![a(b)]"),
    p0('#!["s"]'),
    p0("$"),p1("ident"),p0(":"),p1("kind"),p0(";"),
    p0("$($"),p1("a"),p0(":"),p1("b"),p0("),*;"),
    p0("*const u8;"),
    p0("&mut u8;"),
    p0("'"),p1("static"),p0(";"),
    p0("let"),p1("Ok"),p0("("),p1("s"),p0(") ="),p1("a"),p0(";"),

    p0("as u8;"),
    p0("async {}"),
    p1("a"),p0(".await;"),
    p0("break;"),
    p0("const {}"),
    p0("continue;"),
    p0("crate"),p1("a"),p0(";"),
    p0("dyn"),p1("Any"),p0(";"),
    p0("else {}"),
    p0("enum"),p1("A"),p0("{}"),
    p0("extern"),s0('"'),s1("C"),s0('"'),p0("{}"),
    p1("false"),p0(";"),
    p0("fn () -> !;"),
    p0("for"),p1("a"),p0("in"),p1("b"),p0("{}"),
    p0("if {}"),
    p0("impl<"),p1("T"),p0(">"),p1("A"),p0("<"),p1("T"),p0("> where"),p1("T"),p0(":"),p1("Any"),p0("{}"),
    p0("let ref mut"),p1("a"),p0(";"),
    p0("loop {}"),
    p0("match"),p1("a"),p0("{}"),
    p0("pub("),p1("super"),p0(") mod"),p1("a"),p0(";"),
    p0("move |"),p1("_"),p0("|();"),
    p0("return;"),
    p1("Self"),p0(";"),
    p1("self"),p0(";"),
    p0("static"),p1("A"),p0(": u8 ="),p1("0"),p0(";"),
    p0("struct"),p1("A"),p0("{}"),
    p1("super"),p0("::"),p1("A"),p0(";"),
    p0("trait"),p1("A"),p0("{}"),
    p1("true"),p0(";"),
    p0("type"),p1("A"),p0("="),p1("B"),p0(";"),
    p0("union"),p1("A"),p0("{}"),
    p0("unsafe {}"),
    p0("use"),p1("a"),p0(";"),
    p0("while {} {}"),

    p0("abstract"),
    p0("become"),
    p0("box"),
    p0("do"),
    p0("final"),
    p0("macro"),
    p0("override"),
    p0("priv"),
    p0("try"),
    p0("typeof"),
    p0("unsized"),
    p0("virtual"),
    p0("yield"),

    p0("i8"),
    p0("i16"),
    p0("i32"),
    p0("i64"),
    p0("i128"),
    p0("isize"),
    p0("u8"),
    p0("u16"),
    p0("u32"),
    p0("u64"),
    p0("u128"),
    p0("usize"),
    p0("f32"),
    p0("f64"),
    p0("str"),
    p0("char"),
    p0("bool"),
  )
}