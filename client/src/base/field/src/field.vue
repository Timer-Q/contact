<template>
  <c-cell
    class="cell-field"
    :title="label">
    <textarea
      :rows="rows"
      v-if="type === 'textarea'"
      class="field-textarea"
      :class="fieldAlignStyle"
      :placeholder="placeholder">
    </textarea>
    <input
      v-else
      :type="type"
      class="field-input"
      :class="fieldAlignStyle"
      :placeholder="placeholder"/>
  </c-cell>
</template>

<script>
import cell from '@/base/cell'
export default {
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
    }
  },
  computed: {
    fieldAlignStyle() {
      return `field-align-${this.textAlign}`
    }
  },
  components: {
    CCell: cell
  }
}
</script>

<style lang="scss" scoped>
.field-input,
.field-textarea {
  width: 100%;
  outline: none;
  font-size: px2Rem(16);
}
.field-align-right {
  text-align: right;
}
.field-align-left {
  text-align: left;
}
</style>

