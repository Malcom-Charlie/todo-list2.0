class EditFunctions {
  constructor(tasks, todoList) {
    this.tasks = tasks;
    this.todoList = todoList;
  }

  addTask(taskDescription, completed = false) {
    this.tasks.push({ description: taskDescription, completed });
    this.renderTasks();
  }

  toggleCompleted(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.renderTasks();
    const selectedCheckboxes = this.todoList.querySelectorAll('input[type="checkbox"]:checked');
    selectedCheckboxes.forEach((checkbox) => {
      const taskItem = checkbox.parentNode;
      const taskIndex = Array.from(this.todoList.children).indexOf(taskItem);
      this.tasks[taskIndex].completed = true;
      taskItem.classList.add('completed');
      checkbox.setAttribute('checked', '');
    });
    const unselectedCheckboxes = this.todoList.querySelectorAll('input[type="checkbox"]:not(:checked)');
    unselectedCheckboxes.forEach((checkbox) => {
      const taskItem = checkbox.parentNode;
      const taskIndex = Array.from(this.todoList.children).indexOf(taskItem);
      this.tasks[taskIndex].completed = false;
      taskItem.classList.remove('completed');
      checkbox.removeAttribute('checked');
    });
  }

  editTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    this.renderTasks();
  }

  removeCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.renderTasks();
  }

  renderTasks() {
    this.todoList.innerHTML = '';
    this.tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      const hr = document.createElement('HR');
      const taskCheckbox = document.createElement('input');
      taskCheckbox.type = 'checkbox';
      taskCheckbox.checked = task.completed;
      taskCheckbox.addEventListener('change', () => this.toggleCompleted(index));
      const taskDescription = document.createElement('span');
      taskDescription.textContent = task.description;
      taskDescription.contentEditable = true;
      taskDescription.addEventListener('input', () => this.editTask(index, taskDescription.textContent));
      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskDescription);
      taskItem.appendChild(hr);
      this.todoList.appendChild(taskItem);
    });
    this.tasks.forEach((task, index) => {
      const taskItem = this.todoList.children[index];
      if (task.completed) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

export default EditFunctions;