export default function two_crystal_balls(breaks: boolean[]): number {
    //    find where it breaks;
    // then walk up from last known safe point
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));
    // 100
    // 10
    // 20
    // 30
    // 30,31,32,33
    for (let i = jumpAmount; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) {
            //if it is broken at this point, we need to go to the previous point and walk up
            for (let j = i - jumpAmount; j < i; j++) {
                console.log({ i,j });
                if (breaks[j]) return j;
            }
        }
    }
    return -1;
}
