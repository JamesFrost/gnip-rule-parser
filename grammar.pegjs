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
				return carry + ' ' + thisElement;

			}).trim();

		}).join( ' ' ).trim();
	}

	function emoji( input )
	{
		if( typeof input === 'string' )
			return input;

		if( typeof input[0] === 'object' )
			return input[0].join( '' );

		return input.join( '' );
	}
}

start =
	_ statement:statement* _ { return statement; }

statement =
	lb _ child1:statement _ rb _ boolean:boolean _ child2:statement { return branchAstNode( 'boolean', boolean, child1, child2 ); } /
	lb _ st:statement _ rb { return st; } /
	child1:operator _ boolean:boolean _ child2:statement { return branchAstNode( 'boolean', boolean, child1, child2 ); } /
	operator 

operator = 
	lb _ op:operator _ rb { return op; } / 
	negator op1:operator whiteSpace op2:operator { return branchAstNode( 'boolean', 'NOT', op2, op1 ); } /
	followersCount /
	contains /
	proximity /
	from /
  url /
  urlTitle /
  urlDescription /
  urlContains /
  hasLinks /
	sample /
  to /
  bio /
  bioName /
  bioLocation /
	retweetsOf /
  pointradius /
  statusesCount /
  followersCount /
  friendsCount /
  listedCount /
  isVerified /
  isRetweet /
  source /
  place /
  placeContains /
  countryCode /
  hasGeo /
  hasHashtags /
  hasMentions /
  hasMedia /
  hasProfileGeoRegion /
  hasProfileGeoSubRegion /
  hasProfileGeoLocality /
  hasProfileGeo /
  retweetOfStatusId /
  inReplyToStatusId /
  profileRegion /
  profileRegionContains /
  profileLocality /
  profileLocalityContains /
  profileSubRegion /
  profileSubRegionContains /
  boundingBox /
  timeZone /
	lang /
  keywordMatch /
	exactMatch 

keywordMatch =
  keyword:characterString { return terminalAstNode( 'keyword', keyword ); }

exactMatch =
  keywords:multiKeywordString { return terminalAstNode( 'exact_match', keywords ) }

from =
	"from:" userhandle:number { return terminalAstNode( 'from', userhandle ); } /
	"from:" userhandle:userhandle { return terminalAstNode( 'from', userhandle ); } 

to =
	"to:" userhandle:number { return terminalAstNode( 'to', userhandle ); } /
	"to:" userhandle:userhandle { return terminalAstNode( 'to', userhandle ); } 

// TODO: verify url
url =
  "url:"url:keywordString { return terminalAstNode( 'url', url); } /
	"url:" quote url:keywordString quote { return terminalAstNode( 'url', url ); } 

urlTitle =
  "url_title:" title:keywordString { return terminalAstNode( 'url_title', title ) }

urlDescription =
  "url_description:" title:keywordString { return terminalAstNode( 'url_description', title ) }
 
urlContains =
  "url_contains:" contains:keywordString { return terminalAstNode( 'url_contains', contains ) } /
  "url_contains:" quote contains:keywordString quote { return terminalAstNode( 'url_contains', contains ) }

isVerified =
  "is:verified" { return terminalAstNode( 'is', 'verified' ) }

isRetweet =
  "is:retweet" { return terminalAstNode( 'is', 'retweet' ) }

hasLinks =
  "has:links" { return terminalAstNode( 'has', 'links' ) }

hasGeo =
  "has:geo" { return terminalAstNode( 'has', 'geo' ) }

hasHashtags =
  "has:hashtags" { return terminalAstNode( 'has', 'hashtags' ) }

hasMentions =
  "has:mentions" { return terminalAstNode( 'has', 'mentions' ) }

hasMedia =
  "has:media" { return terminalAstNode( 'has', 'media' ) }

hasProfileGeo =
  "has:profile_geo" { return terminalAstNode( 'has', 'profile_geo' ) }

hasProfileGeoSubRegion =
  "has:profile_geo_subregion" { return terminalAstNode( 'has', 'profile_geo_subregion' ) }

hasProfileGeoRegion =
  "has:profile_geo_region" { return terminalAstNode( 'has', 'profile_geo_region' ) }

hasProfileGeoLocality =
  "has:profile_geo_locality" { return terminalAstNode( 'has', 'profile_geo_locality' ) }

