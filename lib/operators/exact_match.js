module.exports = function(rule, tweetData)
{
  const regexString = '\\b' + rule.value + '\\b';
  const regex = new RegExp(regexString, 'i');
  return tweetData.text.match(regex) != null;
};
