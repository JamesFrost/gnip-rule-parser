const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

module.exports = function(rule, tweetData)
{
  return tokenizer.tokenize(tweetData.text.toLowerCase()).indexOf(rule.value.toLowerCase()) != -1;
};
