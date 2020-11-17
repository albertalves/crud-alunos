export default {
    state: {
        preloader: false
    },
    mutations: {
        CHANGE_PRELOADER(state, status) {
            state.preloader = status
        }
    },
}