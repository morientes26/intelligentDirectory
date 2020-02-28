const appRoot = require('app-root-path')
const Scheduler = require(appRoot + '/core/scheduler')

var counter = 0
let task = () => {
    counter++
}

jest.useFakeTimers();

test('job done by scheduler', () => {
    let s = Scheduler(task, 2)
    s.start()
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000)
    s.stop()
});
