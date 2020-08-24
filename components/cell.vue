<template>
  <span
    class="gantt-cell d-inline-block"
    :style="{ backgroundColor: `#${colour}`, width: `${(endTime - startTime) * 55}px`, borderRadius: `${isStart ? '15' : '0'}px ${isEnd ? '15' : '0'}px ${isEnd ? '15' : '0'}px ${isStart ? '15' : '0'}px` }"
  >
    <div class="time-start">
      <span>{{ startTime }}</span>
    </div>
    {{ name }}
    <div v-if="isEnd" class="time">
      <span>{{ endTime }}</span>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    startTime: {
      type: Number,
      required: false,
      default: 0
    },
    endTime: {
      type: Number,
      required: false,
      default: 0
    },
    isStart: {
      type: Boolean,
      required: false,
      default: false
    },
    isEnd: {
      type: Boolean,
      required: false,
      default: false
    },
    colour: {
      type: String,
      required: false,
      default: '000000'
    }
  }
}
</script>

<style scope>
.gantt-cell .time-start{
  position: absolute;
  left: 0px;
  bottom: -25px;
  color: black;
	transform: translateX(-50%);
}

.gantt-cell {
	color : white;	
	padding: 5px 20px;
	position: relative;
  width: 80px;
	text-align: center;
  opacity: 1;
  margin: 20px 0px 20px 0px;
	-webkit-transition: all 0.2s ease-out;
	-moz-transition: all 0.2s ease-out;
	-ms-transition: all 0.2s ease-out;
	-o-transition: all 0.2s ease-out;
	transition: all 0.2s ease-out;
}

.gantt-cell:hover{
  opacity: 0.7;
}

.gantt-cell .time{
	position : absolute;
	bottom: -25px;
	right : 0;
	color: black;
	transform: translateX(50%);
}
</style>