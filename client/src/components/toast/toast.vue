<template>
  <div class="container">
    <c-header title="toast" />
    <div class="button-group">
      <c-button type="primary" size="large" @click.native="toastTop">
        toast top
      </c-button>
      <c-button type="primary" size="large" @click.native="toastMiddle">
        toast top
      </c-button>
      <c-button type="primary" size="large" @click.native="toastBottom">
        toast top
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
        position: 'top'
      })
    },
    toastMiddle () {
      this.$toast({
        message: 'toast middle',
        position: 'middle',
        duration: 5000
      })
    },
    toastBottom () {
      this.$toast({
        message: 'toast bottom',
        position: 'bottom',
        duration: 1000
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.button-group {
  height: 100%;
}
</style>
