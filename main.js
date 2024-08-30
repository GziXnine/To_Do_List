/** @format */

let input = document.querySelector("input[type='text']");
let submit = document.querySelector("input[type='submit']");
let tasks = document.querySelector(".tasks");
let localArray = [];

tasks.addEventListener("click", deleteTask);
submit.addEventListener("click", addTask);

if (localStorage.tasks) {
  localArray = JSON.parse(localStorage.tasks);
  localArray.forEach(function (ele) {
    let task = document.createElement("div");
    task.classList.add("task");
    if (ele.completed) {
      task.className = "task done";
    }
    task.id = ele.id;
    task.innerHTML = ele.title;
    // task.setAttribute("data-id", ele.id);

    let span = document.createElement("span");
    span.classList.add("delete");
    span.innerHTML = `Delete`;

    task.appendChild(span);
    tasks.appendChild(task);
  });
}

function addTask(event) {
  if (typeof input.value === "string" && Number(input.value) === 0) {
    event.preventDefault();
  } else {
    let task = document.createElement("div");
    task.innerHTML = `${input.value}<button>Delete</button>`;
    tasks.appendChild(task);
    addLocalStorage();
    localStorage.setItem("tasks", JSON.stringify(localArray));
    location.reload();
  }
}

function addLocalStorage() {
  let obj = {
    id: Date.now(),
    title: input.value,
    completed: false,
  };
  localArray.push(obj);
}
console.log(localArray);

function deleteTask(event) {
  if (
    event.target.parentElement.className === "tasks" ||
    event.target.className === "tasks"
  ) {
    event.preventDefault();
  } else {
    event.target.parentElement.remove();
    deleteLocalStorage(event);
  }

  if (event.target.classList.contains("task")) {
    event.target.classList.toggle("done");
    toggleStatus(event.target.id);
  }
}

function deleteLocalStorage(event) {
  let newLocalArray = [];
  for (let i = 0; i < localArray.length; i++) {
    if (event.target.parentElement.id !== localArray[i].id.toString()) {
      newLocalArray.push(localArray[i]);
    }
  }
  localArray = newLocalArray;
  localStorage.setItem("tasks", JSON.stringify(localArray));
}

function toggleStatus(taskId) {
  for (let i = 0; i < localArray.length; i++) {
    if (localArray[i].id == taskId) {
      localArray[i].completed == false
        ? (localArray[i].completed = true)
        : (localArray[i].completed = false);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(localArray));
}

// ! Making a Scroll Bar in the right instead Scroll Bar
let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  el.style.height = `${(scrollTop / height) * 100}%`;
});
