import CHeader from '@/base/header/header.vue'
import CInput from '@/base/field'
import CCell from '@/base/cell'
import CDatePicker from '@/base/date-picker'
import CPicker from '@/base/picker'
import Toast from '@/base/toast'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(CHeader.name, CHeader)
  Vue.component(CInput.name, CInput)
  Vue.component(CCell.name, CCell)
  Vue.component(CDatePicker.name, CDatePicker)
  Vue.component(CPicker.name, CPicker)

  Vue.prototype.$toast = Toast
}

export default install
