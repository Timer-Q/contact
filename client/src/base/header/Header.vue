<template>
  <header class="header">
    <div class="header-left">
      <a v-if="isNeedBack" href="javascript:;" class="arrow-left"></a>
    </div>
    <section class="header-title">
      {{title}}
    </section>
    <div class="header-right">
      <slot name="header-right"></slot>
    </div>
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
    title: {
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
  padding: px2Rem(5) px2Rem(10);
  .header-left {
    flex: 1;
    text-align: left;
  }
  .header-title {
    flex: 2;
    text-align: center;
  }
  .header-right {
    flex: 1;
    text-align: right;
  }
  .arrow-left {
    vertical-align: middle;
    @include arrow-left(10px, #fff, $blue);
  }
}
</style>
