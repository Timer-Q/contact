<template>
  <section class="picker">
    <c-picker-item @valueChange="pickerValueChange" :listData="pickerData" :showLine="showLine"/>
  </section>
</template>

<script>
export default {
  name: 'CPicker',
  data () {
    function initialData () {
      let arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(i)
      }
      return arr
    }
    return {
      pickerData: initialData(),
      showLine: 3
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
