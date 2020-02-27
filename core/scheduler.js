class Scheduler {

    /**
    * @param task {function} job to do
    * @param interval {integer} seconds
    */
    constructor(task, interval) {
        this.task = task
        this.interval = interval
        this.id = 0
        this.counter = 0
    }

    /**
    * start scheduler
    */
    start() {
        this.id = this.execute()
    }

    /**
    * stop scheduler
    */
    stop() {
        clearInterval(this.id)
    }

    /**
    * get count of completed tasks
    */
    taskCount() {
        return this.counter
    }

    /**
    * wrapped scheduled task
    */
    execute() {
        let wrapper = () => {
            this.task()
            this.counter++
        }

        return setInterval(wrapper, this.interval * 1000)
    }
}

module.exports = (task, interval) => new Scheduler(task, interval)
