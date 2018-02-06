const grammar = require('./lib/grammar');
const booleanLogic = require('./lib/boolean-logic');

exports.parse = function(rule)
{
  return grammar.parse(rule);
};

exports.match = function(ast, tweetObject)
{
  return booleanLogic.match(ast, tweetObject);
};
