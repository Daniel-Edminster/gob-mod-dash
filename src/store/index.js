import { createStore } from 'vuex'
import bandits from "./bandits"
import rounds from "./rounds"
import settings from "./settings"
import templates from "./templates"
import auth from "./auth"

export default createStore({
  modules: {
    bandits,
    rounds,
    settings,
    templates,
    auth
  }
})
