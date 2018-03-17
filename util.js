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
        if (index > -1)
            tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    saveState()
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks !== null && tasks !== "null")
        $("#tasks").html(tasks.map(t => {
            return `<article class="task">
                <input class="completed" type="checkbox" ${t.completed === true ? 'checked="true"' : ''}/>
                <div class="info">
                <label class="name">${escapeHtml(t.name)}</label>
                <label class="deadline">${new Date(t.deadline)}</label>
                </div>
                <svg width="3em" height="3em" class="delete">
                <line x1="0" y1="0" x2="3em" y2="3em"/>
                <line x1="3em" y1="0" x2="0" y2="3em"/>
                </svg>
                </article>
                `
        }
        ))
    else
        $("#tasks").html("")

    const articles = $("#tasks").children("article")
    for (let i = 0; i < articles.length; i++) {
        const button = $(articles[i]).children(".delete")[0]
        const name = $($($(articles[i]).children(".info")[0]).children("label")[0]).text()
        $(button).click(e => {
            deleteTask(name)
            renderTasks()
        })
        const completed = $(articles[i]).children(".completed")[0]
        $(completed).change(e => {
            setCompleted(name, completed.checked)
            renderTasks()
        })
    }
}

function format(date) {
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

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function saveState() {
    window.history.pushState(JSON.parse(localStorage.getItem("tasks")), null, this.href)
}

function replaceTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function setCompleted(name, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const index = tasks.map(t => t.name).indexOf(name)
    tasks[index].completed = completed;
    replaceTasks(tasks);
}
