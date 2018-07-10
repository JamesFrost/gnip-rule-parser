const testUtil = require( './test-util.js' );

describe('#match Language', function()
{
  describe('lang:fr', function()
  {
    const rule = 'lang:fr';
    const ast = testUtil.parse(rule);

    describe('matches', function()
    {
      const expectedMatch = true;

      it('Tweet where lang set to fr', function()
      {
        const tweetData =
        {
          lang: 'fr'
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });

    describe('doesn\'t match', function()
    {
      const expectedMatch = false;

      it('Tweet where lang set to en', function()
      {
        const tweetData =
        {
          lang: 'en'
        };

        testUtil.testAst(ast, testUtil.getTweetObject(tweetData), expectedMatch);
      });
    });
  });
});
