import numberOfAmazonItems from "@code/quizes/AmazonItemsContainers";

const firstDrop = {
    string: "|**|*|*",
    startingIndices: [1, 1],
    endingIndices: [5, 6],
};
const secondDrop = {
    string: "*|***|*|",
    startingIndices: [1],
    endingIndices: [6],
};
const thirdDrop = {
    string: "*|*||*|**|",
    startingIndices: [1, 3, 1, 2],
    endingIndices: [7, 9, 5, 11],
};
test("numberOfAmazonItems", () => {
    expect(
        numberOfAmazonItems(
            firstDrop.string,
            firstDrop.startingIndices,
            firstDrop.endingIndices,
        ),
    ).toEqual([2, 3]);
    expect(
        numberOfAmazonItems(
            secondDrop.string,
            secondDrop.startingIndices,
            secondDrop.endingIndices,
        ),
    ).toEqual([3]);
    expect(
        numberOfAmazonItems(
            thirdDrop.string,
            thirdDrop.startingIndices,
            thirdDrop.endingIndices,
        ),
    ).toEqual([2, 1, 1, 4]);
});
