<template>
  <b-form @submit.prevent="submit">
    <section class="content">
      <h2>{{ title }}</h2>
      <!-- 主要内容 -->
      <slot />
      <div class="actions">
        <!-- 相应按钮 -->
        <slot name="actions" />
      </div>

      <b-alert variant="warning" v-if="error">
        {{ error }}
      </b-alert>
    </section>

    <transition>
      <!-- 拓展表 -->
      <div class="text-center" v-if="busy"> 
        <b-spinner variant="info" label="Spinning"></b-spinner>
      </div>
    </transition>
  </b-form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    operation: {
      type: Function,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      error: null,
      busy: false
    }
  },
  methods: {
    async submit () {
      if (this.valid && !this.busy) {
        this.error = null;
        this.busy = true;
        try {
          await this.operation();
        } catch (e) {
          this.error = e.message;
        }
        this.busy = false;
      }
    }
  }
}
</script>

<style scoped>
h2{
  text-align: center;
}
</style>
