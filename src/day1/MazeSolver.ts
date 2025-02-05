const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
const walk = (
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean => {
    // move through map in a direction, building a visited array.
    // this is like traversing a tree, in a depth first search
    // when we get a dead end, we have to move backwards
    // then try diff direction
    //
    // Y is representing each array item
    // X is representing each item in any array item
    // are we fin
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // if we go off the board or if we hit a wall
    if (
        curr.x < 0 ||
        curr.y < 0 ||
        curr.x >= maze[0].length ||
        curr.y >= maze[0].length ||
        maze[curr.y][curr.x] === wall
    ) {
        return false;
    }

    // if we've been here before
    if (seen[curr.y][curr.x]) {
        return false;
    }

    path.push(curr);
    seen[curr.y][curr.x] = true;
    // loop thru each direction and walk in that direction DFS
    // we are walking down this tree. when we encounter false
    // we backtrack, 1 step then try another direction.
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    return false;
};

// Establish base cases:
//  1. avoid wall - walls are #
//  2. off the map - undefined point
//  3. its the end - we're done
//  4. if we've already been here - dont want to backtrack
// [    MazeGraph
//     "#######E#",
//     "#       #",
//     "#S#######"
// ]

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];
    // create a maze of booleans for seen
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    walk(maze, wall, start, end, seen, path);
    return path;
}
