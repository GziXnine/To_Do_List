/** @format */

let input = document.querySelector("input[type='text']");
let submit = document.querySelector("input[type='submit']");
let tasks = document.querySelector(".tasks");
let localArray = [];

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

    let span = document.createElement("span");
    span.classList.add("delete");
    span.innerHTML = `Delete`;

    let complete = document.createElement("span");
    complete.classList.add("complete");
    complete.innerHTML = `Complete`;

    task.appendChild(complete);
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

document.addEventListener("click", (event) => {
  if (event.target.matches("span.complete")) {
    event.target.parentElement.classList.toggle("done");
    toggleStatus(event.target.parentElement.id);
  }
});

let del = document.querySelectorAll("span.delete");
del.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    if (
      event.target.parentElement.className === "tasks" ||
      event.target.className === "tasks"
    ) {
      event.preventDefault();
    } else {
      event.target.parentElement.remove();
      deleteLocalStorage(event);
    }
  });
});

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
