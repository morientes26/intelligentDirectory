#!/usr/local/bin node

const Scheduler = require('./core/scheduler')
const robot = require('./core/robot')

let task = robot;


var s = Scheduler(task, 5)
s.start()
