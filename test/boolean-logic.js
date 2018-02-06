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
  });
});
