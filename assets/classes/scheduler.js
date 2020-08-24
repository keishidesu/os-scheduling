import Moment from './moment.js';
import { colour } from '../colour.json'

export default class Scheduler {

  constructor() {
    this.processes = new Map()
    this.processList = []
    this.handlingProcess = undefined
    this.incomplete = 0
    this.lastSwitch = 0
    this.time = 0
  }

  /* Check if there is a process being handled */
  hasHandlingProcess() {
    return (this.handlingProcess) ? true : false
  }

  /* Check if there is any processes arriving at the moment */
  hasProcessArriving() {
    return this.processes.has(this.time)
  }

  /* Get all the arriving process at the moment */
  getArrivingProcess() {
    return this.processes.get(this.time)
  }

  /* Check if the handling process is completed */
  isHandlingCompleted() {
    return this.handlingProcess.isComplete()
  }
  
  /* Check if all the processes are completed */
  isAllCompleted() {
    return (this.incomplete <= 0)
  }

  /* Get average turnaround time */
  getAverageTurnaroundTime() {
    let sum = 0
    for (const process of this.processList) {
      sum += process.timings.elapsed
    }
    return sum / this.processList.length
  }

  /* Get average wait time */
  getAverageWaitTime() {
    let sum = 0
    for (const process of this.processList) {
      sum += process.timings.idle
    }
    return sum / this.processList.length
  }

  /* Get arrived shortest process */
  getArrivedShortest() {
    let shortestProcess = undefined
    for (const [key, value] of this.processes.entries()) {
      if (key > this.time) continue
      for (const process of value) {
        if (process.isComplete()) continue
        if (shortestProcess === undefined || shortestProcess.timings.left > process.timings.left) {
          shortestProcess = process
        }
      }
    }
    return shortestProcess
  }

  /* Add process into schedule and sort according to burst time */
  registerProcess(process) {
    process.colour = colour[this.processList.length]
    if (this.processes.has(process.timings.start)) {
      const list = this.processes.get(process.timings.start)
      list.push(process)
      list.sort((a, b) => a.timings.left - b.timings.left)
    } else {
      this.processes.set(process.timings.start, [process])
    }
    this.processList.push(process)
    this.incomplete++
  }

  /* Switch handling process */
  switchProcess(process) {
    let moment = undefined
    if (!(this.handlingProcess ? !process : process)) {
      if (this.handlingProcess && process) {
        if (this.handlingProcess.name === process.name) {
          return undefined
        }
      } else {
        return undefined
      }
    }
    if (this.lastSwitch < this.time) {
      moment = new Moment(
        (this.handlingProcess) ? this.handlingProcess.name : undefined,
        this.lastSwitch,
        this.time
      )
      moment.colour = (this.handlingProcess) ? this.handlingProcess.colour : '000000'
    }
    this.lastSwitch = this.time
    this.handlingProcess = process
    return moment
  }

  /* Simulate the time passed */
  stepForward() {
    this.time++
    if (this.handlingProcess) {
      if (!this.handlingProcess.isComplete()) {
        this.handlingProcess.progress(1, this.time)
        if (this.handlingProcess.isComplete()) {
          this.incomplete--
        }
      }
    }
  }

}