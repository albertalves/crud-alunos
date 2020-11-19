require('./bootstrap');

window.Vue = require('vue');

import router from './routes/router';
import vuetify from './vuetify/vuetify';
import store from './vuex/store';
import snotify from 'vue-snotify';
import ViaCep from 'vue-viacep';
import VueTheMask from 'vue-the-mask'

Vue.use(ViaCep);
Vue.use(VueTheMask);

import Snotify from 'vue-snotify'

const options = {
    toast: {
        showProgressBar: false,
        timeout: 5000
    }
}

Vue.use(Snotify, options)


Vue.component('preloader-component', require('./components/partials/PreloaderComponent.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify
});

store.dispatch('checkLogin').then(() => router.push(store.state.auth.urlBack));