function lz77_compress(data, windowSize = 256) {
    let i = 0;
    let compressed = [];
    while (i < data.length) {
        let match = findLongestMatch(data, i, windowSize);
        if (match) {
            compressed.push({ distance: match.distance, length: match.length });
            i += match.length;
        } else {
            compressed.push({ byte: data[i] });
            i++;
        }
    }
    return compressed;
}

function findLongestMatch(data, currentPos, windowSize) {
    let start = Math.max(currentPos - windowSize, 0);
    let bestLength = 0;
    let bestDistance = 0;
    
    for (let i = start; i < currentPos; i++) {
        let length = 0;
        while (data[i + length] === data[currentPos + length] && currentPos + length < data.length) {
            length++;
        }
        if (length > bestLength) {
            bestLength = length;
            bestDistance = currentPos - i;
        }
    }
    
    if (bestLength > 0) {
        return { distance: bestDistance, length: bestLength };
    }
    return null;
}

function buildFrequencyTable(data) {
    let frequencies = {};
    for (let item of data) {
        if (item.byte !== undefined) {
            frequencies[item.byte] = (frequencies[item.byte] || 0) + 1;
        } else {
            let pair = `(${item.distance},${item.length})`;
            frequencies[pair] = (frequencies[pair] || 0) + 1;
        }
    }
    return frequencies;
}

function buildHuffmanTree(frequencies) {
    let nodes = [];
    for (let symbol in frequencies) {
        nodes.push({ symbol: symbol, freq: frequencies[symbol] });
    }
    
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        let left = nodes.shift();
        let right = nodes.shift();
        
        let newNode = {
            left: left,
            right: right,
            freq: left.freq + right.freq
        };
        nodes.push(newNode);
    }
    
    return nodes[0];
}

function generateHuffmanCodes(node, prefix = "", codeMap = {}) {
    if (node.symbol !== undefined) {
        codeMap[node.symbol] = prefix;
    } else {
        generateHuffmanCodes(node.left, prefix + "0", codeMap);
        generateHuffmanCodes(node.right, prefix + "1", codeMap);
    }
    return codeMap;
}

function huffmanEncode(data, codeMap) {
    let encoded = "";
    for (let item of data) {
        if (item.byte !== undefined) {
            encoded += codeMap[item.byte];
        } else {
            let pair = `(${item.distance},${item.length})`;
            encoded += codeMap[pair];
        }
    }
    return encoded;
}

function deflate(data) {
    let lz77Data = lz77_compress(data);
    let frequencies = buildFrequencyTable(lz77Data);
    let huffmanTree = buildHuffmanTree(frequencies);
    let huffmanCodes = generateHuffmanCodes(huffmanTree);
    let encodedData = huffmanEncode(lz77Data, huffmanCodes);
    return { encodedData, huffmanTree };
}

function huffmanDecode(encodedData, huffmanTree) {
    let decoded = [];
    let node = huffmanTree;
    for (let bit of encodedData) {
        if (bit === "0") {
            node = node.left;
        } else {
            node = node.right;
        }

        if (node.symbol !== undefined) {
            decoded.push(node.symbol);
            node = huffmanTree;  // Reset to the root for the next symbol
        }
    }
    return decoded;
}

function lz77_decompress(data) {
    let decompressed = [];
    for (let item of data) {
        if (item.byte !== undefined) {
            decompressed.push(item.byte);
        } else {
            let start = decompressed.length - item.distance;
            for (let i = 0; i < item.length; i++) {
                decompressed.push(decompressed[start + i]);
            }
        }
    }
    return decompressed;
}

function inflate(encodedData, huffmanTree) {
    let lz77Data = huffmanDecode(encodedData, huffmanTree);
    let originalData = lz77_decompress(lz77Data);
    return originalData;
}

module.exports = {
    inflate: inflate,
    deflate: deflate
};
