const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Crear una tarea
const createTaskElement = (text, completed = false) => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";
  li.appendChild(span);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };
  buttonsDiv.appendChild(deleteBtn);

  r;
  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.onclick = () => {
    const newText = prompt("Editar tarea:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  };
  buttonsDiv.appendChild(editBtn);

  li.appendChild(buttonsDiv);

  if (completed) li.classList.add("completed");

  li.onclick = (e) => {
    if (e.target === deleteBtn || e.target === editBtn) return;
    li.classList.toggle("completed");
    saveTasks();
  };

  taskList.appendChild(li);
};

//boton de agregar
addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Introduce un nombre para la tarea");

  for (let span of taskList.querySelectorAll("span")) {
    if (span.textContent === text) {
      alert("Ya existe una tarea con ese nombre");
      return;
    }
  }

  createTaskElement(text);
  taskInput.value = "";
  saveTasks();
};

// Guardar tareas en localStorage
const saveTasks = () => {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
};

loadTasks();