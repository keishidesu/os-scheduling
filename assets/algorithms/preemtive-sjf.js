export default (scheduler) => {
  let moments = []
  while(true) {
    if (scheduler.isAllCompleted()) {
      let moment = scheduler.switchProcess(undefined)
      if (moment) moments.push(moment)
      break
    }
    if (scheduler.hasHandlingProcess()) {
      if (scheduler.isHandlingCompleted() || scheduler.hasProcessArriving()) {
        const process = scheduler.getArrivedShortest()
        if (process === undefined || process.timings.left !== scheduler.handlingProcess.timings.left) {
          let moment = scheduler.switchProcess(process)
          if (moment) moments.push(moment)
        }
      }
    } else {
      if (scheduler.hasProcessArriving()) {
        const process = scheduler.getArrivingProcess()[0]
        let moment = scheduler.switchProcess(process)
        if (moment) moments.push(moment)
      }
    }
    scheduler.stepForward()
  }
  return moments
}
