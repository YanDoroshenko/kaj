// Main JS file
$(document).ready(e => {
    saveState()
    renderTasks()
    $("#newTaskDeadline").val(format(new Date())) // Set deadline value to the current date
    $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>") // Application thinks it's online by default
    $("#newTaskName").keypress(e => {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 = Enter
            const deadline = $("#newTaskDeadline").val()
            const hasDeadline = deadline != ""
            if (!hasDeadline)
                $("#newTaskDeadlineFeedback").addClass("nodeadline") // Empty deadline - show warning

            const name = $("#newTaskName").val()
            const hasName = name !== undefined && name !== ""
            if (!hasName)
                $("#newTaskNameFeedback").addClass("noname") // Empty name - show warning

            const tasks = localStorage.getItem("tasks")
            const exists = tasks != null && JSON.parse(tasks).map(t => t.name).indexOf(name) != -1
            if (exists)
                $("#newTaskNameFeedback").addClass("exists") // Duplicate name - show warning

            if (!hasDeadline || !hasName || exists) { // If input invalid, play sound and exit
                new Audio("res/sound.wav").play()
                return
            }

            // Task creation
            const deadlineDate = Date.parse(deadline)
            if ($("#newTaskCompleted").prop('checked'))
                putTask(new CompletedTask(name, deadlineDate))
            else
                putTask(new NewTask(name, deadlineDate))

            // Reset creation form
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
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"red\">Offline</text>") // Show red "Offline"
    })
    $(window).on('online', e => {
        $("#svg").html("<text x=\"0\" y=\"15\" fill=\"green\">Online</text>") // Show green "Online"
    })
    $(window).on('popstate', e => { // History manipulation
        replaceTasks(e.originalEvent.state)
        renderTasks()
    })
});
