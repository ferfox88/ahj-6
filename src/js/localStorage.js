export function updateStorage() {
  const todo = document.querySelector('.todo');
  const inProgress = document.querySelector('.in-progress');
  const done = document.querySelector('.done');

  const todoData = [];
  for (const element of todo.querySelectorAll('.task-content')) {
    todoData.push(element.textContent);
  }
  localStorage.todo = JSON.stringify(todoData);

  const inProgressData = [];
  for (const element of inProgress.querySelectorAll('.task-content')) {
    inProgressData.push(element.textContent);
  }
  localStorage.inProgress = JSON.stringify(inProgressData);

  const doneData = [];
  for (const element of done.querySelectorAll('.task-content')) {
    doneData.push(element.textContent);
  }
  localStorage.done = JSON.stringify(doneData);
}

export function loadStorage() {
  if (localStorage.length === 0) return;

  const todo = document.querySelector('.todo');
  const inProgress = document.querySelector('.in-progress');
  const done = document.querySelector('.done');

  const columnTodo = JSON.parse(localStorage.todo);
  const columnInProgress = JSON.parse(localStorage.inProgress);
  const columnDone = JSON.parse(localStorage.done);

  for (let index = 0; index < columnTodo.length; index += 1) {
    const element = columnTodo[index];
    const li = document.createElement('li');
    li.classList.add('items-item');
    li.classList.add('task');
    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = element;
    const taskDel = document.createElement('button');
    taskDel.classList.add('task-del');
    taskDel.textContent = '✖';
    li.insertAdjacentElement('afterbegin', taskContent);
    li.insertAdjacentElement('afterbegin', taskDel);
    todo.appendChild(li);
  }

  for (let index = 0; index < columnInProgress.length; index += 1) {
    const element = columnInProgress[index];
    const li = document.createElement('li');
    li.classList.add('items-item');
    li.classList.add('task');
    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = element;
    const taskDel = document.createElement('button');
    taskDel.classList.add('task-del');
    taskDel.textContent = '✖';
    li.insertAdjacentElement('afterbegin', taskContent);
    li.insertAdjacentElement('afterbegin', taskDel);
    inProgress.appendChild(li);
  }

  for (let index = 0; index < columnDone.length; index += 1) {
    const element = columnDone[index];
    const li = document.createElement('li');
    li.classList.add('items-item');
    li.classList.add('task');
    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = element;
    const taskDel = document.createElement('button');
    taskDel.classList.add('task-del');
    taskDel.textContent = '✖';
    li.insertAdjacentElement('afterbegin', taskContent);
    li.insertAdjacentElement('afterbegin', taskDel);
    done.appendChild(li);
  }
}
