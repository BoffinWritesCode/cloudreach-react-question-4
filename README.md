# Cloudreach React Question 4

This is a question that is about general JS knowledge, not to do with React.

Imagine representing a grid-shaped game map as a 2-dimensional array. Each value of this array is
boolean `true` or `false` representing whether that part of the map is passable (a floor) or blocked
(a wall). Write a function `function pathfind(A, P, Q) { }`that takes such an array `A` and 2 points
`P` and `Q` in a 2-dimensional space each represented by an array of two elements `[x, y]` from the top left corner of the map (in the example below, `P = [1, 0]` and `Q = [2, 3]`), and returns the distance of the shortest path between those
points, respecting the walls in the map.

eg. Given the map (where '.' is passable - `true`, and '#' is blocked - `false`)
```
.P...
.###.
.....
..Q..
.....
```

then `pathfind(A, P, Q)` should return `6`.

## What to do

1. Implement the `pathfind` function in `pathfind.js`.
2. Feel free to add further test cases to `spec/pathfind_spec.js`.

## Running the tests
Tests have been implemented using Jasmine and can be run by running `npm test`
