/**
 * 处理遮罩 mask
 * 思路：
 * 1. 只有一个 mask dom节点，但是有多个 maskStack
 * 2. open的时候 maskStack中增加一个 popup对象，通过 appendChild 更新 mask 并保持 mask 始终为一个
 * 3. close的时候 从 maskStack 中删除对应的 popup 对象，当 maskStack 长度为0的时候，代表当前界面没有 popup 实例，移除 mask dom
 */

const getMask = function () {
  let maskDom = PopupManager.maskDom

  if (!maskDom) {
    maskDom = document.createElement('div')
    PopupManager.maskDom = maskDom
    maskDom.addEventListener('touchmove', function (e) {
      e.stopPropagation()
      e.preventDefault()
    })

    maskDom.classList.add('mask')
    // 点击 mask 的时候，关闭对应的 popup
    maskDom.addEventListener('click', _ => {
      const popup = PopupManager.getInstance()
      popup.closePopup()
    })
  }
  return maskDom
}

// 在点击 mask 的时候，关闭对应的 popup
const instances = {}

const PopupManager = {
  zIndex: 2000,
  getNextZIndex () {
    return this.zIndex++
  },
  maskStack: [],
  /**
   * 缓存弹框实例
   * @param {*} popId 弹框实例的自定义的id 此处 id 与 maskStack 中相同
   * @param {*} popInstance 弹框实例
   */
  register (popId, popInstance) {
    if (!popId || !popInstance) return
    instances[popId] = popInstance
  },
  deregister (popId) {
    instances[popId] = null
    delete instances[popId]
  },
  getInstance () {
    const lastInstance = instances[this.maskStack[this.maskStack.length - 1].popId]
    return lastInstance
  },
  /**
   * 打开 mask
   * @param {string} popId 弹窗实例的自定义 id
   * @param {element} dom 弹窗实例的 $el
   * @param {number} zIndex 传入 mask z-index 的值
   * @param {string} maskClass 弹窗样式
   * @param {string} maskFade 弹窗淡入淡出
   */
  openMask (popId, dom, zIndex, maskClass, maskFade) {
    const maskDom = getMask()
    // 如果缓存中有 将要新增的 mask (感觉就是当前 popup 对应的 mask) 不做处理
    for (let i = 0; i < this.maskStack.length; i++) {
      if (this.maskStack[i].popId === popId) {
        return
      }
    }

    // 11 是 DocumentFragment(代码片段) vue中用 DocumentFragment 更新dom
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(maskDom)
    } else {
      document.body.appendChild(maskDom)
    }

    maskDom.style.zIndex = zIndex
    maskDom.style.display = ''
    // 存储 popup 实例，用来 和 mask 产生关联
    this.maskStack.push({ popId: popId, zIndex: zIndex, maskClass: maskClass })
  },
  closeMask (popId) {
    const maskStack = this.maskStack
    const maskDom = getMask()
    if (maskStack.length > 0) {
      // 操作最后一个 popup 实例的时候
      const lastStack = maskStack[maskStack.length - 1]
      if (lastStack.popId === popId) {
        maskStack.pop()
        // 如果同时出现多个 popup，mask 的 zIndex会随着增大从而盖住之前的popup，
        // 该操作旨在让 mask 取倒数第二个 stack 中 mask 的 zIndex，从而让倒数第二个打开的 popup 显示出来
        if (maskStack.length > 0) {
          maskDom.style.zIndex = maskStack[maskStack.length - 1].zIndex
        }
      } else {
        for (let i = maskStack.length - 1; i >= 0; i--) {
          // eslint-disable-next-line
          if (maskStack[i].popId = popId) {
            maskStack.splice(i, 1)
            break
          }
        }
      }
    }
    if (maskStack.length === 0) {
      if (maskDom.parentNode) {
        maskDom.parentNode.removeChild(maskDom)
      }
    }
  }
}

export default PopupManager
