// Implement the built-in Readonly<T> generic without using it.

interface Todo6 {
    title: string;
    description: string;
    completed: boolean


}
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};
type todo = MyReadonly<Todo6>;


// Implement a generic MyReadonly2<T, K> which takes two type argument T and K.

type MyReadonly2<T, K extends keyof T> = Readonly<T> & Omit<T, K>
type todo2 = MyReadonly2<Todo6, 'title' | 'description'>
const todo4: todo2 = {
    title: '',
    description: '',
    completed: true
}
todo4.title = 'Hello'; // Error: cannot reassign a readonly property
todo4.description = 'barFoo'; // Error: cannot reassign a readonly property
todo4.completed = true; // OK
