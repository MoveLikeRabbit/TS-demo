// Implement the built-in Omit<T, K> generic without using it.

// Constructs a type by picking all properties from T and then removing K

// For example

interface Todo {
  title: string
  description: string
  completed: boolean
}
  type MyOmit<O, K> = {
    [Key in keyof O as Key extends K ? never : Key]: O[Key]
  }
  type TodoPreview = Omit<Todo, 'description' | 'title'>
//   const todo: TodoPreview = {completed: false,}