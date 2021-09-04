import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseSpinner from './components/shared/BaseSpinner'

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-spinner', BaseSpinner);

// sep-04-2021: this is a temporary fix that will not be necessary in Vue soon
app.config.unwrapInjectedRef = true;

app.mount('#app');