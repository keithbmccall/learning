export default class MyAIPromise {
    constructor(handler) {
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
                return;
            }

            queueMicrotask(() => {
                if (this.status === "pending") {
                    this.status = "fulfilled";
                    this.value = value;
                    this.onFulfilledCallbacks.forEach((cb) => cb());
                }
            });
        };

        const reject = (reason) => {
            queueMicrotask(() => {
                if (this.status === "pending") {
                    this.status = "rejected";
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach((cb) => cb());
                }
            });
        };

        try {
            handler(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        // Handle non-function handlers
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason;
                  };

        const thenPromise = new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value);
                    this.resolvePromise(thenPromise, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            };

            const handleRejected = () => {
                try {
                    const result = onRejected(this.reason);
                    this.resolvePromise(thenPromise, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            };

            if (this.status === "fulfilled") {
                queueMicrotask(handleFulfilled);
            } else if (this.status === "rejected") {
                queueMicrotask(handleRejected);
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });

        return thenPromise;
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    finally(callback) {
        return this.then(
            (value) => {
                callback();
                return value;
            },
            (reason) => {
                callback();
                throw reason;
            },
        );
    }

    resolvePromise(promise, x, resolve, reject) {
        if (promise === x) {
            reject(new TypeError("Chaining cycle detected for promise"));
            return;
        }

        if (x instanceof MyPromise) {
            x.then(resolve, reject);
        } else {
            resolve(x);
        }
    }

    // Static methods
    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("Argument must be an array"));
            }

            const results = new Array(promises.length);
            let pending = promises.length;

            if (pending === 0) {
                resolve(results);
                return;
            }

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise)
                    .then((value) => {
                        results[index] = value;
                        pending--;
                        if (pending === 0) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            });
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("Argument must be an array"));
            }

            promises.forEach((promise) => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }
}
