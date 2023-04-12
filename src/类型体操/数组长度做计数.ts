// 构造数组
type BuildArray<
    L extends number,
    E = unknown,
    A extends unknown[] = []
> = A['length'] extends L ? A : BuildArray<L, E, [...A, E]>;

// 加减乘除运算
type Add<Num1 extends number, Num2 extends number> = [
    ...BuildArray<Num1>,
    ...BuildArray<Num2>
]['length'];

// 减法——比如 3 是 [unknown, unknown, unknown] 的数组类型，提取出 2 个元素之后，剩下的数组再取 length 就是 1。
type Subtract<
    Num1 extends number,
    Num2 extends number
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never;


// 递归的累加实现了乘法
type Multiply<
    Num1 extends number,
    Num2 extends number,
    Arr extends unknown[] = []
> = Num2 extends 0
    ? Arr['length']
    : Multiply<Num1, Subtract<Num2, 1>, [...Arr, ...BuildArray<Num1>]>;

// 递归的累减并记录减了几次实现了除法
type Divide<
    Num1 extends number,
    Num2 extends number,
    Arr extends unknown[] = []
> = Num1 extends 0
    ? Arr['length']
    : Divide<Subtract<Num1, Num2>, Num2, [...Arr, unknown]>;

// 字符串长度计数
type Strlen<
    S extends string,
    Arr extends unknown[] = []
> = S extends `${string}${infer Rest}`
    ? Strlen<Rest, [...Arr, unknown]>
    : Arr['length'];
type StrlenRes = Strlen<'nishiyigexiaobiesan'>;

// 两数比较
type GreaterThan<
    Num1 extends number,
    Num2 extends number,
    Arr extends unknown[] = []
> = Num1 extends Num2
    ? false
    : Num2 extends Arr['length']
        ? true
        : Num1 extends Arr['length']
            ? false
            : GreaterThan<Num1, Num2, [...Arr, unknown]>;

type GreaterThan2<Num1 extends number, Num2 extends number> = Subtract<
    Num1,
    Num2
> extends never
    ? false
    : true;

type GreaterThanRes = GreaterThan2<13, 22>;

// Fibonacci 1 1 2 3 5 8 13 21 34
type Fibonacci<
    Num extends number = 1,
    IndexArr extends unknown[] = [],
    preArr extends unknown[] = [unknown],
    currArr extends unknown[] = []
> = IndexArr['length'] extends Num ? currArr['length'] : Fibonacci<Num, [...IndexArr, unknown], currArr,[...currArr, ...preArr]>;
type FibonacciRes = Fibonacci<0>;
