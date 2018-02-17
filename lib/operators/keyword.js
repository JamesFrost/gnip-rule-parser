module.exports = function(rule, tweetData)
{
  return tweetData.text.toLowerCase().split(/(\s|[^\w]|_)+/).indexOf(rule.value.toLowerCase()) != -1;
};
