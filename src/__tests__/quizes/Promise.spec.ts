// MyPromise.test.ts
import { MyPromise } from "@code/quizes/Promise";

// Helper to wait for the next macrotask
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("MyPromise", () => {
    test("immediate resolve triggers then handler", async () => {
        const p = new MyPromise<number>((resolve) => {
            resolve(123);
        });

        const onFulfilled = jest.fn();
        p.then((v) => onFulfilled(v));

        // wait for the internal setTimeout(..., 0)
        await nextTick();

        expect(onFulfilled).toHaveBeenCalledTimes(1);
        expect(onFulfilled).toHaveBeenCalledWith(123);
        expect(p.status).toBe("fulfilled");
        expect(p.value).toBe(123);
    });

    test("immediate reject triggers catch handler", async () => {
        const p = new MyPromise<number>((_, reject) => {
            reject("oops");
        });

        const onRejected = jest.fn();
        p.catch((err) => onRejected(err));

        await nextTick();

        expect(onRejected).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledWith("oops");
        expect(p.status).toBe("rejected");
        expect(p.reason).toBe("oops");
    });

    test("executor throw triggers reject", async () => {
        const p = new MyPromise<number>(() => {
            throw "THROWN";
        });
        const onRejected = jest.fn();
        p.catch((err) => onRejected(err));

        await nextTick();

        expect(onRejected).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledWith("THROWN");
        expect(p.status).toBe("rejected");
        expect(p.reason).toBe("THROWN");
    });

    test("then chaining with value transforms", async () => {
        const p = new MyPromise<number>((resolve) => resolve(1));
        const chained = p.then((v) => v + 1).then((v) => v * 3);

        const onFulfilled = jest.fn();
        chained.then((v) => onFulfilled(v));

        await nextTick();

        expect(onFulfilled).toHaveBeenCalledWith(6);
        expect(chained).toBeInstanceOf(MyPromise);
    });

    test("then can return a MyPromise and adopt its resolution", async () => {
        const inner = new MyPromise<string>((resolve) => {
            setTimeout(() => resolve("inner"), 10);
        });
        const outer = new MyPromise<string>((resolve) => resolve("start")).then(
            () => inner,
        );

        const onFulfilled = jest.fn();
        outer.then((v) => onFulfilled(v));

        // wait for inner to resolve and for the chaining to schedule
        await new Promise((r) => setTimeout(r, 20));
        await nextTick();

        expect(onFulfilled).toHaveBeenCalledWith("inner");
    });

    test("catch after then catches thrown errors", async () => {
        const p = new MyPromise<number>((resolve) => resolve(5));
        const bad = p.then(() => {
            throw "WHOOPS";
        });
        const onRejected = jest.fn();
        bad.catch((e) => onRejected(e));

        await nextTick();

        expect(onRejected).toHaveBeenCalledWith("WHOOPS");
    });

    test("circular reference detection", async () => {
        const p = new MyPromise<number>((resolve) => resolve(1));
        let p2: MyPromise<number>;
        p2 = p.then(() => p2 as any); // create circular reference
        const onRejected = jest.fn();
        p2.catch((e) => onRejected(e));

        await nextTick();

        expect(onRejected).toHaveBeenCalledTimes(1);
        const err = onRejected.mock.calls[0][0];
        expect(err).toBeInstanceOf(TypeError);
        expect((err as Error).message).toMatch(/Circular reference detected/);
    });

    test("default then handlers pass through values and rethrow errors", async () => {
        const p = new MyPromise<number>((resolve) => resolve(7));
        const passThrough = p.then(); // should pass value 7 through
        const onFulfilled = jest.fn();
        passThrough.then((v) => onFulfilled(v));

        const q = new MyPromise<number>((_, reject) => reject("BAD"));
        const rethrow = q.catch((e) => {
            throw e;
        });
        const onErr = jest.fn();
        rethrow.catch((e) => onErr(e));

        await nextTick();

        expect(onFulfilled).toHaveBeenCalledWith(7);
        expect(onErr).toHaveBeenCalledWith("BAD");
    });
});
