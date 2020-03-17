<template>
<div>
  <b-carousel
    :interval="3800"
    controls
    background="#17a2b8"
    img-width="991"
    img-height="420"
    style="text-shadow: 1px 1px 2px #333;">

    <b-carousel-slide
      img-src="https://picsum.photos/991/420?image=54">
      <h1>欢迎来到支持中心</h1>
    </b-carousel-slide>

    <b-carousel-slide
      img-src="https://picsum.photos/991/420?image=56">
      <h2>常见问题</h2>
      <b-button variant="primary" href="/#/faq">FAQ</b-button>
    </b-carousel-slide>

    <b-carousel-slide
      img-src="https://picsum.photos/991/420?image=60">
      <h2>发送工单</h2>
      <b-button variant="primary" href="/#/worktickets/newticket">发送</b-button>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>

<style scoped>
* {
  text-align: center;
}
</style>
