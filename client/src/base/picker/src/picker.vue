<template>
  <section class="picker">
    <c-picker-item @valueChange="pickerValueChange" :listData="pickerData" :showLine="showLine"/>
  </section>
</template>

<script>
export default {
  name: 'CPicker',
  props: {
    pickerData: [Array],
    showLine: {
      type: Number,
      default: 3
    }
  },
  methods: {
    pickerValueChange (value) {
      this.$emit('input', value)
    }
  },
  components: {
    CPickerItem: _ => import('./picker-item')
  }
}
</script>

<style lang="scss" scoped>
.picker {
  display: flex;
}
</style>
