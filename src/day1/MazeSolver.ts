const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];
const walk = (
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    visited: boolean[][],
    path: Point[],
): boolean => {
    //  recursively traverse the node. DFS
    // in a given direction, at every point we will try to travel
    // we can't we will take a step back then try a different direction
    // for the case of having to go over several visited points
    // the visited case will return false - and that specific recurse call
    // will then try to travel in a different direction
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // if wall or off board
    if (
        maze[curr.y][curr.x] === wall ||
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze[0].length
    ) {
        return false;
    }
    // if visited
    if (visited[curr.y][curr.x]) {
        return false;
    }

    visited[curr.y][curr.x] = true;
    path.push(curr);

    // we need to move around the directional board in an arbitrary order
    for (let i = 0; i < directions.length; i++) {
        const [x, y] = directions[i];
        if (
            walk(
                maze,
                wall,
                { x: curr.x + x, y: curr.y + y },
                end,
                visited,
                path,
            )
        ) {
            return true;
        }
    }
    // stack
    path.pop();
    return false;
};
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    // the path to the point
    const path: Point[] = [];
    // this will symbolize whether we visited these nodes before
    const visited: boolean[][] = [];

    // make a maze of false values for convenience
    for (let i = 0; i < maze.length; i++) {
        visited.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, visited, path);
    return path;
}
