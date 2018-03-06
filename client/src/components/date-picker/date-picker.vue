<template>
  <section class="page-part">
    <c-header title="类pc日期选择" />
    <c-date-picker @dateSelect="getDate"/>
    <p> {{date.year}} - {{date.month}} - {{date.date}} </p>
  </section>
</template>

<script>
export default {
  data () {
    return {
      date: {}
    }
  },
  methods: {
    getDate (date) {
      console.log(date)
      this.date = date
    }
  }
}
</script>
