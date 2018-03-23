<template>
  <transition :name="transitionName">
    <div v-show="value" class="popup" :class="`popup-${position}`" :style="{'z-index': popupZIndex}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import PopupManager from './popup-manager.js'

let idStep = 1
/**
 * TODO: 1. 禁止界面滚动 lockScroll 需要获取 scrollbar 的宽度
 * TODO: 2. 传入自定义样式
 */
export default {
  name: 'CPopup',
  props: {
    position: {
      type: String,
      default: 'bottom',
      volidator (value) {
        return ['top', 'right', 'bottom', 'left', 'middle'].indexOf(value) > -1
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    openDelay: {
      type: Number
    },
    showMask: {
      type: Boolean,
      default: false
    },
    closeDelay: {
      type: Number
    }
  },
  data () {
    return {
      popupZIndex: 2000
    }
  },
  mounted () {
    this._popupId = `popup-${idStep++}`
    PopupManager.zIndex = this.zIndex || 2000
  },
  beforeDestroy () {
    PopupManager.deregister(this._popupId)
    PopupManager.closeMask(this._popupId)
    console.log('destroy')
  },
  methods: {
    openPopup () {
      PopupManager.register(this._popupId, this)
      clearTimeout(this._openTimer)
      if (this.openDelay) {
        this._openTimer = setTimeout(_ => {
          this.doOpen()
        }, this.openDelay)
      } else {
        this.doOpen()
      }
    },
    doOpen () {
      if (this.showMask) {
        PopupManager.openMask(this._popupId, this.$el, PopupManager.getNextZIndex())
      }
      if (this._closeTimer) {
        clearTimeout(this._closeTimer)
      }
      this.popupZIndex = PopupManager.getNextZIndex()
      // 如果有 closeDelay ，自动关闭
      if (this.closeDelay) {
        this._closeTimer = setTimeout(_ => {
          this.closePopup()
        }, this.closeDelay)
      }
    },
    closePopup () {
      if (this.showMask) {
        PopupManager.closeMask(this._popupId)
      }
      this.$emit('input', false)
    }
  },
  computed: {
    transitionName () {
      return `popup-slider-${this.position}`
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.openPopup()
      } else {
        this.closePopup()
      }
    }
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  padding: px2Rem(10);
  transition: all .2s;
  background: darken($color: #fff, $amount: 10);
  box-sizing: border-box;
}
.popup-bottom {
  left: 0;
  bottom: 0;
  width: 100%;
}
.popup-slider-bottom-enter,
.popup-slider-bottom-leave-to {
  transform: translateY(100%)
}
.popup-top {
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: rgba($color: #fff, $alpha: .9);
  color: #333;
  box-shadow: 0 5px 10px #ddd;
}
.popup-slider-top-enter,
.popup-slider-top-leave-to {
  transform: translateY(-100%);
}
.popup-left,
.popup-right {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: lighten($color: #fff, $amount: 20)
}
.popup-slider-left-enter,
.popup-slider-left-leave-to {
  transform: translateX(-100%);
}
.popup-slider-right-enter,
.popup-slider-right-leave-to {
  transform: translateX(100%);
}
.popup-center {
  width: 80%;
  border-radius: px2Rem(5);
  background: lighten($color: #fff, $amount: 20);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
}
.popup-slider-center-enter,
.popup-slider-center-leave-to {
  opacity: 0;
}
.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba($color: #000000, $alpha: .3);
  transition: all .3s;
}
</style>
