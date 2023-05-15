// Implement a generic TupleToUnion<T> which covers the values of a tuple to its values union.
type Arr = ['1', '2', '3']

type TupleToUnion<T extends unknown[]> = T extends [infer First, ...infer Rest] ? First | TupleToUnion<Rest> : never
type Tests = TupleToUnion<Arr> // expected to be '1' | '2' | '3'