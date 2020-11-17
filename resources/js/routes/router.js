import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

// Component Principal
import MasterComponent from '../components/MasterComponent'

// Módulo Home
import HomeComponent from '../components/modulos/home/HomeComponent';

// Módulo Aluno
import AlunoComponent from '../components/modulos/aluno/AlunoComponent';

// Módulo Turma
import TurmaComponent from '../components/modulos/turma/TurmaComponent';

// Módulo Usuário
import LoginComponent from '../components/modulos/usuario/login/LoginComponent'
import RegisterComponent from '../components/modulos/usuario/register/RegisterComponent'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login', 
        component: LoginComponent, 
        name: 'login',
        meta: {auth: false}
    },
    {
        path: '/register', 
        component: RegisterComponent, 
        name: 'register',
        meta: {auth: false}
    },
    {
        path: '/', 
        component: MasterComponent,
        meta: {auth: true},
        children: [
            {
                path: '/home',
                component: HomeComponent,
                name: 'home',
            },
            {
                path: '/aluno',
                component: AlunoComponent,
                name: 'aluno',
            },
            {
                path: '/turma',
                component: TurmaComponent,
                name: 'turma',
            }
        ]
    },
]

const router = new VueRouter ({
    routes
})

router.beforeEach((to, from, next) => {
    // se a rota for protegida e o usuário não estiver logado
    if(to.meta.auth && !store.state.auth.authenticated) {
        store.commit('CHANGE_URL_BACK', to.path)
        return router.push({name: 'login'})
    }

    if(to.matched.some(registro => registro.meta.auth) && !store.state.auth.authenticated){
        store.commit('CHANGE_URL_BACK', to.path);
        return router.push({name: 'login'});
    }

    // se a rota não for protegia e o usuário estiver logado.
    if(to.meta.hasOwnProperty('auth') && !to.meta.auth && store.state.auth.authenticated) {
        return router.push({name: 'home'});
    }
    next();
})

export default router