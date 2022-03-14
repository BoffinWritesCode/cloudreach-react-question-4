function isMapValid(map) {
    // short-circuit test to evaluate map has data
    if (map.length === 0 || map[0].length === 0) return false;

    // validate that all widths are the same
    let width = map[0].length;
    for (let y = 1; y < map.length; y++) {
        if (map[y].length != width) return false;
    }

    return true;
}

function areCoordinatesEqual(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function isCoordinateValid(map, coordinate) {
    if (coordinate.length != 2) return false;
    if (!isInMapBounds(map, coordinate[0], coordinate[1])) return false;
    // if the coordinate is in a wall
    if (!map[coordinate[1]][coordinate[0]]) return false;

    return true;
}

function isInMapBounds(map, x, y) {
    // if x ordinate is out of bounds
    if (x < 0 || x >= map[0].length) return false;
    // if y ordinate is out of bounds
    if (y < 0 || y >= map.length) return false;

    return true;
}

function manhattanDistanceBetween(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

const DIRECTIONS = [[-1, 0], [0, -1], [1, 0], [0, 1]];

class Node {
    constructor(x, y, parentNode = undefined) {
        this.parent = parentNode;
        this.x = x;
        this.y = y;
        this.distance = 0;
        this.heuristic = 0;
    }
    positionIs(x, y) {
        return this.x === x && this.y == y;
    }
    calculateTotalCost() {
        this.totalCost = this.heuristic + this.distance;
    }
}

function pathfind(map, start, end) {
    // check for invalid map
    if (!isMapValid(map)) throw new Error('Invalid map.');

    // check for invalid coords
    if (!isCoordinateValid(map, start)) throw new Error('Invalid start coordinate.');
    if (!isCoordinateValid(map, end)) throw new Error('Invalid end coordinate.');

    // check if coordinates are equal, if so, early return
    if (areCoordinatesEqual(start, end)) return 0;

    // add P to the open list by default
    let open = [new Node(start[0], start[1])];
    let closed = []

    while (open.length > 0) {
        // get the next node to check from
        let currentNode = open[0], currentIndex = 0;
        for (let i = 1; i < open.length; i++) {
            if (open[i].totalCost < currentNode.totalCost) {
                currentNode = open[i];
                currentIndex = i;
            }
        }

        // remove node from open array, add to closed one
        closed.push(open[currentIndex]);
        open.splice(currentIndex, 1)

        // if we're at the end
        if (currentNode.positionIs(end[0], end[1])) {
            return currentNode.distance;

            /* 
            let path = [];
            while (currentNode !== undefined) {
                path.push([currentNode.x, currentNode.y]);
            }
            return path;
            */
        }

        let children = [];
        for (let dir of DIRECTIONS) {
            let newX = currentNode.x + dir[0];
            let newY = currentNode.y + dir[1];
            
            // if not in bounds or in a wall, skip
            if (!isInMapBounds(map, newX, newY) || !map[newY][newX]) {
                continue;
            }

            let valid = true;
            for (let i = 0; i < closed.length; i++) {
                if (closed[i].positionIs(newX, newY)) {
                    valid = false;
                    break;
                }
            }

            // add new child node, if valid
            if (valid) {
                children.push(new Node(newX, newY, currentNode));
            }
        }

        for (let child of children) {
            child.distance = currentNode.distance + 1;
            child.heuristic = manhattanDistanceBetween(child.x, child.y, end[0], end[1]);
            child.calculateTotalCost();

            let valid = true;
            for (let node of open) {
                // if there's a shorter way already to get to this child, ignore it
                if (node.positionIs(child.x, child.y) && child.distance > node.distance) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                open.push(child);
            }
        }
    }

    throw new Error("No path found.");
}

module.exports.pathfind = pathfind
