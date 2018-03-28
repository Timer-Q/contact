import CCell from './src/cell.vue'

CCell.install = function (Vue) {
  Vue.component(CCell.name, CCell)
}

export default CCell
