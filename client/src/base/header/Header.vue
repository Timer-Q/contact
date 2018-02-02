<template>
  <header class="header">
    <a v-if="isNeedBack" href="javascript:;" class="arrow-left"></a>
    <section class="header-wrapper">
      {{headerText}}
    </section>
    <slot name="header-right"></slot>
  </header>
</template>

<script>
export default {
  name: 'CHeader',
  props: {
    isNeedBack: {
      type: Boolean,
      default: true
    },
    headerText: {
      type: String,
      default: '首页'
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/mixins/index.scss";
.header {
  background-color: $blue;
  color: #fff;
  font-size: 30px;
  padding: 10px 0;
  .arrow-left {
    @include arrow-left(20px, #fff, $blue);
    float: left;
  }
  .header-wrapper {
    margin: 0 auto;
    width: 80%;
    text-align: center;
  }
}
</style>
