<template>
  <section class="content">
    <c-header title="登录" :isNeedBack="false"></c-header>
    <section class="page-part">
      <c-input type="text" placeholder="请输入手机号" />
      <c-input type="password" placeholder="请输入密码">
        <span>11233223</span>
      </c-input>
      <div class="button-group">
        <c-button @click.native="handleLogin" type="primary" size="large">登录</c-button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  methods: {
    handleLogin () {
      this.$router.push({
        path: '/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-group {
  margin-top: 10px;
}
</style>
