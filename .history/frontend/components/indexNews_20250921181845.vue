<template>
  <div class="news-module">
    <p class="module-title font48">新闻动态</p>
    <div v-if="newsList.length" class="module-content">
      <div v-for="(newsItem, newsIdx) in newsList" :key="newsItem.id" class="news-item">
        <nuxt-link :to="{ path: `/newsDetail/${newsItem.id}.html` }" class="news-item-link">
          <div v-if="newsIdx === 0 && isMobile" class="news-top-item">
            <div
              :style="{
                background: 'url(' + newsItem.thumbUrl + ') no-repeat center',
              }"
              class="top-item-thumb bg-normal"
            ></div>
            <div class="top-item-content common-padding">
              <h4 class="common-2-ellipsis">{{ newsItem.title }}</h4>
              <p class="top-item-time common-row">
                <span class="type">{{ newsItem.type | formatType }}</span>
                <span class="time">{{ newsItem.publishTime | format }}</span>
              </p>
              <p class="top-item-desc common-2-ellipsis">{{ newsItem.digest }}</p>
            </div>
          </div>
          <div v-else class="news-else-item">
            <div :style="{ background: 'url(' + newsItem.thumbUrl + ') no-repeat center' }" class="news-item-img">
              <div class="mask hidden-xs-only"></div>
            </div>
            <div class="news-item-content">
              <h4 class="font20 common-2-ellipsis">{{ newsItem.title }}</h4>
              <p class="news-item-time font16 common-row">
                <span class="type">{{ newsItem.type | formatType }}</span>
                <span class="time">{{ newsItem.publishTime | format }}</span>
              </p>
              <p class="news-item-desc font16 hidden-xs-only">{{ newsItem.digest }}</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <nuxt-link v-if="newsList.length" class="common-move-btn" to="/news/">
      <div :class="[isMobile ? 'common-row common-center' : '']" class="common-move-btn-content btn-content bg-normal2">
        <div class="btn-text font18" style="color: #111111">了解更多</div>
        <div class="btn-arrow">
          <img src="/images/index/black_arrow_hover@1x.svg" alt="" class="arrow-img hidden-xs-only" />
          <img src="/images/index/arrow_mobile2.svg" alt="" class="arrow-img hidden-sm-and-up" />
        </div>
      </div>
    </nuxt-link>
    <span v-if="!newsList.length" class="news-empty-text">暂无展会新闻</span>
  </div>
</template>

<script>
export default {
  filters: {
    format(value) {
      if (!value) {
        return
      }
      let v = value.split(' ')[0]
      let date = v.split('-')
      return `${date[0]}年${date[1]}月${date[2]}日`
    },

    formatType(val) {
      if (val === 0) {
        return '热门资讯'
      } else if (val === 1) {
        return '公司动态'
      } else if (val === 2) {
        return '行业新闻'
      }
      return ''
    },
  },
  props: {
    newsList: {
      default: () => {
        return []
      },
      type: Array,
    },
    isMobile: {
      default: Boolean,
      type: Boolean,
    },
  },
}
</script>

