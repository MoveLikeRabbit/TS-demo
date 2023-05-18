// Type the function PromiseAll that accepts an array of PromiseLike objects, the returning value should be Promise<T> where T is the resolved result array.

interface PromiseConstructor {
    all<T extends readonly unknown[] | []>(
        values: T
    ): Promise<{
        -readonly [P in keyof T]: Awaited<T[P]>;
    }>;

    race<T extends readonly unknown[] | []>(
        values: T
    ): Promise<Awaited<T[number]>>;
}

declare const promise: PromiseConstructor;

const allRes = promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
]);

const p = PromiseAll([
    Promise.resolve(1),
    34,
    Promise.resolve(3),
] as const);

declare function PromiseAll<T extends any[]>(
    values: readonly [...T]
): Promise<{
    [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K];
}>;
