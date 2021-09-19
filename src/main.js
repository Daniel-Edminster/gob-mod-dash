import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseModal from './components/UI/BaseModal'
import BaseSpinner from './components/UI/BaseSpinner'

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-modal', BaseModal);
app.component('base-spinner', BaseSpinner);

// sep-04-2021: this is a temporary fix that will not be necessary in Vue soon
app.config.unwrapInjectedRef = true;

app.mount('#app');