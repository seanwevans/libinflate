# libINFLATE

A simple implementation of the INFLATE (and DEFLATE) algorithm in JavaScript.

## Installation

```bash
npm install libINFLATE
```

## Usage

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
