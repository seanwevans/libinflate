const assert = require('assert');
const { deflate, inflate } = require('../libinflate');

const inputStr = 'hello hello hello';
const input = Array.from(inputStr);
const { encodedData, huffmanTree } = deflate(input);
const outputArr = inflate(encodedData, huffmanTree);
const outputStr = outputArr.join('');

assert.strictEqual(outputStr, inputStr);
console.log('Compression followed by decompression was successful.');
