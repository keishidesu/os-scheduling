<template>
  <div class="container py-4">
    <b-button v-b-toggle.sidebar-no-header class="mb-3">
      <i class="fa fa-bars mr-2" />
      Details
    </b-button>
    <div style="font-size:2rem">
      TSN2101 Operating System Assignment Scheduling Algorithm
    </div>
    <div style="font-size:1.5rem" class="mt-3">
      Casey Teh Qi Shi - 1171103211 - TC01 TT02
    </div>
    <Table />
  </div>
</template>

<script>
import Table from '~/components/table.vue'

export default {
  components: {
    Table
  }
}
</script>

<style>

</style>
