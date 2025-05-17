import customPromiseAll from "@code/quizes/PromiseAll";

describe("customPromiseAll", () => {
    test("resolves all promises in the array", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
        ];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });

    test("handles a mix of resolved and non-promise values", async () => {
        const promises = [Promise.resolve(1), 2, Promise.resolve(3)];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });

    test("rejects if any promise rejects", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject(new Error("Promise failed")),
            Promise.resolve(3),
        ];
        await expect(customPromiseAll(promises)).rejects.toThrow(
            "Promise failed",
        );
    });

    test("handles an empty array", async () => {
        const promises: any[] = [];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([]);
    });

    test("handles a single promise", async () => {
        const promises = [Promise.resolve(42)];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([42]);
    });

    test("handles non-promise values", async () => {
        const promises = [1, "hello", true];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([1, "hello", true]);
    });

    test("maintains the order of results", async () => {
        const promises = [
            new Promise((resolve) => setTimeout(() => resolve(1), 100)),
            new Promise((resolve) => setTimeout(() => resolve(2), 50)),
            new Promise((resolve) => setTimeout(() => resolve(3), 10)),
        ];
        const result = await customPromiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });
});
