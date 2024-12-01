export default function numberOfAmazonItems(
    string: string,
    startingIndices: number[],
    endingIndices: number[],
): number[] {
    //      string: '|**｜*｜*',
    //      startingIndices: [ 1, 1 ],
    //      endingIndices: [ 5, 6 ]
    const result: number[] = [];
    // for loop, i -> indicesLength
    // use i to check index
    // count boxes
    // inclusive so subtract 1 from every i when indexing
    for (let i = 0; i < startingIndices.length; i++) {
        const start = startingIndices[i] - 1;
        const end = endingIndices[i] - 1;
        let count = 0;
        let n = start;
        while (n <= end) {
            // '|**｜*｜*'
            // go over string
            // when we encounter a sub a string begining with |, including at least *, and ending with |
            //      we will add the * to counter
            const char = string[n];
            if (char === "|") {
                let k = n + 1;
                while (k <= end) {
                    const char2 = string[k];
                    if (char2 === "|") {
                        const stars = k - 1 - n;
                        count += stars;
                        console.log({ count, stars });
                        n = k - 1;
                        break;
                    } else {
                        k++;
                    }
                }
            }
            n++;
        }
        result.push(count);
    }
    return result;
}
