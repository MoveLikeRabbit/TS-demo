// TS 内置高级类型
// Parameters

type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
) => any
    ? P
    : never;
type ParametersRes = Parameters<(name: string, age: number) => {}>;

// ReturnType
type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R
    : never;
type ReturnTypeRes = ReturnType<() => 'dong'>;

// ConstructorParameters
type ConstructorParameters<T extends new (...args: any) => any> =
    T extends new (...args: infer P) => any ? P : never;
interface Person {
    name: string;
}
interface PersonConstructor {
    new (name: string): Person;
}
type ConstructorParametersRes = ConstructorParameters<PersonConstructor>;

// InstanceType
type InstanceType<T extends new (...args: any) => any> = T extends new (
    ...args
) => infer R
    ? R
    : never;
type InstanceTypeRes = InstanceType<PersonConstructor>;

// ThisParameterType
type Person1 = {
    name: 'siying';
};
function hello(this: Person1) {
    console.log(this.name);
}
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
    ? U
    : unknown;
type ThisParameterTypeRes = ThisParameterType<typeof hello>;

// OmitThisParameter

function say(this: Person, age: number) {
    console.log(this.name);
    return this.name + ' ' + age;
}
type OmitThisParameter<T> = T extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never;
type OmitThisParameterRes = OmitThisParameter<typeof say>;

//Partial
type Partial<T> = {
    [K in keyof T]?: T[K];
};

//Required
type Required<T> = {
    [K in keyof T]-?: T[K];
};
//Readonly
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};
//Pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[K];
};

//Record
// 这里很巧妙的用到了 keyof any，它的结果是 string | number | symbol：
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

//Exclude
type Exclude<T, U> = T extends U ? never : T;

// Extract
type Extract<T, U> = T extends U ? T : never;

// Omit
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Awaited
type Awaited<T> = T extends undefined | null
    ? T
    : T extends object & { then(onfulfilled: infer F): any }
    ? F extends (value: infer V, ...args: any) => any
        ? Awaited<V>
        : never
    : T;
type AwaitedRes = Awaited<Promise<Promise<Promise<number>>>>;


// NonNullable
type NonNullable<T> = T extends null | undefined ? never : T;


//Uppercase Lowercase Capitalize Uncapitalize
type UppercaseRes = Uppercase<'aaaa'>;

type LowercaseRes = Lowercase<'AAA'>;

type CapitalizeRes = Capitalize<'aaa'>;

type UncapitalizeRes = Uncapitalize<'Aaa'>;
