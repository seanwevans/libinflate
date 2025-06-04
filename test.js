const assert = require('assert');
const { deflate, inflate } = require('./libinflate');

const input = 'The quick brown fox jumps over the lazy dog';

const { encodedData, huffmanTree } = deflate(input);
const outputArray = inflate(encodedData, huffmanTree);
const output = outputArray.join('');

assert.strictEqual(output, input);
console.log('Test passed');
