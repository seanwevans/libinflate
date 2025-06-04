# libINFLATE

A simple implementation of the INFLATE (and DEFLATE) algorithm in JavaScript.

## Installation

```bash
npm install libINFLATE```


## Usage

```javascript
const { inflate, deflate } = require('libINFLATE');

// Prepare an array of bytes/characters to compress
const input = Array.from('example text');

// deflate now returns the encoded data and the Huffman tree
const { encodedData, huffmanTree } = deflate(input);

// pass the tree back to `inflate` to get the original data
const output = inflate(encodedData, huffmanTree).join('');
```
