const walk = (curr: BinaryNode<number> | null, path: number[]) => {
    if (!curr) {
        // base case is when the we get to a node which does not exist.
        // in the case of the tree... there are no children left to traverse down
        return path;
    }
    //     pre
    path.push(curr.value);
    //     recurse
    walk(curr.left, path);
    walk(curr.right, path);
    //     post
    return path;
};

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
