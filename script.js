// script.js
const gridSize = 10;
const grid = document.getElementById("grid");
let startCell = null;
let endCell = null;
let algorithm = "dijkstra"; // Default algorithm

// Create the grid
for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    // Click event to set start, end, or obstacle
    cell.addEventListener("click", () => {
        if (!startCell) {
            cell.classList.add("start");
            startCell = cell;
        } else if (!endCell && cell !== startCell) {
            cell.classList.add("end");
            endCell = cell;
        } else if (cell !== startCell && cell !== endCell) {
            cell.classList.toggle("obstacle");
        }
    });

    grid.appendChild(cell);
}

// Reset Grid
function resetGrid() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.className = "cell";
    });
    startCell = null;
    endCell = null;
}

// Select Algorithm
function setAlgorithm(algo) {
    algorithm = algo;
}

// Find Path
function findPath() {
    if (!startCell || !endCell) {
        alert("Set start and end points first!");
        return;
    }

    if (algorithm === "dijkstra") {
        dijkstra();
    } else {
        astar();
    }
}

// Dijkstra's Algorithm
function dijkstra() {
    let queue = [{ cell: startCell, cost: 0 }];
    let visited = new Map();
    visited.set(startCell, null);

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        let { cell, cost } = queue.shift();
        if (cell === endCell) {
            animatePath(visited);
            return;
        }
        getNeighbors(cell).forEach(neighbor => {
            if (!visited.has(neighbor) && !neighbor.classList.contains("obstacle")) {
                queue.push({ cell: neighbor, cost: cost + 1 });
                visited.set(neighbor, cell);
            }
        });
    }
}

// A* Algorithm
function astar() {
    let openSet = [{ cell: startCell, cost: 0, heuristic: heuristic(startCell) }];
    let visited = new Map();
    visited.set(startCell, null);

    while (openSet.length > 0) {
        openSet.sort((a, b) => (a.cost + a.heuristic) - (b.cost + b.heuristic));
        let { cell, cost } = openSet.shift();
        if (cell === endCell) {
            animatePath(visited);
            return;
        }
        getNeighbors(cell).forEach(neighbor => {
            if (!visited.has(neighbor) && !neighbor.classList.contains("obstacle")) {
                openSet.push({ cell: neighbor, cost: cost + 1, heuristic: heuristic(neighbor) });
                visited.set(neighbor, cell);
            }
        });
    }
}

// Heuristic function for A*
function heuristic(cell) {
    let index = Array.from(grid.children).indexOf(cell);
    let row = Math.floor(index / gridSize);
    let col = index % gridSize;
    let endIndex = Array.from(grid.children).indexOf(endCell);
    let endRow = Math.floor(endIndex / gridSize);
    let endCol = endIndex % gridSize;
    return Math.abs(endRow - row) + Math.abs(endCol - col);
}

// Get neighboring cells
function getNeighbors(cell) {
    let index = Array.from(grid.children).indexOf(cell);
    let row = Math.floor(index / gridSize);
    let col = index % gridSize;
    let neighbors = [];

    [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([r, c]) => {
        if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
            neighbors.push(grid.children[r * gridSize + c]);
        }
    });
    return neighbors;
}

// Animate the path
async function animatePath(visited) {
    let path = [];
    let cell = endCell;
    while (cell !== null) {
        path.push(cell);
        cell = visited.get(cell);
    }
    path.reverse();
    for (let i = 0; i < path.length; i++) {
        path[i].classList.add("path");
        await new Promise(resolve => setTimeout(resolve, 80));
    }
}
