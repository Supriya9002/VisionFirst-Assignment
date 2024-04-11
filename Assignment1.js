function shortestPath(edges, start, end) {
    const graph = {};
    edges.forEach(edge => {
        if (!graph[edge.from]) {
            graph[edge.from] = [];
        }
        graph[edge.from].push({to: edge.to, weight: edge.weight});
    });

    const visited = new Set();
    const distances = {};
    const previous = {};
    const queue = new PriorityQueue();

    for (let node in graph) {
        distances[node] = node === start ? 0 : Infinity;
        previous[node] = null; // Initialize previous object for all nodes
        queue.enqueue(node, distances[node]);
    }

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();
        if (currentNode === end) {
            const path = [];
            let current = end;
            while (current !== null) {
                path.push(current);
                current = previous[current];
            }
            return path.reverse();
        }
        if (visited.has(currentNode)) continue;
        visited.add(currentNode);
        graph[currentNode].forEach(neighbor => {
            const distance = distances[currentNode] + neighbor.weight;
            if (distance < distances[neighbor.to]) {
                distances[neighbor.to] = distance;
                previous[neighbor.to] = currentNode;
                queue.enqueue(neighbor.to, distance);
            }
        });
    }

    return null;
}
