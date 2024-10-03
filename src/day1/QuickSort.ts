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
    const pivot = arr[hiIndex];
    // init index as -1
    let index = loIndex - 1;
//     loop through comparing each number to pivot
//     if higher do nothing
//     if lower we want to increase index (to keep track of the last known lowest number)
//     then we will swap the lower number and the number at the index
    for (let i = loIndex; i < hiIndex; i++) {
        if (arr[i] < pivot){
            index++
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }
//     after all numbers are evaluated - we want to place pivot number at the right of last known lowest nuber
    index++
    arr[hiIndex] = arr[index]
    arr[index] = pivot
    return index // index now reps the index of the pivot
};
const qs = (arr: number[], loIndex: number, hiIndex: number) => {
    if (loIndex >= hiIndex) return
    const pivotIndex = partition(arr,loIndex,hiIndex)
//     take the pivot and run the quick sort on either side of it
    qs(arr, loIndex, pivotIndex-1)
    qs(arr, pivotIndex+1, hiIndex)
};
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
