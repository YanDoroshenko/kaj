$(document).ready(e => {
    saveState()
    renderTasks()
    $("#newTaskDeadline").val(format(new Date()))
    $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>")
    $("#newTaskName").keypress(e => {
        var key = e.which || e.keyCode;
        if (key === 13) {
            const deadline = $("#newTaskDeadline").val()
            const hasDeadline = deadline != ""
            if (!hasDeadline)
                $("#newTaskDeadlineFeedback").addClass("nodeadline")

            const name = $("#newTaskName").val()
            const hasName = name !== undefined && name !== ""
            if (!hasName)
                $("#newTaskNameFeedback").addClass("noname")

            const tasks = localStorage.getItem("tasks")
            const exists = tasks != null && JSON.parse(tasks).map(t => t.name).indexOf(name) != -1
            if (exists)
                $("#newTaskNameFeedback").addClass("exists")

            if (!hasDeadline || !hasName || exists) {
                new Audio("res/sound.wav").play()
                return
            }

            const deadlineDate = Date.parse(deadline)
            if ($("#newTaskCompleted").prop('checked'))
                putTask(new CompletedTask(name, deadlineDate))
            else
                putTask(new NewTask(name, deadlineDate))

            $("#newTaskDeadline").val(format(new Date()))
            $("#newTaskName").val("")
            $("#newTaskCompleted").prop("checked", false)
            $("#newTaskNameFeedback").removeClass("noname")
            $("#newTaskNameFeedback").removeClass("exists")
            $("#newTaskDeadlineFeedback").removeClass("nodeadline")
            renderTasks()
        }
    })
    $(window).on('offline', e => {
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"red\">Offline</text>")
    })
    $(window).on('online', e => {
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>")
    })
    $(window).on('popstate', e => {
        replaceTasks(e.originalEvent.state)
        renderTasks()
    })
});
