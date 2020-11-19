const URL_BASE = '/api/v1';

export default {
    actions: {
        buscarAlunos(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.get(URL_BASE + '/alunos', {params})
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        },
        cadastrarAluno(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/storeAluno', params)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        atualizarAluno(context, params) {
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(URL_BASE + '/updateAluno', params)
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                        .finally(() => context.commit('CHANGE_PRELOADER', false))
                ;
            })
        },
        excluirAluno(context, id){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.delete(URL_BASE + `/excluirAluno/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
                    .finally(() => context.commit('CHANGE_PRELOADER', false));
            })
        }
    }

}
