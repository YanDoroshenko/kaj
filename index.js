$(document).ready(e => {
    renderTasks()
    $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>")
    $("#createTask").click(e => {

        const deadline = $("#newTaskDeadline").val()
        const hasDeadline = deadline != ""
        if (!hasDeadline) {
            new Audio("sound.wav").play()
            e.preventDefault()
            return
        }
        const deadlineDate = Date.parse(deadline)

        const name = $("#newTaskName").val()

        const hasName = name != ""
        if (!hasName) {
            new Audio("sound.wav").play()
            e.preventDefault()
            return
        }

        const tasks = localStorage.getItem("tasks")
        if (tasks != null && JSON.parse(tasks).map(t => t.name).indexOf(name) != -1) {
            new Audio("sound.wav").play()
            e.preventDefault()
            return
        }

        if ($("#newTaskCompleted").prop('checked'))
            putTask(new CompletedTask(name, deadlineDate))
        else
            putTask(new NewTask(name, deadlineDate))
        renderTasks()
    })
    $(window).on('offline', e => {
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"red\">Offline</text>")
    })
    $(window).on('online', e => {
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>")
    })
});
