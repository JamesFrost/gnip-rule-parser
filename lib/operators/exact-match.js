module.exports = function(rule, tweetData)
{
  const regexString = '\\b' + rule.value + '\\b';
  const regex = new RegExp(regexString)
  return tweetData.text.match(regex) != null;
};
