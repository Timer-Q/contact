<template>
  <section class="picker-content" :style="{height: showLine * itemHeight + 'px'}">
    <div class="picker-list" @touchstart="handleTouchStart">
      <div class="picker-item" v-for="item in listData" :key="item">
        {{item}}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CPickerItem',
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    },
    showLine: Number
  },
  data () {
    return {
      itemHeight: 36,
      touchObj: {
        startY: 0,
        endY: 0,
        startTime: 0,
        endTime: 0,
        translateY: 0
      }
    }
  },
  methods: {
    handleTouchStart (event) {
      event.preventDefault()
      console.log(event)
      const touches = event.changedTouches[0] || event.touches[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-content {
  overflow: hidden;
  width: 100%;
  .picker-list {
    .picker-item {
      font-size: 18px;
      line-height: 2;
      text-align: center;
    }
  }
}
</style>
