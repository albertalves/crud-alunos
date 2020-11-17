import Vue from 'vue'
import Vuex from 'vuex'

// módulos de Admin
import auth from './auth/auth'
import preloader from './preloader/preloader'

// Faz o vue reconhecer o vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        preloader,
    }
})

export default store