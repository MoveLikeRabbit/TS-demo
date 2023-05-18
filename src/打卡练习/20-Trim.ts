/*
Implement TrimLeft<T> which takes an exact string type and returns a new string with the whitespace beginning removed.
For example
type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
------我是分割线------
Implement Trim<T> which takes an exact string type and returns a new string with the whitespace from both ends removed.
For example
type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
*/

type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer Rest}`
    ? TrimLeft<Rest>
    : T;
type TrimRight<T extends string> = T extends `${infer Rest}${' ' | '\n' | '\t'}`
    ? TrimRight<Rest>
    : T;
type Trim<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}`
    ? Trim<Rest>
    : Str extends `${infer Rest}${' ' | '\n' | '\t'}`
    ? Trim<Rest>
    : Str;

type trimed = Trim<'  Hello World  '>;
