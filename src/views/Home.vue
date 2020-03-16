<template>
<div>
  <!-- <b-jumbotron header="支持中心" lead="为您提供帮助的支持中心">
    <p>请先阅读常见问题解答</p>
    <b-button variant="primary" href="#">FAQ</b-button>

    <p>如果找不到问题答案 请给我们发送工单</p>
    <b-button variant="info" href="#">发送</b-button>
  </b-jumbotron> -->

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
      <h2>请先阅读常见问题解答</h2>
      <b-button variant="info" href="/#/faq">FAQ</b-button>
    </b-carousel-slide>

    <b-carousel-slide
      img-src="https://picsum.photos/991/420?image=60">
      <h2>如果找不到问题答案 请给我们发送工单</h2>
      <b-button variant="info" href="/#/worktickets/newticket">发送</b-button>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>

<style scoped>
* {
  text-align: center;
}
</style>
