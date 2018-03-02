export default [
  {
    path: '/datePicker',
    name: 'datePicker',
    component: _ => import('@/components/date-picker/date-picker.vue')
  },
  {
    path: '/picker',
    name: 'picker',
    component: _ => import('@/components/picker/picker.vue')
  }
]
