
function hashCode(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    return hash;
}

// Function to generate data based on student's email ID
function generateData(email) {
    // Convert email to hash or unique identifier
    const hash = hashCode(email);

    // Extract a numerical value from the hash
    const seed = Math.abs(hash) % 10000; // Assuming hash can be negative

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

// Example email for testing
const email = 'abc@email.com';

// Generate data using the student's email ID
const {nodes, edges} = generateData(email);
console.log('Generated Nodes:', nodes);
console.log('Generated Edges:', edges);

// Example usage to test the program
const startNode = nodes[0]; 
const endNode = nodes[nodes.length - 1];
const shortestRoute = shortestPath(edges, startNode, endNode);
console.log('Shortest Route:', shortestRoute);
