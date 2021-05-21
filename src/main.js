import Vue from 'vue'
import router from './router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icons.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
document.title='EaseBase 数据库运维平台'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
