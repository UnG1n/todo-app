let filter = 'all';

const form = document.getElementById('inputForm');
const input = document.getElementById('input');
const counter = document.getElementById('counter');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearCompleted');
const savedTasks = localStorage.getItem('tasks');

const filterButtons = document.querySelectorAll('.listButton1');

const body = document.body;
const themeBtn = document.getElementById('themeButton');
const themeIcon = document.querySelector('.themeIcon');


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.src = "images/icon-sun.svg";
    }
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeIcon.src = isDark ? "images/icon-sun.svg" : "images/icon-moon.svg";
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

let tasks = savedTasks ? JSON.parse(savedTasks) : [];

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        tasks.push({
            id: Date.now(),
            text: text,
            completed: false,
        });
        input.value = '';
        renderTasks();
    }
})

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (this.id === 'all') filter = 'all';
        if (this.id === 'active') filter = 'active';
        if (this.id === 'completed') filter = 'completed';

        renderTasks();
    })
})

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
})

function renderTasks() {
    taskList.innerHTML = '';

    let filteredTasks = [];
    if (filter === 'all') {
        filteredTasks = tasks;
    } else if ( filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const label = document.createElement('label');
        label.className = 'todoItem'


    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (event) => {
        task.completed = !task.completed;
        renderTasks();
    });

    const custom = document.createElement('span');
    custom.className = 'customCheckbox';

    const textSpan = document.createElement('span');
    textSpan.className = 'taskText';
    textSpan.textContent = task.text;

    if (task.completed) {
        textSpan.style.textDecoration = 'line-through';
        textSpan.style.opacity = '0.5';
    }



    label.appendChild(checkbox);
    label.appendChild(custom);
    label.appendChild(textSpan);

        taskList.appendChild(label);
    });


    const left = tasks.filter (t => !t.completed).length;
    counter.textContent = `${left} items left`;

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


renderTasks();