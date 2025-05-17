import bubble_sort from "@code/BubbleSort";

test("bubble-sort", function () {
    const arr = [9, 740, 3, 7, 4, 69, 420, 42, -5, -500];

    debugger;
    bubble_sort(arr);
    expect(arr).toEqual([-500, -5, 3, 4, 7, 9, 42, 69, 420, 740]);
});
