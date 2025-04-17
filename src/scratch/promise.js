class MyPromise {
    constructor(handler) {
        this.status = "pending"; // fulfilled rejected
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            console.log({ value });
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((func) => func());
            }
        };

        const reject = (reason) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.onRejectedCallbacks.forEach((func) => func());
            }
        };

        try {
            handler(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    resolveOrReject(promise, promiseHandler, resolve, reject) {
        setTimeout(() => {
            try {
                if (promise === promiseHandler) {
                    return reject(new TypeError("Circlar reference detected!"));
                }
                if (promiseHandler instanceof MyPromise) {
                    promiseHandler.then(resolve, reject);
                } else {
                    resolve(promiseHandler);
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    }

    then(onFulfilled, onRejected) {
        const thenPromise = new MyPromise((resolve, reject) => {
            if (this.status === "fulfilled") {
                // reoslve
                this.resolveOrReject(
                    thenPromise,
                    onFulfilled(this.value),
                    resolve,
                    reject,
                );
            } else if (this.status === "rejected") {
                // reject
                this.resolveOrReject(
                    thenPromise,
                    onRejected(this.reason),
                    resolve,
                    reject,
                );
            } else {
                // queue up both
                this.onFulfilledCallbacks.push(() =>
                    this.resolveOrReject(
                        thenPromise,
                        onFulfilled(this.value),
                        resolve,
                        reject,
                    ),
                );
                this.onRejectedCallbacks.push(() =>
                    this.resolveOrReject(
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

    catch(onRejected) {
        this.then(undefined, onRejected);
    }
}

// Example usage:
console.log(
    new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log("first promise finished");
            resolve("Hellooo, world!");
        }, 5000);
    })
        .then((data) => {
            console.log(data); // "Hellooo, world!" printed after 3 seconds
            return new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    console.log("secnd promise finished");
                    resolve(data + " How are you?");
                }, 3000);
            });
        })
        .then((data) => {
            console.log(data); // "Hellooo, world! How are you?" printed after another 3 seconds
            return data.length; // returning a number
        })
        .then((data) => {
            console.log("Length:", data); // Prints the length
            // Intentionally throw an error to test .catch()
            throw new Error("Something went wrong!");
        })
        .catch((err) => {
            console.log("Error:", err);
        }),
);

