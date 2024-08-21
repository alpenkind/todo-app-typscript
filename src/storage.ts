import { Todo } from "./todo";
import { renderTodo } from "./dom";

let todos: Todo[] = [];

// Function to save todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos !== null) {
    todos = JSON.parse(storedTodos);
    todos.forEach(function (todo: Todo) {
      // For each loaded todo, the render function is called to display it
      renderTodo(todo);
    });
  }
}

export { todos, saveTodos, loadTodos };
