<template>
  <div v-if="showScreenPopup && playerOptions.sources[0].src" :id="[isVivoXplay ? 'show-play-btn' : '']" class="common-main-popup screen1-popup" @touchmove.prevent>
    <div class="popup-video">
      <div class="popup-video-player">
        <img class="player-close" src="../static/images/index/close@1x.png" @click="handleCloseFullvideo" />
        <client-only>
          <video-player ref="popupVideoPlayer" :playsinline="true" :options="playerOptions" :x5-video-player-fullscreen="false" class="video-player vjs-custom-skin" style="object-fit: cover"></video-player>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showScreenPopup: {
      default: false,
      type: Boolean,
    },
    isVivoXplay: {
      default: false,
      type: Boolean,
    },
    playerOptions: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {}
  },
  watch: {
    showScreenPopup(v) {
      if (v) {
        console.log('完整视频播放')
        setTimeout(() => {
          console.log(this.$refs.popupVideoPlayer.player)
          this.$refs.popupVideoPlayer.player.play()
        })
      } else {
        console.log('完整视频关闭')
      }
    },
  },
  mounted() {},
  methods: {
    handleCloseFullvideo() {
      this.$refs.popupVideoPlayer.player.pause()
      this.$emit('handleCloseFullvideo')
    },
  },
}
</script>

<style lang="less" scoped>
#show-play-btn {
  /deep/ .vjs-custom-skin {
    > .video-js {
      .vjs-big-play-button {
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
</style>
