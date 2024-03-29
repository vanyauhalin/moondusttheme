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

  return r(
    c0("# c"),

    p0(".DEFAULT:"),
    p0(".DELETE_ON_ERROR:"),
    p0(".EXPORT_ALL_VARIABLES:"),
    p0(".IGNORE:"),
    p0(".INTERMEDIATE:"),
    p0(".LOW_RESOLUTION_TIME:"),
    p0(".NOTPARALLEL:"),
    p0(".ONESHELL:"),
    p0(".PHONY:"),
    p0(".POSIX:"),
    p0(".PRECIOUS:"),
    p0(".SECONDARY:"),
    p0(".SECONDEXPANSION:"),
    p0(".SILENT:"),
    p0(".SUFFIXES:"),

    p0("$("), p1("patsubst"), p0("%,"), p1("r"), p0(")"),

    p1("r"), p0(":"),
      p0("-"), p1("e"),
      p0("@"), p1("e"),
      p0("+"), p1("e"),
      p1("e"), p0("\\"),
      p1("e"),
    c0("# e \\"),
    c0("# e"),

    p0("define"), p1("v"),
    p0("export"),
    p0("ifdef"),
    p0("ifeq"),
    p0("ifndef"),
    p0("ifneq"),
    p0("include"),
    p0("override"),
    p0("private"),
    p0("undefine"),
    p0("unexport"),
    p0("vpath"),

    p0("ifeq"),
    p0("else"),
    p0("endif")
  )
}
