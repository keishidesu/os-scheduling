<template>
  <div class="my-3">
    <div class="gantt">
      <Gantt v-for="algorithm in algorithms" :name="algorithm.name" :moments="algorithm.moments" :scheduler="algorithm.scheduler" :key="`gantt-${algorithm.name}`" />
    </div>
    <div class="my-4">
      <button type='button' class="btn btn-info" @click="addProcess">
        <i class="fa fa-plus-circle" />
        Add Process
      </button>
      <b-button @click="simulate()" variant="outline-info">Run Algorithms</b-button>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Process</th>
            <th scope="col">Arrival Time</th>
            <th scope="col">Burst Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(process, i) in processes" :key="`process-${i}`">
            <td>
              <button type='button' class="btn btn-danger" @click="deleteProcess(process)">
                <i class="fa fa-trash" />
              </button>
            </td>
            <td>
              <b-form-input type="text" class="form-control" placeholder="Name" v-model="process.name" />
            </td>
            <td>
              <b-form-input type="number" step="1" min="0" class="form-control" placeholder="Arrival Time" v-model="process.start" />
            </td>
            <td>
              <b-form-input type="number" step="1" min="0" class="form-control" placeholder="Burst Time" v-model="process.burst" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Gantt from '~/components/ganttchart.vue'
import Scheduler from '~/assets/classes/scheduler.js'
import Process from '~/assets/classes/process.js'
import rr_simulate from '~/assets/algorithms/round-robin.js'
import nps_simulate from '~/assets/algorithms/non-preemtive-sjf.js'
import ps_simulate from '~/assets/algorithms/preemtive-sjf.js'

export default {
  components: {
    Gantt
  },
  data() {
    return {
      algorithms: [
        {
          name: "Round Robin Time Quantum 3",
          func: rr_simulate,
          scheduler: new Scheduler(),
          moments: []
        },
        {
          name: "Non Preemtive SJF",
          func: nps_simulate,
          scheduler: new Scheduler(),
          moments: []
        },
        {
          name: "Preemtive SJF",
          func: ps_simulate,
          scheduler: new Scheduler(),
          moments: []
        }
      ],
      processes: [
        {
          name: 'P0',
          start: 0,
          burst: 7
        },
        {
          name: 'P1',
          start: 3,
          burst: 2
        }
      ]
    }
  },
  methods: {
    simulate () {
      for (const algorithm of this.algorithms) {
        algorithm.scheduler = new Scheduler()
        for (const process of this.processes) {
          const { name, start, burst } = process
          algorithm.scheduler.registerProcess(new Process(name, parseInt(start), parseInt(burst)))
        }
        algorithm.moments = algorithm.func(algorithm.scheduler)
      }
    },
    addProcess() {
      if (this.processes.length < 10) {
        this.processes.push({
          name: `P${this.processes.length}`,
          start: 0,
          burst: 1,
        })
      }
    },
    deleteProcess(process) {
      var i = this.processes.indexOf(process);
      if (i > -1) {
        this.processes.splice(i, 1)
      }
    }
  }
}
</script>

<style scoped>
.gantt{
	overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
}
</style>
