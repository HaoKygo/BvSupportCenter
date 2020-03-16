<template>
  <main>
    <b-container>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <router-view />
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: '工单列表',
          to: { name: 'worktickets' },
        },
        {
          text: '新工单 ',
          to: { name: 'newticket' },
        },
        {
          text: ' ',
          active: true
        }
      ]
    }
  }
}
</script>
