module.exports = function(rule, tweetData)
{
  return tweetData.lang == rule.value;
};
