const crypto = require('crypto');

function generateData(email) {
    // Convert email to hash
    const hash = crypto.createHash('md5').update(email).digest('hex');
    
    // Extract a numerical value from the hash
    const seed = parseInt(hash.slice(0, 8), 16);

    // Determine number of nodes and edges
    const numNodes = (seed % 6) + 5; // Number of nodes between 5 to 10
    const numEdges = Math.floor((seed % 6) * 1.5) + 3; // Number of edges between 3 to 8

    // Generate nodes
    const nodes = Array.from({length: numNodes}, (_, i) => String.fromCharCode(65 + i) + String.fromCharCode(65 + i));

    // Generate edges
    const edges = [];
    const usedPairs = new Set();
    while (edges.length < numEdges) {
        const from = nodes[Math.floor(Math.random() * numNodes)];
        const to = nodes[Math.floor(Math.random() * numNodes)];
        if (from !== to && !usedPairs.has(from + to)) {
            const cost = Math.random() * 10; // Random cost between 0 to 10
            edges.push({from, to, cost});
            usedPairs.add(from + to);
        }
    }

    return {nodes, edges};
}

// Example usage
const email = 'abc@email.com';
const {nodes, edges} = generateData(email);
console.log('Nodes:', nodes);
console.log('Edges:', edges);
