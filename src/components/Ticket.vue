<template>
  <b-container>
    <h2>工单</h2>

    <b-container v-if="remoteDataBusy">
      <b-spinner variant="info" label="spinning"></b-spinner>
    </b-container>

    <b-container v-else-if="!ticket">
      <b-alert variant="warning" show>工单没找到</b-alert>
    </b-container>

    <template v-else>
      <!-- 基本信息 -->
      <section>
        <b-container>
          创建于：<strong>{{ ticket.date | date }}</strong>
        </b-container>
        <b-container>
          作者：<strong>{{ ticket.user.username }}</strong>
        </b-container>
        <b-container>
          状态：<b-badge variant="primary">{{ ticket.status }}</b-badge>
        </b-container>
      </section>
      <!-- 工单内容 -->
      <section>
        <b-card :title="ticket.title">
          <b-card-text>
            {{ ticket.description }}
          </b-card-text>
        </b-card>
      </section>
    </template>
  </b-container>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      ticket() {
        return `ticket/${this.id}`
      }
    })
  ],
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
