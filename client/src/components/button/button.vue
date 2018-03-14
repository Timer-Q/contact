<template>
  <div class="container">
    <c-header title="button" />
    <h1>large</h1>
    <div class="button-group">
      <c-button type="danger" size="large">large danger</c-button>
      <c-button type="primary" size="large">large primary</c-button>
      <c-button type="default" size="large">large default</c-button>
    </div>
    <h1>narmal</h1>
    <div class="button-group">
      <c-button type="danger" size="normal">normal danger</c-button>
      <c-button type="primary" size="normal">normal primary</c-button>
      <c-button type="default" size="normal">normal default</c-button>
    </div>
    <h1>small</h1>
    <div class="button-group">
      <c-button type="danger" size="small">small danger</c-button>
      <c-button type="primary" size="small">small primary</c-button>
      <c-button type="default" size="small">small default</c-button>
    </div>
    <h1>disabled</h1>
    <div class="button-group">
      <c-button disabled type="danger" size="large">large danger disabled</c-button>
      <c-button disabled type="primary" size="large">large primary disabled</c-button>
      <c-button disabled type="default" size="large">large default disabled</c-button>
    </div>
    <h1>plain</h1>
    <div class="button-group">
      <c-button plain type="danger" size="large">large danger</c-button>
      <c-button plain type="primary" size="large">large primary</c-button>
      <c-button plain type="default" size="large">large default</c-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    line-height: 2;
    padding-left: 10px;
    font-size: 18px;
  }
</style>
