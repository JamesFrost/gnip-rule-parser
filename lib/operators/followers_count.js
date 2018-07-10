module.exports = function(rule, tweetData)
{
  if(!isNaN(rule.value))
    return tweetData.user.followers_count >= rule.value;

  return tweetData.user.followers_count >= rule.value.lowerBound && tweetData.user.followers_count <= rule.value.upperBound;
};
