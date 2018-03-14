<template>
  <section class="toast" :class="[position, {'hide': !visible}]">
    <div class="toast-content">
      <i v-if="className" class="iconfont" :class="`icon-${className}`"></i>
      {{message}}
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(_ => {
      console.log(this.message)
      console.log(this.position)
    })
  },
  methods: {
    removeDom () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
        this.$el.removeEventListener('transitionend', this.removeDom)
      }
    },
    close () {
      this.visible = false
      this.$el.addEventListener('transitionend', this.removeDom)
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  transition: opacity .3s;
  .toast-content {
    display: inline-block;
    max-width: 90%;
    background: rgba(0, 0, 0, .5);
    border-radius: 5px;
    padding: px2Rem(5);
    color: #fff;
    font-size: 14px;
    .iconfont {
      display: block;
      width: 100%;
      font-size: px2Rem(30);
    }
  }
  &.top {
    top: 10%;
  }
  &.bottom {
    bottom: 10%;
  }
  &.middle {
    top: 50%;
    transform: translateY(-50%);
  }
  &.hide {
    opacity: 0;
  }
}
</style>
