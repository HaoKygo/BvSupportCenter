<template>
  <main>
    <b-container>
      <h1 class="text-center">常见问题解答（例子来自HM官网）</h1>

      <b-alert variant="warning" :show="hasRemoteErrors">
        不能加载问题
      </b-alert>

      <div class="text-center" v-if="remoteDataBusy"> 
        <b-spinner variant="info" label="Spinning"></b-spinner>
      </div>

      <b-container class="list mb-3">
        <b-row cols="1" cols-sm="1" cols-md="2">
          <b-col v-for="(question, index) in questionList" :key="index" sm>
            <b-card>
              <b-card-text>
                <h2 v-html="question.title" class="text-center"></h2>
              </b-card-text>
              <b-card-text>
                <p v-html="question.content"></p>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      questionList: 'questions'
    })
  ]
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
