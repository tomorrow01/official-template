<template>
  <div :id="showIndexPlayBtn ? 'show-play-btn' : ''" class="page-wrapper">
    <div v-if="showPcScreen || showMScreen" @touchstart="isWeixin && isIos && handleWxPlay()" @click="isWeixin && !isIos && handleWxPlay()">
      <!-- 首屏 -->
      <section id="screen1" class="screen1">
        <div class="screen1-title">
          <img src="/images/logo.png" class="screen1-title-logo" alt="" />
          <p class="font60-index">智慧生活可以更美的</p>
        </div>

        <filter-video v-if="!isMobile" :video-src="playerOptions[201].sources[0].src"></filter-video>
        <div id="mainvideo-player" class="common-main-video screen1-mainvideo">
          <div class="common-main-video-player screen1-mainvideo-player">
            <client-only>
              <video-player ref="videoPlayer" :playsinline="true" :options="isMobile ? playerOptions[701] : playerOptions[201]" x5-video-orientation="portrait" x5-video-player-type="h5" class="vjs-custom-skin" style="object-fit: cover"></video-player>
            </client-only>
          </div>
          <div id="screen1-mainvideo-btn" class="common-main-video-btn screen1-mainvideo-btn" @click.stop="handleFullVideoPlay('screen1')">
            <div class="btn-bg bg-normal hidden-xs-only"></div>
            <div class="btn-text font24 hidden-xs-only">观看完整视频</div>
            <div class="btn-mobile common-row common-center hidden-sm-and-up">
              <span>观看完整视频</span>
              <img src="/images/index/arrow_mobile2.svg" alt="" style="width: 20px; height: 20px;" />
            </div>
          </div>
        </div>

        <popup-video :is-vivo-xplay="isVivoXplay" :show-screen-popup="showScreen1Popup" :player-options="isMobile ? playerOptions[702] : playerOptions[202]" @handleCloseFullvideo="handleCloseFullvideo"></popup-video>
      </section>
      <!--智能场景屏 -->
      <section id="screen2" class="common-index-screen screen2">
        <div class="common-title-trans common-index-title screen2-title">
          <p class="common-index-title-text font48-index">
            全屋智能场景，
            <br class="hidden-sm-and-up" />
            开启智能生活新方式
          </p>
          <nuxt-link :to="{ name: 'scene', params: { title: '智能场景' } }" class="common-move-btn screen2-title-btn">
            <div :class="[isMobile ? 'common-row common-center' : '']" class="common-move-btn-content btn-content bg-normal2" @click="burialTab('智能场景')">
              <div class="btn-text font18">了解更多</div>
              <div class="btn-arrow">
                <img src="/images/index/black_arrow_hover@1x.svg" alt="" class="arrow-img hidden-xs-only" />
                <img src="/images/index/arrow_mobile2.svg" alt="" class="arrow-img hidden-sm-and-up" />
              </div>
            </div>
          </nuxt-link>
        </div>
        <filter-video v-if="showScreen2 && !isMobile" :video-src="playerOptions[204].sources[0].src" class="filter-video"></filter-video>
        <nuxt-link :to="{ name: 'scene', params: { title: '智能场景' } }" class="common-video-trans common-one-video">
          <div v-if="showScreen2" class="common-one-video-player">
            <client-only>
              <video-player ref="screen2VideoPlayer" :playsinline="true" :options="isMobile ? playerOptions[704] : playerOptions[204]" :x5-video-player-fullscreen="false" class="vjs-custom-skin" style="object-fit: cover" @timeupdate="onPlayerTimeupdate($event)" @playing="onPlayerPlaying($event)" @canplay="onPlayerCanplay($event)" @loadeddata="onPlayerLoadeddata($event)"></video-player>
            </client-only>
          </div>
        </nuxt-link>
      </section>
      <!--智慧体验开启定制屏 -->
      <section id="screen3" class="common-index-screen screen3">
        <div class="common-title-trans common-index-title screen3-title">
          <p class="common-index-title-text font48-index">
            美的智慧家
            <br class="hidden-sm-and-up" />
            全屋智能解决方案
          </p>
          <p class="common-index-title-text2 font24-index">一站式自由选配，现在开启智慧体验</p>
          <div class="common-index-title-btn screen3-title-btn" @click="burialTab('全屋智能解决方案')">
            <div :class="[isMobile ? 'common-row common-center' : '']" class="common-index-title-btn-content btn-content bg-normal2">
              <div class="btn-text font18">{{ isMobile ? '立即选购' : '开启体验' }}</div>
              <div class="btn-arrow hidden-sm-and-up">
                <img src="/images/index/arrow_mobile2.svg" alt="" class="arrow-img" />
              </div>
              <div class="btn-code"></div>
            </div>
          </div>
        </div>
        <filter-video v-if="showScreen3 && !isMobile" :video-src="playerOptions[206].sources[0].src" class="filter-video"></filter-video>
        <div class="common-video-trans common-main-video screen3-mainvideo">
          <div v-if="showScreen3" class="common-main-video-player screen3-mainvideo-player">
            <client-only>
              <video-player ref="screen3VideoPlayer" :playsinline="true" :options="isMobile ? playerOptions[706] : playerOptions[206]" :x5-video-player-fullscreen="false" class="vjs-custom-skin" style="object-fit: cover"></video-player>
            </client-only>
          </div>
          <div id="screen3-mainvideo-btn" class="common-main-video-btn screen3-mainvideo-btn" @click.stop="handleFullVideoPlay('screen3')">
            <div class="btn-bg bg-normal hidden-xs-only"></div>
            <div class="btn-text font24 hidden-xs-only">观看完整视频</div>
            <div class="btn-mobile common-row common-center hidden-sm-and-up">
              <span>观看完整视频</span>
              <img src="../static/images/index/play_mobile.png" alt="" />
            </div>
          </div>
        </div>
        <popup-video :is-vivo-xplay="isVivoXplay" :show-screen-popup="showScreen3Popup" :player-options="isMobile ? playerOptions[707] : playerOptions[207]" @handleCloseFullvideo="handleCloseFullvideo"></popup-video>
      </section>
      <!-- 美的美居app -->
      <section id="screen4" class="common-index-screen screen4">
        <div class="screen4-title hidden-xs-only">
          <div class="screen4-title-text font60">美的美居</div>
          <div class="screen4-title-text2 font36">立即开启你的智慧生活</div>
          <img class="screen4-title-img" src="/images/case1.jpg" alt="" />
          <nuxt-link class="common-move-btn" to="/mideaApp/" style="width: 180px; text-align: left">
            <div class="common-move-btn-content screen4-title-btn bg-normal2" @click="burialTab('扫码下载')">
              <div class="btn-text font18">了解更多</div>
              <div class="btn-arrow">
                <img src="/images/index/black_arrow_hover@1x.svg" alt="" class="arrow-img" />
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="common-title-trans common-index-title hidden-sm-and-up">
          <p class="common-index-title-text">美的美居</p>
          <p class="common-index-title-text2">立即开启你的智慧生活</p>
          <div class="common-move-btn">
            <div :class="[isMobile ? 'common-row common-center' : '']" class="common-move-btn-content btn-content bg-normal2" @click="burialTab('扫码下载')">
              <div class="btn-text font18">了解更多</div>
              <div class="btn-arrow">
                <img src="/images/index/arrow_mobile2.svg" alt="" class="arrow-img" />
              </div>
            </div>
          </div>
          <div class="common-move-btn btn-app">
            <div :class="[isMobile ? 'common-row common-center' : '']" class="common-move-btn-content btn-content bg-normal2" @click="burialTab('下载App')">
              <div class="btn-text font18">下载App</div>
            </div>
          </div>
        </div>
        <div class="common-one-video screen4-video">
          <div v-if="showScreen4" class="common-one-video-player">
            <client-only>
              <video-player ref="screen4VideoPlayer" :playsinline="true" :options="isMobile ? playerOptions[709] : playerOptions[209]" :x5-video-player-fullscreen="false" class="vjs-custom-skin" style="object-fit: cover"></video-player>
            </client-only>
          </div>
        </div>
      </section>
      <!--aIot技术平台 -->
      <section id="screen5" class="common-index-screen screen5">
        <div class="common-title-trans common-index-title screen5-title">
          <p class="common-index-title-text font48-index">
            美的AIoT技术平台，
            <br class="hidden-sm-and-up" />
            持续创新引领行业技术
          </p>
          <p class="common-index-title-text2 font24-index">
            物联网中台 物联网OS
            <br class="hidden-sm-and-up" />
            物联网开放平台 安全与隐私
          </p>
          <nuxt-link :to="{ name: 'mideaIot', params: { title: '核心技术集成页' } }" class="common-move-btn screen5-title-btn">
            <div :class="[isMobile ? 'common-row common-center' : '']" class="common-move-btn-content btn-content bg-normal2">
              <div class="btn-text font18">了解更多</div>
              <div class="btn-arrow">
                <img src="/images/index/black_arrow_hover@1x.svg" alt="" class="arrow-img hidden-xs-only" />
                <img src="/images/index/arrow_mobile2.svg" class="arrow-img hidden-sm-and-up" alt="" />
              </div>
            </div>
          </nuxt-link>
        </div>
        <filter-video v-if="showScreen5 && !isMobile" :video-src="playerOptions[211].sources[0].src" class="filter-video"></filter-video>
        <nuxt-link :to="{ name: 'mideaIot', params: { title: '核心技术集成页' } }" class="common-video-trans common-one-video">
          <div v-if="showScreen5" class="common-one-video-player">
            <client-only>
              <video-player ref="screen5VideoPlayer" :playsinline="true" :options="isMobile ? playerOptions[711] : playerOptions[211]" :x5-video-player-fullscreen="false" class="vjs-custom-skin" style="object-fit: cover" @timeupdate="onPlayerTimeupdate($event)" @playing="onPlayerPlaying($event)" @canplay="onPlayerCanplay($event)" @loadeddata="onPlayerLoadeddata($event)"></video-player>
            </client-only>
          </div>
        </nuxt-link>
      </section>
      <!-- 新闻模块 -->
      <section class="news">
        <index-news :news-list="newsList" :is-mobile="isMobile"></index-news>
      </section>
      <section id="screen6" class="partner-map">
        <div class="partner-map-title font48">全球生态合作</div>
        <div class="partner-map-logo">
          <div class="partner-map-logo-img font18"></div>
        </div>
        <div class="shadow hidden-xs-only"></div>
        <!-- <div v-if="showScreen6" class="partner-map-main">
        <client-only>
          <earth-map></earth-map>
        </client-only>
      </div> -->
      </section>
    </div>
  </div>
