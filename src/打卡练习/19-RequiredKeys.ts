

/*
Implement the advanced util type RequiredKeys<T>, which picks all the required keys into a union.
For example
type Result = RequiredKeys<{ foo: number; bar?: string }>;
expected to be “foo”

----我是分割线---
Implement Capitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.
For example
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
*/
type RequiredKeys<T> = keyof {
    [K in keyof T as  Omit<T, K> extends T ? never: K]: T[K]
}
type RequiredKeys2<T, K = keyof T> = K extends keyof T
    ? T extends Required<Pick<T, K>>
        ? K
        : never
    : never;
type RequiredKeysRes = RequiredKeys2<{ a: 1; b?: 2, c?: 3 }>;
type x = {} extends {} ? 1 : 2;

type Capitalize<Str extends string> = Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;
type capitalized = Capitalize<'hello world'>;
