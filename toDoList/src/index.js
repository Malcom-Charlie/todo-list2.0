/* eslint-disable no-use-before-define */
import './style.css';
import { DateTime } from './modules/luxon.js';
import EditFunctions from './modules/newFunctionality.js';

const dateTimeNow = document.querySelector('.currentTime');
setInterval(() => {
  const current = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  dateTimeNow.textContent = current;
}, 1000);

const addForm = document.querySelector('#add-form');
const todoList = document.querySelector('#todo-list');
const removeCompletedBtn = document.querySelector('#remove-completed');

let tasks = [];

const editFunctionality = new EditFunctions(tasks, todoList);

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTaskInput = document.querySelector('#new-task');
  const newTaskDescription = newTaskInput.value.trim();
  if (newTaskDescription !== '') {
    editFunctionality.addTask(newTaskDescription);
    newTaskInput.value = '';
  }
});

removeCompletedBtn.addEventListener('click', () => {
  editFunctionality.removeCompletedTasks();
});

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {
  tasks = savedTasks;
  editFunctionality.renderTasks();
}