// Implement First<T> Last<T>

// Implement a generic First<T> that takes an Array T and returns its first element's type.

// For example:

// type arr1 = ['a', 'b', 'c']

// type arr2 = [3, 2, 1]

// type head1 = First<arr1> // expected to be 'a'

// type head2 = First<arr2> // expected to be 3

// ----分割线----

// Implement a generic Last<T> that takes an Array T and returns its last element.

// For example

// type arr1 = ['a', 'b', 'c']

// type arr2 = [3, 2, 1]

// type tail1 = Last<arr1> // expected to be 'c'

// type tail2 = Last<arr2> // expected to be 1


type First<T extends unknown[]> = T extends [infer Head, ...unknown[]]
    ? Head
    : never;

type First2<T extends unknown[]> = T extends [] ? never : T[0];

type Last<T extends unknown[]> = T extends [...unknown[], infer Tail]
    ? Tail
    : never;

type Last2<T extends unknown[]> = [never, ...T][T['length']];
type theArr = [1, 2];

type FirstRes = Last<theArr>;
