# libINFLATE

A simple implementation of the INFLATE (and DEFLATE) algorithm in JavaScript.

## Installation

```bash
npm install libINFLATE
```

## Usage

`deflate` compresses an array of bytes and returns an object containing the encoded bit string and the Huffman tree used during compression. `inflate` expects those two values in order to recreate the original data.

```javascript
const { deflate, inflate } = require('libINFLATE');

const input = [/* array of byte values */];
const { encodedData, huffmanTree } = deflate(input);
const output = inflate(encodedData, huffmanTree);
```

### Example

Below is a small example that compresses a string and then decompresses it back to verify the output.

```javascript
const { deflate, inflate } = require('./libinflate');

const text = 'hello world';
const data = Array.from(Buffer.from(text));

const { encodedData, huffmanTree } = deflate(data);
const resultBytes = inflate(encodedData, huffmanTree);
const resultText = Buffer.from(resultBytes).toString();

console.log(resultText); // -> 'hello world'
```
