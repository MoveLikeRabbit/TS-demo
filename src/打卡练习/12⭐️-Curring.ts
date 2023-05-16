// TypeScript 4.0 is recommended in this challenge

// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

// For example:

// const add = (a: number, b: number) => a + b

// const three = add(1, 2)

// const curriedAdd = Currying(add)

// const five = curriedAdd(2)(3)

// The function passed to Currying may have multiple arguments, you need to correctly type it.

// In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.

const func = (a: string, b: number, c: boolean) => {};

type CurryingFunc<Func extends Function> = Func extends (
    first: infer First,
    ...remaining: infer Rest
) => infer Result
    ? Rest['length'] extends 0
        ? Func
        : (first: First) => CurryingFunc<(...arg: Rest) => Result>
    : never;
function currying<Func extends Function>(fn: Func): CurryingFunc<Func>;

function currying(fn: Function) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            let ctx = this; // 保存this
            return function (...args2) {
                return curried.apply(ctx, args.concat(args2));
            };
        }
    };
}


const curriedRes = currying(func);