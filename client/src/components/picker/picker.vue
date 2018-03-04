<template>
  <section class="page-part">
    <c-header title="picker" />
    <c-picker v-model="pickerValue" />
    <h1>picker value {{ pickerValue }}</h1>
  </section>
</template>

<script>
export default {
  data () {
    return {
      pickerValue: 1
    }
  }
}
</script>
