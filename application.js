function putTask(task) {
    if (localStorage.getItem("tasks") == null)
        localStorage.setItem("tasks", JSON.stringify([task]))
    else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

function deleteTask(task) {
    if (localStorage.getItem("tasks") == null)
        localStorage.setItem("tasks", JSON.stringify([task]))
    else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        const index = tasks.indexOf(task)
        if (index > -1)
            tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks !== null)
    $("#tasks").html(tasks.map(t =>
        `
        <article>
        ${t.name}
        </article>
        `))
}
