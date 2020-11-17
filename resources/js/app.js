require('./bootstrap');

window.Vue = require('vue');

import router from './routes/router'
import vuetify from './vuetify/vuetify'
import store from './vuex/store'
import snotify from 'vue-snotify'

const options = {
    toast: {
        showProgressBar: false,
        timeout: 5000
    }
}

Vue.use(snotify, options)

/*Componentes globais*/
Vue.component('preloader-component', require('./components/partials/PreloaderComponent.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify
});
