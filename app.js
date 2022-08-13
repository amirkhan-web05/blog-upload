const todoInput = document.querySelector('#todoInput');
const todoAdd = document.querySelector('.todo-add');
const todoList = document.querySelector('.todo-list');
const todoFile = document.querySelector('#todoFile');
const open = document.querySelector('.open');
const filesList = document.querySelector('.files');

let data = [];
const filesData = [];

const triggerInput = () => todoFile.click();

const renderFile = (files) => {
  files.forEach((file) => {
    const filesItem = document.createElement('div');
    filesItem.classList.add('files__item');

    const reader = new FileReader();

    reader.onload = (ev) => {
      const images = ev.target.result;

      filesItem.innerHTML = `
        <img class='file__image' src='${images}' alt=''/>  
      `;

      filesList.insertAdjacentElement('beforeend', filesItem);
    };

    reader.readAsDataURL(file);

    filesData.push(file);
  });
};

const changeHandler = (event) => {
  if (!event.target.files.length) return;

  const files = Array.from(event.target.files);

  renderFile(files);
};

const renderTodo = ({ id, text, completed }) => {
  const li = document.createElement('li');
  li.classList.add('todo__item');
  li.dataset.id = 'toggle';
  li.id = id;

  completed ? li.className : `${li.className} toggle`;

  if (!filesData.length) {
    li.innerHTML = `
        ${text}
        <button data-id='remove'>Remove</button>
      `;
  } else {
    filesData.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (ev) => {
        const images = ev.target.result;

        li.innerHTML = `
        ${text}
        <img class='file__image' src='${images}' alt=''/>
        <button data-id='remove'>Remove</button>
      `;
      };

      reader.readAsDataURL(file);
    });
  }

  todoList.insertAdjacentElement('beforeend', li);
};

const addTodo = () => {
  const text = todoInput.value;

  if (text.trim() === '') return;

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    filesData,
  };

  renderTodo(newTodo);

  data.push(newTodo);

  todoInput.value = '';
};

const removeTodo = (event) => {
  if (event.target.dataset.id === 'remove') {
    const parentNode = event.target.closest('.todo__item');
    const id = Number(parentNode.id);

    data = data.filter((todo) => todo.id !== id);

    parentNode.remove();
  }
};

const toggleTodo = (event) => {
  if (event.target.dataset.id === 'toggle') {
    const parentNode = event.target.closest('.todo__item');
    const id = Number(parentNode.id);

    console.log(parentNode);

    data.find((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    parentNode.classList.toggle('todo-toggle');
  }
};

todoAdd.addEventListener('click', addTodo);
todoList.addEventListener('click', removeTodo);
todoList.addEventListener('click', toggleTodo);
todoFile.addEventListener('change', changeHandler);
open.addEventListener('click', triggerInput);
