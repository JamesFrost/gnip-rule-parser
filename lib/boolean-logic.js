const operators =
{
  keyword: require('./operators/keyword')
};

exports.match = function(ast, tweetObject)
{
  return matchRuleObject(ast[0], tweetObject);
};

const matchRuleObject = function(rule, tweetObject)
{
  if (rule.name != 'boolean')
    return operators[rule.name](rule, tweetObject);

  const leftBranchResult = matchRuleObject(rule.leftBranch, tweetObject);
  const rightBranchResult = matchRuleObject(rule.rightBranch, tweetObject);

  switch (rule.value)
  {
    case 'AND':
      return leftBranchResult && rightBranchResult;
    case 'OR':
        return leftBranchResult || rightBranchResult;
  }
};