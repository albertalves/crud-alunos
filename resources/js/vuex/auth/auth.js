const URL_BASE = '/api/user';

import router from '../../routes/router'

export default {
    state: {
        me: {},
        authenticated: false,
        urlBack: 'dashboard',
    },

    mutations: {
        AUTH_USER_OK(state, user) {
            state.authenticated = true
            state.me = user
        },

        CHANGE_URL_BACK(state, url) {
            state.urlBack = url;
        },

        AUTH_USER_LOGOUT(state) {
            state.me = {}
            state.authenticated = false
        }
    },

    actions: {
        register(context, params) {
            return new Promise((resolve, reject) => {
                axios.post(URL_BASE + '/register', params)
                        .then(response => {
                            context.commit('AUTH_USER_OK', response.data.user)

                            const token = response.data.token;
                            
                            localStorage.setItem('TOKEN_AUTH', token)
                            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                            resolve()
                        })
                        .catch(error => reject(error))
                ;
            })
        },
        
        login(context, params) {
            return axios.post(URL_BASE + '/auth', params)
                        .then(response => {
                            context.commit('AUTH_USER_OK', response.data.user)

                            const token = response.data.token;
                            
                            localStorage.setItem('TOKEN_AUTH', token)
                            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        })
                        .catch(error => console.log(error))
        },

        checkLogin(context) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('TOKEN_AUTH')

                if(!token) return reject()

                axios.get(URL_BASE + '/me')
                        .then(response => {
                            context.commit('AUTH_USER_OK', response.data.user)
                            resolve()
                        })
                        .catch(() => reject())
            })
        },

        logout(context) {
            localStorage.removeItem('TOKEN_AUTH')
            context.commit('AUTH_USER_LOGOUT');
            router.push({ name: 'login' });
        }
    }
}