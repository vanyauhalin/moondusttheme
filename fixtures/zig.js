c0("// c")
c0("//! c")
c0("/// c")

p1("@import("); s1('"std"'); p1(")")

p1("0.0")
p1("0b0")
p1("0o0")
p1("0x0")

s1('"s"')
s1("'s'")
s1(String.raw`\\s`)

p1("true")
p1("false")

p1("a"); p0("+"); p1("b")
p1("a"); p0("="); p1("b")
p1("a"); p0("&"); p1("b")
p1("a"); p0(">"); p1("b")

p1("[a"); p0(","); p1("b]")
p1("{a"); p0(","); p1("b}")
p1("(a"); p0(","); p1("b)")

p1("a"); p0("."); p1("b")
p1("a"); p0(":"); p1("b")

p0(";")

p0("i8")
p0("c_char")
p0("bool")
p0("null")

p0("if")
p0("and")
p0("for")
p0("break")
p0("async")
p0("catch")
p0("pub")
p0("struct")
p0("unreachable")

p0("?i8")
p1("["); p0("*c"); p1("]")

p0("pub fn"); p1("f(a"); p0(": i8,"); p1("b"); p0(": i8"); p1(")"); p0("i8"); p1("{}")
