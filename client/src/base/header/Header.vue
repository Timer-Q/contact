<template>
  <header class="header">
    <span>
      <a v-if="isNeedBack" href="javascript:;" class="arrow-left"></a>
    </span>
    <section class="header-wrapper">
      {{headerText}}
    </section>
    <slot name="header-right">
      <span></span>
    </slot>
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
.header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  background-color: $blue;
  color: #fff;
  font-size: 18px;
  padding: px2Rem(10);
  .arrow-left {
    vertical-align: middle;
    @include arrow-left(10px, #fff, $blue);
  }
  .header-wrapper {
    flex: 1;
    text-align: center;
  }
}
</style>