</template>

<script>
import filterVideo from '~/components/filterVideo' // PC端 模糊视频背景组件
import popupVideo from '~/components/popupVideo' // 弹窗视频组件
import indexNews from '~/components/indexNews' // 新闻模块组件
// import earthMap from '~/components/earthMap'
import { throttle } from '~/components/tools.js'
import mixin from '~/components/mixin.js'

export default {
  components: { filterVideo, popupVideo, indexNews },
  mixins: [mixin],
  data() {
    return {
      rewriteURL: '',
      pgfromParam: String, // 下载引导页面的url参数，例如: BL-XYJ
      targetUrl: String, // 需跳转至美居内指定页面的url
      mjJumpType: 'jumpNative', //跳转美居类型
      commonVideoSrc: 'https://meijuresources.oss-cn-hangzhou.aliyuncs.com/H5/projects/official-web/videos/index/', //2.0首页视频地址，2.1改为后台配置化
      inited: false,
      showScreen1Popup: false, //首屏是否展示完整视频
      showScreen3Popup: false, //第三屏是否展示完整视频
      // 视频配置项
      mainPlayerOptions: {
        //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: '',
            // src: require('~/static/video/screen1.3.MP4'),
          },
        ],
        poster: '',
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      showMScreen: false, //移动端视频初始化数据是否完成
      showPcScreen: false, //pc端视频初始化数据是否完成
      showScreen2: false,
      showScreen3: false,
      showScreen4: false,
      showScreen5: false,
      showScreen6: false,
      observerArr: ['screen1', 'screen2', 'screen3', 'screen4', 'screen5', 'screen6'],
      newsList: [], //新闻列表
      playerOptions: {
        201: {},
        202: {}, //完整视频
        204: {},
        206: {},
        207: {}, //完整视频
        209: {},
        211: {},
        701: {},
        702: {}, //完整视频
        704: {},
        706: {},
        707: {}, //完整视频
        709: {},
        711: {},
      }, //首页视频对象
      posterTypes: [703, 705, 708, 710, 712, 203, 205, 208, 210, 212], //后台静态帧返回的类型
      twoVideo: [201, 206, 701, 706], //有完整视频的视频片段类型，配置一个静态帧
      noPoster: [202, 207, 702, 707], //完整视频类型,不配置静态帧
      innerHeight: '',
    }
  },
  head() {
    return {
      title: '美的IoT',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '美的IoT是引领行业的智能家居解决方案提供商，拥有全品类智能白电产品和海量智能硬件数据, 是美的集团全屋智能解决方案核心运营平台。',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '美居高智能电器,智能家居控制系统,智能家居厂家,美居智能家居APP官网',
        },
      ],
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    player2() {
      return this.$refs.popupVideoPlayer.player
    },
    screen2Player() {
      return this.$refs.screen2VideoPlayer.player
    },
    screen3Player() {
      return this.$refs.screen3VideoPlayer.player
    },
    screen4Player() {
      return this.$refs.screen4VideoPlayer.player
    },
    screen5Player() {
      return this.$refs.screen5VideoPlayer.player
    },
    popup3Player() {
      return this.$refs.popup3VideoPlayer.player
    },
  },
  watch: {
    isMobile: function (nv) {
      this.playerOptions = {}
      // 初始化话视频配置  //2为pc端，7为移动端
      if (nv === true) {
        this.showPcScreen = false
        this.innerHeight = window.innerHeight - 44
        this.initScreenOptions({ module: 7 })
      } else {
        this.showMScreen = false
        this.initScreenOptions({ module: 2 })
      }
    },
  },
  mounted() {
    // 获取新闻资讯
    this.getIndexNews()

    if (process.browser) {
      this.$burialPoint({
        event: 'user_page_view',
        page_title: '美的IoT' || document.title,
        module: '首页',
        page_id: 'page_home',
        page_name: '首页',
      })
      if (this.isWeixin) {
        this.showScreen2 = true
        this.showScreen3 = true
        this.showScreen4 = true
        this.showScreen5 = true
        this.showScreen6 = true
      }
    }
  },
  destroyed() {
    console.log('移除监听')
    clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.scrollHandle, true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, true)
  },
  methods: {
    handleWxPlay() {
      if (this.$route.name === 'index') {
        console.log(this.player, this.screen2Player, this.screen3Player, this.screen4Player, this.screen5Player)
        this.player && this.player.play()
        this.showScreen2 && this.screen2Player.play()
        this.showScreen3 && this.screen3Player.play()
        this.showScreen4 && this.screen4Player.play()
        this.showScreen5 && this.screen5Player.play()
      }
    },
    burialTab(page_module) {
      if (page_module === '智能场景') {
        this.$burialPoint({
          event: 'user_behavior_event',
          module: '首页',
          page_id: 'page_home',
          page_name: '首页',
          widget_id: 'click_AI_home_know_more',
          widget_name: '点击智能场景-了解更多',
          page_module: page_module,
        })
      } else if (page_module === '全屋智能解决方案') {
        this.$burialPoint({
          event: 'user_behavior_event',
          module: '首页',
          page_id: 'page_home',
          page_name: '首页',
          widget_id: 'click_open_diy',
          widget_name: '点击开启定制',
          page_module: page_module,
        })
        if (this.isMobile) {
          location.href = 'https://weixin.midea.com/apps/enterPriseWxRms/programme/index.html?type=msmartlife'
        }
      } else if (page_module === '扫码下载') {
        if (this.isMobile) {
          location.href = 'http://iot4.midea.com.cn/downloads/app/index.html?pgfrom=GW-index'
        }
        this.$burialPoint({
          event: 'user_behavior_event',
          module: '首页',
          page_id: 'page_home',
          page_name: '首页',
          widget_id: 'click_download_know_more',
          widget_name: '点击扫码下载-了解更多',
          page_module: page_module,
        })
      } else if (page_module === '下载App') {
        console.log('下载App')
        this.jumpToApp()
      }
    },
    /**
     * 开始监听dom元素移入移出
     */
    startObserve() {
      let that = this
      window.addEventListener('scroll', that.scrollHandle)
    },
    /**
     * scrollHandle事件 判断是首屏还是非首屏
     * @param e 滚动事件参数
     * @param isScreen1 是否首屏
     */
    scrollHandle(e) {
      throttle(this.scrollThrottle, 60, this, false)(e)
    },
    /**
     * dom元素移入移出事件处理
     */
    scrollThrottle(e) {
      if (this.$route.name !== 'index' || this.isWeixin) {
        return
      }
      this.observerArr.forEach((observeItem) => {
        const offset = document.getElementById(observeItem).getBoundingClientRect()
        const offsetTop = offset.top
        const offsetBottom = offset.bottom
        // const offsetHeight = offset.height
        // 进入可视区域
        if (offsetTop + 50 <= window.innerHeight && offsetBottom >= 0) {
          // console.log(observeItem + '进入可视区域处理')
          if (observeItem === 'screen1') {
            this.showScreen2 = true
          } else if (observeItem === 'screen2') {
            this.showScreen3 = true
          } else if (observeItem === 'screen3') {
            this.showScreen4 = true
          } else if (observeItem === 'screen4') {
            this.showScreen5 = true
          } else if (observeItem === 'screen5') {
            this.showScreen6 = true
          }
          if (observeItem === 'screen2' || observeItem === 'screen3' || observeItem === 'screen4' || observeItem === 'screen5') {
            this.screenAni(observeItem, 'add')
          }
        } else {
          // console.log(observeItem + '移出可视区域处理')
          if ((observeItem === 'screen2' || observeItem === 'screen3' || observeItem === 'screen4' || observeItem === 'screen5') && offsetTop > window.innerHeight) {
            this.screenAni(observeItem, 'remove')
          }
        }
      })
      !this.isMobile && this.screen1Transform(e)
    },
    /**
     * 2/3/5屏交互动画处理
     * @param screenId 屏幕id
     * @param type 动画类型 add/remove
     */
    screenAni(screenId, type) {
      if (type == 'add') {
        document.getElementById(screenId).classList.add('move')
      } else {
        document.getElementById(screenId).classList.remove('move')
      }
    },

    /**
     * 首屏随着位置放大缩放效果
     * @param e 滚动事件参数
     */
    screen1Transform(e) {
      console.log('进入首屏', e)
      let scrollTop = e.target.nodeName === '#document' ? e.target.scrollingElement.scrollTop : ''
      if (scrollTop) {
        let x = scrollTop / this.mainVTop
        let mainVideo = document.getElementById('mainvideo-player')
        let playVideoBtn = document.getElementById('screen1-mainvideo-btn')

        if (x * 0.1 >= 0.1) {
          x = 1
          playVideoBtn.style.display = 'block'
        } else {
          playVideoBtn.style.display = 'none'
        }

        let perX = (0.9 + x * 0.1) * 1
        mainVideo.style.transform = `scale(${perX})`
      }
    },
    /**
     * 首屏观看全部视频按钮处理
     *
     */
    handleFullVideoPlay(screen) {
      if (screen === 'screen1') {
        this.$burialPoint({
          event: 'user_behavior_event',
          module: '首页',
          page_id: 'page_home',
          page_name: '首页',
          widget_id: 'click_play',
          widget_name: '点击播放',
          page_module: '首屏宣传片',
          object_type: '视频',
        })
        if (((this.isQQBrowser && !this.isIos) || (this.isVivo && !this.isVivoXplay) || this.isIosUcBrowser) && this.isMobile) {
          location.href = this.playerOptions[702].sources[0].src
          return
        }
        this.showScreen1Popup = true
      } else if (screen === 'screen3') {
        this.$burialPoint({
          event: 'user_behavior_event',
          module: '首页',
          page_id: 'page_home',
          page_name: '首页',
          widget_id: 'click_play',
          widget_name: '点击播放',
          page_module: '全屋智能解决方案',
          object_type: '视频',
        })
        if (((this.isQQBrowser && !this.isIos) || (this.isVivo && !this.isVivoXplay) || this.isIosUcBrowser) && this.isMobile) {
          location.href = this.playerOptions[707].sources[0].src
          return
        }
        this.showScreen3Popup = true
      }
      // 暂停
      this.isMobile && !this.isVivoXplay && this.player.play()
      !this.isMobile && this.player.pause()
      if (this.showScreen3) {
        !this.isMobile && this.screen3Player.pause()
      }
      return
    },
    /**
     * 关闭首屏观看全部视频按钮
     *
     */
    handleCloseFullvideo() {
      this.player.play()
      if (this.showScreen3) {
        this.screen3Player.play()
      }
      this.showScreen1Popup = false
      this.showScreen3Popup = false
    },
    /**
     * 初始化视频配置
     *
     */
    async initScreenOptions(param = {}) {
      // let that = this
      try {
        let configRes = await this.$apiCommon('configList', param)
        if (configRes.code === '0' && configRes.data.length) {
          let configData = configRes.data
          console.log('配置数据：', configData)
          for (let i = 0; i < configData.length; i++) {
            if (this.posterTypes.indexOf(configData[i].type) === -1) {
              let lastIdx = ''
              let videoType = ''
              let poster = ''
              if (!configData[i].video) {
                console.log('video为空，后台没有配置视频', configData[i].type)
              } else {
                lastIdx = configData[i].video && configData[i].video.lastIndexOf('.')
                videoType = 'video/' + configData[i].video.substring(lastIdx + 1)
              }
              if (this.twoVideo.indexOf(configData[i].type) !== -1) {
                poster = configData[i + 2].video //获取海报
              } else if (this.noPoster.indexOf(configData[i].type) === -1) {
                poster = configData[i + 1].video
              }
              let mobileRatio
              if (this.isMobile) {
                let mobileRatioW = Math.floor(this.innerHeight * (750 / 1344))

                mobileRatio = mobileRatioW + ':' + this.innerHeight
                console.log(mobileRatioW, mobileRatio, 'mobileRatioW')
              }
              this.playerOptions[configData[i].type] = {
                ...this.mainPlayerOptions,
                autoplay: (this.isQQBrowser && configData[i].type != 707 && configData[i].type != 702) || this.isVivoXplay ? false : true,
                aspectRatio: this.isMobile && configData[i].type != 707 && configData[i].type != 702 ? mobileRatio : '16:9',
                sources: [
                  {
                    type: videoType, //视频类型
                    src: configData[i].video, //视频url
                  },
                ],
                poster: poster || '', //视频海报
              }
            }
          }
          console.log(this.playerOptions)
          if (!this.isMobile) {
            this.showPcScreen = true
          } else {
            // this.mainPlayerOptions = { ...this.mainPlayerOptions, aspectRatio: '750:1344' }
            this.showMScreen = true
            this.showScreen2 = true
          }
          //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行视频播放

          this.$nextTick(() => {
            if (document.getElementById('mainvideo-player')) {
              let mainVideo = document.getElementById('mainvideo-player') && document.getElementById('mainvideo-player').getBoundingClientRect()
              this.mainVTop = mainVideo.top + window.scrollY
              // 开始监听页面滚动
              this.startObserve()
            }
          })
        }
      } catch (error) {
        console.log('配置接口错误：', error)
      }
    },
    /**
     * 外部app调起美居
     */
    jumpToApp() {
      let downloadUrl = `http://iot4.midea.com.cn/downloads/app/index.html?pgfrom=${this.pgfromParam ? this.pgfromParam : ''}`
      // let yingyongbao = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.midea.ai.appliances'
      // let androidMarket = 'market://details?id=com.midea.ai.appliances'
      let apkUrl = 'http://iot4.midea.com.cn/v1/downloads/app?redirect=true&a=a.apk'
      if (this.isIos) {
        this.rewriteURL = 'https://apps.apple.com/cn/app/id948600146?mt=8' // Apple Store
      } else {
        downloadUrl = apkUrl // 直接下载安卓安装包
      }
      let scheme = this.isIos ? `https://i.msmartlife.com/share?rewriteURL=${encodeURIComponent(this.rewriteURL)}&` : 'meiju://com.midea.meiju/main?'
      let openUrl = `${scheme}type=${this.mjJumpType}&pageName=home&needNavi=1`
      if (!!this.targetUrl && this.targetUrl.length > 1) {
        openUrl = `${scheme}type=${this.mjJumpType}&needNavi=1&url=${this.targetUrl}`
      }
      this.aCallAPP(openUrl, downloadUrl)
    },
    aCallAPP(url, downloadUrl) {
      console.log(url, downloadUrl)
      let t = Date.now()
      let interval = 2000
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(function () {
        console.log(Date.now() - t)
        if (Date.now() - t < interval + 1000) {
          console.log(Date.now() - t)
          location.href = downloadUrl
        }
      }, interval)

      window.location.href = url
    },

    async getIndexNews() {
      try {
        let newsData = await this.$apiCommon('newsLatestlist', { pageSize: 3 })
        let newsList = newsData.data ? newsData.data : []
        console.log('newsList:', newsList)
        this.newsList = newsList
        console.log('非置顶新闻列表：', this.newsList)
      } catch (error) {
        console.log(error)
      }
    },
    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
      if ('cordova' in window) {
        if ($event.player_.isFullscreen_ == true) {
          screen.orientation.lock('landscape')
        } else {
          screen.orientation.lock('portrait')
        }
      }
    },
    // 已开始播放回调
    onPlayerPlaying($event) {
      console.log($event, 'onPlayerPlaying')
    },
    onPlayerCanplay($event) {
      console.log('player Canplay!', $event)
    },
    onPlayerLoadeddata($event) {
      console.log($event, 'onPlayerLoadeddata')
    },
  },
}
</script>

