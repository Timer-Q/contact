<template>
  <section class="content">
    <c-header title="登录" :isNeedBack="true"></c-header>
    <section class="page-part">
      <c-cell title="title" label="label" value="value"></c-cell>
      <c-input clearable type="password" placeholder="请输入密码">
        <span>11233223</span>
      </c-input>
    </section>
    <section class="page-part">
      <c-input type="textarea" placeholder="请输入手机号"/>
      <c-input type="password" placeholder="请输入密码">
        <span>11233223</span>
      </c-input>
    </section>
    <section class="page-part">
      <c-date-picker/>
    </section>
  </section>
</template>

<script>
export default {

}
</script>
