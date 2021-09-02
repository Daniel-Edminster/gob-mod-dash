import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseSpinner from './components/shared/BaseSpinner'

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-spinner', BaseSpinner);

app.mount('#app');