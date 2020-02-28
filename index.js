#!/usr/local/bin node

const Scheduler = require('./core/scheduler')
const robot = require('./core/robot')

let s = Scheduler(robot.task, robot.interval)
s.start()
