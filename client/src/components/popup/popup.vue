<template>
  <div class="container">
    <c-header title="popup"></c-header>
    <div class="button-group">
      <c-button @click.native="handleToggle" size="large">popup toggle bottom</c-button>
      <c-button @click.native="popupVisible1 = !popupVisible1" size="large">popup toggle top</c-button>
      <c-button @click.native="popupVisible2 = !popupVisible2" size="large">popup toggle left</c-button>
      <c-button @click.native="popupVisible3 = !popupVisible3" size="large">popup toggle right</c-button>
      <c-button @click.native="popupVisible4 = !popupVisible4" size="large">popup toggle center</c-button>
    </div>

    <c-popup position="bottom" showMask v-model="popupVisible">
      slide bottom
    </c-popup>

    <c-popup position="top" :close-delay="2000" v-model="popupVisible1">
      slide top
    </c-popup>

    <c-popup position="left" v-model="popupVisible2">
      slide left
      <c-button size="large" type="primary" @click.native="handleCloseLeft">close</c-button>
    </c-popup>

    <c-popup position="right" v-model="popupVisible3">
      slide right
      <c-button size="large" type="primary" @click.native="handleCloseRight">close</c-button>
    </c-popup>

    <c-popup position="center" showMask v-model="popupVisible4">
      fade center
    </c-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popupVisible: false,
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false
    }
  },
  methods: {
    handleToggle () {
      this.popupVisible = !this.popupVisible
    },
    handleCloseLeft () {
      this.popupVisible2 = false
    },
    handleCloseRight () {
      this.popupVisible3 = false
    }
  }
}
</script>
