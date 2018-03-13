import Vue from 'vue'
import ToastComponent from './toast.vue'

const ToastContructor = Vue.extend(ToastComponent)

const getAnInstance = options => {
  const { message, position, className, duration } = options
  return new ToastContructor({
    el: document.createElement('div'),
    data () {
      return {
        message: message || options,
        position: position || 'bottom',
        className,
        visible: true,
        duration
      }
    }
  })
}

const Toast = (options = {}) => {
  const instance = getAnInstance(options)
  const duration = instance.duration || 1000
  document.body.appendChild(instance.$el)
  console.log(instance)
  setTimeout(_ => {
    instance.close()
  }, duration)
}

export default Toast
