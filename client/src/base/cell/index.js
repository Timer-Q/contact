import cell from './src/cell.vue'

cell.install = function (Vue) {
  Vue.component(cell.name, cell)
}

export default cell
