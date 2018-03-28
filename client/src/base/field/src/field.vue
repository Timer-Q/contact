<template>
  <c-cell
    :title="label"
    class="cell-field">
      <textarea
        :rows="rows"
        v-if="type === 'textarea'"
        class="field-textarea"
        :class="fieldAlignStyle"
        :placeholder="placeholder"
        :disabled="disabled">
      </textarea>
      <input
        v-else
        :type="type"
        class="field-input"
        :class="fieldAlignStyle"
        :placeholder="placeholder"
        :disabled="disabled"/>
      <!-- TODO: 根据是否有值 && 是否focusin 判断显示隐藏 -->
      <div v-show="clearable" class="field-clear">
        &times;
      </div>
      <slot></slot>
  </c-cell>
</template>

<script>
import cell from '@/base/cell'
export default {
  name: 'CInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    label: String,
    textAlign: {
      type: String,
      default: 'left'
    },
    disabled: Boolean,
    rows: {
      type: String,
      default: '2'
    },
    clearable: Boolean
  },
  computed: {
    fieldAlignStyle () {
      return `field-align-${this.textAlign}`
    }
  },
  components: {
    CCell: cell
  }
}
</script>

<style lang="scss" scoped>
.cell-field {
  display: flex;
  .field-input,
  .field-textarea {
    width: 100%;
    outline: none;
    font-size: px2Rem(16);
    border: none;
  }
  .field-textarea {
    resize: none;
  }
  .field-align-right {
    text-align: right;
  }
  .field-align-left {
    text-align: left;
  }
  .field-clear {
    font-size: 16px;
    min-width: 16px;
    min-height: 16px;
    max-width: 16px;
    max-height: 16px;
    background: #aaa;
    border-radius: 50%;
    opacity: .3;
    line-height: .9;
    text-align: center;
  }
}
</style>
