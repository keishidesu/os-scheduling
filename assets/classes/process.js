export default class Process {

  constructor (name, start, needed) {
    this.name = name
    this.timings = {
      start: start,
      needed: needed,
      left: needed,
      end: undefined,
      elapsed: undefined,
      idle: undefined
    }
    this.colour = '000000'
  }

  /* Simulate the progression of this process */
  progress(value, time) {
    this.timings.left -= value
    if (this.isComplete()) {
      this.timings.end = time + this.timings.left
      this.timings.elapsed = this.timings.end - this.timings.start
      this.timings.idle = this.timings.elapsed - this.timings.needed
    }
    return this.timings.left
  }

  /* Check if the process is arrived */
  isArrived(time) {{
    return (time >= this.timings.start)
  }}

  /* Check if the progress is already done */
  isComplete() {
    return (this.timings.left <= 0)
  }

}