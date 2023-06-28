export function cache(fn: (...args: any) => any) {
    const cache: { [key: string]: any } = {};

    return async (...args: any) => {
        const cacheKey = JSON.stringify(args);
        const cachedValue = cache[cacheKey];

        if (cachedValue) {
            console.log('From cache', cache);
            return cachedValue;
        }

        const result = await fn(...args);

        cache[cacheKey] = result;

        return result;
    };
}