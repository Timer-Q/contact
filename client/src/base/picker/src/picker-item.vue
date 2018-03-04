<template>
  <section class="picker-content" :style="{height: showLine * itemHeight + 'px'}">
    <div
      class="picker-list"
      :style="{transform: `translateY(${touchObj.translateY}px)`}"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      ref="list">
      <div
        class="picker-item"
        v-for="(item, index) in listData"
        :key="item"
        @click.stop="handlePickerItemClick(index)">
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
        translateY: 0,
        lastTanslateY: 0
      },
      pickDate: null,
      getValFunc: null
    }
  },
  mounted () {
    this.touchObj.translateY = this.itemHeight * this.offsetItem
    this.touchObj.lastTanslateY = this.touchObj.translateY
    // 这样写有问题 transition 不正常
    // const element = this.$refs.list
    // if (element) {
    //   element.addEventListener('touchstart', this.handleTouchStart)
    //   element.addEventListener('touchmove', this.handleTouchMove)
    //   element.addEventListener('touchend', this.handleTouchEnd)
    // }
  },
  methods: {
    handleTouchStart (event) {
      const touches = event.changedTouches[0] || event.touches[0]
      this.touchObj.startY = touches.pageY
      this.touchObj.lastTanslateY = this.touchObj.translateY
    },
    handleTouchMove (event) {
      event.preventDefault()
      const touches = event.changedTouches[0] || event.touches[0]
      this.touchObj.endY = touches.pageY
      this.touchObj.translateY = this.touchObj.endY - this.touchObj.startY + this.touchObj.lastTanslateY
    },
    handleTouchEnd (event) {
      // 向下边界情况
      if (this.touchObj.translateY > 0 && this.touchObj.translateY > this.downMaxDistance) {
        this.touchObj.translateY = this.downMaxDistance
      }
      // 向上边界情况
      if (this.touchObj.translateY < 0 && this.touchObj.translateY < this.upMaxDistance) {
        this.touchObj.translateY = this.upMaxDistance
      }
      this.touchObj.translateY = Math.round(this.touchObj.translateY / this.itemHeight) * this.itemHeight
      // this.$emit('valueChange', this.selectedValue)
    },
    handlePickerItemClick (index) {
      this.touchObj.translateY = (this.offsetItem - index) * this.itemHeight
    }
  },
  computed: {
    /**
     * 中间选中的值 距离顶端隔了几个 item
     */
    offsetItem () {
      return parseInt(this.showLine / 2)
    },
    /**
     * 向下拉 最大距离
     */
    downMaxDistance () {
      return (this.showLine - this.offsetItem - 1) * this.itemHeight
    },
    /**
     * 向上拉 最大距离
     */
    upMaxDistance () {
      return -this.listData.length * this.itemHeight + (this.offsetItem + 1) * this.itemHeight
    },
    selectedValue () {
      const index = Math.abs(this.touchObj.translateY - this.offsetItem * this.itemHeight) / this.itemHeight
      return this.listData[index]
    }
  },
  watch: {
    'touchObj.translateY' (val) {
      if (Math.abs(val % this.itemHeight) !== 0) return
      this.$emit('valueChange', this.selectedValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-content {
  overflow: hidden;
  width: 100%;
  .picker-list {
    transition: all .2s;
    .picker-item {
      font-size: 18px;
      line-height: 2;
      text-align: center;
    }
  }
}
</style>
