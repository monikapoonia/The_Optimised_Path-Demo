// pathfinding.c - Pathfinding Algorithms in C (for WebAssembly)
#include <emscripten.h>
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define GRID_SIZE 10

int grid[GRID_SIZE][GRID_SIZE]; // 0 = free, 1 = obstacle

// Struct to represent a node
typedef struct {
    int x, y;
    int cost;
} Node;

// Dijkstra's Algorithm
EMSCRIPTEN_KEEPALIVE
void dijkstra(int startX, int startY, int endX, int endY) {
    // Implement Dijkstra's algorithm
    printf("Running Dijkstra's Algorithm...\n");
    // TODO: Implement the logic
}

// A* Algorithm
EMSCRIPTEN_KEEPALIVE
void astar(int startX, int startY, int endX, int endY) {
    // Implement A* algorithm
    printf("Running A* Algorithm...\n");
    // TODO: Implement the logic
}

// Set obstacles
EMSCRIPTEN_KEEPALIVE
void setObstacle(int x, int y) {
    grid[x][y] = 1;
}
