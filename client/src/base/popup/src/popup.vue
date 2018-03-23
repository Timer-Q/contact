<template>
  <transition :name="transitionName">
    <div v-show="value" :class="`popup-${position}`" :style="{'z-index': popupZIndex}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import PopupManager from './popup-manager.js'

let idStep = 1

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
    }
  },
  data () {
    return {
      popupZIndex: 2000
    }
  },
  mounted () {
    this._popupId = `popup-${idStep++}`
  },
  beforeDestroy () {
    PopupManager.deregister(this._popupId)
    PopupManager.closeMask(this._popupId)
    console.log('destroy')
  },
  methods: {
    openPopup () {
      PopupManager.register(this._popupId, this)
      PopupManager.openMask(this._popupId, this.$el, PopupManager.getNextZIndex(1))
      this.popupZIndex = PopupManager.getNextZIndex(2)
    },
    closePopup () {
      PopupManager.closeMask(this._popupId)
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
  .popup-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: px2Rem(10);
    transition: transform .2s;
    background: darken($color: #fff, $amount: 10)
  }
  .popup-slider-bottom-enter,
  .popup-slider-bottom-leave-to {
    transform: translateY(100%)
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
