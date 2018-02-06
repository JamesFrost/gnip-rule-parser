const assert = require( 'assert' );

const baseTweetObject = require('./data/tweet.json');

const parser = require( './../index' );

const getTweetObject = function(attributes)
{
  return Object.assign(baseTweetObject, attributes);
};

const testAst = function(ast, tweet, expectedMatch)
{
  const actualMatch = parser.match(ast, tweet);

  assert.equal(actualMatch, expectedMatch);
};

describe('#match', function()
{
  // http://support.gnip.com/apis/powertrack2.0/rules.html
  describe('Documentation Examples', function()
  {
    describe('Keyword', function()
    {
      describe('gnip', function()
      {
        const rule = 'gnip';
        const ast = parser.parse(rule);

        describe('matches', function()
        {
          const expectedMatch = true;
          const tweetData =
          [
            {
              text: 'I need to call gnip'
            },
            {
              text: 'Check out gnip\'s documentation.'
            },
            {
              text: 'I love the @gnip blog.'
            },
            {
              text: 'Check out Gnip.'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });

        describe('doesn\'t match', function()
        {
          const expectedMatch = false;
          const tweetData =
          [
            {
              text: '#gniprocks'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });
      });

      describe('cola', function()
      {
        const rule = 'cola';
        const ast = parser.parse(rule);

        describe('matches', function()
        {
          const expectedMatch = true;
          const tweetData =
          [
            {
              text: 'Ice cold cola on a hot day'
            },
            {
              text: 'I like coca-cola!'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });

        describe('doesn\'t match', function()
        {
          const expectedMatch = false;
          const tweetData =
          [
            {
              text: 'I like cocacola!'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });
      });

      describe('snow', function()
      {
        const rule = 'snow';
        const ast = parser.parse(rule);

        describe('matches', function()
        {
          const expectedMatch = true;
          const tweetData =
          [
            {
              text: 'please let it snow!'
            },
            {
              text: 'https://en.wikipedia.org/wiki/Snow'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });

        describe('doesn\'t match', function()
        {
          const expectedMatch = false;
          const tweetData =
          [
            {
              text: 'it is finally snowing!'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });
      });

      describe('Coachella', function()
      {
        const rule = 'Coachella';
        const ast = parser.parse(rule);

        describe('matches', function()
        {
          const expectedMatch = true;
          const tweetData =
          [
            {
              text: 'Hanging out at #coachella'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });

        describe('doesn\'t match', function()
        {
          const expectedMatch = false;
          const tweetData =
          [
            {
              text: 'NEW.PICS.FROM.COACHELLA2015!'
            }
          ];

          tweetData.map(function(thisTweetData)
          {
            it(thisTweetData.text, function()
            {
              testAst(ast, getTweetObject(thisTweetData), expectedMatch)
            });
          });
        });
      });
    });

    describe('Emoji', function()
    {
      // TODO
    });

    describe('Exact Phrase Match', function()
    {
      // TODO
    });

    describe('Proximity Operator', function()
    {
      // TODO
    });

    describe('Contains', function()
    {
      // TODO
    });

    describe('From', function()
    {
      // TODO
    });

    describe('To', function()
    {
      // TODO
    });

    describe('Url', function()
    {
      // TODO
    });

    describe('Url Title', function()
    {
      // TODO
    });

    describe('Url Description', function()
    {
      // TODO
    });

    describe('Url Contains', function()
    {
      // TODO
    });

    describe('Has Links', function()
    {
      // TODO
    });

    describe('Sample', function()
    {
      // TODO
    });

    describe('#', function()
    {
      // TODO
    });

    describe('Point Radius', function()
    {
      // TODO
    });

    describe('Bounding Box', function()
    {
      // TODO
    });

    describe('@', function()
    {
      // TODO
    });

    describe('$', function()
    {
      // TODO
    });

    describe('Bio', function()
    {
      // TODO
    });

    describe('Bio Name', function()
    {
      // TODO
    });

    describe('Retweets Of', function()
    {
      // TODO
    });

    describe('Language', function()
    {
      // TODO
    });

    describe('Bio Location', function()
    {
      // TODO
    });

    describe('Time Zone', function()
    {
      // TODO
    });

    describe('Statuses Count', function()
    {
      // TODO
    });

    describe('Followers Count', function()
    {
      // TODO
    });

    describe('Friends Count', function()
    {
      // TODO
    });

    describe('Listed Count', function()
    {
      // TODO
    });

    describe('Is Verified', function()
    {
      // TODO
    });

    describe('Source', function()
    {
      // TODO
    });

    describe('Place', function()
    {
      // TODO
    });

    describe('Place Country', function()
    {
      // TODO
    });

    describe('Has Geo', function()
    {
      // TODO
    });

    describe('Has Mentions', function()
    {
      // TODO
    });

    describe('Has Hashtags', function()
    {
      // TODO
    });

    describe('Has Images', function()
    {
      // TODO
    });

    describe('Has Videos', function()
    {
      // TODO
    });

    describe('Has Media', function()
    {
      // TODO
    });

    describe('Has Symbols', function()
    {
      // TODO
    });

    describe('Is Retweet', function()
    {
      // TODO
    });

    describe('Is Quote', function()
    {
      // TODO
    });

    describe('Retweet Of Status', function()
    {
      // TODO
    });

    describe('In Reply To Status', function()
    {
      // TODO
    });

    describe('Has Profile Geo', function()
    {
      // TODO
    });

    describe('Profile Point Radius', function()
    {
      // TODO
    });

    describe('Profile Bounding Box', function()
    {
      // TODO
    });

    describe('Profile Country', function()
    {
      // TODO
    });

    describe('Profile Region', function()
    {
      // TODO
    });

    describe('Profile Locality', function()
    {
      // TODO
    });

    describe('Profile Subregion', function()
    {
      // TODO
    });
  });
});
