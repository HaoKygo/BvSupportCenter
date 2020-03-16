<template>
  <b-container>
    <SubmitForm
      title="新工单"
      :operation="operation"
      :valid="valid">

      <b-form-group label="标题：" label-for="input-tickettitle">
        <b-form-input
          id="input-tickettitle"
          v-model="title"
          placeholder="标题">
        </b-form-input>
      </b-form-group>

      <b-form-group label="问题描述：" label-for="input-ticketdscp">
        <b-form-textarea
          id="input-ticketdscp"
          v-model="description"
          placeholder="问题描述"
          rows="4"
          max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <template slot="actions">
        <b-container class="button-center">
          <b-button-group size="lg">
            <b-button variant="primary">
              返回工单
            </b-button>
            <b-button variant="info" type="submit" :disabled="!valid">
              发送工单
            </b-button>
          </b-button-group>
        </b-container>
      </template>
    </SubmitForm>
  </b-container>
</template>


<script>
import PersistantData from '../mixins/PersistantData'
import SubmitForm from './SubmitForm'

export default {
  mixins: [
    PersistantData('NewTicket', [
      'title',
      'description'
    ])
  ],
  components: {
    SubmitForm
  },
  data() {
    return {
      title: '',
      description: ''
    };
  },
  computed: {
    valid () {
      return !!this.title && !!this.description;
    }
  },
  methods: {
    async operation () {
      // Operation
      // eslint-disable-next-line no-unused-vars
      const result = await this.$fetch('tickets/new', {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          description: this.description
        })
      });
      this.title = this.description = '';
    }
  }
}
</script>

<style scoped>
.button-center {
  text-align: center;
}
</style>
