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
    //
    // Y is representing each array item
    // X is representing each item in any array item
    // are we fin
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }
    //     off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }
    //     on wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // have we been here
    if (seen[curr.y][curr.x]) {
        return false;
    }
    seen[curr.y][curr.x] = true;
    path.push(curr);
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            console.log({ path });
            return true;
        }
    }
    path.pop();
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

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    walk(maze, wall, start, end, seen, path);
    return path;
}
