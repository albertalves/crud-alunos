const URL_BASE = '/api/v1';

export default {
    actions: {
        buscarTurmas(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.get(URL_BASE + '/turmas')
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        },
        cadastrarTurma(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/storeTurma', params)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        atualizarTurma(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/updateTurma', params)
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        excluirTurma(context, id){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.delete(URL_BASE + `/excluirTurma/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        }
    }
}
