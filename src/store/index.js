import { createStore } from 'vuex'
import bandits from "./bandits"
import rounds from "./rounds"
import templates from "./templates"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    bandits,
    rounds,
    templates
  }
})
