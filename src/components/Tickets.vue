<template>
  <div>
    <div v-if="remoteDataBusy" class="text-center">
      <b-spinner variant="info" label="spinning"></b-spinner>
    </div>

    <div v-else-if="tickets.length === 0">
      <b-alert variant="warning" show>你目前还没有工单。</b-alert>
    </div>

    <b-container v-else>
      <b-list-group>
        <b-list-group-item v-for="(ticket, index) in tickets" :key="index" button>
          {{ ticket.title }}
          <b-badge variant="primary">{{ ticket.status }}</b-badge>
          <span class="date">{{ ticket.date | date }}</span>
        </b-list-group-item>
      </b-list-group>

      <!-- <b-container class="ticket-item" v-for="(ticket, index) in tickets" :key="index">
        <span>{{ ticket.title }}</span>
        <b-badge>{{ ticket.status }}</b-badge>
        <span class="date">{{ ticket.date | date }}</span>
      </b-container> -->
    </b-container>
  </div>
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
