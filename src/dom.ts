import { Todo, TodoHTMLInputEL } from "./todo";
import { saveTodos, loadTodos, todos } from "./storage";
import {
  urlAPI,
  loadFromAPI,
  sendToAPI,
  updateToAPI,
  removeFromAPI,
} from "./api";

const taskContainer = document.querySelector(".ctn-tasks");

function showTodos(filter: "all" | "active" | "done"): void {
  const taskItems = document.querySelectorAll<HTMLDivElement>(".task-item");

  taskItems.forEach(function (item) {
    const checkbox = item.querySelector<TodoHTMLInputEL>(
      "input[type='checkbox']"
    );

    switch (filter) {
      case "all":
        item.style.display = "block";
        break;
      case "active":
        if (!checkbox?.checked) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
        break;
      case "done":
        if (checkbox?.checked) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//Render a new task in the user interface
function renderTodo(todo: Todo) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  //Create Checkbox and connect with Object status done: true/false
  const checkBox = document.createElement("input") as TodoHTMLInputEL;
  checkBox.type = "checkbox";
  checkBox.id = "task-" + todo.id;
  //TEST
  console.log("log in renderTodo : ", todo.done);
  //changes todo done value (for Backend Use)
  checkBox.checked = todo.done;
  checkBox.todoObj = todo;

  //Create label, set ID and connect with Object description
  const taskText = document.createElement("label");
  taskText.textContent = todo.description;
  taskText.setAttribute("for", "task-" + todo.id);

  //Add checkbox and label to task-Item (html-div = task-item)
  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskText);
  //add to task-container (html-div = ctn-task)
  taskContainer?.appendChild(taskItem);
}

document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector<HTMLButtonElement>(".btn-clear");
  clearButton?.addEventListener("click", removeDone);
});

document.addEventListener("DOMContentLoaded", function () {
  loadTodos(); // First loading the todos
  saveTodos(); // Then save todos, if before loaded
});

async function removeDone(event: Event) {
  console.log("Removing done todos...");

  // Iterate backwards through the array
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done) {
      console.log("Deleting done todo:", todos[i]);
      // Get the ID of the task which is supposed to be deleted
      const todoId = todos[i].id;

      // Remove the task from the DOM
      const checkboxId = "task-" + todoId;
      const taskItem = document.getElementById(checkboxId)?.parentElement;

      if (!taskItem) {
        return;
      } else {
        taskItem.remove();
      }

      try {
        // Remove the task from the API
        const url = urlAPI + todoId;
        console.log("DELETE URL:", url);
        const response = await fetch(urlAPI + todoId, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo from backend.");
        }

        // Remove the task from the local todos array
        todos.splice(i, 1);
        console.log("Todo deleted from local array.");
        // Save the updated local todos list to the localStorage
        saveTodos();
        console.log("Local todos updated.");
      } catch (error) {
        console.error("Error deleting todo from backend:", error);

        continue; // Continue to next iteration even if an error comes up
      }
    }
  }
}

async function toggleCheckbox(event: Event) {
  const target = event.target as TodoHTMLInputEL | null;
  if (target === null) {
    return;
  }
  if (target.type === "checkbox") {
    const todo = target.todoObj;
    if (!todo) {
      return;
    }
    todo.done = target.checked;
    console.log("Updated todo:", todo);

    try {
      // Changes are sent to the backend API
      await updateToAPI(todo);
    } catch (error) {
      //The local storage will be refreshed if errors appear
      console.error("Error updating todo on API:", error);
      saveTodos();
      updateToAPI(todo); // Repeat attempt to send the changes to the API
    }
  }
}

//Eventlistener submit input

//Eventlistener Checkbox checked
taskContainer?.addEventListener("change", toggleCheckbox);

export { renderTodo, showTodos, removeDone };
