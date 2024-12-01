export default async function promiseAll(
    promises: (Promise<any> | any)[],
): Promise<any[]> {
    return await new Promise((resolve, reject) => {
        if (!promises?.length) {
            // edge case
            resolve([]);
        }
        let count = 0;
        const results: any[] = [];
        promises.forEach(async (p, i) => {
            try {
                const resolvedPromise = await Promise.resolve(p);
                count++;
                // async, so when the count is the length of promises.length
                // we know that the final resolve has finished
                results[i] = resolvedPromise;
                // since these are promises and can finish at unpredictable times
                // we need to update the array in this declarative way to make sure the order is accurate - pushing will lead to order being in order of resolves
                if (count === promises.length) {
                    // when we have all, then time to resolve the list
                    resolve(results);
                }
            } catch (e) {
                reject(e);
            }
        });
    });
}
