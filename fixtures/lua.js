c0("#!/bin/sh")

c0("-- c")
c0("--- c")
c0("--[[ c]]")
c0("/* c */")

s0('"'); s1("s"); s0('"')
s0("'"); s1("s"); s0("'")
s0("[["); s1("s"); s0("]]")

p0("+")
p0("=")

p0("::"); p1("t"); p0("::")

p1("true")
p1("nil")

p0("local")

p0("if")
p0("then")
p0("else")
p0("end")

p0("goto"); p1("t")

p0("function"); p1("f"); p0("("), p1("v"); p0(","); p1("v"); p0(")")
p0("end")
