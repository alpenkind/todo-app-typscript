import { Todo } from "./todo";
import { todos } from "./storage";
const urlAPI = "http://localhost:3000/todos/";

// Function which loads Data from Backend
async function loadFromAPI() {
  //Request to Server
  fetch(urlAPI)
    //request successful? Yes - response pass to function (request params)
    .then((request) => request.json())
    //JSON parsing promise successful? Yes- parsed JSON data pass to function (as todos)
    .then((todosFromAPI: Todo[]) => {
      // Clear existing todos before loading from API
      todos.length = 0;
      todosFromAPI.forEach((todo) => todos.push(todo));
    });
}

loadFromAPI();

//Send Data to the API ✅

//Function which sends new Items to Backend
function sendToAPI(todo: Todo) {
  fetch(urlAPI, {
    //POST-Method
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add todo to API.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Todo added successfully:", data);
    })
    .catch((error) => {
      console.error("Error adding todo to API:", error);
    });
}

//Updating Data in the API ✅

async function updateToAPI(todo: Todo) {
  try {
    const response = await fetch(urlAPI + todo.id, {
      // HTTP method POST for adding new data
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo), // Converts the task into JSON format & sends it as a request body
    });
    // Check if the request was successful
    if (!response.ok) {
      // Error message if the request fails
      throw new Error("Failed to update todo on API.");
    }

    console.log("Todo updated successfully:", todo);
  } catch (error) {
    // Error response to an error during the update process
    console.error("Error updating todo on API:", error);
  }
}
async function removeFromAPI(todoId: number) {
  const url = urlAPI + todoId;
  console.log("DELETE URL:", url);
  const response = await fetch(urlAPI + todoId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo from backend.");
  }
}

export { urlAPI, loadFromAPI, sendToAPI, updateToAPI, removeFromAPI };
