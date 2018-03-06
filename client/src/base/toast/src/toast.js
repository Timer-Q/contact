import Vue from 'vue'
import ToastComponent from './toast.vue'

const ToastContructor = Vue.extend(ToastComponent)

const getAnInstance = options => {
  const { message, position, className } = options
  return new ToastContructor({
    el: document.createElement('div'),
    data () {
      return {
        message: message || options,
        position: position || 'bottom',
        className,
        visible: true
      }
    }
  })
}

const Toast = (options = {}) => {
  const instance = getAnInstance(options)
  document.body.appendChild(instance.$el)
  console.log(instance)
  setTimeout(_ => {
    instance.close()
  }, 1000)
}

export default Toast
