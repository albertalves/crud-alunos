import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store';

// Component Principal
import MasterPage from '../components/MasterPage';

// Módulo Home
import HomeComponent from '../components/modulos/home/HomeComponent';

// Módulo Aluno
import Aluno from '../components/modulos/aluno/Aluno';
import ListarAlunos from '../components/modulos/aluno/ListarAlunos';
import CadastrarAlunos from '../components/modulos/aluno/CadastrarAluno';
import EditarAlunos from '../components/modulos/aluno/EditarAluno';

// Módulo Turma
import Turma from '../components/modulos/turma/Turma';
import ListarTurmas from '../components/modulos/turma/ListarTurmas';
import CadastrarTurma from '../components/modulos/turma/CadastrarTurma';
import EditarTurma from '../components/modulos/turma/EditarTurma';

// Módulo Unidade
import Unidade from '../components/modulos/unidade/Unidade';
import ListarUnidades from '../components/modulos/unidade/ListarUnidades';
import CadastrarUnidade from '../components/modulos/unidade/CadastrarUnidade';
import EditarUnidade from '../components/modulos/unidade/EditarUnidade';

// Módulo Usuário
import LoginComponent from '../components/modulos/usuario/login/LoginComponent';
import RegisterComponent from '../components/modulos/usuario/register/RegisterComponent';

Vue.use(VueRouter);

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
        component: MasterPage,
        meta: {auth: true},
        children: [
            {
                path: '/home',
                component: HomeComponent,
                name: 'home',
            },
            {
                path: '/aluno',
                component: Aluno,
                children: [
                    {
                        path: '',
                        component: ListarAlunos,
                        name: 'aluno',
                    },
                    {
                        path: '/cadastrar-aluno',
                        component: CadastrarAlunos,
                        name: 'aluno.cadastrar',
                    },
                    {
                        path: '/editar-aluno',
                        component: EditarAlunos,
                        name: 'aluno.editar',
                        props: true
                    }
                ]
            },
            {
                path: '/turma',
                component: Turma,
                children: [
                    {
                        path: '',
                        component: ListarTurmas,
                        name: 'turma',
                    },
                    {
                        path: '/cadastrar-turma',
                        component: CadastrarTurma,
                        name: 'turma.cadastrar',
                    },
                    {
                        path: '/editar-turma',
                        component: EditarTurma,
                        name: 'turma.editar',
                        props: true
                    },
                ]
            },
            {
                path: '/unidade',
                component: Unidade,
                children: [
                    {
                        path: '',
                        component: ListarUnidades,
                        name: 'unidade',
                    },
                    {
                        path: '/cadastrar-unidade',
                        component: CadastrarUnidade,
                        name: 'unidade.cadastrar',
                    },
                    {
                        path: '/editar-unidade',
                        component: EditarUnidade,
                        name: 'unidade.editar',
                        props: true
                    },
                ]
            }
        ]
    },
];

const router = new VueRouter ({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {

    if(to.matched.some(registro => registro.meta.auth) && !store.state.auth.authenticated){
        store.commit('CHANGE_URL_BACK', to.path);
        return router.push({name: 'login'});
    }

    // se a rota não for protegia e o usuário estiver logado.
    if(to.meta.hasOwnProperty('auth') && !to.meta.auth && store.state.auth.authenticated) {
        return router.push({name: 'home'});
    }

    next();
});

export default router;