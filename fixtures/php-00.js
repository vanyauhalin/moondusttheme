c0("#!")

p0("<?php")

c0("// c")
c0("# c")
c0("/* c */")

p0('include "'), p1("s"), p0('"')
p0("include '"), p1("s"), p0("'")
p0("include `"), p1("s"), p0("`")

p0(";")

s0('"'), s1("s"), s0('"')
s0("'"), s1("s"), s0("'")
s0("`"), s1("s"), s0("`")

s0('"/'), s1("s{5}"), s0('/"')
s0("'/"), s1("s{5}"), s0("/'")

s0("<<<EOD")
s1("s")
s0("EOD")

s0("<<<"), s1("'"), s0("EOD"), s1("'")
s1("s")
s0("EOD")

p1("true")
p1("false")

p1("0")
p1("0"), p0("."), p1("0")
p1("0b0")
p1("0x0")
p1("0o0")

p0("$"), p1("a")

p0("$"), p1("a"), p0("+$"), p1("a")
p0("$"), p1("a"), p0("+=$"), p1("a")
p0("$"), p1("a"), p0(">$"), p1("a")
p0("$"), p1("a"), p0("~$"), p1("a")
p0("$"), p1("a"), p0("++")
p0("$"), p1("a"), p0("??$"), p1("a")
p0("$"), p1("a"), p0("->"), p1("a")
p0("...$"), p1("a")
p0("?$"), p1("a"), p0(":$"), p1("a")
p0("$"), p1("a"), p0(".$"), p1("a")

p0("&&")

p0("[$"), p1("a"), p0(",$"), p1("a"), p0("]")
p0("{$"), p1("a"), p0("=>$"), p1("a"), p0("}")

p1("a:")
p0("goto"), p1("a")

p0("continue")
p0("declare")
p0("default")
p0("die")
p0("do")
p0("else")
p0("elseif")
p0("enddeclare")
p0("endfor")
p0("endforeach")
p0("endif")
p0("endswitch")
p0("endwhile")
p0("exit")
p0("for")
p0("foreach")
p0("if")
p0("return")
p0("while")
p0("yield")
p0("yield from")

p0("@$"), p1("a")

p0("use"), p1("a"), p0("as"), p1("a"), p0(";")
p0("use"), p1("a"), p0("{")
  p0("insteadof"), p1("a"), p0(";")
p0("}")

p0("if ($"), p1("a"), p0("instanceof"), p1("a"), p0(") {}")

p0("switch ($"), p1("a"), p0(") {")
p0("case $"), p1("a"), p0(":")
  p0("break")
p0("}")

p0("try {")
	p0("throw")
p0("} catch () {")
p0("} finally {}")

p0("match () {")
	p1("200"), p0("=> $"), p1("a"), p0(",")
	p0("default => $"), p1("a")
p0("}")

p0("enum"), p1("a"), p0("{")
	p0("case"), p1("a")
p0("}")

p0("function"), p1("a"), p0("(?int $"), p1("a"), p0(", &$"), p1("a"), p0(", ...$"), p1("a"), p0("): never {}")
p0("fn() => $"), p1("a")
p1("a"), p0("()")
p1("array"), p0("("), p1("a"), p0(")")

p0("class"), p1("a"), p0("extends {}")
p0("class"), p1("a"), p0("implements {}")

p0("class"), p1("a"), p0("{")
  p0("public $"), p1("a")
p0("}")

p0("abstract class"), p1("a"), p0("{}")
p0("final class"), p1("a"), p0("{}")

p0("new"), p1("a"), p0("()")

p0("$"), p1("a"), p0("::"), p1("class")

p0("trait"), p1("a"), p0("{}")
p0("namespace"), p1("a"), p0("{}")
p0("interface"), p1("a"), p0("{}")

p0("clone $"), p1("a")
p0("print $"), p1("a")
p0("echo $"), p1("a")

p0("?>")
