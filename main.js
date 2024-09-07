/** @format */

let input = document.querySelector("input[type='text']");
let submit = document.querySelector("input[type='submit']");
let tasks = document.querySelector(".tasks");
let localArray = [];

submit.addEventListener("click", addTask);

// ! Load tasks from localStorage and display them
if (localStorage.tasks) {
  localArray = JSON.parse(localStorage.tasks);
  displayTasks();
}

// ! Function to display tasks
function displayTasks() {
  tasks.innerHTML = "";
  localArray.forEach(function (ele) {
    let task = document.createElement("div");
    task.classList.add("task");
    if (ele.completed) {
      task.className = "task done";
    }
    task.id = ele.id;
    task.innerHTML = ele.title;

    let complete = document.createElement("span");
    complete.classList.add("complete");
    complete.innerHTML = `Complete`;

    let span = document.createElement("span");
    span.classList.add("delete");
    span.innerHTML = `Delete`;

    task.appendChild(complete);
    task.appendChild(span);
    tasks.appendChild(task);
  });
}

function addTask(event) {
  event.preventDefault();
  if (input.value !== "") {
    addLocalStorage();
    localStorage.setItem("tasks", JSON.stringify(localArray));
    displayTasks();
    input.value = "";
  }
}

function addLocalStorage() {
  let obj = {
    id: Date.now(),
    title: input.value,
    completed: false,
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

// ! Making a Scroll Bar in the right instead Scroll Bar
let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  el.style.height = `${(scrollTop / height) * 100}%`;
});
