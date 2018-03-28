<template>
  <div class="container">
    <c-header title="toast" />
    <div class="button-group">
      <c-button size="large" @click.native="toastTop">
        toast top success
      </c-button>
      <c-button size="large" @click.native="toastMiddle">
        toast middle error
      </c-button>
      <c-button size="large" @click.native="toastBottom">
        toast bottom warning
      </c-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toastTop () {
      this.$toast({
        message: 'toast top',
        position: 'top',
        className: 'success'
      })
    },
    toastMiddle () {
      this.$toast({
        message: 'toast middle',
        position: 'middle',
        duration: 5000,
        className: 'wrong'
      })
    },
    toastBottom () {
      this.$toast({
        message: 'toast bottom',
        position: 'bottom',
        duration: 1000,
        className: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-group {
  height: 100%;
}
</style>