profileRegion =
  "profile_region:" region:multiKeywordString { return terminalAstNode( 'profile_region', region ) }

profileRegionContains =
  "profile_region_contains:" region:keywordString { return terminalAstNode( 'profile_region_contains', region ) }

profileLocality =
  "profile_locality:" region:keywordString { return terminalAstNode( 'profile_locality', region ) }

profileLocalityContains =
  "profile_locality_contains:" region:keywordString { return terminalAstNode( 'profile_locality_contains', region ) }

profileSubRegion =
  "profile_subregion:" region:multiKeywordString { return terminalAstNode( 'profile_subregion', region ) }

profileSubRegionContains =
  "profile_subregion_contains:" region:keywordString { return terminalAstNode( 'profile_subregion_contains', region ) }

retweetOfStatusId =
  "retweets_of_status_id:" statusId:number { return terminalAstNode( 'retweets_of_status_id', statusId ) }

inReplyToStatusId =
  "in_reply_to_status_id:" statusId:number { return terminalAstNode( 'in_reply_to_status_id', statusId ) }

source =
  "source:" source:multiKeywordString { return terminalAstNode( 'source', source ) } /
  "source:" source:keywordString { return terminalAstNode( 'source', source ) }

place =
  "place:" place:multiKeywordString { return terminalAstNode( 'place', place ) } /
  "place:" place:keywordString { return terminalAstNode( 'place', place ) }

placeContains =
  "place_contains:" place:keywordString { return terminalAstNode( 'place_contains', place ) }

countryCode =
  "profile_country_code:" countryCode:keywordString { return terminalAstNode( 'profile_country_code', countryCode ) } /
  "country_code:" countryCode:keywordString { return terminalAstNode( 'country_code', countryCode ) }

statusesCount =
  "statuses_count:" range:numberRange { return terminalAstNode( 'statuses_count', range ); } 

followersCount =
  "followers_count:" range:numberRange { return terminalAstNode( 'followers_count', range ); } 

friendsCount =
  "friends_count:" range:numberRange { return terminalAstNode( 'friends_count', range ); } 

listedCount =
  "listed_count:" range:numberRange { return terminalAstNode( 'listed_count', range ); } 

numberRange =
  lb:number ".." ub:number { return { lowerBound: lb, upperBound:ub }; } /
  number

sample = 
  "sample:" percent:number { return terminalAstNode( 'sample', percent ) }

bio =
  "bio:" bio:keywordString { return terminalAstNode( 'bio', bio ) }
  // TODO : support quotes?

bioName =
  "bio_name:" bioName:keywordString { return terminalAstNode( 'bio_name', bioName ) }
  // TODO : support quotes?

bioLocation =
  "bio_location:" bioLocation:keywordString { return terminalAstNode( 'bio_location', bioLocation ) }

retweetsOf =
  "retweets_of:" userhandle:userhandle+ { return terminalAstNode( 'retweets_of', userhandle.join('') ) } /
  "retweets_of:" userId:number { return terminalAstNode( 'retweets_of', userId ) } 

contains = 
	"contains:" quote keyword:characterString quote { return terminalAstNode( 'contains', keyword ); } /
	"contains:" keyword:characterString { return terminalAstNode( 'contains', keyword ); }

proximity =
	term:multiKeywordString "~" distance:number { return terminalAstNode( 'proximity', { term : term, distance : distance } ); }

lang = 
	"lang:" langCode:langCodes { return terminalAstNode('lang', langCode); }

timeZone =
  "time_zone:" timezone:multiKeywordString { return terminalAstNode( 'time_zone', timezone.trim() ); }

pointradius =
  "profile_point_radius:[" latitude:latitude whiteSpace longitude:longitude whiteSpace distance:distance "]" { return terminalAstNode( 'profile_point_radius', { latitude : latitude, longitude : longitude, distance : distance } ); } /
	"point_radius:[" latitude:latitude whiteSpace longitude:longitude whiteSpace distance:distance "]" { return terminalAstNode( 'point_radius', { latitude : latitude, longitude : longitude, distance : distance } ); }

boundingBox =
  "profile_bounding_box:" _ box:coordinateBox { return terminalAstNode( 'profile_bounding_box', box ); } /
  "bounding_box:" _ box:coordinateBox { return terminalAstNode( 'bounding_box', box ); }

coordinateBox = "[" westLong:decimal whiteSpace southLat:decimal whiteSpace eastLong:decimal whiteSpace northLat:decimal "]" { return { westLong : westLong, southLat : southLat, eastLong : eastLong, northLat : northLat } }