<style lang="less" scoped>
.page-wrapper {
  min-height: 100vh;
  position: relative;

  .screen1 {
    width: 100%;
    background: #111111;
    position: relative;
    &-title {
      top: 0px;
      max-width: 100%;
      height: 325px;
      text-align: center;
      padding-top: 72px;
      position: sticky;
      z-index: 997;
      @media (min-width: 1680px) {
        padding-top: 90px;
      }
      &-logo {
        width: 200px;
        height: 71px;
      }
      p {
        margin-top: 28px;
        font-family: 'PingFangSC-Light', 'FZLT-Light';
        font-size: 60px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 60px;
        font-weight: 100;
      }
    }
    &-mainvideo {
      transform-origin: center top;
      transform: scale(0.9);
      border-radius: 10px 10px 0 0;

      &-btn {
        display: none;
      }
    }
  }
  .screen2 {
    background: #333333;
    &-title {
      height: 288px;
      &-btn:hover {
        .btn-text {
          transform: translateX(200px) translateZ(0px);
          transition: transform 0.4s;
        }
        .btn-arrow {
          transform: translateX(0px) translateZ(0px);
          transition: transform 0.4s;
        }
      }
    }
  }
  .screen3 {
    &-title {
      height: 346px;
      &-btn {
        .btn-content {
          overflow: initial;
          .btn-text {
            opacity: 1;
          }
          .btn-code {
            display: none;
            position: absolute;
            top: 72px;
            left: 50%;
            transform: translateX(-50%);
            width: 180px;
            height: 180px;
            background: #ffffff;
            border-radius: 6px;
          }
          .btn-code::after {
            content: '';
            position: absolute;
            width: 156px;
            height: 156px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-image: url('/images/case1.jpg');
            background-size: 100% 100%;
          }
          @media (max-width: 1600px) {
            .btn-code {
              width: 150px;
              height: 150px;
            }
            .btn-code::after {
              width: 130px;
              height: 130px;
            }
          }
        }
        @media (any-hover: hover) {
          .btn-content:hover {
            background-image: url('/images/banner1.jpg');
            .btn-text {
              // opacity: 0.5;
              color: #267aff;
            }
            .btn-code {
              display: block;
            }
          }
        }
      }
    }
  }
  .screen4 {
    background: #f7f7f7;
    &-title {
      position: absolute;
      z-index: 999;
      top: 20%;
      left: 67.7%;
      font-family: 'PingFangSC-Light', 'FZLT-Light';
      text-align: left;
      white-space: nowrap;
      transform: translate(0, 350px);
      &-text {
        font-size: 60px;
        color: #111111;
        line-height: 60px;
        font-weight: 100;
      }
      &-text2 {
        font-size: 36px;
        color: #333333;
        text-align: center;
        line-height: 36px;
        font-weight: 100;
        margin-top: 15px;
        margin-bottom: 20px;
      }
      &-img {
        display: block;
        width: 180px;
        height: 210px;
      }
      @media (max-width: 1600px) {
        &-img {
          width: 150px;
          height: 175px;
        }
      }
      &-btn {
        color: #111111;
      }
    }
    // &-video {
    //   // transform: translate(0, 150px);
    // }
  }
  .screen5 {
    &-title {
      height: 346px;
    }
  }
  .partner-map {
    padding-top: 82px;
    background-color: #f5f5f5; //#f7f7f7
    overflow: hidden !important;
    position: relative;
    .shadow {
      position: absolute;
      opacity: 0.5;
      bottom: 0;
      width: 100%;
      height: 184px;
      background-image: url('/images/banner2.jpg');
      background-size: 100% auto;
      background-position: bottom center;
      background-repeat: no-repeat;
    }
    // height: 100vh;
    .partner-map-title {
      font-family: 'PingFangSC-Light', 'FZLT-Light';
      color: #111111;
      letter-spacing: 0;
      text-align: center;
      font-weight: 100;
    }
    .partner-map-logo {
      width: 100%;
      height: 0;
      padding: 211/1920 * 100%;
      margin: 0 auto;
      // background: url('../static/images/index/partner_logo.png') no-repeat;
      background-position: top center;
      background-size: 100% auto;
      position: relative;
      margin-top: -35px;
      .partner-map-logo-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1410/1920 * 100%;
        height: 0;
        padding-bottom: 211/1920 * 100%;
        background: url('/images/logo.png') no-repeat;
        background-position: top center;
        background-size: 100% auto;
      }
      .partner-map-logo-img::after {
        content: '* 按照品牌首字母顺序排名';
        position: absolute;
        bottom: -35px;
        right: 5px;
        font-family: 'PingFangSC-Regular', 'FZLT-Regular';
        color: #858585;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
      }
    }

    .partner-map-main {
      width: 100%;
      height: 608px;
      overflow: hidden;
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
      position: relative;
    }
    @media screen and(max-width: 1920px) {
      .partner-map-main {
        height: 0;
        padding-bottom: 27.66%;
        margin-top: -42px;
      }
    }
  }
  .move {
    .screen4-title {
      transition: transform 1.2s ease-in-out 0.2s;
      transform: translate(0, 0);
    }
    // .screen4-video {
    //   // transition: transform 0.5s ease-in-out 0.5s;
    //   // transform: translate(0, 0);
    // }
  }
}
@media all and (max-width: 767px) {
  .page-wrapper {
    .screen1 {
      width: 100%;
      background: none;
      position: relative;
      &-title {
        top: 50px;
        width: 100%;
        height: auto;
        text-align: center;
        padding-top: 0px;
        position: absolute;
        z-index: 1000;
        &-logo {
          width: auto;
          height: 50px;
          object-fit: contain;
        }
        p {
          margin-top: 8px;
          font-family: PingFangSC-Medium;
          font-size: 32px !important;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 48px !important;
          font-weight: 500;
        }
      }
      &-mainvideo {
        transform-origin: center top;
        transform: scale(1);
        border-radius: 0;
        &-btn {
          display: block;
        }
        &-btn {
          left: 50%;
          top: 530px;
          transform: translate(-50%);
          right: initial;
          bottom: initial;
          @media (min-width: 400px) {
            top: 600px;
          }
        }
      }
    }
    .screen2 {
      background: #333333;
      &-title {
        height: auto;
        &-btn:hover {
          .btn-text,
          .btn-arrow {
            transform: initial;
            transition: initial;
          }
        }
      }
    }
    .screen3 {
      &-title {
        height: auto;
      }
      &-mainvideo {
        transform-origin: center top;
        transform: scale(1);
        border-radius: 0;
        &-btn {
          display: block;
        }
        &-btn {
          left: 40px;
          top: 530px;
          right: initial;
          bottom: initial;
          @media (min-width: 400px) {
            top: 600px;
          }
        }
      }
    }
    .screen4 {
      background: #f7f7f7;
      .common-index-title {
        .common-index-title-text {
          color: #111111;
        }
        .common-index-title-text2 {
          color: #555555;
        }
      }
      .common-move-btn {
        left: 55px;
        transform: initial;
        .common-move-btn-content {
          border: 1px solid #999999;
          .btn-text {
            color: #333333;
          }
        }
      }
      .btn-app {
        left: initial;
        right: 55px;
        .common-move-btn-content {
          border: 1px solid #666666;
          .btn-text {
            color: #333333;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
          }
        }
      }
    }
    .screen5 {
      &-title {
        height: auto;
      }
    }
    .partner-map {
      width: 100%;
      padding: 0px 20px 76px;
      background-color: #ffffff; //#f7f7f7
      // height: 100vh;
      .partner-map-title {
        text-align: left;
        font-family: PingFangSC-Medium;
        font-size: 28px !important;
        color: #111111;
        letter-spacing: 0;
        line-height: 28px !important;
        font-weight: 500;
      }
      .partner-map-logo {
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0 auto;
        // background: url('../static/images/index/partner_logo.png') no-repeat;
        background: none;
        position: relative;
        margin-top: 24px;
        .partner-map-logo-img {
          position: initial;
          transform: initial;
          width: 100%;
          height: 0;
          padding-bottom: 273/341 * 100%;
          background: url('/images/logo.png') no-repeat;
          background-position: center;
          background-size: 100% auto;
        }
        .partner-map-logo-img::after {
          content: '* 按照品牌首字母顺序排名';
          position: absolute;
          bottom: -20px;
          right: 5px;
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          line-height: 16px;
          font-weight: 400;
        }
      }
    }
    .screen1,
    .screen2,
    .screen3,
    .screen4,
    .screen5 {
      overflow: hidden;
    }
    // &-video {
    //   // transform: translate(0, 150px);
    // }
  }
  //显示播放按钮
  #show-play-btn {
    .common-main-video,
    .common-one-video {
      /deep/ .vjs-custom-skin {
        > .video-js {
          pointer-events: none;
          .vjs-big-play-button {
            pointer-events: auto !important;
            display: block;
            background-color: rgba(0, 0, 0, 0.45) !important;
          }
        }
        .vjs-controls-disabled .vjs-big-play-button,
        .vjs-has-started .vjs-big-play-button,
        .vjs-using-native-controls .vjs-big-play-button,
        .vjs-error .vjs-big-play-button {
          display: none;
        }
      }
    }
  }
}
</style>
