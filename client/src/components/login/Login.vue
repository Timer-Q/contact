<template>
  <section class="content">
    <c-header title="登录" :isNeedBack="false"></c-header>
    <section class="page-part">
      <c-input type="text" placeholder="请输入手机号"/>
      <c-input type="password" placeholder="请输入密码">
        <span>11233223</span>
      </c-input>
      <button type="button" @click="handleLogin">登录</button>
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
