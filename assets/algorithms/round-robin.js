export default (scheduler) => {
  const quantum = 3
  let step = 0
  let moments = []
  let queue = []
  while(true) {
    if (scheduler.isAllCompleted()) {
      let moment = scheduler.switchProcess(undefined)
      if (moment) moments.push(moment)
      break
    }
    if (scheduler.hasProcessArriving()) {
      queue = queue.concat(scheduler.getArrivingProcess())
    }
    if (scheduler.hasHandlingProcess()) {
      if (++step >= quantum || scheduler.isHandlingCompleted()) {
        let moment = undefined
        if (queue.length > 0) {
          if (!scheduler.isHandlingCompleted()) queue.push(scheduler.handlingProcess)
          moment = scheduler.switchProcess(queue.shift())
        } else {
          if (scheduler.isHandlingCompleted()) {
            moment = scheduler.switchProcess(undefined)
          }
        }
        if (moment) moments.push(moment)
        step = 0
      }
    } else {
      if (queue.length > 0) {
        let moment = scheduler.switchProcess(queue.shift())
        if (moment) moments.push(moment)
      }
    }
    scheduler.stepForward()
  }
  return moments
}
