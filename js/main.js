function addTask() {
    let input = document.getElementById('taskInput');
    let task = input.value;
    let dateTime = new Date().toLocaleString();
    if (task === '') return;

    let ul = document.getElementById('notCompletedList');
    let li = document.createElement('li');
    li.className = 'todo__list-item';
    li.innerHTML = `<input type="checkbox" onclick="toggleTask(this)"><span>${task}</span><span class="todo__date">Added: ${dateTime}</span><button class="todo__remove-button" onclick="removeTask(this)">✖</button>`;
    ul.appendChild(li);
    input.value = '';
}

function toggleTask(element) {
    let li = element.parentElement;
    let ul = element.checked ? document.getElementById('completedList') : document.getElementById('notCompletedList');
    li.classList.toggle('todo__list-item--completed');
    if (element.checked) {
        let completionDateTime = new Date().toLocaleString();
        li.querySelector('.todo__date').innerText = `Завершено: ${completionDateTime}`;
        sendMessageToTelegram('Задача выполнена: ' + li.innerText.replace('✖', '').trim());
    } else {
        let addedDateTime = li.querySelector('.todo__date').innerText.split(': ')[1];
        li.querySelector('.todo__date').innerText = `Added: ${addedDateTime}`;
    }
    ul.appendChild(li);
}

function removeTask(element) {
    let li = element.parentElement;
    li.remove();
}

function searchTasks() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    let notCompletedList = document.getElementById('notCompletedList').getElementsByTagName('li');
    let completedList = document.getElementById('completedList').getElementsByTagName('li');

    filterTasks(notCompletedList, filter);
    filterTasks(completedList, filter);
}

function filterTasks(list, filter) {
    for (let i = 0; i < list.length; i++) {
        let task = list[i].textContent || list[i].innerText;
        if (task.toLowerCase().indexOf(filter) > -1) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
}

function sendMessageToTelegram(message) {
    const TELEGRAM_BOT_TOKEN = '8035961003:AAHLVpygv8DsDgt0-HKOJxOwBOy6VdvxIVA';
    const USER_CHAT_ID = '625604409';
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
        chat_id: USER_CHAT_ID,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.ok) {
            console.error('Error:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
