<template>
  <div :class="{ 'd-none': (moments.length <= 0) }" class="py-3 px-1">
    <div>
      <span class="font-weight-bold mr-1">
        {{ name }}
      </span>
      <span>
        |
      </span>
      <b-button v-b-modal="`modal-${name}`" variant="link" class="ml-1 p-0">
        View Summary Table
      </b-button>
    </div>
    <Cell
      v-for="(moment, i) in moments"
      :name="(moment.name) ? moment.name : '-'"
      :startTime="moment.start"
      :endTime="moment.end"
      :isStart="(i === 0)"
      :isEnd="(moments.length === i + 1)"
      :key="`${name}-moment-${i}`"
      :colour="moment.colour"
    />
    <b-modal :hide-header="true" :hide-footer="true" :id="`modal-${name}`" centered>
      <ResultTable :scheduler="scheduler" />
    </b-modal>
  </div>
</template>

<script>
import Cell from '~/components/cell.vue'
import ResultTable from '~/components/result-table'

export default {
  component: {
    Cell,
    ResultTable
  },
  props: {
    name: {
      type: String,
      required: true
    },
    moments: {
      type: Array,
      required: true
    },
    scheduler: {
      type: Object,
      required: true
    }
  }
}
</script>
