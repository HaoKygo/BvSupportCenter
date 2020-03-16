<template>
  <b-container>
    <b-container v-if="remoteDataBusy" class="text-center">
      <b-spinner variant="info" label="spinning"></b-spinner>
    </b-container>

    <b-container v-else-if="tickets.length === 0">
      <b-alert variant="warning" show>你目前还没有工单。</b-alert>
    </b-container>

    <!-- 工单列表 -->
    <b-container v-else>
      <b-list-group>
        <b-list-group-item v-for="(ticket, index) in tickets" :key="index" button>
          <router-link :to="{ name: 'ticket', params: { id: ticket._id }}">
            {{ ticket.title }}
          </router-link>
          <b-badge variant="primary">{{ ticket.status }}</b-badge>
          <span class="date">{{ ticket.date | date }}</span>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </b-container>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      tickets: 'tickets'
    })
  ]
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.date {
  float: right;
}
</style>
