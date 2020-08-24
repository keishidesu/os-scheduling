export default class Moment {

  constructor(name, start, end) {
    this.name = name
    this.start = start
    this.end = end
    this.colour = '000000'
  }

  /* Check if this moment is an idle moment */
  isIdle() {
    return (this.name === undefined)
  }

}