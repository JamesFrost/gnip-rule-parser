const assert = require( 'assert' );

const parser = require( './grammar.js' );

describe('gnip-rule-parser', function()
{
	describe('Documentation Examples', function()
	{
		it('Keyword match', function()
		{	
			const expectedAst = 
			[
				{
					name : "term",
					value : "happy"
				}
			];

			const actualAst = parser.parse( 'happy' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('ANDing terms with white space', function()
		{
			const expectedAst = 
			[
				{
					name : 'boolean',
					value : 'AND',
					leftBranch : 
					{
						name : 'term',
						value : 'happy'
					},
					rightBranch :
					{
						name : 'term',
						value : 'party'
					}
				}
			];

			const actualAst = parser.parse( 'happy party' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('ORing terms with upper-case OR', function()
		{
			const expectedAst = 
			[
				{
					name: "boolean",
					value: "OR",
					leftBranch: {
						name: "term",
						value: "happy"
					},
					rightBranch: {
						name: "term",
						value: "party"
					}
				}
			];

			const actualAst = parser.parse( 'happy OR party' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Negating terms', function()
		{
			const expectedAst = 
			[
				{
					name: "boolean",
					value: "NOT",
					leftBranch: {
						name: "term",
						value: "happy"
					},
					rightBranch: {
						name: "term",
						value: "birthday"
					}
				}
			];

			const actualAst = parser.parse( 'happy -birthday' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Grouping with parentheses', function()
		{
			// TODO : AST test
			parser.parse( '(happy OR party) (holiday OR house) -(birthday OR democratic OR republican)' );
		});

		it('Exact match', function()
		{
			// TODO - Differ ast for exact match?
			const expectedAst = 
			[
				{
					name : "term",
					value : "happy birthday"
				}
			];

			const actualAst = parser.parse( '"happy birthday"' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Substring match', function()
		{
			const expectedAst = 
			[
				{
					name : "contains",
					value : "day"
				}
			];

			const actualAst = parser.parse( 'contains:day' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Proximity match', function()
		{
			const expectedAst = 
			[
				{
					name : "proximity",
					value : 
					{
						term : "happy birthday",
						distance : 3
					}
				}
			];

			const actualAst = parser.parse( '"happy birthday"~3' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('The user who is posting a Tweet', function()
		{
			const expectedAst = 
			[
				{
					name : "from",
					value : "user"
				}
			];

			const actualAst = parser.parse( 'from:user' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Geo-tagged Tweets within 10 miles of Pearl St. in Boulder, CO', function()
		{
			const expectedAst = 
			[
				{
					name : "point_radius",
					value :
					{
						latitude : '-105.27346517',
						longitude : '40.01924738',
						distance : '10.0mi'
					}
				}
			];

			const actualAst = parser.parse( 'point_radius:[-105.27346517 40.01924738 10.0mi]' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Putting it all together', function()
		{
			parser.parse( '(happy OR party) (holiday OR house OR "new year\'s eve") point_radius:[-105.27346517 40.01924738 10.0mi] lang:en -(birthday OR democratic OR republican)');
		});
	});
});
