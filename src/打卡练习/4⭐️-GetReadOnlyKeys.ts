// Implement a generic GetReadOnlyKeys<T> that returns a union of the readonly keys of an Object

interface Todos {
    readonly title: string;
    readonly description: string;
    completed: boolean;
}
// 如果是两个条件类型 T1 extends U1 ? X1 : Y1 和 T2 extends U2 ? X2 : Y2 相关的话，那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关，而 U1 和 U2 相等。
// The assignability rule for conditional types <...> requires that the types after extends be "identical" as that is defined by the checkF
// 条件类型<...>的可赋值规则要求扩展后的类型与检查器F定义的类型“相同”
// 对于 <T>() => T extends A ? 1: 2


type Equal<A, B> =(<T>() => T extends A ? 1: 2) extends (<T>() => T extends B ? 1: 2) ? true : false

type GetReadonlyKeys<T> = keyof {
    [K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? K: never ]: T[K]
}

type Keys = GetReadonlyKeys<Todos> // expected to be "title" | "description"

