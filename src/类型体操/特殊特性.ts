// 特殊特性

// IsAny (any与任何类型交叉都是 any, 也就是 1 & any 结果是 any)
type IsAny<T> = 'dong' extends 'guang' & any ? true : false;

// IsEqual
//如果是两个条件类型 T1 extends U1 ? X1 : Y1 和 T2 extends U2 ? X2 : Y2 相关的话，那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关，而 U1 和 U2 相等。

type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
    ? 1
    : 2
    ? true
    : false;

type isUnion<A extends string, B extends string = A> = A extends A
    ? [B] extends [A]
        ? false
        : true
    : never;

// isNever
type IsNever<T> = [T] extends [never] ? true : false;

// IsTuple
type IsTuple<T> = T extends unknown[]
    ? number extends T['length']
        ? false
        : true
    : false;

type IsTupleRes = IsTuple<unknown[]>;

// 联合转交叉
// 函数参数是逆变性质的，如果参数可能是多个类型，参数类型会变成他们的交叉类型, 可以利用这个性质实现联合转交叉

type UnionToIntersection<U> = (
    U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
    ? R
    : never;
type UnionToIntersectionRes = UnionToIntersection<{ a: 1 } | { b: 2 }>;

// GetOptional
// 可选索引值为 undefined 和值的类型的联合类型

type GetOptional<T extends Record<string, any>> = {
    [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};
type GetOptionalRes = GetOptional<{
    a: 1;
    b?: 2;
}>;

// GetRequired
type GetRequired<T extends Record<string, any>> = {
    [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};

// RemoveIndexSignature
// 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以

type RemoveIndexSignature<T extends Record<string, any>> = {
    [K in keyof T as K extends `${infer Str}` ? Str : never]: T[K];
};
type RemoveIndexSignatureRes = RemoveIndexSignature<{
    [key: string]: any;
    sleep(): void;
}>;

//ClassPublicProps
// keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key];
};

//默认推导出来的不是字面量类型，加上 as const 可以推导出字面量类型，但带有 readonly 修饰，这样模式匹配的时候也得加上 readonly 才行。
const arr = [1, 2, 3] as const;
type arrType = typeof arr;
type ReserveArr<Arr> = Arr extends readonly [infer A, infer B, infer C]
    ? [C, B, A]
    : never;
type ReserveArrRes = ReserveArr<arrType>;