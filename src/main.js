import Vue from 'vue'
// import Vuex from 'vuex'
import router from './router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icons.css'
import App from './App.vue'
import myCharts  from './utils/myCharts.js'
import axios from 'axios'


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
      return config;
    },
    error => {
       return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(myCharts)
// Vue.use(Vuex)
Vue.prototype.axios = axios

document.title='EaseBase 数据库运维平台'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
