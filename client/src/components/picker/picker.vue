<template>
  <section class="page-part">
    <c-header title="picker" />
    <c-picker v-model="pickerValue" :pickerData="pickerData" :showLine="5"/>
    <h1>picker value {{ pickerValue }}</h1>
  </section>
</template>

<script>
export default {
  data () {
    function initialData () {
      let arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(i + ' picker')
      }
      return arr
    }
    return {
      pickerValue: 1,
      pickerData: initialData()
    }
  }
}
</script>
