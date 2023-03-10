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
    this.updateCompletedStatus(index);
    this.tasks.forEach((task, taskIndex) => {
      this.updateTaskAppearance(taskIndex);
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
      this.updateTaskAppearance(index);
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  updateCompletedStatus(index) {
    const checkbox = this.todoList.children[index].querySelector('input[type="checkbox"]');
    if (this.tasks[index].completed) {
      checkbox.setAttribute('checked', '');
    } else {
      checkbox.removeAttribute('checked');
    }
  }
  
  updateTaskAppearance(index) {
    const taskItem = this.todoList.children[index];
    if (this.tasks[index].completed) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
  }
}


export default EditFunctions;