const testUtil = require( './test-util.js' );

describe('#match From', function()
{
  describe('from:17200003', function()
  {
    const rule = 'from:17200003';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;

      it('All original tweets from user 17200003', function()
      {
        const tweetData =
        {
          user:
          {
            id: 17200003,
            id_str: "17200003"
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });

    describe('doesn\'t match', function()
    {
      // TODO
    });
  });
});
