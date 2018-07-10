const testUtil = require( './test-util.js' );

describe('#match Exact Phrase Match', function()
{
  describe('"call gnip"', function()
  {
    const rule = '"call gnip"';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;
      const tweetData =
      [
        {
          text: 'I need to call gnip, again'
        },
        {
          text: 'I need to call gnip again'
        },
        {
          text: 'call gnip'
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
          text: 'I called gnip'
        },
        {
          text: 'call  gnip'
        },
        {
          text: 'call-gnip'
        },
        {
          text: 'call_gnip'
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

  // TODO: add 'one/two' example
});
