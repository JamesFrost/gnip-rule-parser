start =
	statement*

statement =
	lb statement rb _ boolean _ statement /
	lb statement rb /
	rule _ statement /
	rule _ boolean _ statement /
	rule 

rule = 
	lb rule rb /
	contains /
	proximity /
	from /
	pointradius /
	lang /
	term 

term =
	quote term quote /
	keyword _ term /
	keyword

keyword =
	!or [a-zA-Z']+

boolean =
	or /
	negator /
	and

negator =
	"-"

quote =
	"\""

from =
	"from:" [a-zA-Z0-9_]{1,15}

contains = 
	"contains:" keyword

proximity =
	term "~" [0-9]+

lang = 
	"lang:"[a-z]{2}

pointradius =
	"point_radius:[-105.27346517 40.01924738 10.0mi]" // todo

// latitude =
// 	"-"?[0-90]

// longitude =
// 	"-"? 

distance =
	"10.0mi" // todo

lb = 
	"("

rb = 
	")"

or =
	"OR"

and = 
	_

_ "whitespace"
	= [ \t\n\r]*
