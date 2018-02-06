module.exports = function(rule, tweetData)
{
  return tweetData.user.id == rule.value;
};
