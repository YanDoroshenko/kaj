class Task {
    constructor(name, deadline, completed) {
        this.name = name
        this.deadline = deadline
        this.completed = completed
    }

    getName() {
        return this.name
    }

    getDeadline() {
        return this.deadline
    }

    toJSON() {
        return {
            "name" : this.name,
            "deadline": JSON.stringify(this.deadline),
            "completed" : this.completed
        }
    }
}

class CompletedTask extends Task {
    constructor(name, deadline) {
        super(name, deadline, true)
    }
}

class NewTask extends Task {
    constructor(name, deadline) {
        super(name, deadline, false)
    }
}
