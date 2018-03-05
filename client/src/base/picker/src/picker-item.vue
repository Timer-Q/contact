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
        @click.stop="handlePickerItemClick(index)"
        :style="{transform: `rotateX(${(selectedIndex - index) * 15}deg)`}">
        {{item}}
      </div>
    </div>
    <div class="picker-device" :style="{height: itemHeight + 'px', top: itemHeight * offsetItems + 'px'}"></div>
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
      getValFunc: null,
      timer: null
    }
  },
  mounted () {
    this.touchObj.translateY = this.itemHeight * this.offsetItems
    this.touchObj.lastTanslateY = this.touchObj.translateY
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
      this.touchObj.translateY = (this.offsetItems - index) * this.itemHeight
    }
  },
  computed: {
    /**
     * 中间选中的值 距离顶端隔了几个 item
     */
    offsetItems () {
      return parseInt(this.showLine / 2)
    },
    /**
     * 向下拉 最大距离
     */
    downMaxDistance () {
      return (this.showLine - this.offsetItems - 1) * this.itemHeight
    },
    /**
     * 向上拉 最大距离
     */
    upMaxDistance () {
      return -this.listData.length * this.itemHeight + (this.offsetItems + 1) * this.itemHeight
    },
    selectedIndex () {
      return Math.abs(this.touchObj.translateY - this.offsetItems * this.itemHeight) / this.itemHeight
    },
    selectedValue () {
      return this.listData[this.selectedIndex]
    }
  },
  watch: {
    'touchObj.translateY' (val) {
      // 小小 debounce 一下
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(_ => {
        this.$emit('valueChange', this.selectedValue)
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-content {
  position: relative;
  overflow: hidden;
  width: 100%;
  .picker-list {
    transition: all .2s;
    perspective: 200px;
    transform-style: preserve-3d;
    perspective-origin: 50% 50%;
    .picker-item {
      font-size: 18px;
      line-height: 2;
      backface-visibility: hidden;
      text-align: center;
      transition: all 0s;
    }
  }
  .picker-device {
    position: absolute;
    width: 100%;
    top: 36px;
    left: 0;
    height: 36px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
}
</style>
