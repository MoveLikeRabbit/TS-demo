/*
Implement the built-in Exclude<T, U>
Exclude from T those types that are assignable to U
*/

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type MyExclude<T extends string, K extends string> = T extends K ? never : T