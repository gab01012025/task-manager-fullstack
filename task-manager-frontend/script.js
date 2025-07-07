document.getElementById('add-task-btn').addEventListener('click', () => {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  if (taskText !== '') {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    taskEl.innerText = taskText;

    document.getElementById('tasks-list').appendChild(taskEl);
    input.value = '';
  }
});
