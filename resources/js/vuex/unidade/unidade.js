const URL_BASE = '/api/v1';

export default {
    actions: {
        buscarUnidades(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.get(URL_BASE + '/unidades')
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        },
        cadastrarUnidade(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/storeUnidade', params)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        atualizarUnidade(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/updateUnidade', params)
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        excluirUnidade(context, id){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.delete(URL_BASE + `/excluirUnidade/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        }
    }
}
