// 分布式条件类型

type Union = 'a' | 'b' | 'c';

type UppercaseA<Item extends string> = Item extends 'a'
    ? Uppercase<Item>
    : Item;
type UppercaseARes = UppercaseA<Union>;

type str = `${Union}~~~`;

//判断是否是联合类型  A extends A 触发了分布式条件类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type IsUnionResult = IsUnion<'a' | 'b' | 'c'>;
type IsUnionResult2 = IsUnion<['a' | 'b' | 'c']>;

// 数组转联合类型
type Union2 = ['aaa', 'bbb'][number]; // type Union2 = "aaa" | "bbb"

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;
type BEMRes = BEM<'block', ['ele1', 'ele2'], ['m1' | 'm2']>;

type Combination<A extends string, B extends string> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;

type CombinationRes = Exclude<'a' | 'b' | 'c', 'a'>;
type AllCombinations<A extends string, B extends string = A> = A extends A
    ? Combination<A, AllCombinations<Exclude<B, A>>>
    : never;
type AllCombinationsRes = AllCombinations<'a' | 'b' | 'c'>;