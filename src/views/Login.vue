<template>
  <main>
    <b-container fluid="md" class="login">
      <SubmitForm
        :title="title"
        :operation="operation"
        :valid="valid">

        <b-form-group label="用户名：" label-for="input-user">
          <b-form-input
            id="input-user"
            v-model="username"
            placeholder="用户名">
          </b-form-input>
        </b-form-group>

        <b-form-group label="密码：" label-for="input-passwd">
          <b-form-input
            id="input-passwd"
            v-model="password"
            type="password"
            placeholder="密码">
          </b-form-input>
        </b-form-group>

        <template v-if="mode === 'signup'">
          <b-form-group label="确认密码：" label-for="input-repasswd">
            <b-form-input
              id="input-repasswd"
              v-model="password2"
              type="password"
              placeholder="确认密码">
            </b-form-input>
          </b-form-group>
          <b-form-group label="邮箱：" label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="email"
              type="email"
              placeholder="邮箱">
            </b-form-input>
          </b-form-group>
        </template>

        <template slot="actions">
          <template v-if="mode === 'login'">
            <b-container class="button-center">
              <b-button-group size="lg">
                <b-button variant="primary" @click="mode = 'signup'">
                  注册
                </b-button>
                <b-button variant="info" type="submit" :disabled="!valid">
                  登录
                </b-button>
              </b-button-group>
            </b-container>
          </template>
          
          <template v-else-if="mode === 'signup'">
            <b-container class="button-center">
              <b-button-group size="lg">
                <b-button variant="primary" @click="mode = 'login'">
                  返回登录
                </b-button>
                <b-button variant="info" type="submit" :disabled="!valid">
                  创建账号
                </b-button>
              </b-button-group>
            </b-container>
          </template>
        </template>
      </SubmitForm>
    </b-container>
  </main>
</template>

<script>
import SubmitForm from '../components/SubmitForm'

export default {
  components: {
    SubmitForm
  },
  data() {
    return {
      mode: 'login',
      username: '',
      password: '',
      password2: '',
      email: ''
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    title () {
      switch (this.mode) {
        case 'login': return '登录'
        case 'signup': return '创建一个新账号'
      }
    },
    retypePasswordError () {
      return this.password2 && this.password !== this.password2
    },
    signupValid () {
      return this.password2 && this.email && !this.retypePasswordError
    },
    valid () {
      return this.username && this.password &&
      (this.mode !== 'signup' || this.signupValid)
    }
  },
  methods: {
    async operation () {
      await this[this.mode]();
    },
    async login () {
      // Login
      this.$state.user = await this.$fetch('login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      this.$router.replace(this.$route.params.wantedRoute || { name: 'home' });
    },
    async signup () {
      // Sign up
      await this.$fetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email
        })
      });
      this.mode = 'login';
    }
  }
}
</script>

<style scoped>
.button-center {
  text-align: center;
}
.login {
  max-width: 600px;
}
</style>
