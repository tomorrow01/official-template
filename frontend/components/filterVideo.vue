<template>
  <div class="common-bgvideo">
    <div class="common-bgvideo-player">
      <video :src="videoSrc" autoplay width="100%" height="100%" loop muted></video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: {
      default: '',
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
.common-bgvideo {
  min-width: 0;
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 200px);
  height: calc(100% -140px);
  opacity: 0.65;
  -webkit-filter: blur(70px);
  -moz-filter: blur(70px);
  -ms-filter: blur(70px);
  -o-filter: blur(70px);
  filter: blur(70px);
  &-player {
    -webkit-filter: inherit;
    -moz-filter: inherit;
    -ms-filter: inherit;
    -o-filter: inherit;
    filter: inherit;
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
