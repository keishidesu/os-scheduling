<template>
  <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" bg-variant="dark" no-header shadow>
    <template v-slot:default="{ hide }">
      <div class="p-3">
        <h4 class="text-white py-3">Scheduling Algorithm</h4>
        <p class="text-white">
          The 3 algorithms that are visualized are: 
        </p>
        <b-list-group class="text-white">
          <b-list-group-item
            v-for="algorithm in algorithms"
            :key="algorithm"
            class="bg-transparent"
          >
            {{ algorithm }}
          </b-list-group-item>
        </b-list-group>
        <b-button variant="light" block @click="hide" class="my-4">Close</b-button>
        <p class="text-white">
          Github: <a href="https://keishidesu.github.io/os-scheduling/">https://keishidesu.github.io/os-scheduling/</a>
        </p>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
export default {
  data () {
    return {
      algorithms: [
        'Non-Preemptive SJF',
        'Preemptive SJF',
        'Round Robin Time Quantum 3'
      ]
    }
  }
}
</script>

<style scoped>
.bg-transparent {
  background-color:rgba(0, 0, 0, 0)
}
</style>