import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('TOUTIAO_TOKEN')) || {}
    tokenObj: getToken() || {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(payload))
      setToken(payload)
    }
  }
})
