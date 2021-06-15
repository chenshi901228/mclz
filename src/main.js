import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui';
import httpRequest from '@/utils/request'
import * as echarts from 'echarts';
import '@/public/stylesheets/element-variables.scss'


Vue.use(ElementUI);
Vue.use(dataV);

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = httpRequest;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')