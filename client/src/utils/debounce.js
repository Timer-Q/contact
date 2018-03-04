/**
 * 简易 debounce
 * @param {function} callback
 * @param {number} wait
 * @returns {function} 需要执行的方法
 */
export function debounce (callback, wait = 300) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback.apply(context, args)
    }, wait)
  }
}
