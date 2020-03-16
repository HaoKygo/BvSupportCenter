import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueFetch, {$fetch} from './plugins/fetch'
import VueState from './plugins/state'
import state from './state'
import * as filters from './filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
})
Vue.use(VueState, state)

for (const key in filters) {
  Vue.filter(key, filters[key])
}

async function main() {
  // Get user info
  try {
    state.user = await $fetch('user');
  } catch (e) {
    console.warn(e);
  }

  // Start app
  new Vue({
    data: state,
    router,
    render: h => h(App)
  }).$mount('#app')
}

main()
