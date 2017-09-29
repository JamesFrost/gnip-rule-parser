# gnip-rule-parser [![Build Status](https://travis-ci.org/JamesFrost/gnip-rule-parser.svg?branch=master)](https://travis-ci.org/JamesFrost/gnip-rule-parser)
Parse GNIP rules into an abstract syntax tree. 

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

var ast = parser.parse( 'happy OR party' );

console.log( ast ); 
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
