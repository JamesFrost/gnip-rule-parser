const testUtil = require( './test-util.js' );

describe('#match Contains', function()
{
  describe('contains:phone', function()
  {
    const rule = 'contains:phone';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;
      const tweetData =
      [
        {
          text: 'Where is my phone?'
        },
        {
          text: 'That\'s a telephone'
        }
      ];

      tweetData.map(function(thisTweetData)
      {
        it(thisTweetData.text, function()
        {
          testUtil.testAst(ast, testUtil.getTweetObject(thisTweetData), expectedMatch)
        });
      });
    });

    describe('doesn\'t match', function()
    {
      const expectedMatch = false;
      const tweetData =
      [
        {
          text: 'Pongo la telephono.'
        },
        {
          text: 'What is the ph0ne number?'
        }
      ];

      tweetData.map(function(thisTweetData)
      {
        it(thisTweetData.text, function()
        {
          testUtil.testAst(ast, testUtil.getTweetObject(thisTweetData), expectedMatch)
        });
      });
    });
  });

  describe('contains:"$TWTR"', function()
  {
    const rule = 'contains:"$TWTR"';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;
      const tweetData =
      [
        {
          text: 'How much is $TWTR stock?'
        },
        {
          text: 'How much is $TWTRstock?'
        },
        {
          text: 'Headlines with $GOOG$TWTR$FB today	'
        }
      ];

      tweetData.map(function(thisTweetData)
      {
        it(thisTweetData.text, function()
        {
          testUtil.testAst(ast, testUtil.getTweetObject(thisTweetData), expectedMatch)
        });
      });
    });

    describe('doesn\'t match', function()
    {
      const expectedMatch = false;
      const tweetData =
      [
        {
          text: 'Just setting up my TWTR Just setting up my $ TWTR'
        }
      ];

      tweetData.map(function(thisTweetData)
      {
        it(thisTweetData.text, function()
        {
          testUtil.testAst(ast, testUtil.getTweetObject(thisTweetData), expectedMatch)
        });
      });
    });
  });
});
