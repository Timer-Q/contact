<template>
  <button
    class="button"
    :class="[`button-${type}`, `button-${size}`]"
    :type="nativeType">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'danger'].indexOf(value) > -1
      }
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['small', 'normal', 'large'].indexOf(value) > -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 4px;
  text-align: center;
  transition: background .2s;
  user-select: none;
}
.button-default {
  color: #656b79;
  background-color: $lightDark;
  box-shadow: 0 0 1px #b8bbbf;
  &:active {
    background: darken($lightDark, 5%);
  }
}
.button-primary {
  color: #fff;
  background-color: $blue;
  &:active {
    background: darken($blue, 5%);
  }
}
.button-danger {
  color: #fff;
  background-color: $red;
  &:active {
    background: darken($red, 5%);
  }
}
.button-normal {
  height: px2Rem(30);
  line-height: px2Rem(30);
  font-size: 14px;
  padding: 0 14px;
}
.button-small {
  height: px2Rem(26);
  line-height: px2Rem(26);
  font-size: 12px;
  padding: 0 12px;
}
.button-large {
  display: block;
  width: 100%;
  height: px2Rem(34);
  line-height: px2Rem(34);
  font-size: 16px;
  padding: 0 16px;
}
</style>
