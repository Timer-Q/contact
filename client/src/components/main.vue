<template>
  <div class="main">
    <c-header title="首页"/>
    <router-link :to="item.path" v-for="(item, index) in menuList" :key="index">
      <c-cell :title="item.name" is-link></c-cell>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          name: 'picker',
          icon: '',
          path: '/picker'
        },
        {
          name: 'datePicker',
          icon: '',
          path: '/datePicker'
        },
        {
          name: 'toast',
          icon: '',
          path: '/toast'
        },
        {
          name: 'button',
          icon: '',
          path: '/button'
        },
        {
          name: 'popup',
          icon: '',
          path: '/popup'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .menu-item {
    min-height: 120px;
    text-align: center;
  }
}
</style>
