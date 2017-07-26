{
	function astNode( name, value )
	{
		return {
			name : name,
			value : value
		};
	}
}

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
	keyword:term { return astNode( 'term', keyword ); }

term =
	q1:quote string:term q2:quote { return string; } / // should this return quotes?
	s1:keyword whiteSpace s2:term { return s1 + " " + s2; } /
	s1:keyword 

keyword =
	!or string:[a-zA-Z']+ { return string.join(""); }

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
	"lang:" code:langCodes { return astNode('lang', code); }

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

whiteSpace
	= [ \t\n\r]

_ "whitespace"
	= [ \t\n\r]*

langCodes = 
	["am"|"ar"|"hy"|"bn"|"bg"|"my"|"zh"|"cs"|"da"|"nl"|"en"|"et"|"fi"|"fr"|"ka"|"de"|"el"|"gu"|"ht"|"iw"|"hi"|"hu"|"is"|"in"|"it"|"ja"|"kn"|"km"|"ko"|"lo"|"lv"|"lt"|"ml"|"dv"|"mr"|"ne"|"no"|"or"|"pa"|"ps"|"fa"|"pl"|"pt"|"ro"|"ru"|"sr"|"sd"|"si"|"sk"|"sl"|"ckb"|"es"|"sv"|"tl"|"ta"|"te"|"th"|"bo"|"tr"|"uk"|"ur"|"ug"|"vi"|"cy"]
