function loadTasks() {
    let tasks = getCookie("tasks");
    if (tasks) {
        let taskArray = JSON.parse(tasks);
        taskArray.forEach(task => addTask(task, false));
    }
}

// Function to add a new task
function addTask(text, save = true) {
    if (!text.trim()) return;

    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.textContent = text;

    taskDiv.addEventListener("click", function () {
        if (confirm("Do you want to remove this task?")) {
            taskDiv.remove();
            saveTasks();
        }
    });

    let list = document.getElementById("ft_list");
    list.insertBefore(taskDiv, list.firstChild);

    if (save) saveTasks();
}

// Function to save tasks in cookies
function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push(task.textContent);
    });
    setCookie("tasks", JSON.stringify(tasks), 7);
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Add event listener to the New button
document.getElementById("newTask").addEventListener("click", function () {
    let newTask = prompt("Enter a new TO DO:");
    if (newTask) addTask(newTask);
});

// Load existing tasks when the page loads
window.onload = loadTasks;