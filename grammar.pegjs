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

	function multidimensionalArrayToString( array )
	{
		if( array === undefined )
			return '';

		return array.map(function( thisArrayElement )
		{
			return thisArrayElement.reduce(function( carry, thisElement )
			{
				return carry + ' ' + thisElement.join( '' );

			}).trim();

		}).join( ' ' ).trim();
	}
}

start =
	statement*

statement =
	lb child1:statement rb _ boolean:boolean _ child2:statement { return branchAstNode( 'boolean', boolean, child1, child2 ); } /
	lb _ st:statement _ rb { return st; } /
	child1:operator _ boolean:boolean _ child2:statement { return branchAstNode( 'boolean', boolean, child1, child2 ); } /
	operator 

operator = 
	lb _ op:operator _ rb { return op; } / 
	contains /
	proximity /
	from /
	pointradius /
	lang /
	keyword:term { return terminalAstNode( 'term', keyword ); }

term =
	quote string:keywordString+ strings:(whiteSpace keywordString+)* quote  { return string.join("") + ' ' + multidimensionalArrayToString( strings ); } /
	characterString

keywordString =
	[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]

characterString =
	!or string:[a-zA-Z0-9_']+ { return string.join(""); }

boolean =
	or /
	negator /
	and

negator =
	minus { return 'NOT'; }

quote =
	"\""

from =
	"from:" userhandle:userhandle { return terminalAstNode( 'from', userhandle ); }

contains = 
	"contains:" keyword:characterString { return terminalAstNode( 'contains', keyword ); }

proximity =
	term:term "~" distance:number+ { return terminalAstNode( 'proximity', { term : term, distance : distance.join("") } ); }

lang = 
	"lang:" langCode:langCodes { return terminalAstNode('lang', langCode); }

pointradius =
	"point_radius:[" latitude:latitude whiteSpace longitude:longitude whiteSpace distance:distance "]" { return terminalAstNode( 'point_radius', { latitude : latitude, longitude : longitude, distance : distance } ); }

latitude = 
	minus:minus? latitude:number+ period decimal:number+ { return '' + minus + latitude.join('') + '.' + decimal.join(''); } // TODO : limit number range

longitude = 
	minus:minus? longitude:number+ period decimal:number+ { return '' + ( minus || '' ) + longitude.join('') + '.' + decimal.join(''); } // TODO : limit number range

distance =
	number:number+ "." decimal:number+ unit:"mi" { return number.join('') + '.' + decimal.join('') + unit; } // TODO : other distance units

lb = 
	"("

rb = 
	")"

or =
	"OR"

minus =
	"-"

period =
	"."

and = 
	_ { return 'AND'; }

number =
	number:[0-9]

punctuation =
	[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]

whiteSpace
	= [ \t\n\r\s]

_ "whitespace"
	= [ \t\n\r]*

userhandle =
	userhandle:[a-zA-Z0-9_]+ { return userhandle.join(""); } // TODO: Limit username length to 15 characters

langCodes = 
	"am"/"ar"/"hy"/"bn"/"bg"/"my"/"zh"/"cs"/"da"/"nl"/"en"/"et"/"fi"/"fr"/"ka"/"de"/"el"/"gu"/"ht"/"iw"/"hi"/"hu"/"is"/"in"/"it"/"ja"/"kn"/"km"/"ko"/"lo"/"lv"/"lt"/"ml"/"dv"/"mr"/"ne"/"no"/"or"/"pa"/"ps"/"fa"/"pl"/"pt"/"ro"/"ru"/"sr"/"sd"/"si"/"sk"/"sl"/"ckb"/"es"/"sv"/"tl"/"ta"/"te"/"th"/"bo"/"tr"/"uk"/"ur"/"ug"/"vi"/"cy"

countryCodes =
	"AF"/"AL"/"DZ"/"AD"/"AO"/"AG"/"AR"/"AM"/"AU"/"AT"/"AZ"/"BS"/"BH"/"BD"/"BB"/"BY"/"BE"/"BZ"/"BJ"/"BT"/"BO"/"BA"/"BW"/"BR"/"BN"/"BG"/"BF"/"BI"/"KH"/"CM"/"CA"/"CV"/"CF"/"TD"/"CL"/"CN"/"CO"/"KM"/"CD"/"CG"/"CR"/"CI"/"HR"/"CU"/"CY"/"CZ"/"DK"/"DJ"/"DM"/"DO"/"EC"/"EG"/"SV"/"GQ"/"ER"/"EE"/"ET"/"FJ"/"FI"/"FR"/"GA"/"GM"/"GE"/"DE"/"GH"/"GR"/"GD"/"GT"/"GN"/"GW"/"GY"/"HT"/"HN"/"HU"/"IS"/"IN"/"ID"/"IR"/"IQ"/"IE"/"IL"/"IT"/"JM"/"JP"/"JO"/"KZ"/"KE"/"KI"/"KP"/"KR"/"KW"/"KG"/"LA"/"LV"/"LB"/"LS"/"LR"/"LY"/"LI"/"LT"/"LU"/"MK"/"MG"/"MW"/"MY"/"MV"/"ML"/"MT"/"MH"/"MR"/"MU"/"MX"/"FM"/"MD"/"MC"/"MN"/"ME"/"MA"/"MZ"/"MM"/"NA"/"NR"/"NP"/"NL"/"NZ"/"NI"/"NE"/"NG"/"NO"/"OM"/"PK"/"PW"/"PA"/"PG"/"PY"/"PE"/"PH"/"PL"/"PT"/"QA"/"RO"/"RU"/"RW"/"KN"/"LC"/"VC"/"WS"/"SM"/"ST"/"SA"/"SN"/"RS"/"SC"/"SL"/"SG"/"SK"/"SI"/"SB"/"SO"/"ZA"/"ES"/"LK"/"SD"/"SR"/"SZ"/"SE"/"CH"/"SY"/"TJ"/"TZ"/"TH"/"TL"/"TG"/"TO"/"TT"/"TN"/"TR"/"TM"/"TV"/"UG"/"UA"/"AE"/"GB"/"US"/"UY"/"UZ"/"VU"/"VA"/"VE"/"VN"/"YE"/"ZM"/"ZW"/"GE"/"TW"/"AZ"/"CY"/"MD"/"SO"/"GE"/"AU"/"CX"/"CC"/"AU"/"HM"/"NF"/"NC"/"PF"/"YT"/"GP"/"GP"/"PM"/"WF"/"TF"/"PF"/"BV"/"CK"/"NU"/"TK"/"GG"/"IM"/"JE"/"AI"/"BM"/"IO"/"VG"/"KY"/"FK"/"GI"/"MS"/"PN"/"SH"/"GS"/"TC"/"MP"/"PR"/"AS"/"UM"/"GU"/"VI"/"UM"/"HK"/"MO"/"FO"/"GL"/"GF"/"GP"/"MQ"/"RE"/"AX"/"AW"/"AN"/"SJ"/"AC"/"TA"	
