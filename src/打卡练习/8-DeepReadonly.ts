// 8. Implement a generic DeepReadonly<T>

type X = {
    x: {
        a: 1;
        b: 'hi';
    };

    y: 'hey';
};

type DeepReadonly<T> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>
}
type as = DeepReadonly<X>