latitude = 
	minus:minus? latitude:number period decimal:number { return '' + minus + latitude + '.' + decimal; } // TODO : limit number range

longitude = 
	minus:minus? longitude:number period decimal:number { return '' + ( minus || '' ) + longitude + '.' + decimal; } // TODO : limit number range

distance =
	number:number "." decimal:number unit:"mi" { return number + '.' + decimal + unit; } // TODO : other distance units

multiKeywordString =
  quote _ string:keywordString strings:(_ keywordString)* _ quote  { return string + ' ' + multidimensionalArrayToString( strings ); } 

keywordString =
	string:[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+ { return string.join('' ); } / 
	emojis:Emoji { return emoji( emojis ); }

characterString =
	!or string:[a-zA-Z0-9_@,#'$]+ { return string.join(""); } /
	emojis:Emoji+ { return emoji( emojis ); }

boolean =
	or /
	negator /
	and

negator =
	minus { return 'NOT'; }

quote =
	"\""

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

decimal =
  minus:"-"? n1:number "." n2:number { return (minus || '') + n1 + "." + n2 }

number =
	number:[0-9]+ { return number.join(''); }

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

Emoji = Miscellaneous_Symbols_and_Pictographs
  / Supplemental_Symbols_and_Pictographs
  / Emoticons
  / Transport_and_Map_Symbols
  / Miscellaneous_Symbols
  / Dingbats
  / Arrows
  / Basic_Latin
  / CJK_Symbols_and_Punctuation
  / Enclosed_Alphanumeric_Supplement
  / Enclosed_Alphanumerics
  / Enclosed_Ideographic_Supplement
  / General_Punctuation
  / Geometric_Shapes
  / Latin1_Supplement
  / Letterlike_Symbols
  / Mahjong_Tiles
  / Miscellaneous_Symbols_and_Arrows
  / Miscellaneous_Technical
  / Playing_cards
  / Supplemental_ArrowsB

// https://en.wikipedia.org/wiki/Miscellaneous_Symbols_and_Pictographs
Miscellaneous_Symbols_and_Pictographs
  = Miscellaneous_Symbols_and_Pictographs_Sequences
  / Miscellaneous_Symbols_and_Pictographs_Diversity Fitzpatrick_Modifier
  / "\uD83C" [\uDF00-\uDFFA]
  / "\uD83D" [\uDC00-\uDDFF]

// https://en.wikipedia.org/wiki/Emoji#Joining
Miscellaneous_Symbols_and_Pictographs_Sequences
  = Kiss_Sequence
  / Couple_With_Heart_Sequence
  / Family_Sequence
  / Left_Eye_Speech_Bubble_Sequence

// https://en.wikipedia.org/wiki/Miscellaneous_Symbols_and_Pictographs#Diversity
Miscellaneous_Symbols_and_Pictographs_Diversity
  = "\uD83C" "\uDF85"
  / "\uD83C" ("\uDFC3" / "\uDFC4")
  / "\uD83C" ("\uDFCA" / "\uDFCB")
  / "\uD83D" ("\uDC42" / "\uDC43")
  / "\uD83D" [\uDC46-\uDC50]
  / "\uD83D" [\uDC66-\uDC69]
  / "\uD83D" "\uDC6E"
  / "\uD83D" [\uDC70-\uDC78]
  / "\uD83D" "\uDC7C"
  / "\uD83D" [\uDC81-\uDC83]
  / "\uD83D" [\uDC85-\uDC87]
  / "\uD83D" "\uDCAA"
  / "\uD83D" "\uDD75"
  / "\uD83D" "\uDD90"
  / "\uD83D" ("\uDD95" / "\uDD96")

// https://en.wikipedia.org/wiki/Supplemental_Symbols_and_Pictographs
Supplemental_Symbols_and_Pictographs
  = Supplemental_Symbols_and_Pictographs_Diversity Fitzpatrick_Modifier
  / "\uD83E" [\uDD00-\uDDFF] // U+1F900 - U+1F9FF

// https://en.wikipedia.org/wiki/Supplemental_Symbols_and_Pictographs#Diversity
Supplemental_Symbols_and_Pictographs_Diversity
  = "\uD83E" "\uDD18"

// https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)
Emoticons
  = Emoticons_Diversity Fitzpatrick_Modifier
  / "\uD83D" [\uDE00-\uDE4F] // U+1F600 - U+1F64F

// https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)#Diversity
Emoticons_Diversity
  = "\uD83D" [\uDE45-\uDE47]
  / "\uD83D" [\uDE4B-\uDE4F]

// https://en.wikipedia.org/wiki/Transport_and_Map_Symbols
Transport_and_Map_Symbols
  = Transport_and_Map_Symbols_Diversity Fitzpatrick_Modifier
  / "\uD83D" [\uDE80-\uDEC5] // U+1F680 - U+1F6C5
  / "\uD83D" [\uDECB-\uDED0] // U+1F6CB - U+1F6D0
  / "\uD83D" [\uDEE0-\uDEE5] // U+1F6E0 - U+1F6E5
  / "\uD83D" "\uDEE9" // U+1F6E9
  / "\uD83D" [\uDEEB-\uDEEC] // U+1F6EB - U+1F6EC
  / "\uD83D" "\uDEF0" // U+1F6F0
  / "\uD83D" "\uDEF3" // U+1F6F3

// https://en.wikipedia.org/wiki/Transport_and_Map_Symbols#Diversity
Transport_and_Map_Symbols_Diversity
  = "\uD83D" "\uDEA3"
  / "\uD83D" [\uDEB4-\uDEB6]
  / "\uD83D" "\uDEC0"

// https://en.wikipedia.org/wiki/Miscellaneous_Symbols
Miscellaneous_Symbols
  = Miscellaneous_Symbols_Diversity Fitzpatrick_Modifier
  / [\u2600-\u26FF] // U+2600 - U+26FF

// https://en.wikipedia.org/wiki/Miscellaneous_Symbols#Diversity
Miscellaneous_Symbols_Diversity
  = "\u261D"
  / "\u26F9"

// https://en.wikipedia.org/wiki/Dingbat#Emoji
Dingbats
  = Dingbats_Diversity Fitzpatrick_Modifier
  / "\u2712" // U+2712
  / "\u2714" // U+2714
  / "\u2716" // U+2716
  / "\u271D" // U+271D
  / "\u2721" // U+2721
  / "\u2728" // U+2728
  / [\u2733-\u2734] // U+2733 - U+2734
  / "\u2744" // U+2744
  / "\u2747" // U+2747
  / "\u274C" // U+274C
  / "\u274E" // U+274E
  / [\u2753-\u2755] // U+2753 - U+2755
  / "\u2757" // U+2757
  / [\u2763-\u2764] // U+2763 - U+2764
  / [\u2795-\u2797] // U+2795 - U+2797
  / "\u27A1" // U+27A1
  / "\u27B0" // U+27B0
  / "\u27BF" // U+27BF
  / "\u2702" // U+2702
  / "\u2705" // U+2705
  / [\u2708-\u270D] // U+2708 - U+270D
  / "\u270F" // U+270F

// https://en.wikipedia.org/wiki/Dingbat#Diversity
Dingbats_Diversity
  = [\u270A-\u270D]

// https://en.wikipedia.org/wiki/Arrows_(Unicode_block)
Arrows
  = [\u2194-\u2199] // U+2194 - U+2199
  / [\u21A9-\u21AA] // U+21A9 - U+21AA

// https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)#Emoji
Basic_Latin
  = "\u0023" // U+0023
  / "\u002A" // U+002A
  / [\u0030-\u0039] // U+0030 - U+0039

// https://en.wikipedia.org/wiki/CJK_Symbols_and_Punctuation
CJK_Symbols_and_Punctuation
  = "\u3030" // U+3030
  / "\u303D" // U+303D

// https://en.wikipedia.org/wiki/Enclosed_Alphanumeric_Supplement
Enclosed_Alphanumeric_Supplement
  = Regional_Indicator_Symbol
  / "\uD83C" [\uDD70-\uDD71] // U+1F170 - U+1F171
  / "\uD83C" [\uDD7E-\uDD7F] // U+1F17E - U+1F17F
  / "\uD83C" "\uDD8E" // U+1F18E
  / "\uD83C" [\uDD91-\uDD9A] // U+1F191 - U+1F19A
  / "\uD83C" [\uDDE6-\uDDFF] // U+1F1E6 - U+1F1FF

// https://en.wikipedia.org/wiki/Regional_Indicator_Symbol
Regional_Indicator_Symbol
  = "\uD83C" [\uDDE6-\uDDFF] "\uD83C" [\uDDE6-\uDDFF] // U+1F1E6 - U+1F1FF

// https://en.wikipedia.org/wiki/Enclosed_Alphanumerics#Emoji
Enclosed_Alphanumerics
  = "\u24C2" // U+24C2

// https://en.wikipedia.org/wiki/Enclosed_CJK_Letters_and_Months
Enclosed_CJK_Letters_and_Months
  = "\u3297" // U+3297
  / "\u3299" // U+3299

// https://en.wikipedia.org/wiki/Enclosed_Ideographic_Supplement
Enclosed_Ideographic_Supplement
  = "\uD83C" [\uDE01-\uDE02] // U+1F201 - U+1F202
  / "\uD83C" "\uDE1A" // U+1F21A
  / "\uD83C" "\uDE2F" // U+1F22F
  / "\uD83C" [\uDE32-\uDE3A] // U+1F232 - U+1F23A
  / "\uD83C" [\uDE50-\uDE51] // U+1F250 - U+1F251

// https://en.wikipedia.org/wiki/General_Punctuation_(Unicode_block)
General_Punctuation
  = "\u203C" // U+203C
  / "\u2049" // U+2049

// https://en.wikipedia.org/wiki/Geometric_Shapes#Emoji
Geometric_Shapes
  = [\u25AA-\u25AB] // U+25AA - U+25AB
  / "\u25B6" // U+25B6
  / "\u25C0" // U+25C0
  / [\u25FB-\u25FE] // U+25FB - U+25FE

// https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Emoji
Latin1_Supplement
  = "\u00A9" // U+00A9
  / "\u00AE" // U+00AE

// https://en.wikipedia.org/wiki/Letterlike_Symbols#Emoji
Letterlike_Symbols
  = "\u2122" // U+2122
  / "\u2139" // U+2139

// https://en.wikipedia.org/wiki/Mahjong_Tiles_(Unicode_block)
Mahjong_Tiles
  = "\uD83C" "\uDC04" // U+1F004

// https://en.wikipedia.org/wiki/Miscellaneous_Symbols_and_Arrows
Miscellaneous_Symbols_and_Arrows
  = [\u2B05-\u2B07] // U+2B05 - U+2B07
  / [\u2B1B-\u2B1C] // U+2B1B - U+2B1C
  / "\u2B50" // U+2B50
  / "\u2B55" // U+2B55

// https://en.wikipedia.org/wiki/Miscellaneous_Technical#Emoji
Miscellaneous_Technical
  = [\u231A-\u231B] // U+231A - U+231B
  / "\u2328" // U+2328
  / "\u23CF" // U+23CF
  / [\u23E9-\u23F3] // U+23E9 - U+23F3
  / [\u23F8-\u23FA] // U+23F8 - U+23FA

// https://en.wikipedia.org/wiki/Playing_cards_in_Unicode#Block
Playing_cards
  = "\uD83C" "\uDCCF" // U+1F0CF

// https://en.wikipedia.org/wiki/Supplemental_Arrows-B
Supplemental_ArrowsB
  = [\u2934-\u2935] // U+2934 - U+2935

// https://en.wikipedia.org/wiki/Fitzpatrick_scale#Unicode
Fitzpatrick_Modifier
  = "\uD83C" [\uDFFB-\uDFFF] // U+1F3FB – U+1F3FF

zw "Zero width joiner"
  = "\u200D"

Text_Variant
  = "\uFE0E"

Emoji_Variant
  = "\uFE0F"

ManOrWoman
  = "\uD83D" ("\uDC68" / "\uDC69") Fitzpatrick_Modifier?

BoyOrGirl
  = "\uD83D" ("\uDC66" / "\uDC67") Fitzpatrick_Modifier?

Heart
  = "\u2764" Emoji_Variant

Kiss
  = "\uD83D" "\uDC8B"

Kiss_Sequence
  = ManOrWoman zw Heart zw Kiss zw ManOrWoman

Couple_With_Heart_Sequence
  = ManOrWoman zw Heart zw ManOrWoman

Family_Sequence
  = ManOrWoman (zw ManOrWoman)? zw BoyOrGirl (zw BoyOrGirl)?

Left_Eye_Speech_Bubble_Sequence
  = "\uD83D" "\uDC41" zw "\uD83D" "\uDDE8"
