/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
/**
 * @desc json格式转换成字符串
 * @param obj json对象
 */
// json格式转换成字符串
function objectToQuery(obj) {
  return Object.keys(obj)
    .map((k) => k + '=' + obj[k])
    .join('&')
}
//toast提示弹窗
function Toast(msg, duration) {
  console.log('Toast - ' + !!document.getElementById('errToast'))
  if (document.getElementById('errToast')) {
    return
  }
  duration = isNaN(duration) ? 2000 : duration
  let m = document.createElement('div')
  m.innerHTML = msg
  m.style.cssText = 'max-width:65vw;padding:.29rem 5.5%;color: rgb(255, 255, 255);line-height: 1.2em;text-align: center;border-radius: .8rem;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 10000;background: rgba(0, 0, 0, 0.8);font-size: .34rem;letter-spacing: 1px;'
  m.setAttribute('id', 'errToast')
  document.body.appendChild(m)
  setTimeout(function () {
    let d = 0.5
    m.style.transition = 'transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
    m.style.opacity = '0'
    setTimeout(function () {
      document.body.removeChild(m)
    }, d * 600)
  }, duration)
}
/**
 * 回调节流
 *
 * @export
 * @param {*} action 回调
 * @param {*} delay 等待的时间
 * @param {*} context this指针
 * @param {Boolean} iselapsed 是否等待上一次
 * @returns {Function}
 */
function throttle(action, delay, context, iselapsed) {
  let timeout = null
  let lastRun = 0
  return function () {
    if (timeout) {
      if (iselapsed) {
        return
      } else {
        clearTimeout(timeout)
        timeout = null
      }
      // return;
    }
    let elapsed = Date.now() - lastRun
    let args = arguments
    if (iselapsed && elapsed >= delay) {
      runCallback()
    } else {
      timeout = setTimeout(runCallback, delay)
    }
    /**
     * 执行回调
     */
    function runCallback() {
      lastRun = Date.now()
      timeout = false
      action.apply(context, args)
    }
  }
}

export { debounce, objectToQuery, Toast, throttle }
