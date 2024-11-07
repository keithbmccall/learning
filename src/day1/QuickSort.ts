const partition = (arr: number[], loIndex: number, hiIndex: number) => {
    //     3,4,9,2,5,1,7,8,6<-
    //     di - swap d and i
    //     3,4,9,2,5,1,7,8,6
    //      di - swap d and i
    //     3,4,9,2,5,1,7,8,6
    //         d i
    //     3,4,2,9,5,1,7,8,6
    //           d i
    //     3,4,2,5,9,1,7,8,6
    //           d   i
    //     3,4,2,5,1,9,7,8,6
    //               d
    //     3,4,2,5,1, < 6 >,7,8,9 **
    //               d
    // select pivot
    //     pick last element loop through array comparing values. when lower we will swap the element with a pointer that is rising from -1. this pointer rises when we encounter a match
    const pivot = arr[hiIndex];
    let swapIndex = loIndex - 1; // -1
    for (let i = loIndex; i < hiIndex; i++) {
        // never include pivot in this loop
        if (arr[i] < pivot) {
            swapIndex++;
            const temp = arr[i];
            arr[i] = arr[swapIndex];
            arr[swapIndex] = temp;
        }
    }
    swapIndex++;
    arr[hiIndex] = arr[swapIndex];
    arr[swapIndex] = pivot;
    return swapIndex;
};
const qs = (arr: number[], loIndex: number, hiIndex: number) => {
    if (loIndex >= hiIndex) return;
    const pivotIndex = partition(arr, loIndex, hiIndex);
    qs(arr, loIndex, pivotIndex - 1);
    qs(arr, pivotIndex + 1, hiIndex);
};
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
