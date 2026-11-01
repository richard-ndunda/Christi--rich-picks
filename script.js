const STORAGE_KEY = 'todo-list-items';
const ACTIVE_FILTER = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = [...document.querySelectorAll('.filter-btn')];

let currentFilter = ACTIVE_FILTER;

function getTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(savedTasks) ? savedTasks : [];
  } catch (error) {
    console.error('Unable to parse saved tasks:', error);
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateSummary(tasks) {
  const remaining = tasks.filter((task) => !task.completed).length;
  itemsLeft.textContent = `${remaining} item${remaining === 1 ? '' : 's'} left`;
}

function getVisibleTasks(tasks) {
  if (currentFilter === 'active') {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function renderTasks() {
  const tasks = getTasks();
  const visibleTasks = getVisibleTasks(tasks);

  updateSummary(tasks);

  if (visibleTasks.length === 0) {
    todoList.innerHTML = `
      <li class="empty-state">
        ${tasks.length === 0 ? 'No tasks yet. Add one above to get started.' : 'No tasks in this view.'}
      </li>
    `;
    return;
  }

  todoList.innerHTML = visibleTasks
    .map(
      (task) => `
        <li class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          <div class="task-main">
            <input
              class="task-check"
              type="checkbox"
              ${task.completed ? 'checked' : ''}
              aria-label="Mark task as complete"
            />
            <span class="task-text">${escapeHtml(task.text)}</span>
          </div>
          <button class="task-delete" type="button" aria-label="Delete task">Delete</button>
        </li>
      `,
    )
    .join('');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function addTask(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    input.focus();
    return;
  }

  const tasks = getTasks();
  tasks.unshift({
    id: Date.now() + Math.random(),
    text: trimmedText,
    completed: false,
  });

  saveTasks(tasks);
  renderTasks();
  form.reset();
  input.focus();
}

function toggleTask(taskId) {
  const tasks = getTasks().map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks(tasks);
  renderTasks();
}

function deleteTask(taskId) {
  const tasks = getTasks().filter((task) => task.id !== taskId);
  saveTasks(tasks);
  renderTasks();
}

function clearCompleted() {
  const tasks = getTasks().filter((task) => !task.completed);
  saveTasks(tasks);
  renderTasks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(input.value);
});

todoList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.task-delete');
  if (deleteButton) {
    const item = deleteButton.closest('.todo-item');
    if (item) {
      deleteTask(Number(item.dataset.id));
    }
    return;
  }

  const checkbox = event.target.closest('.task-check');
  if (checkbox) {
    const item = checkbox.closest('.todo-item');
    if (item) {
      toggleTask(Number(item.dataset.id));
    }
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });

    renderTasks();
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

renderTasks();
