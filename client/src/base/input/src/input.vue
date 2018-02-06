<template>
  <section>
    <input
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      class="c-input">
  </section>
</template>

<script>
export default {
  name: 'CInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean
    },
    placeholder: String
  }
}
</script>

<style lang="scss" scoped>
.c-input {
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 16px;
  padding: px2Rem(5);
  width: 100%;
}
</style>
