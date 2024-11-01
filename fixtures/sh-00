#!/bin/sh

"s"
's'
`s`
a=$"a"
a=$'a'
a=(*.txt)
<(a)
<<< ""
<<< ''
<<< ``

$v "$v"
$1 "$1"
$@ "$@"

cat << "EOF"
s
EOF

cat << 'EOF'
s
EOF

echo \
	-e "hi"

break
continue
return

if [ 0 -eq 0 ]; then
elif [[ 0 =~ 0 ]]; then
elif [] && []; then
else; fi

for i in 0; do; done
while [ 1 -eq 1 ]; do; done

case "" in
	"a");;
	-a);;
	*);;
esac

declare
export
local
readonly
typeset

a|b
~a
a=$()
a+=${}
${a:-}
${a[*]}
${a##*/}
a 0>
a 1>
a 2>
a 3>
a 4>
a 5>
a 6>
a 7>
a 8>
a 9>
a >>

alias a=b
function f {}
f(){}
