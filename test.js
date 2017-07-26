const assert = require( 'assert' );

describe('gnip-rule-parser', function()
{
	const parser = require( './grammar.js' );

	it('Keyword match', function()
	{
		parser.parse( 'happy' );
	});

	it('ANDing terms with white space', function()
	{
		parser.parse( 'happy party' );
	});

	it('ORing terms with upper-case OR', function()
	{
		parser.parse( 'happy OR party' );
	});

	it('Negating terms', function()
	{
		parser.parse( 'happy -birthday' );
	});

	it('Grouping with parentheses', function()
	{
		parser.parse( '(happy OR party) (holiday OR house) -(birthday OR democratic OR republican)' );
	});

	it('Exact match', function()
	{
		parser.parse( '"happy birthday"' );
	});

	it('Substring match', function()
	{
		parser.parse( 'contains:day' );
	});

	it('Proximity match', function()
	{
		parser.parse( '"happy birthday"~3' );
	});

	it('The user who is posting a Tweet', function()
	{
		parser.parse( 'from:user' );
	});

	it('Geo-tagged Tweets within 10 miles of Pearl St. in Boulder, CO', function()
	{
		parser.parse( 'point_radius:[-105.27346517 40.01924738 10.0mi]' );
	});

	it('Putting it all together', function()
	{
		parser.parse( '(happy OR party) (holiday OR house OR "new year\'s eve") point_radius:[-105.27346517 40.01924738 10.0mi] lang:en -(birthday OR democratic OR republican)');
	});
});
