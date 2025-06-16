export default {
  data() {
    return {
      // progressCurrIdx: 0, //当前索引
      // progressOldIdx: '', //上一个索引
      // swiperOptions: {}, //轮播配置
      initStatus: false, //轮播配置状态
      // isClick: false,
      isMobile: Boolean,
      isWeixin: false,
      isIos: false,
      isQQBrowser: false,
      showIndexPlayBtn: false,
      isVivoXplay: false,
      isVivo: false,
      isIosUcBrowser: false,
    }
  },
  watch: {
    progressCurrIdx: function (nv, ov) {
      console.log(nv, ov)
      // let self = this
      if (typeof ov === 'number') {
        // self.progressList[ov].percent = 0
        // self.progressOldIdx = ov
      }
    },
    isQQBrowser: function (nv) {
      if (nv === true) {
        this.showIndexPlayBtn = true
      }
    },
    isVivoXplay: function (nv) {
      if (nv === true) {
        this.showIndexPlayBtn = true
      }
    },
  },
  mounted() {
    if (process.browser) {
      this.checkIsMobile()
      this.isQQBrowser = this.checkIsQQBrowser()
      this.isIosUcBrowser = this.checkIsIosUcBrowser()
      this.isVivo = this.checkIsVivoBrowser()
      this.isVivoXplay = this.checkIsVivoXplay()
      this.isWeixin = this.checkIsWeixin()
      this.isIos = this.checkIsIos()
    }
    this.$nextTick(() => {
      this.swiperArr ? this.initSwiperOptions() : ''
    })
    window.addEventListener('resize', () => {
      this.checkIsMobile()
    })
  },

  destroyed() {
    this.swiperArr
      ? this.swiperArr.map((item) => {
          clearTimeout(this[item.timer])
        })
      : ''
    window.removeEventListener('resize', () => {})
  },
  methods: {
    checkIsIos() {
      let ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        return true
      } else {
        return false
      }
    },
    checkIsQQBrowser() {
      let ua = navigator.userAgent.toLowerCase()
      console.log(/mqqbrowser/.test(ua), '/mqqbrowser/.test(ua)')
      if (/mqqbrowser/.test(ua) || /miuibrowser/.test(ua)) {
        //qq浏览器或小米浏览器
        return true
      } else {
        return false
      }
    },
    checkIsVivoBrowser() {
      let ua = navigator.userAgent.toLowerCase()
      if (/vivobrowser/.test(ua)) {
        return true
      } else {
        return false
      }
    },
    checkIsIosUcBrowser() {
      let ua = navigator.userAgent.toLowerCase()
      if (/ucbrowser/.test(ua) && this.checkIsIos()) {
        return true
      } else {
        return false
      }
    },
    checkIsVivoXplay() {
      let ua = navigator.userAgent.toLowerCase()
      if (/xplay6/.test(ua) && /vivobrowser/.test(ua)) {
        return true
      } else {
        return false
      }
    },
    // 判断移动端/pc端
    checkIsMobile() {
      let screenWidth = window.innerWidth
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if (flag || screenWidth <= 768) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
      console.log('isMobile:', this.isMobile)
    },
    checkIsWeixin() {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    // 初始化配置
    initSwiperOptions() {
      let self = this
      for (let i = 0; i < self.swiperArr.length; i++) {
        let item = self.swiperArr[i]
        self[item.optionsName] = {
          initialSlide: 0,
          allowTouchMove: self.isMobile ? true : false,
          // spaceBetween: 30,
          loop: true,
          observer: true,
          speed: 500,
          autoplay: {
            delay: 10000,
          },
          grabCursor: true,
          nested: true, //当切换到子swiper时停止父swiper的切换。
          on: {
            slideChangeTransitionStart: function () {},
            slideChangeTransitionEnd: function () {
              //切换结束时，告诉我现在是第几个slide
              self[item.currIdxName] = this.realIndex
              if (self[item.oldIdxName] || self[item.oldIdxName] === 0) {
                let oldIdx = self[item.oldIdxName]
                self[item.listName][oldIdx].percent = 0
              }
              self[item.oldIdxName] = this.realIndex
              self.startProgress(item)
            },
          },
        }
        console.log(self[item.optionsName])
      }
      self.initStatus = true
    },
    startProgress(swiperItem) {
      clearTimeout(this[swiperItem.timer])
      this[swiperItem.timer] = setTimeout(() => {
        let list = this[swiperItem.listName],
          currIdx = this[swiperItem.currIdxName]
        let currProgress = list[currIdx].percent
        currProgress += 1
        if (currProgress > 100) {
          currProgress = 100
          list[currIdx].percent = currProgress
          if (this[swiperItem.isClickName] || this.isMobile) {
            this[swiperItem.swiperName] && this[swiperItem.swiperName].slideNext(500, true)
          }
          clearTimeout(this[swiperItem.timer])
        } else {
          list[currIdx].percent = currProgress
        }
        this.startProgress(swiperItem)
      }, 100)
    },
    changeProgressIdx(obj) {
      if (this.isMobile) return
      if (this[obj.currIdxName] === obj.idx) return
      clearTimeout(this[obj.timer])
      let oldIdx = this[obj.oldIdxName]
      console.log(this[obj.listName], obj.listName)
      this[obj.listName][oldIdx].percent = 0
      this[obj.currIdxName] = obj.idx
      this[obj.swiperName].slideToLoop(obj.idx, 500, true)
      this[obj.isClickName] = true
    },
    handleMouseOver(e, swiperObj) {
      if (this.isMobile) return
      clearTimeout(this[swiperObj.timer])
      this[swiperObj.swiperName].autoplay.stop()
    },
    handleMouseLeave(e, swiperObj) {
      if (this.isMobile) return
      this[swiperObj.swiperName].autoplay.start()
      this.startProgress(swiperObj)
    },
  },
}
