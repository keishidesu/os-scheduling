export default (scheduler) => {
  let moments = []
  while(true) {
    if (scheduler.isAllCompleted()) {
      let moment = scheduler.switchProcess(undefined)
      if (moment) moments.push(moment)
      break
    }
    if (scheduler.hasHandlingProcess()) {
      if (scheduler.isHandlingCompleted()) {
        const process = scheduler.getArrivedShortest()
        let moment = scheduler.switchProcess(process)
        if (moment) moments.push(moment)
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
