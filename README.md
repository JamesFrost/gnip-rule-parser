# gnip-rule-parser [![Build Status](https://travis-ci.org/JamesFrost/gnip-rule-parser.svg?branch=master)](https://travis-ci.org/JamesFrost/gnip-rule-parser)
Parse [GNIP PowerTrack/Search rules](https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview) into an abstract syntax tree. 

[Try the online demo here](http://jamesfrost.me/gnip-rule-parser/).

*If you want to validate rules, I strongly suggest you use the [validation API endpoint](https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/powertrack-stream).*

## Getting Started
### Installation
```bash
npm install --save gnip-rule-parser
```
### Running The Tests
```bash
mocha
```
### Usage
```js
var parser = require( 'gnip-rule-parser' );

try
{
  var ast = parser.parse( 'happy OR party' );

  console.log( ast ); 
}
catch( err )
{ 
  // Rule isn't valid
}
```
#### Output
```bash
[ 
  {
    name: 'boolean',
    value: 'OR',
    leftBranch: 
    { 
      name: 'keyword', 
      value: 'happy' 
    },
    rightBranch: 
    { 
      name: 'keyword', 
      value: 'party' 
    } 
  } 
]
```
## License
MIT
