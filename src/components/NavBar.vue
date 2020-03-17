<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand>
        <router-link :to="{ name: 'home'}">
          <img src="../assets/support.svg" alt="Logo">
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/">
            <b-icon-house-fill></b-icon-house-fill>
              主页
            </b-nav-item>
          <b-nav-item href="/#/worktickets">
            <b-icon-wrench></b-icon-wrench>
              工单
          </b-nav-item>
          <b-nav-item href="/#/faq">
            <b-icon-question-fill></b-icon-question-fill>
              FAQ
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <template v-if="$state.user">
            <b-nav-item>
              <b-icon-person-fill></b-icon-person-fill>
              {{ $state.user.username }}
            </b-nav-item>
            <b-nav-item>
              <b-button variant="info" @click="logout" block>退出账号</b-button>
            </b-nav-item>
          </template>
          <b-nav-item v-else>
            <b-button variant="info" @click="$router.push('login')" block>登录</b-button>
          </b-nav-item>
          <!-- <b-button v-else variant="info" @click="$router.push('login')">登录</b-button> -->
          <b-nav-item href="https://github.com/HaoKygo/BvSupportCenter">
            <img src="../assets/github.svg" alt="websit github url">
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  methods: {
    async logout () {
      // 登出方法
      const result = await this.$fetch('logout');
      if (result.status === 'ok') {
        this.$state.user = null;
      }
      if (this.$router.currentRoute.matched.some(r => r.meta.private)) {
        this.$router.replace({ name: 'login', params: {
          wantedRoute: this.$router.currentRoute.fullPath
        }});
      }
    }
  }
}
</script>
