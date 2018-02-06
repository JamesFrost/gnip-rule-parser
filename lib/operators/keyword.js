const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

module.exports = function(rule, tweetData)
{
  return tokenizer.tokenize(tweetData.text).indexOf(rule.value) != -1;
};
