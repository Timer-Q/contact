<template>
  <section class="date-picker">
    <div class="date-picker-header">
      <div class="date-picker-icon-btn" @click="switchMonth(-1)">
        <a href="javascript:;" class="arrow-left"></a>
      </div>
      <div class="date-picker-header-label">
        <span>{{chooseDate.year}}</span>年
        <span>{{chooseDate.month}}</span>月
      </div>
      <div class="date-picker-icon-btn" @click="switchMonth(1)">
        <a href="javascript:;" class="arrow-right"></a>
      </div>
    </div>
    <div class="date-picker-content">
      <span class="date-items" v-for="item in headerWeek" :key="item">
        {{item}}
      </span>
      <span
        class="date-items"
        :class="[`date-items-${item.label}`, {'date-choose': selectedDate.year === item.year && selectedDate.month === item.month && selectedDate.date === item.date}]"
        v-for="(item, index) in days"
        :key="index"
        @click="handleItemClick(item)">
        {{item.date}}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CDatePicker',
  data () {
    return {
      headerWeek: ['日', '一', '二', '三', '四', '五', '六'],
      days: [],
      chooseDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        dateObj: new Date()
      },
      selectedDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        dateObj: new Date()
      }
    }
  },
  methods: {
    handleItemClick (date) {
      this.selectedDate.year = date.year
      this.selectedDate.month = date.month
      this.selectedDate.date = date.date
      this.selectedDate.dateObj = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.date)
      console.log(this.selectedDate)
    },
    getMonthData (year, month) {
      if (!year || !month) {
        year = new Date().getFullYear()
        month = new Date().getMonth() + 1
      }
      this.days = []
      const firstDay = new Date(year, month - 1)
      // 该月第一天周几
      const firstWeekDay = firstDay.getDay()
      const lastDay = new Date(year, month, 0)
      // 该月最后一天
      const lastDate = lastDay.getDate()
      const lastDayOfPreMonth = new Date(year, month - 1, 0)
      // 上月最后一天
      const lastDateOfPreMonth = lastDayOfPreMonth.getDate()
      for (let index = 0; index < 7 * 6; index++) {
        let day = {}
        // 该月第一天不是周日
        if (index - firstWeekDay < 0) {
          day = {
            year,
            label: 'pre',
            month: month - 1,
            date: lastDateOfPreMonth - (firstWeekDay - 1) + index
          }
        } else if (index > lastDate + (firstWeekDay - 1)) {
          day = {
            year,
            label: 'after',
            month: month + 1,
            date: index - (firstWeekDay - 1) - lastDate
          }
        } else {
          day = {
            year,
            label: 'normal',
            month,
            date: index - (firstWeekDay - 1)
          }
        }
        this.days.push(day)
      }
      console.log(year, month)
      console.log(this.days)
    },
    switchMonth (data) {
      if (this.chooseDate.month + data === 0) {
        this.chooseDate.month = 12
        this.chooseDate.year--
      } else if (this.chooseDate.month + data > 12) {
        this.chooseDate.month = 1
        this.chooseDate.year++
      } else {
        this.chooseDate.month += data
      }
      this.getMonthData(this.chooseDate.year, this.chooseDate.month)
    }
  },
  mounted () {
    this.getMonthData()
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  text-align: center;
  .date-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2Rem(10);
    font-size: 16px;
  }
  .arrow-left {
    @include arrow-left(8px, #333);
  }
  .arrow-right {
    @include arrow-left(8px, #333, #fff, 180deg);
  }
  .date-picker-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .date-items {
    height: 55px;
    line-height: 55px;
    transition: all .3s;
  }
  .date-items-pre,
  .date-items-after {
    background: #ddd;
  }
  .date-choose {
    background: #f60;
    color: #fff;
  }
}
</style>
