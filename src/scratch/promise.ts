export class MyPromise<T> {
    // The promise can be in one of these states.
    status: "pending" | "fulfilled" | "rejected";
    // When fulfilled, holds the value.
    value: T | undefined;
    // When rejected, holds the error/reason.
    reason: unknown | undefined;
    // Queues to store onFulfilled and onRejected callbacks.
    onFulfilledCallbacks: Array<() => unknown>;
    onRejectedCallbacks: Array<() => unknown>;

    // The constructor now expects a handler (executor) function
    // that takes a resolve and reject function.
    constructor(
        handler: (
            resolve: (value: T) => void,
            reject: (reason: unknown) => void,
        ) => void,
    ) {
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        // The resolve function changes the state to fulfilled.
        const resolve = (value: T) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                // Execute each stored onFulfilled callback.
                this.onFulfilledCallbacks.forEach((func) => {
                    console.log("fulfilling");
                    func();
                });
            }
        };

        // The reject function changes the state to rejected.
        const reject = (reason: unknown) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.reason = reason;
                // Execute each stored onRejected callback.
                this.onRejectedCallbacks.forEach((func) => func());
            }
        };

        // Immediately execute the handler.
        try {
            handler(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    // This helper function handles the resolution of then-chained values.
    // It makes sure that if the handler returns a promise,
    // thenPromise adopts its state; otherwise, it resolves with the value.
    resolveOrRejectPromise<R>(
        promise: MyPromise<R>,
        promiseHandler: any,
        resolve: (value: R) => void,
        reject: (reason: unknown) => void,
    ): void {
        setTimeout(() => {
            try {
                // Prevent circular reference.
                if (promise === promiseHandler) {
                    return reject(
                        new TypeError("Circular reference detected!"),
                    );
                }
                // If promiseHandler is a MyPromise instance, adopt its resolution.
                if (promiseHandler instanceof MyPromise) {
                    promiseHandler.then(resolve, reject);
                } else {
                    // Otherwise, resolve with the value returned.
                    resolve(promiseHandler);
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    }

    // The then method registers fulfillment and rejection callbacks.
    // We use generics so that if onFulfilled returns a type R,
    // then then() returns MyPromise<R>.
    then<R = T>(
        onFulfilled: (value: T) => R = (value: T) => value as unknown as R,
        onRejected: (reason: unknown) => R = (reason: unknown) => {
            throw reason;
        },
    ): MyPromise<R> {
        const thenPromise = new MyPromise<R>((resolve, reject) => {
            if (this.status === "fulfilled") {
                // If the promise is fulfilled, schedule the onFulfilled callback asynchronously.
                this.resolveOrRejectPromise(
                    thenPromise,
                    onFulfilled(this.value as T),
                    resolve,
                    reject,
                );
            } else if (this.status === "rejected") {
                // If already rejected, schedule the onRejected callback asynchronously.
                this.resolveOrRejectPromise(
                    thenPromise,
                    onRejected(this.reason),
                    resolve,
                    reject,
                );
            } else {
                // Otherwise, if still pending, push the callbacks onto the corresponding queue.
                this.onFulfilledCallbacks.push(() =>
                    this.resolveOrRejectPromise(
                        thenPromise,
                        onFulfilled(this.value as T),
                        resolve,
                        reject,
                    ),
                );
                this.onRejectedCallbacks.push(() =>
                    this.resolveOrRejectPromise(
                        thenPromise,
                        onRejected(this.reason),
                        resolve,
                        reject,
                    ),
                );
            }
        });

        return thenPromise;
    }

    // The catch method is a shorthand for then(undefined, onRejected).
    catch<R = never>(onRejected: (reason: unknown) => R): MyPromise<T | R> {
        return this.then(undefined, onRejected);
    }
}

console.log(
    new MyPromise<string>((resolve, reject) => {
        setTimeout(() => {
            console.log("first promise finished");
            resolve("Hellooo, world!");
        }, 3000);
    })
        .then((data) => {
            console.log(data); // "Hello, world!" after 1 second
            return new MyPromise<string>((resolve, reject) => {
                setTimeout(() => {
                    console.log("secnd promise finished");
                    resolve(data + " How are you?");
                }, 3000);
            });
        })
        .then((data) => {
            console.log(data); // "Hello, world! How are you?"
            return data.length; // returning a number
        })
        .then((data) => {
            console.log("Length:", data); // "Length: <number>"
            // If you want to check error handling, you can throw here.
            throw new Error("Something went wrong!");
        })
        .catch((err) => {
            console.log("Error:", err);
        }),
);
