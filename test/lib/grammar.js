const assert = require( 'assert' );

const parser = require( './../../index' );

describe('#parse', function()
{
	// http://support.gnip.com/apis/powertrack2.0/rules.html
	describe('Documentation Examples', function()
	{
		it('Keyword match', function()
		{
			const expectedAst =
			[
				{
					name : "keyword",
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
						name : 'keyword',
						value : 'happy'
					},
					rightBranch :
					{
						name : 'keyword',
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
						name: "keyword",
						value: "happy"
					},
					rightBranch: {
						name: "keyword",
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
						name: "keyword",
						value: "happy"
					},
					rightBranch: {
						name: "keyword",
						value: "birthday"
					}
				}
			];

			const actualAst = parser.parse( 'happy -birthday' );

			assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
		});

		it('Grouping with parentheses', function()
		{
			parser.parse( '(happy OR party) (holiday OR house) -(birthday OR democratic OR republican)' );
		});

		it('Exact match', function()
		{
			const expectedAst =
			[
				{
					name : "exact_match",
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
						name : "keyword",
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
						name : "exact_match",
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
			// 			name : "keyword",
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
							name : 'keyword',
							value : 'call'
						},
						rightBranch :
						{
							name : 'keyword',
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
			// 			name : "keyword",
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
						name : 'keyword',
						value : '#test'
					}
				];

				const actualAst = parser.parse( '#test' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Bounding Box', function()
		{
			it('Bounding Box', function()
			{
				const expectedAst =
				[
					{
						name : 'bounding_box',
						value :
						{
				            "eastLong": "-105.178505",
				            "northLat": "40.09455",
				            "southLat": "39.964069",
				            "westLong": "-105.301758"
			           }
					}
				];

				const actualAst = parser.parse( 'bounding_box:[-105.301758 39.964069 -105.178505 40.09455]' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Userhandle', function()
		{
			it('Userhandle', function()
			{
				const expectedAst =
				[
					{
						name : 'keyword',
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
						name : 'keyword',
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

		describe('Retweets Of', function()
		{
			it('Userhandle', function()
			{
				const expectedAst =
				[
					{
						name : 'retweets_of',
						value : '_jamesfrost'
					}
				];

				const actualAst = parser.parse( 'retweets_of:_jamesfrost' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Userid', function()
			{
				const expectedAst =
				[
					{
						name : 'retweets_of',
						value : '12345'
					}
				];

				const actualAst = parser.parse( 'retweets_of:12345' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Bio Location', function()
		{
			it('Bio Location', function()
			{
				const expectedAst =
				[
					{
						name : 'bio_location',
						value : 'cardiff'
					}
				];

				const actualAst = parser.parse( 'bio_location:cardiff' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Timezone', function()
		{
			it('City', function()
			{
				const expectedAst =
				[
					{
						name : 'time_zone',
						value : 'Dublin'
					}
				];

				const actualAst = parser.parse( 'time_zone:"Dublin"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Timezone', function()
			{
				const expectedAst =
				[
					{
						name : 'time_zone',
						value : 'Eastern Time (US & Canada)'
					}
				];

				const actualAst = parser.parse( 'time_zone:"Eastern Time (US & Canada)"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Statuses Count', function()
		{
			it('Number', function()
			{
				const expectedAst =
				[
					{
						name : 'statuses_count',
						value : '1000'
					}
				];

				const actualAst = parser.parse( 'statuses_count:1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Range', function()
			{
				const expectedAst =
				[
					{
						name : 'statuses_count',
						value :
						{
							lowerBound:100,
							upperBound:1000,
						}
					}
				];

				const actualAst = parser.parse( 'statuses_count:100..1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Followers Count', function()
		{
			it('Number', function()
			{
				const expectedAst =
				[
					{
						name : 'followers_count',
						value : '1000'
					}
				];

				const actualAst = parser.parse( 'followers_count:1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Range', function()
			{
				const expectedAst =
				[
					{
						name : 'followers_count',
						value :
						{
							lowerBound:100,
							upperBound:1000,
						}
					}
				];

				const actualAst = parser.parse( 'followers_count:100..1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Friends Count', function()
		{
			it('Number', function()
			{
				const expectedAst =
				[
					{
						name : 'friends_count',
						value : '1000'
					}
				];

				const actualAst = parser.parse( 'friends_count:1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Range', function()
			{
				const expectedAst =
				[
					{
						name : 'friends_count',
						value :
						{
							lowerBound:100,
							upperBound:1000,
						}
					}
				];

				const actualAst = parser.parse( 'friends_count:100..1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Listed Count', function()
		{
			it('Number', function()
			{
				const expectedAst =
				[
					{
						name : 'listed_count',
						value : '1000'
					}
				];

				const actualAst = parser.parse( 'listed_count:1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Range', function()
			{
				const expectedAst =
				[
					{
						name : 'listed_count',
						value :
						{
							lowerBound:100,
							upperBound:1000,
						}
					}
				];

				const actualAst = parser.parse( 'listed_count:100..1000' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Is Verified', function()
		{
			it('Is Verified', function()
			{
				const expectedAst =
				[
					{
						name : 'is',
						value : 'verified'
					}
				];

				const actualAst = parser.parse( 'is:verified' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Source', function()
		{
			it('No quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'source',
						value : 'web'
					}
				];

				const actualAst = parser.parse( 'source:web' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'source',
						value : 'Twitter for iPhone'
					}
				];

				const actualAst = parser.parse( 'source:"Twitter for iPhone"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Place', function()
		{
			it('No quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'place',
						value : 'Florida'
					}
				];

				const actualAst = parser.parse( 'place:Florida' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'place',
						value : 'Rio de Janeiro'
					}
				];

				const actualAst = parser.parse( 'place:"Rio de Janeiro"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Place ID', function()
			{
				const expectedAst =
				[
					{
						name : 'place',
						value : 'fd70c22040963ac7'
					}
				];

				const actualAst = parser.parse( 'place:fd70c22040963ac7' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Place Contains', function()
		{
			it('No quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'place_contains',
						value : 'USA'
					}
				];

				const actualAst = parser.parse( 'place_contains:USA' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Country Code', function()
		{
			it('Country Code', function()
			{
				const expectedAst =
				[
					{
						name : 'country_code',
						value : 'GB'
					}
				];

				const actualAst = parser.parse( 'country_code:GB' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});

			it('Profile Country Code', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_country_code',
						value : 'GB'
					}
				];

				const actualAst = parser.parse( 'profile_country_code:GB' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Geo', function()
		{
			it('Has Geo', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'geo'
					}
				];

				const actualAst = parser.parse( 'has:geo' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Mentions', function()
		{
			it('Has Mentions', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'mentions'
					}
				];

				const actualAst = parser.parse( 'has:mentions' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Hashtags', function()
		{
			it('Has Hashtags', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'hashtags'
					}
				];

				const actualAst = parser.parse( 'has:hashtags' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Media', function()
		{
			it('Has Media', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'media'
					}
				];

				const actualAst = parser.parse( 'has:media' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Is Retweet', function()
		{
			it('Is Retweet', function()
			{
				const expectedAst =
				[
					{
						name : 'is',
						value : 'retweet'
					}
				];

				const actualAst = parser.parse( 'is:retweet' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Retweets Of Status ID', function()
		{
			it('Retweets Of Status ID', function()
			{
				const expectedAst =
				[
					{
						name : 'retweets_of_status_id',
						value : '365697420392280064'
					}
				];

				const actualAst = parser.parse( 'retweets_of_status_id:365697420392280064' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('In Reply To Status ID', function()
		{
			it('In Reply To Status ID', function()
			{
				const expectedAst =
				[
					{
						name : 'in_reply_to_status_id',
						value : '365697420392280064'
					}
				];

				const actualAst = parser.parse( 'in_reply_to_status_id:365697420392280064' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Profile Geo', function()
		{
			it('Has Profile Geo', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'profile_geo'
					}
				];

				const actualAst = parser.parse( 'has:profile_geo' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Profile Geo Locality', function()
		{
			it('Has Profile Geo Locality', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'profile_geo_locality'
					}
				];

				const actualAst = parser.parse( 'has:profile_geo_locality' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Profile Geo SubRegion', function()
		{
			it('Has Profile Geo SubRegion', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'profile_geo_subregion'
					}
				];

				const actualAst = parser.parse( 'has:profile_geo_subregion' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Has Profile Geo Region', function()
		{
			it('Has Profile Geo Region', function()
			{
				const expectedAst =
				[
					{
						name : 'has',
						value : 'profile_geo_region'
					}
				];

				const actualAst = parser.parse( 'has:profile_geo_region' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Point Radious', function()
		{
			it('Profile Point Radious', function()
			{
				const expectedAst =
				[
					{
						name : "profile_point_radius",
						value :
						{
							latitude : '-105.27346517',
							longitude : '40.01924738',
							distance : '10.0mi'
						}
					}
				];

				const actualAst = parser.parse( 'profile_point_radius:[-105.27346517 40.01924738 10.0mi]' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Bounding Box', function()
		{
			it('Profile Bounding Box', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_bounding_box',
						value :
						{
				            "eastLong": "-105.178505",
				            "northLat": "40.09455",
				            "southLat": "39.964069",
				            "westLong": "-105.301758"
			           }
					}
				];

				const actualAst = parser.parse( 'profile_bounding_box: [-105.301758 39.964069 -105.178505 40.09455]' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Region', function()
		{
			it('Quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_region',
						value : 'New York'
					}
				];

				const actualAst = parser.parse( 'profile_region:"New York"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Region Contains', function()
		{
			it('Profile Region Contains', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_region_contains',
						value : 'carolina'
					}
				];

				const actualAst = parser.parse( 'profile_region_contains:carolina' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Locality', function()
		{
			it('Profile Locality', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_locality',
						value : 'boulder'
					}
				];

				const actualAst = parser.parse( 'profile_locality:boulder' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile Locality Contains', function()
		{
			it('Profile Locality Contains', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_locality_contains',
						value : 'haven'
					}
				];

				const actualAst = parser.parse( 'profile_locality_contains:haven' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile SubRegion', function()
		{
			it('Quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_subregion',
						value : 'San Francisco County'
					}
				];

				const actualAst = parser.parse( 'profile_subregion:"San Francisco County"' );

				assert.deepEqual( actualAst, expectedAst, 'Abstract Syntax Tree incorrect.' );
			});
		});

		describe('Profile SubRegion Contains', function()
		{
			it('No Quotes', function()
			{
				const expectedAst =
				[
					{
						name : 'profile_subregion_contains',
						value : 'jefferson'
					}
				];

				const actualAst = parser.parse( 'profile_subregion_contains:jefferson' );

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
