class MyPromise {
    constructor(handler) {
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((cb) => cb());
            }
        };
        const reject = (reason) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach((cb) => cb());
            }
        };

        try {
            handler(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    resolveOrRejectPromise(promise, promiseHandler, resolve, reject) {
        setTimeout(() => {
            try {
                if (promise === promiseHandler) {
                    return reject(new TypeError("curclar refe"));
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
    then(onFulfilled, onReject) {
        const thenPromise = new MyPromise((resolve, reject) => {
            if (this.status === "fulfilled") {
                //     resolve
                this.resolveOrRejectPromise(
                    thenPromise,
                    onFulfilled(this.value),
                    resolve,
                    reject,
                );
            } else if (this.status === "rejected") {
                //    reject
                this.resolveOrRejectPromise(
                    thenPromise,
                    onReject(this.reason),
                    resolve,
                    reject,
                );
            } else {
                // add this promise to the fulfilled and reject
                this.onFulfilledCallbacks.push(() =>
                    this.resolveOrRejectPromise(
                        thenPromise,
                        onFulfilled(this.value),
                        resolve,
                        reject,
                    ),
                );
                this.onRejectedCallbacks.push(() =>
                    this.resolveOrRejectPromise(
                        thenPromise,
                        onReject(this.reason),
                        resolve,
                        reject,
                    ),
                );
            }
        });
        return thenPromise;
    }

    catch(onReject) {
        this.then(undefined, onReject);
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
                    console.log("second promise finished");
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
