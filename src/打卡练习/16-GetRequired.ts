/*
Implement the advanced util type GetRequired<T>, which remains all the required fields
For example
type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
*/

type GetRequired2<T extends Record<keyof any, unknown>> = {
    [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};
type GetRequired2Res = GetRequired2<{
    a: '1';
    b?: '2';
}>;


