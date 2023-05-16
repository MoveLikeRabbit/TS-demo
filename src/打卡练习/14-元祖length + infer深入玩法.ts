/*
 元祖length + infer深入玩法
Implement a generic Pop<T> that takes an Array T and returns an Array without it's last element.
For example
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]
type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
Extra: Similarly, can you implement Shift, Push and Unshift as well?

----分割线---
For given a tuple, you need create a generic Length, pick the length of the tuple
For example:
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
*/

type arr1 = ['a', 'b', 'c', 'd']

type arr2 = [3, 2, 1]

type Pop<Arr extends any[]> = Arr extends [...infer Rest, infer _] ? Rest : []

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']

type re2 = Pop<arr2> // expected to be [3, 2]

type tesla = ['tesla', 'model 3', 'model X', 'model Y']

type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<Arr extends any[]> = Arr['length']
type Length2<Arr extends any[]> = Arr extends {length: infer L} ? L : never
type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length2<spaceX> // expected 5