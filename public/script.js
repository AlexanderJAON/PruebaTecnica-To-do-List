const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
};

// Save tasks to localStorage
const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.querySelector('.task-text').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Create a task element
const createTaskElement = (text, completed = false) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'task-text';
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    li.appendChild(deleteBtn);

    if (completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(li);
};

// Add task
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) {
        alert('Task cannot be empty!');
        return;
    }

    const tasks = Array.from(taskList.children).map(li => li.querySelector('.task-text').textContent);
    if (tasks.includes(text)) {
        alert('Task already exists!');
        return;
    }

    createTaskElement(text);
    taskInput.value = '';
    saveTasks();
});

// Load tasks on page load
loadTasks();
