<template>
  <section class="date-picker">
    <div class="date-picker-header">
      <div class="date-picker-icon-btn" @click="switchMonth(-1)">
        <a href="javascript:;" class="arrow-left"></a>
      </div>
      <div class="date-picker-header-label">
        <span @click="switchYear">{{chooseDate.year}}</span>年
        <span @click="chooseMonth">{{chooseDate.month}}</span>月
      </div>
      <div class="date-picker-icon-btn" @click="switchMonth(1)">
        <a href="javascript:;" class="arrow-right"></a>
      </div>
    </div>
    <transition name="header-slider">
      <div class="date-picker-header-slider" v-show="isYearSwitch">
        <span v-for="item in years" :key="`${item}2018`" class="slider-item" @click="handleChangeYear(item)">{{item}}</span>
      </div>
    </transition>
    <transition name="header-slider">
      <div class="date-picker-header-slider" v-show="isMonthSwitch">
        <span v-for="item in monthes" :key="`${item.month}2018`" class="slider-item" @click="handleChangeMonth(item)">{{item.showMonth}}</span>
      </div>
    </transition>
    <div class="date-picker-content">
      <span class="date-items" v-for="item in headerWeek" :key="item">
        {{item}}
      </span>
      <span class="date-items" :class="[`date-items-${item.label}`, {'date-choose': selectedDate.year === item.year && selectedDate.month === item.month && selectedDate.date === item.date}]" v-for="(item, index) in days" :key="index" @click="handleItemClick(item)">
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
      monthFilter: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      days: [],
      years: [],
      monthes: [],
      // 最终选择的日期
      chooseDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        dateObj: new Date()
      },
      // 切换过程中的日期
      selectedDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        dateObj: new Date()
      },
      isYearSwitch: false,
      isMonthSwitch: false,
      // 选择年份的时候 开始年份
      yearsBegin: new Date().getFullYear()
    }
  },
  methods: {
    // 某一天点击事件
    handleItemClick (date) {
      this.selectedDate.year = date.year
      this.selectedDate.month = date.month
      this.selectedDate.date = date.date
      this.selectedDate.dateObj = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.date)
      console.log(this.selectedDate)
    },
    // 初始化天数
    getMonthData (year, month) {
      // 思路：
      // 1. 星期那一排是按照 0 - 6 排列
      // 2. 整个日历有 7 * 6 天，分三部分，【上个月， 本月， 下个月】
      // 3. 上个月： index(7 * 6 的 index) - firstWeekDay(该月第一天周几) < 0
      //    lastDateOfPreMonth(上一个月最后一天日期) - (firstWeekDay - 1)(上月最后一天周几) + index
      // 4. 下个月：index > lastDate + (firstWeekDay - 1)
      //    index - (firstWeekDay - 1) - lastDate
      // 5. 本月：
      //    index - (firstWeekDay - 1)
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
    },
    /**
     * header 切换
     * */
    switchMonth (data) {
      // 如果是切换年份
      if (this.isYearSwitch) {
        this.getYears(data)
      } else {
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
    switchYear () {
      this.isYearSwitch = !this.isYearSwitch
      if (this.isYearSwitch) this.getYears()
    },
    // 切换年份的时候 显示所需年份
    getYears (year = 0) {
      this.years = []
      this.yearsBegin.toString().replace(/(^\d{3})(\d{1})/g, (match, $1, $2) => {
        // header左右切换的时候 计算范围
        $1 = $1 * 1 + year
        this.yearsBegin = `${$1}0`
      })
      for (let i = 0; i < 10; i++) {
        this.years.push(this.yearsBegin * 1 + i)
      }
    },
    // 选择年份
    handleChangeYear (year) {
      this.chooseDate.year = year || 2018
      this.getMonthData(this.chooseDate.year, this.chooseDate.month)
      this.isYearSwitch = false
    },
    // header 点击月份事件
    chooseMonth () {
      this.isMonthSwitch = !this.isMonthSwitch
    },
    // 初始化所有月份
    getMonthes () {
      for (let i = 0; i < 12; i++) {
        this.monthes.push({
          month: i + 1,
          showMonth: this.monthFilter[i]
        })
      }
    },
    // 切换月份
    handleChangeMonth (month) {
      this.chooseDate.month = month.month || 1
      this.getMonthData(this.chooseDate.year, this.chooseDate.month)
      this.isMonthSwitch = false
    }
  },
  mounted () {
    this.getMonthData()
    this.getMonthes()
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  position: relative;
  text-align: center;
  width: 100%;
  overflow: hidden;
  .date-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
    padding: px2Rem(10);
    height: 42px;
    font-size: 16px;
    box-shadow: 0 5px 10px #ddd;
    background: #fff;
    box-sizing: border-box;
  }
  .date-picker-header-slider {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 42px;
    box-sizing: border-box;
  }
  .slider-item {
    display: flex;
    justify-content: center;
    align-items: center;
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
    transition: all 0.3s;
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
@media screen and (min-width: 375px) {
  .date-picker {
    width: 375px;
    margin: 0 auto;
  }
}
.header-slider-enter-active {
  transition: all .5s;
}
.header-slider-leave-active {
  transition: all .2s;
}
.header-slider-enter,
.header-slider-leave-to {
  transform: translateY(-100%);
}
</style>
