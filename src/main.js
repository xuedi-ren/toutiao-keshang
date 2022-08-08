import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标
import '@/assets/fonts/iconfont.css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入flexible
import 'amfe-flexible/index.min.js'
import '@/style/index.less'
import dayjs from 'dayjs'
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
