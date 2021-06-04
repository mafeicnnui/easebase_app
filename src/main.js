import Vue from 'vue'
// import Vuex from 'vuex'
import router from './router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icons.css'
import App from './App.vue'
import myCharts  from './utils/myCharts.js'
import axios from 'axios'

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
