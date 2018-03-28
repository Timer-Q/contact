export default [
  {
    path: '/main',
    name: 'main',
    component: _ => import('@/components/main.vue')
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    component: _ => import('@/components/date-picker/date-picker.vue')
  },
  {
    path: '/picker',
    name: 'picker',
    component: _ => import('@/components/picker/picker.vue')
  },
  {
    path: '/toast',
    name: 'toast',
    component: _ => import('@/components/toast/toast.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: _ => import('@/components/button/button.vue')
  },
  {
    path: '/popup',
    name: 'popup',
    component: _ => import('@/components/popup/popup.vue')
  }
]
