import quick_sort from "@code/QuickSort";
const sortCb = (a: number, b: number) => a - b;
test("quick-sort", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];
    const arr2 = [3, 100, 77474, 1, 23, 14, -8];
    const arr3 = [9, 2, 7, 1, 4, -22, 14, 42];
    const arr4 = [
        3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 11, 3, 11, 33, 1, 1, 1, 14, 9, 9, 9, 9, 0, 1,
        2, 2, 3, 4, 5, 6, 7, 8, 9, 99, 88, 77, 8, 7, 6, 5, 4, 3, 2, 1,
    ]

    debugger;
    quick_sort(arr);
    quick_sort(arr2);
    quick_sort(arr3);
    quick_sort(arr4);
    console.log({arr4})
    expect(arr).toEqual([9, 3, 7, 4, 69, 420, 42].sort(sortCb));
    expect(arr2).toEqual([3, 100, 77474, 1, 23, 14, -8].sort(sortCb));
    expect(arr3).toEqual([9, 2, 7, 1, 4, -22, 14, 42].sort(sortCb));
    expect(arr4).toEqual(
        [
            3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 11, 3, 11, 33, 1, 1, 1, 14, 9, 9, 9, 9, 0, 1,
            2, 2, 3, 4, 5, 6, 7, 8, 9, 99, 88, 77, 8, 7, 6, 5, 4, 3, 2, 1,
        ].sort(sortCb),
    );
});
