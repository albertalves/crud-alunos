import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth/auth'
import preloader from './preloader/preloader'
import aluno from './aluno/aluno'
import turma from './turma/turma'
import unidade from './unidade/unidade'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        preloader,
        aluno,
        turma,
        unidade,
    }
})

export default store