const assert = require( 'assert' );

const parser = require( './grammar.js' );

describe('gnip-rule-parser', function()
{
	// http://support.gnip.com/apis/powertrack2.0/rules.html
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

		it('The user who is posting a Tweet (username)', function()
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

		it('The user who is posting a Tweet (user id)', function()
		{
			const expectedAst = 
			[
				{
					name : "from",
					value : "3141592654"
				}
			];

			const actualAst = parser.parse( 'from:3141592654' );

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

	describe('List of Operators Examples', function()
	{
		describe('Emoji', function()
		{	
			it('Single Emoji', function()
			{
				const expectedAst = 
				[
					{
						name : "term",
						value : "🍕"
					}
				];

				const actualAst = parser.parse( '🍕' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Multiple Emoji', function()
			{
				const expectedAst = 
				[
					{
						name : "term",
						value : "I need 🍕"
					}
				];

				const actualAst = parser.parse( '"I need 🍕"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			// it('Emoji Variant', function()
			// {
			// 	const expectedAst = 
			// 	[
			// 		{
			// 			name : "term",
			// 			value : "\u2615"
			// 		}
			// 	];

			// 	const actualAst = parser.parse( '"\u2615"' );

			// 	assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			// });
		});


		describe('Exact Phrase Match', function()
		{	
			it('Basic', function()
			{
				const expectedAst = 
				[
					{
						name : 'boolean',
						value : 'AND',
						leftBranch :
						{
							name : 'term',
							value : 'call'
						},
						rightBranch : 
						{
							name : 'term',
							value : 'gnip'
						}
					}
				];

				const actualAst = parser.parse( 'call gnip' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			// it('Basic', function()
			// {
			// 	const expectedAst = 
			// 	[
			// 		{
			// 			name : "term",
			// 			value : "one/two"
			// 		}
			// 	];

			// 	const actualAst = parser.parse( '"one/two"' );

			// 	assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			// });
		});

		describe('Contains', function()
		{	
			it('No quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'contains',
						value : 'phone'
					}
				];

				const actualAst = parser.parse( 'contains:phone' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'contains',
						value : '$TWTR'
					}
				];

				const actualAst = parser.parse( 'contains:"$TWTR"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('From', function()
		{	
			it('User id', function()
			{
				const expectedAst = 
				[
					{
						name : 'from',
						value : '17200003'
					}
				];

				const actualAst = parser.parse( 'from:17200003' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('User handle', function()
			{
				const expectedAst = 
				[
					{
						name : 'from',
						value : 'mikesmith'
					}
				];

				const actualAst = parser.parse( 'from:mikesmith' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('To', function()
		{	
			it('User id', function()
			{
				const expectedAst = 
				[
					{
						name : 'to',
						value : '17200003'
					}
				];

				const actualAst = parser.parse( 'to:17200003' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('User handle', function()
			{
				const expectedAst = 
				[
					{
						name : 'to',
						value : 'mikesmith'
					}
				];

				const actualAst = parser.parse( 'to:mikesmith' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Url', function()
		{	
			it('No quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'url',
						value : 'gnip'
					}
				];

				const actualAst = parser.parse( 'url:gnip' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'url',
						value : 'big-data'
					}
				];

				const actualAst = parser.parse( 'url:"big-data"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Url Title', function()
		{	
			it('Url Title', function()
			{
				const expectedAst = 
				[
					{
						name : 'url_title',
						value : 'snow'
					}
				];

				const actualAst = parser.parse( 'url_title:snow' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Url Description', function()
		{	
			it('Url Description', function()
			{
				const expectedAst = 
				[
					{
						name : 'url_description',
						value : 'snow'
					}
				];

				const actualAst = parser.parse( 'url_description:snow' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Url Contains', function()
		{	
			it('No quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'url_contains',
						value : 'gnip'
					}
				];

				const actualAst = parser.parse( 'url_contains:gnip' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Quotes', function()
			{
				const expectedAst = 
				[
					{
						name : 'url_contains',
						value : 'how-to'
					}
				];

				const actualAst = parser.parse( 'url_contains:"how-to"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Links', function()
		{	
			it('Has Links', function()
			{
				const expectedAst = 
				[
					{
						name : 'has',
						value : 'links'
					}
				];

				const actualAst = parser.parse( 'has:links' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Sample', function()
		{	
			it('5%', function()
			{
				const expectedAst = 
				[
					{
						name : 'sample',
						value : '5'
					}
				];

				const actualAst = parser.parse( 'sample:5' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('50%', function()
			{
				const expectedAst = 
				[
					{
						name : 'sample',
						value : '50'
					}
				];

				const actualAst = parser.parse( 'sample:50' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Hashtag', function()
		{
			it('Hashtag', function()
			{	
				const expectedAst = 
				[
					{
						name : 'term',
						value : '#test'
					}
				];

				const actualAst = parser.parse( '#test' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );			
			});
		});

		describe('Bounding Box', function()
		{
			// TODO
		});

		describe('Userhandle', function()
		{
			it('Userhandle', function()
			{	
				const expectedAst = 
				[
					{
						name : 'term',
						value : '@_jamesfrost'
					}
				];

				const actualAst = parser.parse( '@_jamesfrost' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );			
			});
		});

		describe('Cashtag', function()
		{
			it('Cashtag', function()
			{	
				const expectedAst = 
				[
					{
						name : 'term',
						value : '$TWTR'
					}
				];

				const actualAst = parser.parse( '$TWTR' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );			
			});
		});

		describe('Bio', function()
		{
			it('Bio', function()
			{	
				const expectedAst = 
				[
					{
						name : 'bio',
						value : 'arsenal'
					}
				];

				const actualAst = parser.parse( 'bio:arsenal' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );			
			});
		});

		describe('Bio Name', function()
		{
			it('Bio Name', function()
			{	
				const expectedAst = 
				[
					{
						name : 'bio_name',
						value : 'smith'
					}
				];

				const actualAst = parser.parse( 'bio_name:smith' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );			
			});
		});
	});

	describe('Other Examples', function()
	{
		it('Keyword match', function()
		{	
			parser.parse( '(\"powertrack -operators\" OR (-\"streaming code\"~4 foo OR bar))' );
		});
	});

	// https://github.com/jeroenr/gnip-rule-validator/blob/master/src/test/scala/com/github/jeroenr/gnip/rule/validation/GnipRuleValidatorSpec.scala
});
