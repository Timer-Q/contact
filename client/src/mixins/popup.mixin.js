import PopupManager from '@/base/popup/src/popup-manager.js'
let idStep = 1
export default {
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
