const assert = require( 'assert' );

const baseTweetObject = require('./../../data/tweet.json');

const parser = require('./../../../index');

exports.parse = function(rule)
{
  return parser.parse(rule);
};

exports.getTweetObject = function(attributes)
{
  return Object.assign(baseTweetObject, attributes);
};

exports.testAst = function(ast, tweet, expectedMatch)
{
  const actualMatch = parser.match(ast, tweet);

  assert.equal(actualMatch, expectedMatch);
};
