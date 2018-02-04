const grammar = require('./lib/grammar');

exports.parse = function(rule)
{
  return grammar.parse(rule);
};
