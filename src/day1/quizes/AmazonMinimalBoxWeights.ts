export default function amazonMinimalBoxWeights(arr: number[]): number[] {
    const A: number[] = [];
    arr.sort((a, b) => b - a);
    const boxTarget = Math.floor(
        arr.length % 2 === 0 ? arr.length / 2 - 1 : arr.length / 2,
    );
    for (let i = 0; i < boxTarget; i++) {
        const val = arr[i];
        A.unshift(val);
    }
    return A;
}
