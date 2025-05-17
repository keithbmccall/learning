import minimalBoxWeights from "@code/quizes/AmazonMinimalBoxWeights";

const boxSet1 = [3, 7, 5, 6, 2];
const boxSet2 = [5, 3, 2, 4, 1, 2];
const boxSet3 = [4, 2, 5, 1, 6];

test("minimalBoxWeights", () => {
    expect(minimalBoxWeights(boxSet1)).toEqual([6, 7]);
    expect(minimalBoxWeights(boxSet2)).toEqual([4, 5]);
    expect(minimalBoxWeights(boxSet3)).toEqual([5, 6]);
});
