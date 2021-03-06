<template>
  <section class="cell">
    <div class="cell-left">
      <!-- 右滑显示内容 -->
    </div>
    <div class="cell-wrapper">
      <!-- 可视区域内容 -->
      <div class="cell-title" v-if="!!title">
        <slot name="icon">
          <i v-if="icon" :class="'icon-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="cell-text">
            {{title}}
          </span>
          <span v-if="label" class="cell-label">
            {{label}}
          </span>
        </slot>
      </div>
      <div class="cell-value">
        <slot>
          <span>
            {{value}}
          </span>
        </slot>
      </div>
      <i v-if="isLink" class="cell-allow-right"></i>
    </div>
    <div class="cell-right">
      <!-- 左滑显示内容 -->
    </div>
  </section>
</template>

<script>
/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: 'CCell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    value: {},
    isLink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  position: relative;
  box-sizing: border-box;
  min-height: px2Rem(46);
  overflow: hidden;
  .cell-left {
    transform: translateX(-100%);
  }
  .cell-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-height: inherit;
    padding: 0 px2Rem(10);
    background-image: linear-gradient(to top, $gray, $gray 50%, transparent 100%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-origin: content-box;
  }
  .cell-title {
    text-align: left;
    width: 30%;
  }
  .cell-text {
    font-size: px2Rem(16);
  }
  .cell-label {
    display: block;
    color: $lightDark;
  }
  .cell-value {
    display: flex;
    align-items: center;
    font-size: px2Rem(18);
    width: 100%;
    text-align: right;
    padding: px2Rem(5) 0;
  }
  .cell-right {
    transform: translateX(100%);
  }
  &:last-child {
    .cell-wrapper {
      background-origin: border-box;
    }
  }
  .cell-allow-right {
    @include arrow-left(8px, #333, #fff, 180deg);
  }
}
.page-part {
  .cell:first-child {
    background-image: linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 100%);
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100% 1px;
  }
}
</style>
