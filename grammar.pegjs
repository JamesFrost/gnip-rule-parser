{
	function terminalAstNode( name, value )
	{
		return {
			name : name,
			value : value
		};
	}

	function branchAstNode( name, value, leftBranch, rightBranch )
	{
		return {
			name : name,
			value : value,
			leftBranch : leftBranch,
			rightBranch : rightBranch
		};
	}
}

start =
	statement*

statement =
	lb child1:statement rb _ bool:boolean _ child2:statement { return branchAstNode( 'boolean', bool, child1, child2 ); } /
	lb st:statement rb { return st; } /
	operator _ statement /
	child1:operator _ bool:boolean _ child2:statement { return branchAstNode( 'boolean', bool, child1, child2 ); } /
	operator 

operator = 
	lb op:operator rb { return op; } / 
	contains /
	proximity /
	from /
	pointradius /
	lang /
	keyword:term { return terminalAstNode( 'term', keyword ); }

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
	"-" { return 'NOT'; }

quote =
	"\""

from =
	"from:" [a-zA-Z0-9_]{1,15}

contains = 
	"contains:" keyword

proximity =
	term "~" [0-9]+

lang = 
	"lang:" code:langCodes { return terminalAstNode('lang', code); }

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
	_ { return 'AND'; }

whiteSpace
	= [ \t\n\r\s]

_ "whitespace"
	= [ \t\n\r]*

langCodes = 
	"am"/"ar"/"hy"/"bn"/"bg"/"my"/"zh"/"cs"/"da"/"nl"/"en"/"et"/"fi"/"fr"/"ka"/"de"/"el"/"gu"/"ht"/"iw"/"hi"/"hu"/"is"/"in"/"it"/"ja"/"kn"/"km"/"ko"/"lo"/"lv"/"lt"/"ml"/"dv"/"mr"/"ne"/"no"/"or"/"pa"/"ps"/"fa"/"pl"/"pt"/"ro"/"ru"/"sr"/"sd"/"si"/"sk"/"sl"/"ckb"/"es"/"sv"/"tl"/"ta"/"te"/"th"/"bo"/"tr"/"uk"/"ur"/"ug"/"vi"/"cy"

countryCodes =
	"AF"/"AL"/"DZ"/"AD"/"AO"/"AG"/"AR"/"AM"/"AU"/"AT"/"AZ"/"BS"/"BH"/"BD"/"BB"/"BY"/"BE"/"BZ"/"BJ"/"BT"/"BO"/"BA"/"BW"/"BR"/"BN"/"BG"/"BF"/"BI"/"KH"/"CM"/"CA"/"CV"/"CF"/"TD"/"CL"/"CN"/"CO"/"KM"/"CD"/"CG"/"CR"/"CI"/"HR"/"CU"/"CY"/"CZ"/"DK"/"DJ"/"DM"/"DO"/"EC"/"EG"/"SV"/"GQ"/"ER"/"EE"/"ET"/"FJ"/"FI"/"FR"/"GA"/"GM"/"GE"/"DE"/"GH"/"GR"/"GD"/"GT"/"GN"/"GW"/"GY"/"HT"/"HN"/"HU"/"IS"/"IN"/"ID"/"IR"/"IQ"/"IE"/"IL"/"IT"/"JM"/"JP"/"JO"/"KZ"/"KE"/"KI"/"KP"/"KR"/"KW"/"KG"/"LA"/"LV"/"LB"/"LS"/"LR"/"LY"/"LI"/"LT"/"LU"/"MK"/"MG"/"MW"/"MY"/"MV"/"ML"/"MT"/"MH"/"MR"/"MU"/"MX"/"FM"/"MD"/"MC"/"MN"/"ME"/"MA"/"MZ"/"MM"/"NA"/"NR"/"NP"/"NL"/"NZ"/"NI"/"NE"/"NG"/"NO"/"OM"/"PK"/"PW"/"PA"/"PG"/"PY"/"PE"/"PH"/"PL"/"PT"/"QA"/"RO"/"RU"/"RW"/"KN"/"LC"/"VC"/"WS"/"SM"/"ST"/"SA"/"SN"/"RS"/"SC"/"SL"/"SG"/"SK"/"SI"/"SB"/"SO"/"ZA"/"ES"/"LK"/"SD"/"SR"/"SZ"/"SE"/"CH"/"SY"/"TJ"/"TZ"/"TH"/"TL"/"TG"/"TO"/"TT"/"TN"/"TR"/"TM"/"TV"/"UG"/"UA"/"AE"/"GB"/"US"/"UY"/"UZ"/"VU"/"VA"/"VE"/"VN"/"YE"/"ZM"/"ZW"/"GE"/"TW"/"AZ"/"CY"/"MD"/"SO"/"GE"/"AU"/"CX"/"CC"/"AU"/"HM"/"NF"/"NC"/"PF"/"YT"/"GP"/"GP"/"PM"/"WF"/"TF"/"PF"/"BV"/"CK"/"NU"/"TK"/"GG"/"IM"/"JE"/"AI"/"BM"/"IO"/"VG"/"KY"/"FK"/"GI"/"MS"/"PN"/"SH"/"GS"/"TC"/"MP"/"PR"/"AS"/"UM"/"GU"/"VI"/"UM"/"HK"/"MO"/"FO"/"GL"/"GF"/"GP"/"MQ"/"RE"/"AX"/"AW"/"AN"/"SJ"/"AC"/"TA"	
