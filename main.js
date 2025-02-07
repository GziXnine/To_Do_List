/** @format */

let input = document.querySelector("input[type='text']");
let description = document.querySelector("textarea");
let submit = document.querySelector("input[type='submit']");
let tasks = document.querySelector(".tasks");
let bodyTasks = document.querySelector(".body-tasks");
let completeAllBtn = document.querySelector(
  "#CompleteTaskButton[value='Complete All']"
);
let deleteAllBtn = document.querySelector(
  "#DeleteTaskButton[value='Delete All']"
);
let localArray = [];

// 🎨 Array of 20 colors
const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "yellow",
  "brown",
  "teal",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "indigo",
  "gold",
  "coral",
  "maroon",
  "navy",
  "olive",
  "turquoise",
];

submit.addEventListener("click", addTask);
completeAllBtn.addEventListener("click", completeAllTasks);
deleteAllBtn.addEventListener("click", deleteAllTasks);

// ! Load tasks from localStorage and display them
if (localStorage.tasks) {
  localArray = JSON.parse(localStorage.tasks);
  displayTasks();
}

// ! Function to display tasks
function displayTasks() {
  tasks.innerHTML = "";

  if (localArray.length > 0) {
    bodyTasks.style.display = "block"; // Show the task container
  } else {
    bodyTasks.style.display = "none"; // Hide when no tasks
  }

  localArray.forEach(function (ele) {
    let task = document.createElement("div");
    task.classList.add("task", ele.color); // Add color class
    if (ele.completed) {
      task.classList.add("done");
    }
    task.id = ele.id;

    let title = document.createElement("h3");
    title.innerText = ele.title;

    let desc = document.createElement("p");
    desc.classList.add("description");
    desc.innerText = ele.description || ""; // Handle empty description

    let complete = document.createElement("span");
    complete.classList.add("complete");
    complete.innerHTML = `Complete`;

    let span = document.createElement("span");
    span.classList.add("delete");
    span.innerHTML = `Delete`;

    task.appendChild(title);
    if (ele.description) task.appendChild(desc); // Add only if there's a description
    task.appendChild(complete);
    task.appendChild(span);
    tasks.appendChild(task);
  });
}

function addTask(event) {
  event.preventDefault();
  if (input.value !== "") {
    // Description is optional
    addLocalStorage();
    localStorage.setItem("tasks", JSON.stringify(localArray));
    displayTasks();
    input.value = "";
    description.value = "";
  }
}

function addLocalStorage() {
  let randomColor = colors[Math.floor(Math.random() * colors.length)]; // Pick random color

  let obj = {
    id: Date.now(),
    title: input.value,
    description: description.value || "", // Ensure empty string if no description
    completed: false,
    color: randomColor, // Store color in local storage
  };
  localArray.unshift(obj);
}

document.addEventListener("click", (event) => {
  if (event.target.matches("span.complete")) {
    event.target.parentElement.classList.toggle("done");
    toggleStatus(event.target.parentElement.id);
  }

  if (event.target.matches("span.delete")) {
    event.target.parentElement.remove();
    deleteLocalStorage(event.target.parentElement.id);
  }
});

function deleteLocalStorage(taskId) {
  localArray = localArray.filter((task) => task.id.toString() !== taskId);
  localStorage.setItem("tasks", JSON.stringify(localArray));
  displayTasks();
}

function toggleStatus(taskId) {
  for (let i = 0; i < localArray.length; i++) {
    if (localArray[i].id == taskId) {
      localArray[i].completed = !localArray[i].completed;
      break;
    }
  }

  // ! Move completed tasks to the end of the list and incomplete ones to the top
  localArray.sort((a, b) => a.completed - b.completed);

  localStorage.setItem("tasks", JSON.stringify(localArray));
  displayTasks();
}

// ! Complete All Tasks
function completeAllTasks() {
  localArray.forEach((task) => (task.completed = true));
  localStorage.setItem("tasks", JSON.stringify(localArray));
  displayTasks();
}

// ! Delete All Tasks
function deleteAllTasks() {
  localArray = [];
  localStorage.removeItem("tasks");
  displayTasks();
}
