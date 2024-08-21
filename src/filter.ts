import { showTodos } from "./dom";

const active = document.querySelector<HTMLInputElement>("#active");
const done = document.querySelector<HTMLInputElement>("#done");
const all = document.querySelector<HTMLInputElement>("#all");

// Eventlistener for filteroption "Active"
active?.addEventListener("click", function () {
  showTodos("active");
});

// Eventlistener for filteroption  "Done"
done?.addEventListener("click", function () {
  showTodos("done");
});

// Eventlistener for filteroption  "All"
all?.addEventListener("click", function () {
  showTodos("all");
});
