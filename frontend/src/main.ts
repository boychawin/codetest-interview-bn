import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { store, key } from './store/store';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(store, key);
app.mount('#app');

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(store, key).mount('#app');
