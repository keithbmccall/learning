export default function bs_list(haystack: number[], needle: number): boolean {
    // index 0 - 99 44.5
    // 1 -> 100
    // mid = 50
    // needle = 50 return
    // needle > 50 ? lo = 51 hi = 100
    // needle < 50 ? lo = 1 hi = 49
    let lo = 0;
    let hi = haystack.length;

    do {
        const m = Math.floor(lo + (hi - lo) / 2); //midpoint index of the array
        const v = haystack[m]; //midpoint of the array
        console.log({v})
        if (needle === v) {
            return true;
        } else if (needle > v) {
            lo = m + 1;
            // plus 1 because we are now going to check higher numbers from m -> hi
            // plus 1 we already checked m at line 14!
        } else {
            hi = m
            // minus 1 because we are now going to check lower numbers from lo -> m
            // minus 1 because we already checked m at line 14!
        }

    } while (lo < hi);

    return false;
}
// high inclusive
// low exclusive
// hinlexx
// lexhin

