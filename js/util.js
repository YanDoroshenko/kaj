// JS utility functions
function putTask(task) {
    if (localStorage.getItem("tasks") == null || localStorage.getItem("tasks") === "null")
        localStorage.setItem("tasks", JSON.stringify([task]))
    else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    saveState()
}

function deleteTask(name) {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks != null) {
        const index = tasks.map(t => t.name).indexOf(name)
        if (index > -1) // If found by name then delete
            tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    saveState()
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks !== null && tasks !== "null")
        $("#tasks").html(
            tasks.map(t => {
                return `
                    <article class="task">
                       <label class="container"> // Custom checkbox
                            <input class="completed" type="checkbox" ${t.completed === true ? 'checked="true"' : ''} title="Completed"/>
                            <span class="checkmark" title="Completed"></span>
                        </label>
                        <div class="info">
                            <label class="name">${escapeHtml(t.name)}</label>
                            <label class="deadline">${new Date(t.deadline).toLocaleDateString()}</label>
                        </div>
                        <svg width="3em" height="3em" class="delete"> // Delete button
                            <line x1="0" y1="0" x2="3em" y2="3em"/>
                            <line x1="3em" y1="0" x2="0" y2="3em"/>
                        </svg>
                    </article>
                    `
            })
        )
    else
        $("#tasks").html("<h5/>")

    const articles = $("#tasks").children("article")
    for (let i = 0; i < articles.length; i++) { // Delete listener
        const button = $(articles[i]).children(".delete")[0]
        const name = $($($(articles[i]).children(".info")[0]).children("label")[0]).text()
        $(button).click(e => {
            deleteTask(name)
            renderTasks()
        })
        const completed = $($(articles[i]).children(".container")[0]).children(".completed")[0]
        $(completed).change(e => { // Complete listener
            setCompleted(name, completed.checked)
        })
    }
}

function format(date) { // Format date to be displayed in the task list
    return date.toISOString().split('T')[0];
}

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
};

function escapeHtml (string) { // Escape html strings to be displayed
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function saveState() { // Create a history checkpoint
    window.history.pushState(JSON.parse(localStorage.getItem("tasks")), null, this.href)
}

function replaceTasks(tasks) { // Replace tasks in the local storage with the argument
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function setCompleted(name, completed) { // Set task's completion flag
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const index = tasks.map(t => t.name).indexOf(name)
    tasks[index].completed = completed;
    replaceTasks(tasks);
    saveState()
}
