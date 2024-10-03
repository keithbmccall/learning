export default function bubble_sort(arr: number[]): void {
    //     1 by 1 - check adj numbers and swap them so highest is on the right
    // since on every loop we know highest is on the right /end we don't need to test it every iteration (arr.length - 1 - i)
    //     repeat
    for (let i = 0; i < arr.length; i++) {
        // loop over the entire array arr.length times
        // we need to do this loop for every number inside the array
        // since algo basically goes 1 by 1 finding the largest number
        // and walks it to the end 1 index at a time.
        // on the 2nd loop it will then find the 2nd largest number
        // and walk it to the back of the line. etc...
        // since we know the end number will always be the highest
        // then on every iteration we dont need to test the previously placed number
        //
        // IE.. on the 2nd iteration we dont need to check the prev high number that we just placed at the end on the 1st iteration
        // IE.. on the 3rd iteration we dont need to check the prev high number that we just placed at the end on the 2nd iteration
        // IE.. on the 8th iteration we dont need to check the prev high number that we just placed at the end on the 47th iteration
        // (arr.length - 1 - i) the -1 covers this offset. the index is the counter that counts us backward from end
        for (let j = 0; j<arr.length - 1 - i;j++){
            if (arr[j] > arr[j+1]){
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

// loop over arr.length times ->
// each time compare 2 adjacent numbers keeping higher number on right
// after arr.length times the array will be sorted
[5,2,4,6,8,1,13]
