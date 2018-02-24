const taskList = document.getElementById('taskList');

eventListeners();

function eventListeners() {
  document.querySelector('#form').addEventListener('submit', newTask);

  taskList.addEventListener('click', removeTask);

  document.addEventListener('DOMContentLoaded', loadLocalStorage);
};

function newTask(e) {
  e.preventDefault();
  const task = document.getElementById('task').value;
  if (task !== '') {
    const btn = document.createElement('a');
    btn.textContent = 'x';
    btn.classList = 'container__to-do-list__list-items__remove';

    const li = document.createElement('li');
    li.textContent = task;
    li.classList = 'container__to-do-list__list-items__item';
    taskList.appendChild(li);
    li.appendChild(btn);

    addToLocalStorage(task);

    this.reset();
  }
};

function removeTask(e) {
  if (e.target.classList.contains('container__to-do-list__list-items__remove')) {
    e.target.parentElement.remove();
  };
  removeFromLocalStorage(e.target.parentElement.textContent);
};

function addToLocalStorage(task) {
  let tasks = getFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function getFromStorage() {
  let tasks;
  const tasksLocal = localStorage.getItem('tasks');
  if (tasksLocal === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasksLocal);
  };
  return tasks;
};

function loadLocalStorage() {
  let tasks = getFromStorage();
  tasks.forEach(function(task) {
    const btn = document.createElement('a');
    btn.textContent = 'x';
    btn.classList = 'container__to-do-list__list-items__remove';

    const li = document.createElement('li');
    li.textContent = task;
    li.appendChild(btn);
    taskList.appendChild(li);
  });
};

function removeFromLocalStorage(task) {
  let tasks = getFromStorage();
  const removedX = task.substring(0, task.length - 1);

  tasks.forEach(function(taskLocal, index) {
    if (removedX === taskLocal) {
      tasks.splice(index, 1);
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
