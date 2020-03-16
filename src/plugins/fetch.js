// 
//  Vue plugin $fetch
// 

import router from '../router/index'

// eslint-disable-next-line no-unused-vars
let baseUrl = '';

export async function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }, options);

  const response = await fetch(`${baseUrl}${url}`, finalOptions);
  
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else if (response.status === 403) {
      // If the session is not longer valid, logout the account
      this.$state.user = null;
      // If the route is private, jump to login page
      if (router.currentRoute.matched.some(r => r.meta.private)) {
        router.replace({ name: 'login', params: {
          wantedRoute: router.currentRoute.fullPath
        }});
      }
    } 
    else {
      const message = await response.text();
      const error = new Error(message);
      error.response = response;
      throw error;
    }
  } catch (e) {
    console.warn(e);
  }
}

export default {
  install (Vue, options) {
    console.log('Installed!', options);

    baseUrl = options.baseUrl;

    Vue.prototype.$fetch = $fetch;
  }
}
