<template>
  <div class="p-3">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Process</th>
          <th scope="col">Turnaround Time</th>
          <th scope="col">Waiting Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="process in scheduler.processList" :key="`process-${process.name}`">
          <th scope="row">{{ process.name }}</th>
          <td>{{ process.timings.elapsed }}</td>
          <td>{{ process.timings.idle }}</td>
        </tr>
        <tr class="font-weight-bold">
          <th scope="row">Average</th>
          <td>{{ scheduler.getAverageTurnaroundTime()  }}</td>
          <td>{{ scheduler.getAverageWaitTime() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    scheduler: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>