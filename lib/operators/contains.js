module.exports = function(rule, tweetData)
{
  return tweetData.text.toLowerCase().indexOf(rule.value.toLowerCase()) != -1;
};
