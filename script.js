let tasks = [];

const taskList = document.getElementById("list");
const taskAdd = document.getElementById("add-task");
const taskCounter = document.getElementById("task-counter");

function fetchApi() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tasks = data.slice(0,10);
      renderList();
    })
    .catch(function (error) {
      console.log("error : ", error);
    });
}

function handleInputKey(e) {
  if (e.key === "Enter") {
    var text = e.target.value;
    text = text.toString().trim();
    if (!text) {
      showNotification("please add some text to To Do input");
    }
    const task = {
      title: text,
      id: Date.now(),
      complete: false,
    };
    e.target.value = "";
    addTasks(task);
  }
}

function addTasks(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added to the TO DO List");
    return;
  }
}

function renderList() {
  taskList.innerHTML = ""; // it is clear the previous output and append from begining
  for (let i = 0; i < tasks.length; i++) {
    addTasktoDom(tasks[i]);
  }
  taskCounter.innerHTML = tasks.length;
}

{
  /* <i class="fas fa-trash-alt" id = "delete" data-id = "${task.id}"></i> */
}

function addTasktoDom(task) {
  const li = document.createElement("li");

  li.innerHTML = `<input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                <i class="fas fa-trash-alt delete" id = "delete" data-id = "${
                  task.id
                }"></i>
                `;
  taskList.append(li);
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    // console.log(task.id, taskId);
    return task.id != Number(taskId);
  });
  tasks = newTasks;
  renderList();
  showNotification("Task Deleted Successfully");
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id == Number(taskId);
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.complete = !currentTask.complete;
    showNotification("Task Toggled successfully");
    return;
  }
  showNotification("could not toggle the task");
}

function showNotification(text) {
  alert(text);
}

function handleClickListner(e) {
  const target = e.target;
  console.log(target);
  if (target.id == "delete") {
    const taskId = target.dataset.id;
    console.log(taskId);
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

function initialize() {
  fetchApi();
  taskAdd.addEventListener("keyup", handleInputKey);
  document.addEventListener("click", handleClickListner);
}

initialize();
