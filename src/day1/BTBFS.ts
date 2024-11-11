export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // instead of recursing like a depth first search,
    //  we are going to be pushing into a queue
    const q: (BinaryNode<number> | null)[] = [head];
    // this q is an array with a single binary tree within it
    // this is technically not necessary, as the queue we are building could be any array
    // but it is done for convenience. (below is a while that relies on q.length. if using a separate array
    // we'd have to write more code to have the while operate)
    while (q.length) {
        const current = q.shift() as BinaryNode<number>;
        // we take out the single binary tree here and operate on it.
        // in this case we are doing a simple value check
        //
        // this is a search so this is the operation.
        // but this could be anything we are trying to accomplish
        if (current.value === needle) {
            return true;
        }
        // after the operation, we then grab the current nodes on that side of the tree
        // push them into the q or Queue. Then the loop then runs again.
        if (current.left) q.push(current.left);
        if (current.right) q.push(current.right);
    }
    return false;
}
