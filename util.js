function putTask(task) {
    if (localStorage.getItem("tasks") == null)
        localStorage.setItem("tasks", JSON.stringify([task]))
    else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

function deleteTask(name) {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks != null) {
        const index = tasks.map(t => t.name).indexOf(name)
        if (index > -1)
            tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks !== null)
        $("#tasks").html(tasks.map(t => {
            console.log(t.name)
            return `<article>
            <label>${escapeHtml(t.name)}</label> ${new Date(t.deadline)}
            <input type="checkbox" ${t.completed === true ? 'checked="true"' : ''}/>
            <button>Delete</button>
            </article>
            `
        }
        ))

    const articles = $("#tasks").children("article")
    for (let i = 0; i < articles.length; i++) {
        const button = $(articles[i]).children("button")[0]
        button.addEventListener('click', (e => {
            deleteTask($($(articles[i]).children("label")[0]).text())
            renderTasks()
        }))
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
