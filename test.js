const assert = require('assert');
const { deflate, inflate } = require('./libinflate');

function roundTrip(str) {
  const input = Array.from(str);
  const { encodedData, huffmanTree } = deflate(input);
  const outputArray = inflate(encodedData, huffmanTree);
  return outputArray.join('');
}

assert.strictEqual(roundTrip('The quick brown fox jumps over the lazy dog'),
                     'The quick brown fox jumps over the lazy dog');
assert.strictEqual(roundTrip('hello hello hello'), 'hello hello hello');

console.log('All tests passed');
