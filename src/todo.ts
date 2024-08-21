export interface Todo {
  description: string;
  done: boolean;
  id: number;
}

export interface TodoHTMLInputEL extends HTMLInputElement {
  todoObj?: Todo;
}
