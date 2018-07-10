const testUtil = require( './test-util.js' );

describe('#match Followers Count', function()
{
  describe('followers_count:1000', function()
  {
    const rule = 'followers_count:1000';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;

      it('Tweets that have followers_count == 1000', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:1000
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });

      it('Tweets that have followers_count == 1000000', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:1000000
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });

    describe('doesn\'t match', function()
    {
      const expectedMatch = false;

      it('Tweets that have followers_count == 999', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:999
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });

      it('Tweets that have followers_count == 100', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:100
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });
  });

  describe('followers_count:1000..10000', function()
  {
    const rule = 'followers_count:1000..10000';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;

      it('Tweets that have followers_count == 1000', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:1000
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });

      it('Tweets that have followers_count == 6814', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:6814
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });

      it('Tweets that have followers_count == 10000', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:10000
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });

    describe('doesn\'t match', function()
    {
      const expectedMatch = false;

      it('Tweets that have followers_count == 999', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:999
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });

      it('Tweets that have followers_count == 10001', function()
      {
        const tweetData =
        {
          user:
          {
            followers_count:100
          }
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });
  });
});
