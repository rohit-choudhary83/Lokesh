const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('DOMContentLoaded', displayTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    displayTasks();

    taskInput.value = '';
}

function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
    displayTasks();
}

function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    const newTaskText = prompt('Edit your task:', taskToEdit.text);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskToEdit.text = newTaskText;
        saveTasksToLocalStorage();
        displayTasks();
    }
}
