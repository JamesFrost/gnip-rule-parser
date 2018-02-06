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
          describe('matches', function()
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
      });
    });
  });
});
