import Vue from 'vue'
import Vuex from 'vuex'

import temperatureHumidity from './temperatureHumidity/temperatureHumidity' //温湿度检测
import surveillance from './surveillance/surveillance'
import healthCards from './healthCards/healthCards'
import foodCompany from './foodCompany/foodCompany'
import staffCheck from './staffCheck/staffCheck'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    temperatureHumidity, //温湿度检测
    surveillance, //视频监控
    healthCards, //健康证管理
    foodCompany, //食品安检
    staffCheck //人员晨检
  }
})