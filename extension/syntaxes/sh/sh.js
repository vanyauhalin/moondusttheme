/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function sh() {
  return {
    title: "Shell Script",
    name: "sh",
    scope: "source.shell",
    grammars: ["https://github.com/microsoft/vscode/blob/1.89.0/extensions/shellscript/syntaxes/shell-unix-bash.tmLanguage.json/"],
    example: {
      author: {
        name: "LLVM",
        url: "https://github.com/llvm/"
      },
      source: {
        name: "BOLT",
        url: "https://github.com/llvm/llvm-project/blob/llvmorg-18.1.5/bolt/utils/bughunter.sh/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]
      const s0 = s.string[0]
      const s1 = s.string[1]

      return {
        "comment.line.number-sign.shell": c0,
        "constant.character.escape.line-continuation.shell": p0,
        "keyword.control.break.shell": p0,
        "keyword.control.case.shell": p0,
        "keyword.control.continue.shell": p0,
        "keyword.control.do.shell": p0,
        "keyword.control.done.shell": p0,
        "keyword.control.elif.shell": p0,
        "keyword.control.else.shell": p0,
        "keyword.control.esac.shell": p0,
        "keyword.control.fi.shell": p0,
        "keyword.control.for.shell": p0,
        "keyword.control.if.shell": p0,
        "keyword.control.in.shell": p0,
        "keyword.control.return.shell": p0,
        "keyword.control.shell": p0,
        "keyword.control.then.shell": p0,
        "keyword.operator.assignment.compound.shell": p0,
        "keyword.operator.assignment.shell": p0,
        "keyword.operator.expansion.shell": p0,
        "keyword.operator.glob.shell": p0,
        "keyword.operator.heredoc.shell": p0,
        "keyword.operator.herestring.shell": p0,
        "keyword.operator.logical.regex.shell": p0,
        "keyword.operator.logical.shell": p0,
        "keyword.operator.pattern.case.default.shell": p0,
        "keyword.operator.pattern.case.shell": p0,
        "keyword.operator.pipe.shell": p0,
        "keyword.operator.redirect.0.shell": p0,
        "keyword.operator.redirect.3.shell": p0,
        "keyword.operator.redirect.4.shell": p0,
        "keyword.operator.redirect.5.shell": p0,
        "keyword.operator.redirect.6.shell": p0,
        "keyword.operator.redirect.7.shell": p0,
        "keyword.operator.redirect.8.shell": p0,
        "keyword.operator.redirect.9.shell": p0,
        "keyword.operator.redirect.shell": p0,
        "keyword.operator.redirect.stderr.shell": p0,
        "keyword.operator.redirect.stdout.shell": p0,
        "keyword.operator.tilde.shell": p0,
        "punctuation.definition.arguments.shell": p0,
        "punctuation.definition.array.shell": p0,
        "punctuation.definition.evaluation.backticks.shell": s0,
        "punctuation.definition.logical-expression.shell": p0,
        "punctuation.definition.string.begin.shell": s0,
        "punctuation.definition.string.end.shell": s0,
        "punctuation.definition.string.heredoc.delimiter.shell": p0,
        "punctuation.definition.string.heredoc.quote.shell": p0,
        "punctuation.definition.subshell.single.shell": p0,
        "punctuation.definition.variable.shell variable.other.normal.shell": p0,
        "punctuation.definition.variable.shell variable.parameter.positional.all.shell": p0,
        "punctuation.definition.variable.shell variable.parameter.positional.shell": p0,
        "punctuation.definition.variable.shell": p0,
        "punctuation.section.array.shell": p0,
        "punctuation.section.function.definition.shell": p0,
        "punctuation.separator.statement.and.shell": p0,
        "punctuation.terminator.statement.case.shell": p0,
        "punctuation.terminator.statement.semicolon.shell": p0,
        "source.shell meta.statement.command.name.continuation string.quoted.double": s1,
        "source.shell meta.statement.command.name.continuation string.quoted.single": s1,
        "source.shell string.quoted.heredoc.no-indent": s1,
        "source.shell": p1,
        "storage.modifier.declare.shell": p0,
        "storage.modifier.export.shell": p0,
        "storage.modifier.local.shell": p0,
        "storage.modifier.readonly.shell": p0,
        "storage.modifier.typeset.shell": p0,
        "storage.type.alias.shell": p0,
        "storage.type.function.shell": p0,
        "string.quoted.double.shell": s1,
        "string.quoted.single.dollar.shell": s1,
        "string.quoted.single.shell": s1,
        "string.regexp.unquoted.shell": s1,
        "variable.other.normal.shell": p1,
        "variable.parameter.positional.all.shell": p1,
        "variable.parameter.positional.shell": p1
      }
    }
  }
}
