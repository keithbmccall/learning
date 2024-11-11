export default function dfs(
    head: BinaryNode<number> | null,
    needle: number,
): boolean {
    //     recursively traverse the tree
    //
    // we could remove this check here, but we'd have to have
    // null checks on the left and right on each cycle
    if (!head) {
        return false;
    }

    if (head.value === needle) {
        return true;
    }
    if (head.value > needle) {
        return dfs(head.left, needle);
    }
    if (head.value < needle) {
        return dfs(head.right, needle);
    }
    return false;
}
//       8
//    4        12
//     5    11   18
