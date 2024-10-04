document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    fetch('/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => {
                addTodoToList(todo);
            });
        });

    addButton.addEventListener('click', () => {
        const task = taskInput.value;
        if (task) {
            fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            })
                .then(response => response.json())
                .then(data => {
                    addTodoToList(data);
                    taskInput.value = '';
                });
        }
    });

    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo.task;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.onclick = () => {
            fetch(`/todos/${todo.id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    li.remove();
                });
        };
        
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
});
