interface Array<T> {
    myConcat(...items: Array<T | Array<T>>): Array<T>;
}

Array.prototype.myConcat = function (...items) {
    return items.reduce(
        (acc, cur) => {
            if (Array.isArray(cur)) {
                acc.push(...cur);
            } else {
                acc.push(cur);
            }
            return acc;
        },
        [...this],
    );
};
console.log([1, 2, 3].myConcat([4, 5, 6], 7, [8, 9]));
