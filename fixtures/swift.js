c0("// c")
c0("/* c */")
c0("/// c")

p1("0")
p1("0b0")
p1("0o0")
p1("0x0")
p1("0.0")
p1("1_000")

p1("true")
p1("false")

p1("nil")

s0('"'); s1("s"); s0('"')
s0('"'); s1("s"); p0(String.raw`\(`); p1("a"); p0(")"); s0('"')
s0('"""')
s1("s")
s0('"""')
s0('#"'); s1("s"); s0('"#')

p1("0"); p0("+"); p1("0")
p1("0"); p0("-"); p1("0")
p1("0"); p0("*"); p1("0")
p1("0"); p0("/"); p1("0")
p1("0"); p0("%"); p1("0")
p1("0"); p0("**"); p1("0")

p0("var"); p1("a"); p0("="); p1("0")
p0("let"); p1("a"); p0("="); p1("0")
p0("let _ ="); p1("0")
p0("let"); p1("a"); p0("= ("); p1("a, b"); p0(")")

p0("let"); p1("a: Int"); p0("?")
p0("let"); p1("a"); p0("="); p1("0"); p0("as"); p1("A")

p0("if"); p1("0"); p0("=="); p1("0"); p0("{}")
p0("else {}")

p0("#if"); p1("os"); p0("("); p1("macOS"); p0(")")
p0("#else")
p0("#endif")

p0("if"); p1("#available"); p0("(iOS"); p1("15.4.1,"); p0("*) {}")

p1("0"); p0("?"); p1("0"); p0(":"); p1("0")

p0("switch"); p1("a"); p0("{")
p0("case"); p1("0"); p0(":")
p0("break")
p0("}")

p0("while"); p1("0"); p0("=="); p1("0"); p0("{}")
p0("repeat {} while"); p1("0"); p0("=="); p1("0")
p0("for"); p1("a"); p0("in"); p1("0"); p0("..."); p1("0"); p0("{}")
p0("guard"); p1("0"); p0("=="); p1("0"); p0("else {}")
p0("guard !"); p1("0"); p0("else {}")

p0("try?"); p1("f"); p0("("); p1("a"); p0(":"); p1("0"); p0(")")
p0("try!"); p1("f"); p0("("); p1("a"); p0(":"); p1("0"); p0(")")

p0("consume"); p1("f")
p0("copy"); p1("f")
p0("throw"); p1("Error"); p0("()")
p0("return"); p1("0")
p0("defer {}")
p0("await"); p1("f"); p0("()")

p0("import"); p1("Foundation")

p0("func"); p1("f"); p0("("); p1("b"); p0(": Int) throws -> Int {}")
p0("func"); p1("f"); p0("() async -> (Int, Int) {}")
p0("func"); p1("f"); p0("<A, B>("); p1("a"); p0(": A,"); p1("b"); p0(": B) -> B {}")
p0("func"); p1("f"); p0("("); p1("a"); p0(": A ="); p1("0"); p0(")")

p0("class"); p1("C"); p0(": C, P {")
p0("@available(*, unavailable)")
p0("var"); p1("p:"); p0("Int ="); p1("0")
p0("fileprivate var"); p1("p"); p0("="); p1("0")
p0("internal var"); p1("p"); p0("="); p1("0")
p0("private var"); p1("p"); p0("="); p1("0")
p0("public var"); p1("p"); p0("="); p1("0")
p0("static var"); p1("p"); p0("="); p1("0")
p0("}")

p0("protocol"); p1("P"); p0("{")
p0("var"); p1("p:"); p0("Int {get set}")
p0("}")

p0("extension"); p1("E"); p0("{")
p0("var"); p1("p:"); p0("Int {"); p1("0"); p0("}")
p0("}")

p0("enum"); p1("E"); p0("{")
p0("case"); p1("c")
p0("}")

p0("struct"); p1("S"); p0(": P {")
p0("var"); p1("p:"); p0("Int ="); p1("0")
p0("}")

p0("typealias"); p1("T"); p0("= T<[T: T], T>")

p0("let"); p1("a"); p0("= {"); p1("["); p0("weak"); p1("self]"); p0("in {}}")

p0("let"); p1("v:"); p0("some"); p1("V"); p0("= _")
p0("let"); p1("v:"); p0("any"); p1("V"); p0("= _")
