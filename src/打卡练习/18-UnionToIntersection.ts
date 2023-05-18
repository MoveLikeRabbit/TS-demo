// Implement the advanced util type UnionToIntersection<U>

// 联合转交叉
// 函数参数是逆变性质的，如果参数可能是多个类型，参数类型会变成他们的交叉类型, 可以利用这个性质实现联合转交叉
// For example
type Union2Intersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never
type I = Union2Intersection<{ a: 1 } | { b: 2 }> // expected to be 'foo' & 42 & true

