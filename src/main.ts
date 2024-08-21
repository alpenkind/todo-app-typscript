import { Todo, TodoHTMLInputEL } from "./todo";
import { showTodos, renderTodo, removeDone } from "./dom";
import { saveTodos, loadTodos, todos } from "./storage";
import { loadFromAPI, sendToAPI, updateToAPI, removeFromAPI } from "./api";
import "./filter";

const todoInput = document.querySelector<HTMLInputElement>("#task-input");
const form = document.querySelector<HTMLFormElement>(".ctn-input");

//funtion to add todos to todolist
function addTodo(event: Event) {
  // Prevents the default behaviour of the form tag (reloading the page)
  event.preventDefault();
  // Input value without starting and final white space
  const inputValue = todoInput?.value.trim() || "";

  if (inputValue !== "") {
    // If the input is not empty => creating new object
    const newTodo = {
      description: inputValue,
      done: false,
      id: Math.floor(Math.random() * 99999999),
    };

    // The new task is added to the array and rendered
    todos.push(newTodo);
    renderTodo(newTodo);
    //Clear Value
    if (!todoInput) {
      return;
    }
    todoInput.value = "";
    // The new task is sent to the local storage and to the API
    saveTodos();
    sendToAPI(newTodo);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector(".btn-clear");
  clearButton?.addEventListener("click", removeDone);
});

//Eventlistener submit input
form?.addEventListener("submit", addTodo);
