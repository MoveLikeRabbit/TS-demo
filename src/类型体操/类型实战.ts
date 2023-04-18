// ParseQueryString

type ParseParam<Str extends string> = Str extends `${infer K}=${infer V}`
    ? {
          [key in K]: V;
      }
    : Record<string, any>;
type MergeValues<A, B> = A extends B  ? A : B extends unknown[] ? [A, ...B] : [A, B];
type MergeParams<A, B> = {
    [K in keyof A | keyof B]: K extends keyof A
        ? K extends keyof B
            ? MergeValues<A[K], B[K]>
            : A[K]
        : K extends keyof B
        ? B[K]
        : never;
};
// type MergeRes = MergeParams<{ a: 1 }, { b: 2 }>;
type ParseQueryString<Str extends string> =
    Str extends `${infer First}&${infer Rest}` ? MergeParams<ParseParam<First>, ParseQueryString<Rest>> : ParseParam<Str>;

type ParseQueryStringRes = ParseQueryString<'a=1&a=2&b=3&c=4'>;


//Promise.all Promise.race

interface PromiseConstructor {
    all<T extends readonly unknown[] | []>(values: T):Promise<{
        -readonly [P in keyof T]: Awaited<T[P]>
    }>;
    race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
}


// Curring
type CurryingFn<Func extends Function> = Func extends (
    first: infer First,
    ...remaining: infer Rest
) => infer Result
    ? Rest['length'] extends 0
        ? Func
        : (first: First) => CurryingFn<(...arg: Rest) => Result>
    : never;
function currying<Func extends Function>(fn: Func): CurryingFn<Func>;



// KebabCaseToCamelCase
type KebabCaseToCamelCase<Str extends string> =
    Str extends `${infer Left}-${infer Rest}`
        ? KebabCaseToCamelCase<`${Left}${Capitalize<Rest>}`>
        : Str;
type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<'aaa-bbb-ccc'>;

// CamelCaseToKebabCase
type CamelCaseToKebabCase<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? First extends Lowercase<First>
            ? `${First}${CamelCaseToKebabCase<Rest>}`
            : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
        : Str;
type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<'aaaBbbCcc'>;

// Chunk
type Chunk<
    Arr extends unknown[],
    Len extends number,
    CurItem extends unknown[] = [],
    Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
    ? CurItem['length'] extends Len
        ? Chunk<Rest, Len, [First], [...Res, CurItem]>
        : Chunk<Rest, Len, [...CurItem, First], Res>
    : [...Res, CurItem];

type ChunkRes = Chunk<[1, 2, 3, 4, 5, 6, 7, 8], 2>;

// TupleToNestedObject

type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
    infer First,
    ...infer Rest
]
    ? {
          [Key in First as Key extends keyof any
              ? Key
              : never]: TupleToNestedObject<Rest, Value>;
      }
    : Value;
type TupleToNestedObjectRes = TupleToNestedObject<['a', 'b', 'c'], 2>;

// PartialObjectPropByKeys
interface Dong {
    name: string;
    age: number;
    address: string;
}

type Copy<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key];
};

type PartialObjectPropByKeys<
    Obj extends Record<string, any>,
    Key extends keyof any = keyof Obj
> = Copy<Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>>;

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<Dong, 'name' | 'age'>;

// UnionToTuple
// The ReturnType of a function overload is the return value type of the last overload.
// Overloaded functions can be written through function intersection.

// first step: implement UnionToIntersection

type UnionToIntersection<T> = (
    T extends T ? (x: T) => unknown : never
) extends (x: infer R) => unknown
    ? R
    : never;

type UnionToIntersectionRes = ReturnType<
    UnionToIntersection<(() => number) | (() => string)>
>;

type UnionToTuple<U> = UnionToIntersection<
    U extends any ? () => U : never
> extends () => infer ReturnType
    ? [...UnionToTuple<Exclude<U, ReturnType>>, ReturnType]
    : [];

type UnionToTupleRes = UnionToTuple<'1' | 'v' | 'c'>;

// Join
type JoinType<
    Items extends any[],
    Delimiter extends string,
    Res extends string = ''
> = Items extends [infer Cur, ...infer Rest]
    ? JoinType<Rest, Delimiter, `${Res}${Delimiter}${Cur & string}`>
    : RemoveFirstDelimiter<Res>;

type RemoveFirstDelimiter<T> = T extends `${infer _}${infer Rest}` ? Rest : T;
declare function join<Delimiter extends string>(
    delimiter: Delimiter
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>;

const res = join('-')('guang', 'and', 'dong');

// DeepCamelize

type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
    ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
    : [];
type DeepCamelize<Obj> = Obj extends unknown[]
    ? CamelizeArr<Obj>
    : {
          [Key in keyof Obj as Key extends `${infer First}_${infer Rest}`
              ? `${First}${Capitalize<Rest>}`
              : Key]: DeepCamelize<Obj[Key]>;
      };
type obj = {
    aaa_bbb: string;
    bbb_ccc: [
        {
            ccc_ddd: string;
        },
        {
            ddd_eee: string;
            eee_fff: {
                fff_ggg: string;
            };
        }
    ];
};

type DeepCamelizeRes = DeepCamelize<obj>;

// AllKeyPath
type Obj = {
    a: {
        b: {
            b1: string;
            b2: string;
        };
        c: {
            c1: string;
            c2: string;
        };
    };
};

type AllKeyPath<Obj extends Record<string, any>> = {
    [Key in keyof Obj]:
      Key extends string
        ? Obj[Key] extends Record<string, any>
          ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
          : Key
        : never
  }[keyof Obj];

type AllKeyPathRes = AllKeyPath<Obj>;