<style lang="less" scoped>
.news-module {
  width: 100%;
  padding: 82px 0 70px;
  background: #ffffff;
  text-align: center;
  position: relative;
  .module-title {
    font-family: 'PingFangSC-Light', 'FZLT-Light';
    font-size: 48px;
    height: 56px;
    line-height: 56px;
    color: #111111;
    letter-spacing: 0;
    text-align: center;
    font-weight: 100;
  }
  .module-content {
    // height: 463px;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 58px 0 30px;
    .news-item {
      width: 24%;
      // min-height: 463px;
      height: auto;
      background-color: #f7f7f7;
      border-radius: 6px;
      margin-left: 25px;
      overflow: hidden;
      &-link {
        display: block;
        width: 100%;
        .news-item-img {
          background-size: 100% auto !important;
          width: 100%;
          // max-width: 450px;
          height: 0px;
          // 百分比：图像的高度除以其自身的宽度，然后乘以100
          padding-bottom: 240 / 450 * 100%;
          overflow: hidden !important;
        }
        .news-item-content {
          font-family: 'PingFangSC-Regular', 'FZLT-Regular';
          padding: 6%;
          text-align: left;
          h4 {
            font-size: 20px;
            color: #222222;
            letter-spacing: 0;
            line-height: 28px;
            font-weight: 400;
            margin-bottom: 12px;
          }
          p {
            font-size: 16px;
            color: #999999;
            letter-spacing: 0;
            line-height: 17px;
            font-weight: 400;
            margin-bottom: 24px;
          }
          p:last-child {
            color: #858585;
            letter-spacing: 0.2px;
            text-align: justify;
            line-height: 24px;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    @media (any-hover: hover) {
      .news-item:hover {
        background: #ffffff;
        box-shadow: 0 4px 28px 0 rgba(32, 41, 55, 0.1);

        .news-item-img {
          transform: scale(1.1);
          transition: transform 0.5s;
        }
      }
    }
  }
}
@media all and (max-width: 767px) {
  .news-module {
    padding: 50px 20px 50px;
    .module-title {
      height: 28px;
      text-align: left;
      font-family: PingFangSC-Medium;
      font-size: 28px !important;
      color: #111111;
      letter-spacing: 0;
      line-height: 28px !important;
      font-weight: 500;
    }
    .module-content {
      // height: 463px;
      display: -webkit-flex;
      display: flex;
      flex-wrap: unset;
      flex-direction: column;
      justify-content: unset;
      align-content: center;
      padding: 24px 0 30px;
      .news-item {
        width: 100%;
        // min-height: 463px;
        height: auto;
        margin-left: 0px;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 12px;
        &-link {
          .news-else-item {
            padding: 8px;
            display: flex;
            flex-direction: row;
            width: 100%;
            .news-item-img {
              width: 120px;
              height: 86px;
              background-size: cover !important;
              // 百分比：图像的高度除以其自身的宽度，然后乘以100
              padding-bottom: 0;
              overflow: hidden !important;
              border-radius: 10px;
            }
            .news-item-content {
              flex: 1;
              height: 86px;
              font-family: 'PingFangSC-Regular', 'FZLT-Regular';
              text-align: left;
              display: flex;
              flex-wrap: unset;
              flex-direction: column;
              justify-content: space-between;
              padding: 8px 0px 4px 12px;
              box-sizing: border-box;
              h4 {
                margin-bottom: 0px;
                font-family: PingFangSC-Medium;
                font-size: 16px !important;
                color: #111111;
                line-height: 24px !important;
                font-weight: 500;
              }
              p {
                font-family: PingFangSC-Regular;
                font-size: 10px !important;
                color: #9d9d9d;
                letter-spacing: 0;
                line-height: 10px !important;
                font-weight: 400;
                margin-bottom: 0;
                .type {
                  &::after {
                    content: '';
                    display: inline-block;
                    margin: 0 6px;
                    width: 4px;
                    height: 4px;
                    background: #9d9d9d;
                    border-radius: 4px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
          .news-top-item {
            text-align: left;
            width: 100%;
            height: auto;
            background: #ffffff;
            // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
            // border-radius: 10px;
            // overflow: hidden;
            .top-item-thumb {
              width: 100%;
              height: 0;
              padding-bottom: 163.55/335 * 100%;
              background-size: cover !important;
            }
            .top-item-content {
              padding-top: 15px;
              padding-bottom: 30px;
              h4 {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #111111;
                line-height: 24px;
                font-weight: 500;
              }
              .top-item-time {
                margin: 10px 0 20px;
                font-size: 0px;
                span {
                  font-family: PingFangSC-Regular;
                  font-size: 10px;
                  color: #999999;
                  letter-spacing: 0;
                  line-height: 16px;
                  font-weight: 400;
                }
                .type {
                  &::after {
                    content: '';
                    display: inline-block;
                    margin: 0 6px;
                    width: 4px;
                    height: 4px;
                    background: #9d9d9d;
                    border-radius: 4px;
                    vertical-align: middle;
                  }
                }
              }
              .top-item-desc {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
                line-height: 18px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .common-move-btn {
      position: unset;
      transform: unset;
      &-content {
        width: 116px;
        border: 1px solid #adadad;
      }
    }
  }
}
</style>
