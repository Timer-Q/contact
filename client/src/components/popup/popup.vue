<template>
  <div class="container">
    <c-header title="popup"></c-header>
    <c-button @click.native="handleToggle">popup toggle</c-button>
    <c-button @click.native="popupVisible1 = !popupVisible1">popup toggle1</c-button>
    <c-button @click.native="popupVisible2 = !popupVisible2">popup toggle2</c-button>
    <c-button @click.native="popupVisible3 = !popupVisible3">popup toggle3</c-button>
    <c-button @click.native="popupVisible4 = !popupVisible4">popup toggle4</c-button>
    <c-popup position="bottom" v-model="popupVisible">
      lalalalla
    </c-popup>
    <c-popup position="bottom" v-model="popupVisible1">
      lalalalla1
    </c-popup>
    <c-popup position="bottom" v-model="popupVisible2">
      lalalalla2
    </c-popup>
    <c-popup position="bottom" v-model="popupVisible3">
      lalalalla3
    </c-popup>
    <c-popup position="bottom" v-model="popupVisible4">
      lalalalla4
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
    }
  }
}
</script>
